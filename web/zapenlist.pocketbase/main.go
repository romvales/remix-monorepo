package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/romvales/zapenlistpb/internal"
)

func main() {
	app := internal.BindInternalApis(pocketbase.NewWithConfig(pocketbase.Config{}))

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
