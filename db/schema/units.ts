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
  // pgTableCreator,
} from 'drizzle-orm/pg-core'

import { relations, sql } from 'drizzle-orm'

// const pgTable = pgTableCreator((name) => `things_${name}`)

export const quizType = pgEnum('QuizType', ['MULTI', 'YESNO', 'TEXT'])
export const blockType = pgEnum('BlockType', [
  // 'CHAPTER_TITLE',
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
  // 'LIST',
])

export type Chapter = typeof chapter.$inferSelect

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
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  order: serial('order').notNull(),
})

export const chapter = pgTable('Chapter', {
  id: serial('id').primaryKey().notNull(),
  level: integer('level').notNull(),
  order: integer('order'),

  unitId: integer('unitId')
    // .default(1)
    .notNull()
    .references(() => unit.id, {
      // onDelete: 'restrict',
      onUpdate: 'cascade',
    }),

  title: text('title').default('Title of Chapter').notNull(),
  subtitle: text('subtitle').default('Subtitle'),
  description: text('description').default('Description'),

  published: boolean('published').default(false),
  testId: integer('testId'),

  createdAt: timestamp('createdAt', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
})

export const section = pgTable('Section', {
  id: serial('id').primaryKey().notNull(),
  order: integer('order').default(0),
  content: text('content'),

  chapterId: integer('chapterId')
    .notNull()
    .references(() => chapter.id, {
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
})

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
  createdAt: timestamp('createdAt', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
})

// export const prismaMigrations = pgTable('_prisma_migrations', {
//   id: varchar('id', { length: 36 }).primaryKey().notNull(),
//   checksum: varchar('checksum', { length: 64 }).notNull(),
//   finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
//   migrationName: varchar('migration_name', { length: 255 }).notNull(),
//   logs: text('logs'),
//   rolledBackAt: timestamp('rolled_back_at', {
//     withTimezone: true,
//     mode: 'string',
//   }),
//   startedAt: timestamp('started_at', { withTimezone: true, mode: 'string' })
//     .defaultNow()
//     .notNull(),
//   appliedStepsCount: integer('applied_steps_count').default(0).notNull(),
// })

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

export const assessment = pgTable('Assessment', {
  id: serial('id').primaryKey().notNull(),
  sectionId: integer('sectionId')
    // .notNull()
    .references(() => section.id, {
      // onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  type: quizType('type').default('TEXT'),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  content: text('content'),
  order: serial('order'),
})

export const objective = pgTable('Objective', {
  id: serial('id').primaryKey().notNull(),
  sectionId: integer('sectionId')
    .notNull()
    .references(() => section.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
  description: text('description'),
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

export const chapterRelations = relations(chapter, ({ one, many }) => ({
  unit: one(unit, { fields: [chapter.unitId], references: [unit.id] }),
  sections: many(section),
}))

export const unitRelations = relations(unit, ({ one, many }) => ({
  resources: many(chapter),
}))

export const sectionRelations = relations(section, ({ one, many }) => ({
  chapter: one(chapter, {
    fields: [section.chapterId],
    references: [chapter.id],
  }),
  objectives: many(objective),
  blocks: many(block),
  assessments: many(assessment),
}))

export const objectiveRelations = relations(objective, ({ one, many }) => ({
  section: one(section, {
    fields: [objective.sectionId],
    references: [section.id],
  }),
}))

export const assessmentRelations = relations(assessment, ({ one, many }) => ({
  section: one(section, {
    fields: [assessment.sectionId],
    references: [section.id],
  }),
}))

export const blockRelations = relations(block, ({ one, many }) => ({
  section: one(section, {
    fields: [block.sectionId],
    references: [section.id],
  }),
  //   type: one(type),
}))
