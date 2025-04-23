import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@components/ui/select'

import { Link, MetaFunction, useFetcher, useNavigate } from '@remix-run/react'
import { ActionFunctionArgs } from '@vercel/remix'

import dayjs from '@components/lib/time'
import { cn } from '@components/lib/utils'

import { createNewAccount } from '../core.service/auth'

import { getCountryDataList } from 'countries-list'
import { useEffect, useMemo } from 'react'

import { LoaderCircleIcon } from 'lucide-react'

export const meta: MetaFunction = () => [
  { title: 'Create Account | Hermitdraft' }
]

export const action = async ({ request }: ActionFunctionArgs) => {

  try {
    const author = await createNewAccount(request.clone())
    return { author, created: true }
  } catch (e) {
    return { created: false }
  }

}

export default function Signup() {
  const signup = useFetcher<{ created: boolean }>({ key: 'signup' })
  const countries = useMemo(() => getCountryDataList(), [])
  const navigate = useNavigate()
  const months = dayjs().localeData().months()


  useEffect(() => {

    if (signup.state == 'idle' && signup.data?.created) {
      navigate('/login', { replace: true })
    }

  }, [ signup ])

  return ( 
    <main className='mt-12'>
      <section>
        <div className='hermitdraft@container'>
          <signup.Form
            className={
              cn(
                'grid gap-4',
                'mx-auto bg-zinc-100',
                'max-w-[48ch] border p-4',
              )
            } 
            method='post'>

            <section>
              <h1 className='hermitdraft@h2'>Hermitdraft.org</h1>
              <p>A minimalist writing tool for offline writers.</p>
            </section>
            
            <Label>
              <span>Author Name</span>
              <Input name='author.name' />
            </Label>

            <Label>
              <span>Country</span>
              <Select name='author.country'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                  </SelectGroup>
                  {countries.map((country, i) => (
                    <SelectItem key={i} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Label>

            <fieldset>
              <p>Birthday</p>
              <div className={
                cn(
                  'grid grid-cols-3 gap-4',
                )
              }>
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
              <RadioGroup 
                name='author.sex' 
                defaultValue='MALE'
                className={
                  cn(
                    'grid grid-cols-2',
                  )
                }>
                <Label className='flex gap-2 items-center'>
                  <RadioGroupItem value='MALE' />
                  <span>Male</span>
                </Label>
                <Label className='flex gap-2 items-center'>
                  <RadioGroupItem value='FEMALE' />
                  <span>Female</span>
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
              { signup.state == 'submitting' && <LoaderCircleIcon className='animate-spin' /> }
              <span>Sign Up</span>
            </Button>

            <hr />

            <section className={
              cn(
                'flex items-center gap-2 mx-auto',
                'text-zinc-500',
              )
            }>
              <p className='text-sm'>Already have an account?</p>
              <Button 
                size={'sm'} 
                variant={'link'}
                className={
                  cn(
                    'px-0 h-full',
                  )
                }
                asChild>
                <Link to={'/login'}>
                  Sign in
                </Link>
              </Button>
            </section>

          </signup.Form>
        </div>
      </section>
    </main>
  )
}