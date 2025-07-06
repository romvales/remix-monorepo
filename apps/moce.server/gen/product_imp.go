package gen

type productServiceServer struct {
	ctx Context
}

func NewProductServiceServer(ctx Context) *productServiceServer {
	return &productServiceServer{ctx}
}

func (s *productServiceServer) SaveProduct(ctx Context, req *ProductReq) (res *ProductRes, err error) {
	return nil, nil
}

func (s *productServiceServer) GetProduct(ctx Context, req *ProductReq) (res *ProductRes, err error) {
	return nil, nil
}

func (s *productServiceServer) DeleteProduct(ctx Context, req *ProductReq) (res *ProductRes, err error) {
	return nil, nil
}

func (s *productServiceServer) GetProducts(ctx Context, req *ProductReq) (res *ProductRes, err error) {
	return nil, nil
}
