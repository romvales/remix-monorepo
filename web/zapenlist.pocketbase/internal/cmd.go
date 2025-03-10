package internal

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase/core"
	"github.com/spf13/cobra"
	"gopkg.in/yaml.v3"
)

func mustBindCommands(app *Pocketbase) *Pocketbase {

	initCommand(app, app.RootCmd)

	return app
}

func initCommand(app *Pocketbase, cmd *cobra.Command) {

	cmd.AddCommand(&cobra.Command{
		Use: "init",
		Run: func(cmd *cobra.Command, args []string) {
			var b1, b2 []byte
			var err error
			var class = &IndustryClass{}
			var professions = &ProfessionClass{}

			if b1, err = os.ReadFile(fmt.Sprintf("./data/industries.yaml")); err != nil {
				log.Fatal(err)
			}

			if b2, err = os.ReadFile(fmt.Sprintf("./data/professions.yaml")); err != nil {
				log.Fatal(err)
			}

			if err := yaml.NewDecoder(bytes.NewReader(b1)).Decode(class); err != nil {
				log.Fatal(err)
			}

			if err := yaml.NewDecoder(bytes.NewReader(b2)).Decode(professions); err != nil {
				log.Fatal(err)
			}

			var industriesCol *core.Collection

			if industriesCol, err = app.FindCollectionByNameOrId("industries"); err != nil {
				log.Fatal(err)
			}

			mapIndustName := make(map[string]string)

			for _, industry := range class.Industries {
				record := core.NewRecord(industriesCol)

				record.Set("code", industry.Code)
				record.Set("name", industry.Name)
				record.Set("description", industry.Description)
				record.Set("globalImportance", industry.GlobalImportance)
				record.Set("isActive", industry.IsActive)
				record.Set("keywords", strings.Join(industry.Keywords, ","))
				record.Set("related", strings.Join(industry.RelatedIndustries, ","))
				record.Set("subs", strings.Join(industry.SubIndustries, ","))
				record.Set("tags", strings.Join(industry.Tags, ","))
				record.Set("economicImpact", industry.EconomicImpact)
				record.Set("sectorType", industry.SectorType)

				app.SaveNoValidate(record)

				mapIndustName[industry.Id] = industry.Name
			}

		},
	})

}
