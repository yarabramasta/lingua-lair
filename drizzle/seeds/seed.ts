import { hash } from '@node-rs/argon2'

import { db } from '~/lib/db'
import {
  flags,
  lairs,
  languages,
  tokens,
  users,
  versions
} from '~/lib/db/schema'

const REQUIRED_ENV = ['POSTGRES_URL', 'SUDO_ACCOUNT_PASSWORD']

if (!REQUIRED_ENV.every(env => process.env[env])) {
  throw new Error(
    `Missing required environment variables: ${REQUIRED_ENV.join(', ')}`
  )
}

async function populateFlags() {
  console.info('Populating flags...')

  const data = (await import('./countries.json')).default.map(
    ({ name, code, flag }) => ({ code, name, emoji: flag })
  )
  await db
    .insert(flags)
    .values(data)
    .onConflictDoNothing({ target: flags.code })

  console.info('Flags table has been populated successfully!')
}

async function setupSudoAccount() {
  console.info('Setting up sudo account...')

  const rows = await db
    .insert(users)
    .values({
      username: 'sudo',
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      passwordHash: await hash(process.env.SUDO_ACCOUNT_PASSWORD!, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
      })
    })
    .onConflictDoNothing({ target: users.username })
    .returning({ id: users.id })

  if (rows.length === 0) {
    throw new Error('Sudo account already exists, skipping setup...')
  }

  console.info('Sudo account has been set up successfully!')

  const [{ id: sudoAccountId }] = rows
  return sudoAccountId
}

async function setupExampleLair(userId: string) {
  console.info('Setting up example lair...')

  await db.transaction(async tx => {
    const [{ id: lairId }] = await tx
      .insert(lairs)
      .values({
        userId,
        name: 'Example Lair',
        description:
          'This is an example lair. Lair is a collection of languages that share the same glossary (i18n tokens).\n\nYou can always modify or delete this lair and create your own.',
        slug: 'example_lair'
      })
      .onConflictDoNothing({ target: lairs.slug })
      .returning({ id: lairs.id })

    const { id: flagId } = await tx.query.flags
      .findFirst({
        where: (t, { eq }) => eq(t.code, 'US'),
        columns: { id: true }
      })
      .then(flag => {
        if (!flag) throw new Error('Flag not found')
        return flag
      })
    const [{ id: langId }] = await tx
      .insert(languages)
      .values({
        lairId,
        flagId,
        code: 'en_US',
        name: 'English (United States)',
        description: 'Collection of English (United States) translations.'
      })
      .returning({ id: languages.id })

    await tx.insert(tokens).values({
      languageId: langId,
      key: 'hello',
      value: 'Hello, {name}!'
    })

    await tx.insert(versions).values({
      languageId: langId,
      changelog: { hello: 'Hello, {name}!' },
      version: 1,
      published: true
    })
  })

  console.info('Example lair has been set up successfully!')
}

async function main() {
  await populateFlags()
  const sudo = await setupSudoAccount().catch(e => {
    console.info(e.message)
    process.exit(0)
  })
  await setupExampleLair(sudo)
}

main()
  .then(() => {
    console.log('Seeding complete')
    process.exit(0)
  })
  .catch(e => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
