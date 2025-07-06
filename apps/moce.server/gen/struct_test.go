package gen_test

import (
	"log"

	"github.com/go-faker/faker/v4"
)

type TestRandomUser struct {
	Name     string `faker:"name"`
	Username string `faker:"username"`
	Email    string `faker:"email"`
}

func NewTestRandomUser() (user TestRandomUser) {
	if err := faker.FakeData(&user); err != nil {
		log.Fatalln(err.Error())
	}

	return user
}
