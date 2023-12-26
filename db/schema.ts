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
import { sql } from 'drizzle-orm'

export const role = pgEnum('Role', ['STUDENT', 'TEACHER', 'ADMIN'])
export const quizType = pgEnum('QuizType', ['MULTI', 'YESNO', 'TEXT'])
export const blockType = pgEnum('BlockType', [
  'CHAPTER_TITLE',
  'INTRO',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'FIGURE',
  'DEF',
  'EXEMPLE',
  'P',
  'LIST',
])

export const chapter = pgTable('Chapter', {
  id: serial('id').primaryKey().notNull(),
  level: integer('level'),
  unitId: integer('unitId')
    .default(1)
    .notNull()
    .references(() => unit.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  title: text('title').default('Title of Chapter').notNull(),
  subtitle: text('subtitle').default('Subtitle'),
  description: text('description').default('Description'),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  number: serial('number'),
  published: boolean('published').default(false).notNull(),
  testId: integer('testId'),
  order: serial('order').notNull(),
})

export const unit = pgTable('Unit', {
  id: serial('id').primaryKey().notNull(),
  level: integer('level'),
  code: text('code'),
  name: text('name').default('Title').notNull(),
  subtitle: text('subtitle').default('Subtitle'),
  description: text('description').default('Description'),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  order: serial('order').notNull(),
})

export const prismaMigrations = pgTable('_prisma_migrations', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  checksum: varchar('checksum', { length: 64 }).notNull(),
  finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
  migrationName: varchar('migration_name', { length: 255 }).notNull(),
  logs: text('logs'),
  rolledBackAt: timestamp('rolled_back_at', {
    withTimezone: true,
    mode: 'string',
  }),
  startedAt: timestamp('started_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer('applied_steps_count').default(0).notNull(),
})

export const option = pgTable('Option', {
  id: serial('id').primaryKey().notNull(),
  content: text('content').default('True').notNull(),
  description: text('description').default('Option description'),
  correct: boolean('correct').default(false),
  quizId: integer('quizId')
    .notNull()
    .references(() => quiz.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  order: serial('order').notNull(),
})

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
    score: integer('score'),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', {
      precision: 3,
      mode: 'string',
    }).notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex('User_email_key').on(table.email),
      usernameKey: uniqueIndex('User_username_key').on(table.username),
    }
  }
)

export const profile = pgTable(
  'Profile',
  {
    id: serial('id').primaryKey().notNull(),
    userId: integer('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
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

export const block = pgTable('Block', {
  id: serial('id').primaryKey().notNull(),
  order: serial('order').notNull(),
  sectionId: integer('sectionId')
    .notNull()
    .references(() => section.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  type: blockType('type').default('P'),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
})

export const assessment = pgTable('Assessment', {
  id: serial('id').primaryKey().notNull(),
  sectionId: integer('sectionId')
    .notNull()
    .references(() => section.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  type: quizType('type').default('TEXT'),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  content: text('content').notNull(),
  order: serial('order').notNull(),
})

export const objective = pgTable('Objective', {
  id: serial('id').primaryKey().notNull(),
  sectionId: integer('sectionId')
    .notNull()
    .references(() => section.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  description: text('description').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  order: serial('order').notNull(),
})

export const quiz = pgTable('Quiz', {
  id: serial('id').primaryKey().notNull(),
  level: integer('level'),
  chapterId: integer('chapterId'),
  type: quizType('type').default('MULTI'),
  question: text('question').default('Title').notNull(),
  subtitle: text('subtitle').default('Subtitle'),
  description: text('description').default('Description'),
  hint: text('hint').default('Hint!'),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  number: integer('number').default(1).notNull(),
  points: integer('points').default(1).notNull(),
  order: serial('order').notNull(),
})

export const section = pgTable('Section', {
  id: serial('id').primaryKey().notNull(),
  chapterId: integer('chapterId')
    .notNull()
    .references(() => chapter.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  order: serial('order').notNull(),
})
