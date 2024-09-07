import { redirect } from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { auth } from '~/lib/auth/rsc'

export default async function SigninPage() {
  const cred = await auth()
  if (cred) redirect('/dash')

  return (
    <Card className="max-w-[348px]" variant="transparent">
      <CardHeader>
        <CardTitle>Lingua Lair</CardTitle>
        <CardDescription>
          Please proceed with authentication before accessing dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">Sign in form here</CardContent>
      <CardFooter>
        <p className="font-mono text-[0.65rem] text-muted-foreground">
          &copy; 2024. Site by{' '}
          <a
            href="http://github.com/yarabramasta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground/80 hover:underline"
          >
            Yara Bramasta
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  )
}
