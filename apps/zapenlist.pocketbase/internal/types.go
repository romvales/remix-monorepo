package internal

import (
	"net/url"
	"time"

	"github.com/pocketbase/pocketbase"
)

type Pocketbase = pocketbase.PocketBase

type IndustrySectorType = string
type IndustryGlobalImportance = string
type IndustryEconomicImpact = string

const (
	Primary   IndustrySectorType = "primary"
	Secondary IndustrySectorType = "secondary"
	Tertiary  IndustrySectorType = "tertiary"
	Public    IndustrySectorType = "public"
	Informal  IndustrySectorType = "informal"
)

const (
	Low    IndustryGlobalImportance = "low"
	Medium IndustryGlobalImportance = "medium"
	High   IndustryGlobalImportance = "high"
)

const (
	Significant IndustryEconomicImpact = "significant"
	Moderate    IndustryEconomicImpact = "moderate"
	Critical    IndustryEconomicImpact = "critical"
	Essential   IndustryEconomicImpact = "essential"
)

type Industry struct {
	Id                string                   `json:"id"`
	Code              string                   `json:"code"`
	Name              string                   `json:"name"`
	Description       string                   `json:"description"`
	Created           time.Time                `json:"created"`
	Updated           time.Time                `json:"updated"`
	IsActive          bool                     `json:"isActive"`
	SubIndustries     []string                 `json:"subIndustries"`
	RelatedIndustries []string                 `json:"relatedIndustries"`
	Keywords          []string                 `json:"keywords"`
	Tags              []string                 `json:"tags"`
	SectorType        IndustrySectorType       `json:"sectorType"`
	GlobalImportance  IndustryGlobalImportance `json:"globalImportance"`
	EconomicImpact    IndustryEconomicImpact   `json:"economicImpact"`
}

type Profession struct {
	Id         string   `json:"id"`
	Industry   string   `json:"industry"`
	Profession string   `json:"profession"`
	Created    string   `json:"created"`
	Updated    string   `json:"updated"`
	Tags       []string `json:"tags"`
	IsActive   bool     `json:"isActive"`
}

type IndustryClass struct {
	Standard            string     `json:"standard"`
	StandardVersion     string     `json:"standardVersion"`
	StandardDescription string     `json:"standardDescription"`
	Source              string     `json:"source"`
	SourceUrl           url.URL    `json:"sourceUrl"`
	LastUpdated         time.Time  `json:"lastUpdated"`
	License             string     `json:"license"`
	LicenseUrl          url.URL    `json:"licenseUrl"`
	ContactEmail        string     `json:"contactEmail"`
	ContactOrganization string     `json:"contactOrganization"`
	Industries          []Industry `json:"industries"`
}

type ProfessionClass struct {
	Professions []Profession
}
