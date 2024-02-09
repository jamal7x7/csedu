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
  primaryKey,
} from 'drizzle-orm/pg-core'

import { relations, sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const role = pgEnum('Role', [
  'STUDENT',
  'TEACHER',
  'ADMIN',
  'STUDENTS_PAIR',
])

export type User = typeof user.$inferSelect
export type Profile = typeof profile.$inferSelect
export type Student = typeof student.$inferSelect
// export type Pair = typeof pair.$inferSelect

// export const pair = pgTable(
//   'Pair',
//   {
//     id: serial('id').primaryKey().notNull(),
//     pairname: text('pairname'),
//     pairpass: text('pairpass').notNull().default('0000'),

//     score: integer('score').default(0),
//     createdAt: timestamp('createdAt', {
//       precision: 3,
//       mode: 'string',
//     }).defaultNow(),
//     updatedAt: timestamp('updatedAt', {
//       precision: 3,
//       mode: 'string',
//     }).defaultNow(),
//   },
//   (table) => {
//     return {
//       pairnameKey: uniqueIndex('Pair_pairname_key').on(table.pairname),
//     }
//   }
// )

// export const PairRelations = relations(pair, ({ one, many }) => ({
//   user: many(user),
// }))

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

    // pairId: integer('pairId')
    // .notNull()
    // .default(0)
    // .references(() => pair.id, {
    //   onDelete: 'restrict',
    //   onUpdate: 'cascade',
    // }),

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
  // pair: one(pair, { fields: [user.pairId], references: [pair.id] }),
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
      .references(() => user.id, {
        // onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    bio: text('bio'),
    birthDate: text('birthDate').default('dd-mm-yyyy').notNull(),
  },

  (table) => {
    return {
      userIdKey: uniqueIndex('Profile_userId_key').on(table.userId),
    }
  }
)

export const profileRelations = relations(profile, ({ one }) => ({
  //   role: one(role),
  user: one(user, { fields: [profile.userId], references: [user.id] }),
  student: one(student, {
    fields: [profile.id],
    references: [student.profileId],
  }),
}))

export const student = pgTable(
  'Student',
  {
    id: serial('id').primaryKey().notNull(),
    level: integer('level'),
    classCode: text('classCode'),
    studentClassNumber: integer('studentClassNumber'),
    massarNumber: text('massarNumber'),
    group: text('group'),

    profileId: integer('profileId')
      .notNull()
      .references(() => profile.id, {
        // onDelete: 'restrict',
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

export const studentRelations = relations(student, ({ one }) => ({
  grade: one(grade, {
    fields: [student.id],
    references: [grade.studentId],
  }),
}))

export const grade = pgTable(
  'Grade',
  {
    id: serial('id').primaryKey(),

    studentId: integer('studentId')
      // .notNull()
      .references(() => student.id, {
        // onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      studentIdKey: uniqueIndex('Grade_studentId_key').on(table.studentId),
      // grades_testsIdKey: uniqueIndex('Grade_grades_tests_key').on(
      //   table.grades_testsId
      // ),
    }
  }
)

export const gradeRelations = relations(grade, ({ one, many }) => ({
  student: one(student, {
    fields: [grade.studentId],
    references: [student.id],
  }),
  tests: many(gradesToTests),
}))

export const gradesToTests = pgTable(
  'GradesToTests',
  {
    // id: serial('id').primaryKey().notNull(),

    gradeId: integer('gradeId')
      .notNull()
      .references(() => grade.id, {
        // onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    testId: integer('testId')
      .notNull()
      .references(() => test.id, {
        // onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.gradeId, table.testId] }),
      // gradeIdKey: uniqueIndex('Grade_grades_tests_key').on(table.gradeId),
      // testIdKey: uniqueIndex('Test_grades_tests_key').on(table.testId),
    }
  }
)

export const gradesToTestsRelations = relations(gradesToTests, ({ one }) => ({
  grade: one(grade, {
    fields: [gradesToTests.gradeId],
    references: [grade.id],
  }),
  test: one(test, {
    fields: [gradesToTests.testId],
    references: [test.id],
  }),
}))

export const test = pgTable('Test', {
  id: serial('id').primaryKey(),

  testName: text('testName'),
  grade: integer('grade'),
  type: text('type'),
  coefficient: integer('coefficient'),
})

export const testRelations = relations(test, ({ many }) => ({
  grades: many(gradesToTests),
}))

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

export const insertUserSchema = createInsertSchema(user)
