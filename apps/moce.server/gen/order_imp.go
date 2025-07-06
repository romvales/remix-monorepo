package gen

type orderServiceServer struct {
	ctx Context
}

func NewOrderServiceServer(ctx Context) *orderServiceServer {
	return &orderServiceServer{ctx}
}

func (s *orderServiceServer) SaveOrder(ctx Context, req *OrderReq) (res *OrderRes, err error) {
	return nil, nil
}

func (s *orderServiceServer) GetOrder(ctx Context, req *OrderReq) (res *OrderRes, err error) {
	return nil, nil
}

func (s *orderServiceServer) DeleteOrder(ctx Context, req *OrderReq) (res *OrderRes, err error) {
	return nil, nil
}

func (s *orderServiceServer) GetOrders(ctx Context, req *OrderReq) (res *OrderRes, err error) {
	return nil, nil
}
