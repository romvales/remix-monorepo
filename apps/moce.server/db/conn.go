package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type dbContextKey string

const (
	DefaultDbConn dbContextKey = "DefaultDbConn"
)

var (
	dsn = os.Getenv("DATABASE_URL")
)

func ConnectWithContext(ctx context.Context) context.Context {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		log.Fatalln("Connection unsuccessful: ", err)
	}

	ctx = context.WithValue(ctx, DefaultDbConn, pool)

	return ctx
}

func GetPoolFromContext(ctx context.Context) *pgxpool.Pool {
	return ctx.Value(DefaultDbConn).(*pgxpool.Pool)
}

func NewQueries(ctx context.Context) *Queries {
	pool := GetPoolFromContext(ctx)
	return New(pool)
}
