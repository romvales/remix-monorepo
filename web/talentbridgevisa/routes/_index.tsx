import { Button } from '@components/ui/button';
import { LoaderFunctionArgs } from '@remix-run/node';


export const loader = async (args: LoaderFunctionArgs) => {
  return null
}

export default function Home() {
  return (
    <>
      <Button>Button</Button>
    </>
  )
}