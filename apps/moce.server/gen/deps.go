package gen

import (
	"context"

	"github.com/romvales/moceserver/gen/models"
)

type Context = context.Context

type UserReq = models.UserActionRequest
type ShopReq = models.ShopActionRequest
type OrderReq = models.OrderActionRequest
type ProductReq = models.ProductActionRequest
type TransactionReq = models.TransactionActionRequest
type CustomerReq = models.CustomerActionRequest
type CollectionReq = models.CollectionActionRequest

type UserRes = models.UserActionResponse
type ShopRes = models.ShopActionResponse
type OrderRes = models.OrderActionResponse
type ProductRes = models.ProductActionResponse
type TransactionRes = models.TransactionActionResponse
type CustomerRes = models.CustomerActionResponse
type CollectionRes = models.CollectionActionResponse
