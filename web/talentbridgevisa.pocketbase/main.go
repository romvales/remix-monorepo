package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.NewWithConfig(pocketbase.Config{})

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
