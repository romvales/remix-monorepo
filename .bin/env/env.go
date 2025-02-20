package main

import (
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"os"
	"reflect"
	"strings"

	"github.com/BurntSushi/toml"
)

var (
	root string
	env  string

	ErrEmptyRootArgs  = errors.New("Missing 'root' argument.")
	ErrEmptyEnvArgs   = errors.New("Missing 'env' argument.")
	ErrConfigNotFound = errors.New("Config is missing.")
)

func init() {
	flag.StringVar(&root, "root", "", "Specify the root directory.")
	flag.StringVar(&env, "env", "", "Environment type <dev|test|prod>.")
}

func main() {
	flag.Parse()

	var dir string
	var err error

	if dir, err = os.Getwd(); err != nil {
		println("error:", err.Error())
		os.Exit(1)
	}

	if len(root) == 0 {
		println("error:", ErrEmptyRootArgs.Error())
		os.Exit(1)
	}

	if len(env) == 0 {
		println("error:", ErrEmptyEnvArgs.Error())
		os.Exit(1)
	}

	config := fmt.Sprintf("%s/%s/config.%s.toml", dir, root, env)

	data := map[string]any{}

	if _, err := toml.DecodeFile(config, &data); err != nil {
		if os.IsNotExist(err) {
			println("error:", ErrConfigNotFound.Error())
		} else {
			println("error:", err.Error())
		}

		os.Exit(1)
	}

	if _, loaded := os.LookupEnv("ENV_LOADED"); !loaded {
		load(data, []string{})
	}
}

func load(data map[string]any, part []string) {
	var err error

	for key, val := range data {
		newPart := append(part, []string{key}...)

		var key = strings.ToUpper(strings.Join(newPart, "_"))
		var isValid bool
		var b []byte

		switch reflect.TypeOf(val).Kind() {
		case reflect.Map:
			data := val.(map[string]any)
			load(data, newPart)
		case reflect.Slice:
			fallthrough
		case reflect.Array:

			if b, err = json.Marshal(val); err != nil {
				print("error:", err.Error())
				os.Exit(1)
			}

			b = []byte(fmt.Sprintf("\"%s\"", string(b)))

			isValid = true
		default:
			if b, err = json.Marshal(val); err != nil {
				print("error:", err.Error())
				os.Exit(1)
			}

			isValid = true
		}

		if isValid {
			fmt.Printf("export %s=%s\n", key, string(b))
		}

	}

}
