import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/ui/select'


import { useFetcher } from '@remix-run/react'
import { ActionFunctionArgs } from '@vercel/remix'

import dayjs from '@components/lib/time'
import { createNewAccount } from '../core.service/auth'

export const action = async ({ request }: ActionFunctionArgs) => {

  try {
    const author = await createNewAccount(request.clone())
    return { author, created: true }
  } catch (e) {
    console.log(e)
    return { created: false }
  }

}

export default function Signup() {
  const signup = useFetcher({ key: 'signup' })
  const months = dayjs().localeData().months()

  return ( 
    <main>
      <signup.Form 
        method='post'>
        
        <Label>
          <span>Author Name</span>
          <Input name='author.name' />
        </Label>

        <Label>
          <span>Country</span>
          <Input name='author.country' />
        </Label>

        <fieldset>
          <p>Birthday</p>
          <div>
            <Label>
              <span>Month</span>
              <Select name='+author.birthMonth' defaultValue={'1'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Month</SelectLabel>
                    {months.map((month, i) => (
                      <SelectItem key={i} value={(i+1).toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>
            <Label>
              <span>Day</span>
              <Input name='+author.birthDay' type='number' min={1} max={31} />
            </Label>
            <Label>
              <span>Year</span>
              <Input name='+author.birthYear' type='number' min={1940} max={dayjs().year()} />
            </Label>
          </div>
        </fieldset>

        <fieldset>
          <p>Sex</p>
          <RadioGroup name='author.sex' defaultValue='MALE'>
            <Label>
              <span>Male</span>
              <RadioGroupItem value='MALE' />
            </Label>
            <Label>
              <span>Female</span>
              <RadioGroupItem value='FEMALE' />
            </Label>
          </RadioGroup>
        </fieldset>

        <Label>
          <span>Email</span>
          <Input name='author.email' type='email' autoComplete='username' />
        </Label>

        <Label>
          <span>Password</span>
          <Input name='author.pass' type='password' autoComplete='new-password' />
        </Label>

        <Label>
          <span>Confirm Password</span>
          <Input name='author.confirmPass' type='password' autoComplete='new-password' />
        </Label>

        <Button>
          Sign Up
        </Button>

      </signup.Form>
    </main>
  )
}