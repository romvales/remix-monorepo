package gen

import (
	"github.com/romvales/moceserver/gen/models"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type monolithServer struct {
	UnimplementedMoceMonolithServiceServer

	ctx Context

	collection  *collectionServiceServer
	customer    *customerServiceServer
	order       *orderServiceServer
	product     *productServiceServer
	shop        *shopServiceServer
	user        *userServiceServer
	transaction *transactionServiceServer
}

func NewMonolithServer(ctx Context) *monolithServer {

	s := &monolithServer{
		ctx:         ctx,
		user:        NewUserServiceServer(ctx),
		customer:    NewCustomerServiceServer(ctx),
		order:       NewOrderServiceServer(ctx),
		product:     NewProductServiceServer(ctx),
		shop:        NewShopServiceServer(ctx),
		transaction: NewTransactionServiceServer(ctx),
		collection:  NewCollectionServiceServer(ctx),
	}

	return s
}

func (s *monolithServer) Hello(ctx Context, req *models.HelloRequest) (res *models.HelloResponse, err error) {
	return &models.HelloResponse{
		Message:    "Hello world",
		ServerTime: timestamppb.Now(),
	}, nil
}

func (s *monolithServer) SaveUser(ctx Context, req *UserReq) (res *UserRes, err error) {
	return s.user.SaveUser(ctx, req)
}

func (s *monolithServer) GetUser(ctx Context, req *UserReq) (res *UserRes, err error) {
	return s.user.GetUser(ctx, req)
}

func (s *monolithServer) DeleteUser(ctx Context, req *UserReq) (res *UserRes, err error) {
	return s.user.DeleteUser(ctx, req)
}

func (s *monolithServer) GetUsers(ctx Context, req *UserReq) (res *UserRes, err error) {
	return s.user.GetUsers(ctx, req)
}

func (s *monolithServer) GetSoftDeletedUsers(ctx Context, req *UserReq) (res *UserRes, err error) {
	return s.user.GetSoftDeletedUsers(ctx, req)
}

func (s *monolithServer) CountUsers(ctx Context, req *UserReq) (res *UserRes, err error) {
	return s.user.CountUsers(ctx, req)
}

func (s *monolithServer) SaveCustomer(ctx Context, req *CustomerReq) (res *CustomerRes, err error) {
	return s.customer.SaveCustomer(ctx, req)
}

func (s *monolithServer) GetCustomer(ctx Context, req *CustomerReq) (res *CustomerRes, err error) {
	return s.customer.GetCustomer(ctx, req)
}

func (s *monolithServer) DeleteCustomer(ctx Context, req *CustomerReq) (res *CustomerRes, err error) {
	return s.customer.DeleteCustomer(ctx, req)
}

func (s *monolithServer) GetCustomers(ctx Context, req *CustomerReq) (res *CustomerRes, err error) {
	return s.customer.GetCustomers(ctx, req)
}

func (s *monolithServer) SaveShop(ctx Context, req *ShopReq) (res *ShopRes, err error) {
	return s.shop.SaveShop(ctx, req)
}

func (s *monolithServer) GetShop(ctx Context, req *ShopReq) (res *ShopRes, err error) {
	return s.shop.GetShop(ctx, req)
}

func (s *monolithServer) DeleteShop(ctx Context, req *ShopReq) (res *ShopRes, err error) {
	return s.shop.DeleteShop(ctx, req)
}

func (s *monolithServer) GetShops(ctx Context, req *ShopReq) (res *ShopRes, err error) {
	return s.shop.GetShops(ctx, req)
}

func (s *monolithServer) SaveProduct(ctx Context, req *ProductReq) (res *ProductRes, err error) {
	return s.product.SaveProduct(ctx, req)
}

func (s *monolithServer) GetProduct(ctx Context, req *ProductReq) (res *ProductRes, err error) {
	return s.product.GetProduct(ctx, req)
}

func (s *monolithServer) DeleteProduct(ctx Context, req *ProductReq) (res *ProductRes, err error) {
	return s.product.DeleteProduct(ctx, req)
}

func (s *monolithServer) GetProducts(ctx Context, req *ProductReq) (res *ProductRes, err error) {
	return s.product.GetProducts(ctx, req)
}

func (s *monolithServer) SaveOrder(ctx Context, req *OrderReq) (res *OrderRes, err error) {
	return s.order.SaveOrder(ctx, req)
}

func (s *monolithServer) GetOrder(ctx Context, req *OrderReq) (res *OrderRes, err error) {
	return s.order.GetOrder(ctx, req)
}

func (s *monolithServer) DeleteOrder(ctx Context, req *OrderReq) (res *OrderRes, err error) {
	return s.order.DeleteOrder(ctx, req)
}

func (s *monolithServer) GetOrders(ctx Context, req *OrderReq) (res *OrderRes, err error) {
	return s.order.GetOrders(ctx, req)
}

func (s *monolithServer) SaveCollection(ctx Context, req *CollectionReq) (res *CollectionRes, err error) {
	return s.collection.SaveCollection(ctx, req)
}

func (s *monolithServer) DeleteCollection(ctx Context, req *CollectionReq) (res *CollectionRes, err error) {
	return s.collection.DeleteCollection(ctx, req)
}

func (s *monolithServer) GetCollections(ctx Context, req *CollectionReq) (res *CollectionRes, err error) {
	return s.collection.GetCollections(ctx, req)
}

func (s *monolithServer) CreateTransaction(ctx Context, req *TransactionReq) (res *TransactionRes, err error) {
	return s.transaction.CreateTransaction(ctx, req)
}

func (s *monolithServer) GetTransaction(ctx Context, req *TransactionReq) (res *TransactionRes, err error) {
	return s.transaction.GetTransaction(ctx, req)
}

func (s *monolithServer) GetTransactions(ctx Context, req *TransactionReq) (res *TransactionRes, err error) {
	return s.transaction.GetTransactions(ctx, req)
}
