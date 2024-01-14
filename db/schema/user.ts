import {
  pgTable,
  foreignKey,
  pgEnum,
  serial,
  integer,
  text,
  timestamp,
  boolean,
  varchar,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

import { relations, sql } from 'drizzle-orm'

export const role = pgEnum('Role', [
  'STUDENT',
  'TEACHER',
  'ADMIN',
  'STUDENTSPAIR',
])

export type User = typeof user.$inferSelect

export const pair = pgTable('Pair', {
  id: serial('id').primaryKey().notNull(),

  pairname: text('pairname'),

  password: text('password').notNull(),
  score: integer('score').default(0),
  createdAt: timestamp('createdAt', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
})

export const PairRelations = relations(pair, ({ one, many }) => ({
  //   role: one(role),
  user: many(user),
}))

export const user = pgTable(
  'User',
  {
    id: serial('id').primaryKey().notNull(),
    role: role('role').default('STUDENT').notNull(),
    firstName: text('firstName'),
    lastName: text('lastName'),
    email: text('email'),
    username: text('username').notNull(),
    password: text('password').notNull(),
    score: integer('score').default(0),

    pairId: integer('pairId')
      // .notNull()
      .references(() => pair.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),

    createdAt: timestamp('createdAt', {
      precision: 3,
      mode: 'string',
    }).defaultNow(),
    updatedAt: timestamp('updatedAt', {
      precision: 3,
      mode: 'string',
    }).defaultNow(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex('User_email_key').on(table.email),
      usernameKey: uniqueIndex('User_username_key').on(table.username),
    }
  }
)

export const userRelations = relations(user, ({ one }) => ({
  //   role: one(role),
  profile: one(profile, {
    fields: [user.id],
    references: [profile.userId],
  }),
}))

export const profile = pgTable(
  'Profile',
  {
    id: serial('id').primaryKey().notNull(),
    userId: integer('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    bio: text('bio'),
  },

  (table) => {
    return {
      userIdKey: uniqueIndex('Profile_userId_key').on(table.userId),
    }
  }
)

export const student = pgTable(
  'Student',
  {
    id: serial('id').primaryKey().notNull(),
    level: integer('level'),
    classCode: text('classCode'),
    studentNumber: integer('studentNumber'),
    massarNumber: text('massarNumber'),
    group: text('group'),

    profileId: integer('profileId')
      .notNull()
      .references(() => profile.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      massarNumberKey: uniqueIndex('Student_massarNumber_key').on(
        table.massarNumber
      ),
      profileIdKey: uniqueIndex('Student_profileId_key').on(table.profileId),
    }
  }
)

export const teacher = pgTable(
  'Teacher',
  {
    id: serial('id').primaryKey().notNull(),
    bio: text('bio'),
    profileId: integer('profileId')
      .notNull()
      .references(() => profile.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      profileIdKey: uniqueIndex('Teacher_profileId_key').on(table.profileId),
    }
  }
)

export const admin = pgTable(
  'Admin',
  {
    id: serial('id').primaryKey().notNull(),
    bio: text('bio'),
    profileId: integer('profileId')
      .notNull()
      .references(() => profile.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      profileIdKey: uniqueIndex('Admin_profileId_key').on(table.profileId),
    }
  }
)
