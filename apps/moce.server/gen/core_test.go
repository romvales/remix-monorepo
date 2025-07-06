package gen_test

import (
	"context"
	"testing"

	"github.com/romvales/moceserver/db"
	"github.com/romvales/moceserver/gen"
	"github.com/romvales/moceserver/gen/models"
	"github.com/stretchr/testify/assert"
)

var (
	globalCtx = db.ConnectWithContext(context.TODO())
)

func toPtr[T any](t T) *T {
	return &t
}

func TestUserService_WithDb(t *testing.T) {
	rpc := gen.NewUserServiceServer(globalCtx)

	t.Run("should persist user to data source.", func(t *testing.T) {
		user := NewTestRandomUser()

		var err error

		defer t.Cleanup(func() {
			rpc.DeleteUser(context.TODO(), &gen.UserReq{
				User: &models.User{
					Email: user.Email,
				},
			})
		})

		res, err := rpc.SaveUser(context.TODO(), &gen.UserReq{
			User: &models.User{
				Name:     user.Name,
				Email:    user.Email,
				Username: user.Username,
			},
		})

		assert.Nil(t, err)
		assert.NotNil(t, res)
		assert.NotNil(t, res.User)

		assert.NotNil(t, res.User.Id)
		assert.Equal(t, res.User.Email, user.Email)
		assert.Equal(t, res.User.Username, user.Username)

		res, err = rpc.CountUsers(context.TODO(), &gen.UserReq{})

		assert.Nil(t, err)
		assert.NotNil(t, res)

		assert.Equal(t, int64(1), *res.TotalUsers)
		assert.Equal(t, int64(0), *res.TotalDeletedUsers)
	})

	t.Run("able to soft delete a user.", func(t *testing.T) {
		user := NewTestRandomUser()

		defer t.Cleanup(func() {
			rpc.DeleteUser(context.TODO(), &gen.UserReq{
				User: &models.User{
					Email: user.Email,
				},
			})
		})

		var err error

		res, err := rpc.SaveUser(context.TODO(), &gen.UserReq{
			User: &models.User{
				Name:     user.Name,
				Email:    user.Email,
				Username: user.Username,
			},
		})

		assert.Nil(t, err)
		assert.NotNil(t, res)
		assert.NotNil(t, res.User)
		assert.NotEmpty(t, res.User.Id)

		// attempt soft delete.
		_, err = rpc.DeleteUser(context.TODO(), &gen.UserReq{
			Args: &models.RequestArgs{
				SoftDelete: toPtr(true),
			},

			User: &models.User{
				Id: res.User.Id,
			},
		})

		assert.Nil(t, err)

		res1, err := rpc.CountUsers(context.TODO(), &gen.UserReq{})

		assert.Nil(t, err)
		assert.NotNil(t, res1)
		assert.NotNil(t, res1.TotalDeletedUsers)
		assert.Equal(t, int64(1), *res1.TotalDeletedUsers)
	})

	t.Run("should get user from data source", func(t *testing.T) {
		user := NewTestRandomUser()

		defer t.Cleanup(func() {
			rpc.DeleteUser(context.TODO(), &gen.UserReq{
				User: &models.User{
					Email: user.Email,
				},
			})
		})

		var err error

		_, err = rpc.SaveUser(context.TODO(), &gen.UserReq{
			User: &models.User{
				Name:     user.Name,
				Email:    user.Email,
				Username: user.Username,
			},
		})

		assert.Nil(t, err)

		res, err := rpc.GetUser(context.TODO(), &gen.UserReq{
			User: &models.User{
				Email: user.Email,
			},
		})

		assert.Nil(t, err)
		assert.NotNil(t, res)
		assert.NotNil(t, res.User)
		assert.Equal(t, user.Email, res.User.Email)

	})

	t.Run("should get all created users", func(t *testing.T) {
		t.Fail()
	})

	t.Run("should get all deleted users", func(t *testing.T) {
		t.Fail()
	})

}

func TestCustomerService_WithDb(t *testing.T) {

	t.Run("should persist the customer data to the database.", func(t *testing.T) {

	})

}

func TestShopService_WithDb(t *testing.T) {

}

func TestChannelService_WithDb(t *testing.T) {

}

func TestOrderService_WithDb(t *testing.T) {

}

func TestCollectionService_WithDb(t *testing.T) {

}

func TestTransactionService_WithDb(t *testing.T) {

}
