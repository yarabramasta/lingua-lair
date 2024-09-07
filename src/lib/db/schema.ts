import { generateIdFromEntropySize } from 'lucia'

import { relations } from 'drizzle-orm'
import {
  type AnyPgColumn,
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  vector
} from 'drizzle-orm/pg-core'

export const flags = pgTable('flags', {
  id: serial('id').primaryKey(),
  code: text('code').unique().notNull(),
  name: text('name').notNull(),
  emoji: text('emoji').notNull()
})

export const auth$ = pgSchema('auth')

export const users = auth$.table('users', {
  id: text('id')
    .primaryKey()
    .$default(() => generateIdFromEntropySize(16)),

  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true, precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, precision: 3 })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  lairs: many(lairs)
}))

export const sessions = auth$.table('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'no action' }),

  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    precision: 3
  }).notNull()
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}))

export const lingua$ = pgSchema('lingua')

export const lairs = lingua$.table(
  'lairs',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'no action'
      }),

    slug: text('slug').unique().notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    primary: boolean('primary').default(false).notNull(),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      precision: 3
    }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  t => ({
    nameIdx: index().on(t.name)
  })
)

export const lairsRelations = relations(lairs, ({ one, many }) => ({
  user: one(users, {
    fields: [lairs.userId],
    references: [users.id]
  }),
  languages: many(languages)
}))

export const languages = lingua$.table(
  'languages',
  {
    id: serial('id').primaryKey(),
    lairId: bigint('lair_id', { mode: 'number' })
      .notNull()
      .references(() => lairs.id, {
        onDelete: 'cascade',
        onUpdate: 'no action'
      }),

    code: text('code').notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    flagId: bigint('flag_id', { mode: 'number' })
      .notNull()
      .references(() => flags.id, {
        onDelete: 'no action',
        onUpdate: 'no action'
      }),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      precision: 3
    }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  t => ({
    codeIdx: index().on(t.code),
    nameIdx: index().on(t.name)
  })
)

export const languagesRelations = relations(languages, ({ one, many }) => ({
  lair: one(lairs, {
    fields: [languages.lairId],
    references: [lairs.id]
  }),
  tokens: many(tokens),
  versions: many(versions),
  flag: one(flags, {
    fields: [languages.flagId],
    references: [flags.id]
  })
}))

export const tokens = lingua$.table(
  'tokens',
  {
    id: serial('id').primaryKey(),
    languageId: bigint('language_id', { mode: 'number' })
      .notNull()
      .references(() => languages.id, {
        onDelete: 'cascade',
        onUpdate: 'no action'
      }),

    key: text('key').notNull(),
    value: text('value').notNull(),
    embedding: vector('embedding', { dimensions: 1536 }),

    createdAt: timestamp('created_at', {
      withTimezone: true,
      precision: 3
    }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, precision: 3 })
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  t => ({
    keyIdx: index().on(t.key),
    embeddingIndex: index().using('hnsw', t.embedding.op('vector_cosine_ops'))
  })
)

export const tokensRelations = relations(tokens, ({ one }) => ({
  language: one(languages, {
    fields: [tokens.languageId],
    references: [languages.id]
  })
}))

export const versions = lingua$.table('versions', {
  id: serial('id').primaryKey(),
  languageId: bigint('language_id', { mode: 'number' })
    .notNull()
    .references(() => languages.id, {
      onDelete: 'cascade',
      onUpdate: 'no action'
    }),
  previousVersionId: bigint('previous_version_id', {
    mode: 'number'
  }).references((): AnyPgColumn => versions.id, {
    onDelete: 'no action',
    onUpdate: 'no action'
  }),

  version: integer('version').notNull(),
  changelog: jsonb('changelog').notNull().$type<Record<string, string>>(),
  published: boolean('is_published').default(false).notNull(),
  archived: boolean('is_archived').default(false).notNull(),

  createdAt: timestamp('created_at', {
    withTimezone: true,
    precision: 3
  }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, precision: 3 })
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const versionsRelations = relations(versions, ({ one }) => ({
  language: one(languages, {
    fields: [versions.languageId],
    references: [languages.id]
  }),
  previousVersion: one(versions, {
    fields: [versions.previousVersionId],
    references: [versions.id]
  })
}))
