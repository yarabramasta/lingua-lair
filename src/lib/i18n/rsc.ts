import { cache } from 'react'

import { getPrimaryLair } from '~/services/i18n/lairs'

export const fetchPrimaryLairSlug = cache(
  async () => await getPrimaryLair().then(lair => lair?.slug ?? '')
)
