package gen

import "errors"

var (
	ErrMissingReqArgs = errors.New("request missing arguments")

	ErrUserAlreadyExists = errors.New("user exists")
)
