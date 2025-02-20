import { Button } from '@components/ui/button';
import { LoaderFunctionArgs } from '@remix-run/node';


export const loader = async (args: LoaderFunctionArgs) => {
  
}

export default function Home() {
  return (
    <>
      <Button>Button</Button>
    </>
  )
}