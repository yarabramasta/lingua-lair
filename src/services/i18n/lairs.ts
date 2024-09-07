import { db } from '~/lib/db'

export async function getPrimaryLair() {
  const primaryLair = await db.query.lairs.findFirst({
    where: (t, { eq }) => eq(t.primary, true),
    columns: { slug: true }
  })
  if (primaryLair) return primaryLair

  return await db.query.lairs.findFirst({
    where: (t, { eq }) => eq(t.slug, 'example_lair'),
    columns: { slug: true }
  })
}
