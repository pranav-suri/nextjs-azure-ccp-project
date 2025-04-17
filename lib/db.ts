import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  serial,
  uniqueIndex,
  index
} from 'drizzle-orm/pg-core';
import { statusEnum } from '.';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export const users = pgTable(
  'user',
  {
    id: text('id').primaryKey().notNull(),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified'),
    image: text('image')
  },
  (user) => ({
    emailIndex: uniqueIndex('users__email__idx').on(user.email)
  })
);

export const sessions = pgTable(
  'session',
  {
    // id: text('id').primaryKey().notNull(),
    expires: timestamp('expires', { withTimezone: false }).notNull(),
    sessionToken: text('sessionToken').notNull(),
    userId: text('userId').notNull()
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex('sessions__sessionToken__idx').on(
      session.sessionToken
    ),
    userIdIndex: index('sessions__userId__idx').on(session.userId)
  })
);

export const accounts = pgTable(
  'account',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: timestamp('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      'accounts__provider__providerAccountId__idx'
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index('accounts__userId__idx').on(account.userId)
  })
);

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').primaryKey().notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires').notNull()
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex('verification_tokens__token__idx').on(
      verificationToken.token
    )
  })
);
