package main

import (
	"context"
	"log"
	"net"
	"os"

	"github.com/romvales/moceserver/db"
	"github.com/romvales/moceserver/gen"
	"google.golang.org/grpc"
)

func main() {
	s, err := net.Listen("tcp", os.Getenv("GRPC_HOST"))
	if err != nil {
		log.Fatalf(err.Error())
	}

	opts := []grpc.ServerOption{}

	server := grpc.NewServer(opts...)

	gen.RegisterMoceMonolithServiceServer(server,
		gen.NewMonolithServer(
			db.ConnectWithContext(context.TODO()),
		),
	)

	if err := server.Serve(s); err != nil {
		log.Fatalf(err.Error())
	}
}
