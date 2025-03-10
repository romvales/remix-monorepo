package internal

import (
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	_ "github.com/romvales/zapenlistpb/migrations"
)

func BindInternalApis(app *Pocketbase) *Pocketbase {
	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{})

	mustBindCommands(app)

	return app
}
