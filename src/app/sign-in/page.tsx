import { redirect } from 'next/navigation'

import Header from '~/components/header'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import { getUserCached } from '~/lib/auth/rsc'
import SigninForm from './form'

export default async function SigninPage() {
  const user = await getUserCached()
  if (user) redirect('/')

  return (
    <div className="relative flex h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <div className="flex h-full flex-col items-center justify-center overflow-x-hidden p-8">
          <Card className="max-w-[348px]" variant="transparent">
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Please proceed with authentication before accessing dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <SigninForm />
            </CardContent>
            <CardFooter>
              <p className="mx-auto mt-4 text-center font-mono text-[0.65rem] text-muted-foreground">
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
        </div>
      </main>
    </div>
  )
}
