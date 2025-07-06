package gen

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgtype"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/romvales/moceserver/db"
	"github.com/romvales/moceserver/gen/models"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type userServiceServer struct {
	ctx Context
}

func NewUserServiceServer(ctx Context) *userServiceServer {
	return &userServiceServer{ctx}
}

func (s *userServiceServer) SaveUser(ctx Context, req *UserReq) (res *UserRes, err error) {
	q := db.NewQueries(s.ctx)

	if req.User == nil {
		return &UserRes{
			Metadata: &models.ResponseMetadata{
				Code:      http.StatusBadRequest,
				Timestamp: timestamppb.Now().String(),
				Errors: &models.ErrorMetadata{
					Message: ErrMissingReqArgs.Error(),
				},
			},
		}, ErrMissingReqArgs
	}

	params := db.SaveUserParams{
		ID:       req.User.GetId(),
		Name:     req.User.GetName(),
		Username: req.User.GetUsername(),
		Email:    req.User.GetEmail(),
	}

	if req.User.Deleted != nil {
		params.Deleted = pgtype.Timestamp{
			Time:  req.User.Deleted.AsTime(),
			Valid: true,
		}
	}

	if params.ID == "" {
		params.ID = gonanoid.Must(32)
	}

	// Checks whether the user already exists in the record.
	if exists, err := q.CheckIfUserExists(ctx, db.CheckIfUserExistsParams{
		ID:       params.ID,
		Email:    params.Email,
		Username: params.Username,
	}); err != nil {
		return &UserRes{
			Metadata: &models.ResponseMetadata{
				Code:      http.StatusInternalServerError,
				Timestamp: timestamppb.Now().String(),
				Errors: &models.ErrorMetadata{
					Message: err.Error(),
				},
			},
		}, err
	} else if exists {
		return &UserRes{
			Metadata: &models.ResponseMetadata{
				Code:      http.StatusConflict,
				Timestamp: timestamppb.Now().String(),
				Errors: &models.ErrorMetadata{
					Message: ErrUserAlreadyExists.Error(),
				},
			},

			User: req.User,
		}, ErrUserAlreadyExists
	}

	u, err := q.SaveUser(ctx, params)

	if err != nil {
		return &UserRes{
			Metadata: &models.ResponseMetadata{
				Code:      http.StatusBadRequest,
				Timestamp: timestamppb.Now().String(),
				Errors: &models.ErrorMetadata{
					Message: err.Error(),
				},
			},
		}, err
	}

	return &UserRes{
		Metadata: &models.ResponseMetadata{
			Code:      http.StatusCreated,
			Timestamp: timestamppb.Now().String(),
		},

		User: models.ToUserProto(&u),
	}, nil
}

func (s *userServiceServer) GetUser(ctx Context, req *UserReq) (res *UserRes, err error) {
	q := db.NewQueries(s.ctx)

	var user db.User

	if user, err = q.GetUser(ctx, db.GetUserParams{
		ID:       req.User.GetId(),
		Email:    req.User.GetEmail(),
		Username: req.User.GetUsername(),
	}); err != nil {
		return &UserRes{
			Metadata: &models.ResponseMetadata{
				Code:      http.StatusNotFound,
				Timestamp: timestamppb.Now().String(),
				Errors: &models.ErrorMetadata{
					Message: err.Error(),
				},
			},
		}, err
	}

	return &UserRes{
		Metadata: &models.ResponseMetadata{
			Code:      http.StatusOK,
			Timestamp: timestamppb.Now().String(),
		},

		User: models.ToUserProto(&user),
	}, nil
}

func (s *userServiceServer) DeleteUser(ctx Context, req *UserReq) (res *UserRes, err error) {
	q := db.NewQueries(s.ctx)

	if req.User == nil {
		return &UserRes{
			Metadata: &models.ResponseMetadata{
				Code:      http.StatusBadRequest,
				Timestamp: timestamppb.Now().String(),
				Errors: &models.ErrorMetadata{
					Message: ErrMissingReqArgs.Error(),
				},
			},
		}, ErrMissingReqArgs
	}

	if req.Args != nil && req.Args.GetSoftDelete() {
		err = q.SoftDeleteUser(ctx, db.SoftDeleteUserParams{
			ID:       req.User.GetId(),
			Email:    req.User.GetEmail(),
			Username: req.User.GetUsername(),
		})
	} else {
		err = q.DeleteUser(ctx, db.DeleteUserParams{
			ID:       req.User.GetId(),
			Email:    req.User.GetEmail(),
			Username: req.User.GetUsername(),
		})
	}

	if err != nil {
		return &UserRes{
			Metadata: &models.ResponseMetadata{
				Code:      http.StatusNotModified,
				Timestamp: timestamppb.Now().String(),
				Errors: &models.ErrorMetadata{
					Message: err.Error(),
				},
			},
		}, err
	}

	return &UserRes{
		Metadata: &models.ResponseMetadata{
			Code:      http.StatusAccepted,
			Timestamp: timestamppb.Now().String(),
		},
	}, nil
}

func (s *userServiceServer) GetUsers(ctx Context, req *UserReq) (res *UserRes, err error) {
	paging := &models.PaginationMetadata{}

	return &UserRes{
		Metadata: &models.ResponseMetadata{
			Code:      http.StatusOK,
			Timestamp: timestamppb.Now().String(),
			Paging:    paging,
		},
	}, nil
}

func (s *userServiceServer) GetSoftDeletedUsers(ctx Context, req *UserReq) (res *UserRes, err error) {
	paging := &models.PaginationMetadata{}

	return &UserRes{
		Metadata: &models.ResponseMetadata{
			Code:      http.StatusOK,
			Timestamp: timestamppb.Now().String(),
			Paging:    paging,
		},
	}, nil
}

func (s *userServiceServer) CountUsers(ctx Context, req *UserReq) (res *UserRes, err error) {
	q := db.NewQueries(s.ctx)

	var counts db.CountUsersRow

	if counts, err = q.CountUsers(ctx); err != nil {
		return &UserRes{
			Metadata: &models.ResponseMetadata{
				Code:      http.StatusInternalServerError,
				Timestamp: timestamppb.Now().String(),
				Errors: &models.ErrorMetadata{
					Message: err.Error(),
				},
			},
		}, err
	}

	return &UserRes{
		Metadata: &models.ResponseMetadata{
			Code:      http.StatusOK,
			Timestamp: timestamppb.Now().String(),
		},

		TotalUsers:        &counts.TotalUsers,
		TotalDeletedUsers: &counts.TotalDeletedUsers,
	}, nil
}
