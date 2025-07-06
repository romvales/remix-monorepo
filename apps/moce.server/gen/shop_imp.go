package gen

type shopServiceServer struct {
	ctx Context
}

func NewShopServiceServer(ctx Context) *shopServiceServer {
	return &shopServiceServer{ctx}
}

func (s *shopServiceServer) SaveShop(ctx Context, req *ShopReq) (res *ShopRes, err error) {
	return nil, nil
}

func (s *shopServiceServer) GetShop(ctx Context, req *ShopReq) (res *ShopRes, err error) {
	return nil, nil
}

func (s *shopServiceServer) DeleteShop(ctx Context, req *ShopReq) (res *ShopRes, err error) {
	return nil, nil
}

func (s *shopServiceServer) GetShops(ctx Context, req *ShopReq) (res *ShopRes, err error) {
	return nil, nil
}
