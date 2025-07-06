package gen

type transactionServiceServer struct {
	ctx Context
}

func NewTransactionServiceServer(ctx Context) *transactionServiceServer {
	return &transactionServiceServer{ctx}
}

func (s *transactionServiceServer) CreateTransaction(ctx Context, req *TransactionReq) (res *TransactionRes, err error) {
	return nil, nil
}

func (s *transactionServiceServer) GetTransaction(ctx Context, req *TransactionReq) (res *TransactionRes, err error) {
	return nil, nil
}

func (s *transactionServiceServer) GetTransactions(ctx Context, req *TransactionReq) (res *TransactionRes, err error) {
	return nil, nil
}
