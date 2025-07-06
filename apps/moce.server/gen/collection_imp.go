package gen

type collectionServiceServer struct {
	ctx Context
}

func NewCollectionServiceServer(ctx Context) *collectionServiceServer {
	return &collectionServiceServer{ctx}
}

func (s *collectionServiceServer) SaveCollection(ctx Context, req *CollectionReq) (res *CollectionRes, err error) {
	return nil, nil
}

func (s *collectionServiceServer) GetCollection(ctx Context, req *CollectionReq) (res *CollectionRes, err error) {
	return nil, nil
}

func (s *collectionServiceServer) DeleteCollection(ctx Context, req *CollectionReq) (res *CollectionRes, err error) {
	return nil, nil
}

func (s *collectionServiceServer) GetCollections(ctx Context, req *CollectionReq) (res *CollectionRes, err error) {
	return nil, nil
}
