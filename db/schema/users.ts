import {
	boolean,
	date,
	foreignKey,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
	// pgTableCreator,
} from "drizzle-orm/pg-core"

import { relations, sql } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// const pgTable = pgTableCreator((name) => `people_${name}`)

export const role = pgEnum("Role", [
	"STUDENT",
	"TEACHER",
	"ADMIN",
	"STUDENTS_PAIR",
])

export type User = typeof user.$inferSelect
export type Profile = typeof profile.$inferSelect
export type Student = typeof student.$inferSelect
export type SchoolYear = typeof schoolYear.$inferSelect

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
	"User",
	{
		id: serial("id").primaryKey().notNull(),
		role: role("role").default("STUDENT").notNull(),
		firstName: text("firstName"),
		lastName: text("lastName"),
		email: text("email"),
		username: text("username").notNull(),
		password: text("password").notNull(),
		score: integer("score").default(0),
		createdAt: timestamp("createdAt", {
			precision: 3,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updatedAt", {
			precision: 3,
			mode: "string",
		}).defaultNow(),
	},
	(table) => {
		return {
			emailKey: uniqueIndex("User_email_key").on(table.email),
			usernameKey: uniqueIndex("User_username_key").on(table.username),
		}
	},
)

export const userRelations = relations(user, ({ one }) => ({
	profile: one(profile, {
		fields: [user.id],
		references: [profile.userId],
	}),
}))

export const profile = pgTable(
	"Profile",
	{
		id: serial("id").primaryKey().notNull(),
		userId: integer("userId")
			.notNull()
			.references(() => user.id, {
				// onDelete: 'restrict',
				onUpdate: "cascade",
			}),
		bio: text("bio"),
		birthDate: text("birthDate").default("dd-mm-yyyy").notNull(),
	},

	(table) => {
		return {
			userIdKey: uniqueIndex("Profile_userId_key").on(table.userId),
		}
	},
)

export const profileRelations = relations(profile, ({ one }) => ({
	//   role: one(role),
	user: one(user, { fields: [profile.userId], references: [user.id] }),
	student: one(student, {
		fields: [profile.id],
		references: [student.profileId],
	}),
}))

export const school = pgTable("School", {
	id: serial("id").primaryKey().notNull(),
	establishmentCode: text("establishmentCode"),
	schoolName: text("schoolName"),
	academy: text("academy"),
	delegation: text("delegation"),
	teachers: text("teachers"),
	subjects: text("subjects"),
	semester: text("semester"),
})

export const schoolYear = pgTable("SchoolYear", {
	id: serial("id").primaryKey().notNull(),
	startDate: text("startDate"),
	endDate: text("endDate"),
	name: text("name"),
})

export const schoolYearsRelations = relations(schoolYear, ({ many }) => ({
	terms: many(term),
}))

export const term = pgTable("Term", {
	id: serial("id").primaryKey().notNull(),
	schoolYearId: integer("schoolYearId")
		.notNull()
		.references(() => schoolYear.id, {
			// onDelete: 'restrict',
			onUpdate: "cascade",
		}),
	startDate: text("startDate"),
	endDate: text("endDate"),
	termNumber: text("termNumber"),
})

export const termsRelations = relations(term, ({ one }) => ({
	schoolYear: one(schoolYear, {
		fields: [term.schoolYearId],
		references: [schoolYear.id],
	}),
}))

export const sClass = pgTable("SClass", {
	id: serial("id").primaryKey().notNull(),
	level: integer("level"),
	classCode: text("classCode"),
	schoolYearId: integer("schoolYearId")
		.notNull()
		.references(() => schoolYear.id, {
			// onDelete: 'restrict',
			onUpdate: "cascade",
		}),
})

export const sClassesRelations = relations(sClass, ({ one, many }) => ({
	students: many(student),
	schoolYear: one(schoolYear, {
		fields: [sClass.schoolYearId],
		references: [schoolYear.id],
	}),
}))

export const subject = pgTable("Subject", {
	id: serial("id").primaryKey().notNull(),
	name: integer("level"),
})

export const subjectsRelations = relations(subject, ({ many }) => ({
	teachers: many(teacher),
}))

export const student = pgTable(
	"Student",
	{
		id: serial("id").primaryKey().notNull(),
		level: integer("level"),
		classCode: text("classCode"),
		studentClassNumber: integer("studentClassNumber"),
		massarNumber: text("massarNumber"),
		group: text("group"),

		profileId: integer("profileId")
			.notNull()
			.references(() => profile.id, {
				// onDelete: 'restrict',
				onUpdate: "cascade",
			}),
		sClassId: integer("sClassId")
			// .notNull()
			.references(() => sClass.id, {
				// onDelete: 'restrict',
				onUpdate: "cascade",
			}),
	},
	(table) => {
		return {
			massarNumberKey: uniqueIndex("Student_massarNumber_key").on(
				table.massarNumber,
			),
			profileIdKey: uniqueIndex("Student_profileId_key").on(table.profileId),
			// sClassIdKey: uniqueIndex("Student_sClassId_key").on(table.sClassId),
		}
	},
)

export const studentRelations = relations(student, ({ one }) => ({
	grade: one(grade, {
		fields: [student.id],
		references: [grade.studentId],
	}),
	studentClass: one(sClass, {
		fields: [student.sClassId],
		references: [sClass.id],
	}),
}))

export const grade = pgTable(
	"Grade",
	{
		id: serial("id").primaryKey(),

		studentId: integer("studentId")
			// .notNull()
			.references(() => student.id, {
				// onDelete: 'restrict',
				onUpdate: "cascade",
			}),
	},
	(table) => {
		return {
			studentIdKey: uniqueIndex("Grade_studentId_key").on(table.studentId),
			// grades_testsIdKey: uniqueIndex('Grade_grades_tests_key').on(
			//   table.grades_testsId
			// ),
		}
	},
)

export const gradeRelations = relations(grade, ({ one, many }) => ({
	student: one(student, {
		fields: [grade.studentId],
		references: [student.id],
	}),
	tests: many(gradesToTests),
}))

export const gradesToTests = pgTable(
	"GradesToTests",
	{
		// id: serial('id').primaryKey().notNull(),

		gradeId: integer("gradeId")
			.notNull()
			.references(() => grade.id, {
				// onDelete: 'restrict',
				onUpdate: "cascade",
			}),
		testId: integer("testId")
			.notNull()
			.references(() => test.id, {
				// onDelete: 'restrict',
				onUpdate: "cascade",
			}),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.gradeId, table.testId] }),
			// gradeIdKey: uniqueIndex('Grade_grades_tests_key').on(table.gradeId),
			// testIdKey: uniqueIndex('Test_grades_tests_key').on(table.testId),
		}
	},
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

export const test = pgTable("Test", {
	id: serial("id").primaryKey(),

	testName: text("testName"),
	grade: integer("grade"),
	type: text("type"),
	coefficient: integer("coefficient"),
})

export const testRelations = relations(test, ({ many }) => ({
	grades: many(gradesToTests),
}))

export const teacher = pgTable(
	"Teacher",
	{
		id: serial("id").primaryKey().notNull(),
		bio: text("bio"),
		profileId: integer("profileId")
			.notNull()
			.references(() => profile.id, {
				onDelete: "restrict",
				onUpdate: "cascade",
			}),
		subjectId: integer("subjectId")
			// .notNull()
			.references(() => subject.id, {
				// onDelete: 'restrict',
				onUpdate: "cascade",
			}),
	},
	(table) => {
		return {
			profileIdKey: uniqueIndex("Teacher_profileId_key").on(table.profileId),
		}
	},
)

export const teachersRelations = relations(teacher, ({ one }) => ({
	subjects: one(subject, {
		fields: [teacher.subjectId],
		references: [subject.id],
	}),
}))
export const admin = pgTable(
	"Admin",
	{
		id: serial("id").primaryKey().notNull(),
		bio: text("bio"),
		profileId: integer("profileId")
			.notNull()
			.references(() => profile.id, {
				onDelete: "restrict",
				onUpdate: "cascade",
			}),
	},
	(table) => {
		return {
			profileIdKey: uniqueIndex("Admin_profileId_key").on(table.profileId),
		}
	},
)

export const insertUserSchema = createInsertSchema(user)
