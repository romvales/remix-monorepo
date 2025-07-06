package gen

type customerServiceServer struct {
	ctx Context
}

func NewCustomerServiceServer(ctx Context) *customerServiceServer {
	return &customerServiceServer{ctx}
}

func (s *customerServiceServer) SaveCustomer(ctx Context, req *CustomerReq) (res *CustomerRes, err error) {

	return nil, nil
}

func (s *customerServiceServer) GetCustomer(ctx Context, req *CustomerReq) (res *CustomerRes, err error) {
	return nil, nil
}

func (s *customerServiceServer) DeleteCustomer(ctx Context, req *CustomerReq) (res *CustomerRes, err error) {
	return nil, nil
}

func (s *customerServiceServer) GetCustomers(ctx Context, req *CustomerReq) (res *CustomerRes, err error) {
	return nil, nil
}
