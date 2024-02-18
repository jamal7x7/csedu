"use server"
import {
	TStudentsGradesSchema,
	TStudentsGradesWithInfoSchema,
	studentsGradesWithInfoSchema,
} from "@/app/(dashboard)/teacherDashboard/myStudents/data/schema"
import { wait } from "@/app/utils/wait"
import { db } from "@/db"
import {
	grade,
	gradesToTests,
	schoolYear,
	SchoolYear,
	profile,
	sClass,
	student,
	test,
	user,
} from "@/db/schema/users"
// import { TExcelformSchema, excelformSchema } from '@/lib/types'
import { hash } from "bcrypt"
import { Placeholder, SQL, eq, not } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const addStudentsListfileAction = async (data: any[]) => {
	//   await wait(2000)
	// console.dir(data, { depth: null })
	// const usersWithGrades = await db.query.user.findMany({
	//   columns: {
	//     id: true,
	//     username: true,
	//     firstName: true,
	//   },
	//   with: {
	//     profile: {
	//       with: {
	//         student: {
	//           columns: {
	//             id: true,
	//             classCode: true,
	//           },
	//           with: {
	//             gradesToTests: {},
	//           },
	//         },
	//       },
	//     },
	//   },

	// with: {
	//   profile: {
	//     with: {
	//       student: {
	//         with: {
	//           grade: true,
	//         },
	//       },
	//     },
	//   },
	// },
	// })
	// // console.log(
	// // '🚀 ~ addStudentsListfileAction ~ usersWithGrades:..........',
	// // JSON.stringify(usersWithGrades, null, 2)
	// // )

	// const fileDataReorganized: TStudentsGradesWithInfoSchema[] = fileData?.map(
	//   (u) => {
	//     return {
	//       classCode: u[4].I as string,
	//       title: u[1].F as string,
	//       academyYear: u[6].D as string,
	//       establishmentCode: u[2].C as string,
	//       schoolName: u[3].O as string,
	//       academy: u[3].D as string,
	//       delegation: u[3].I as string,
	//       teacherName: u[4].O as string,
	//       subject: u[5].O as string,
	//       semestre: u[5].D as string,
	//       studentsGradesTableHeader: [
	//         u[8].B, //id
	//         u[8].C, //studentMassarNumber
	//         u[8].D, //studentName
	//         u[8].F, //birthDate
	//         u[8].G, //test1
	//         // u[8].H, //abs
	//         u[8].I, //test2
	//         // u[8].J, //abs
	//         u[8].K, //test3
	//         // u[8].L, //abs
	//         u[8].M, //IntegratedActivities
	//         // u[8].N, //abs
	//       ] as string[],
	//       studentsGradesTable: [
	//         ...u.slice(10).map((s: any) => ({
	//           id: s.B.toString() as string,
	//           studentMassarNumber: s.C,
	//           studentName: s.D as string,
	//           birthDate: s.F,
	//           test1: s.G ?? 0,
	//           test2: s.I ?? 0,
	//           test3: s.K ?? 0,
	//           integratedActivities: s.M ?? 0,
	//           studentClassNumber: Number(s.__rowNum__) - 16 ?? 0,
	//           // class: u[4].I,
	//         })),
	//       ] as TStudentsGradesSchema[],
	//     }
	//   }
	// )
	// // console.log(
	// // '🚀 ~ addStudentsListfileAction ~ fileDataReorganized:',
	// // fileDataReorganized
	// // )

	const valid = z.array(studentsGradesWithInfoSchema)

	const validatedFields = valid.safeParse(data)

	let zodErrors = {}
	if (!validatedFields.success) {
		validatedFields.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
			console.log(zodErrors)
		})

		// return values
		return { error: "error with fields" }
	}

	const seedingSchoolYear = await db
		.insert(schoolYear)
		.values({
			startDate: validatedFields.data[0].sYear?.substring(0, 4) as
				| string
				| SQL<unknown>
				| Placeholder<string, any>,
			endDate: validatedFields.data[0].sYear?.substring(5) as
				| string
				| SQL<unknown>
				| Placeholder<string, any>,
			name: validatedFields.data[0].sYear,
			// name:
			//   sYear ??
			//   ('2023/2024' as string | SQL<unknown> | Placeholder<string, any>),
		})
		.returning()
		.catch((err: any) => {
			zodErrors = { ...zodErrors, err: err }
		})

	const exitingSchoolYear = await db.query.schoolYear.findMany({
		// where: (schoolYear, { eq }) =>
		//   eq(schoolYear.name, validatedFields.data[0].sYear),
	})
	const newSchoolYear: SchoolYear[] = exitingSchoolYear

	if (
		exitingSchoolYear[exitingSchoolYear?.length - 1]?.name !==
		validatedFields.data[0].sYear
	) {
		const newYear = await db
			.insert(schoolYear)
			.values({
				startDate: validatedFields.data[0].sYear?.substring(0, 4) as
					| string
					| SQL<unknown>
					| Placeholder<string, any>,
				endDate: validatedFields.data[0].sYear?.substring(5) as
					| string
					| SQL<unknown>
					| Placeholder<string, any>,
				name: validatedFields.data[0].sYear,
				// name:
				//   sYear ??
				//   ('2023/2024' as string | SQL<unknown> | Placeholder<string, any>),
			})
			.returning()
			.catch((err: Error) => {
				zodErrors = { ...zodErrors, err: err }
			})
		newYear ?? newSchoolYear.push(newYear)
	}

	// }
	//======================================================================//

	if (validatedFields.data.length > 0) {
		validatedFields.data.map(async (v) => {
			const {
				title,
				classCode,
				sYear,
				establishmentCode,
				schoolName,
				academy,
				delegation,
				teacherName,
				subject,
				semester,
				studentsGradesTable,
			} = v
			// console.log('🚀 ~ validatedFields.data.map ~ v:', v)

			const studentsList: TStudentsGradesSchema[] | undefined =
				studentsGradesTable

			const newSClass = await db
				.insert(sClass)
				.values({
					schoolYearId: newSchoolYear?.[newSchoolYear?.length - 1]?.id as
						| number
						| SQL<unknown>
						| Placeholder<string, any>,
					classCode: classCode,
				})
				.returning()

				.catch((err: any) => {
					zodErrors = { ...zodErrors, err: err }
				})

			studentsList?.map(async (s: TStudentsGradesSchema) => {
				const hashedPassword = await hash(
					// s.birthDate.replaceAll('/', '').substring(0, 8),
					"0000",
					10,
				)

				const newuser = await db
					.insert(user)
					.values({
						role: "STUDENT",
						firstName: s.studentName,
						username: s.studentMassarNumber,
						password: hashedPassword,
					})
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})
				const newProfile = await db
					.insert(profile)
					.values({
						userId: newuser?.[0]?.id as
							| number
							| SQL<unknown>
							| Placeholder<string, any>,
						birthDate: s.birthDate,
					})
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})
				console.log("=================new Class=================", newSClass)
				const newStudent = await db
					.insert(student)
					.values({
						profileId: newProfile?.[0]?.id as
							| number
							| SQL<unknown>
							| Placeholder<string, any>,
						sClassId: newSClass?.[0]?.id as
							| number
							| SQL<unknown>
							| Placeholder<string, any>,
						massarNumber: s.studentMassarNumber,
						classCode,
						level: Number(classCode?.at(0)),
						studentClassNumber: Number(s.studentClassNumber) as
							| number
							| SQL<unknown>
							| Placeholder<string, any>
							| null
							| undefined,
					})
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})

				console.log("=================new Student=================", newStudent)

				const newGrade = await db
					.insert(grade)
					.values({
						studentId: newStudent?.[0]?.id as
							| number
							| SQL<unknown>
							| Placeholder<string, any>,
					})
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})

				const newTest1 = await db
					.insert(test)
					.values({
						testName: "test1",
						grade: s.test1,
						type: "TEST",
						coefficient: 1,
					})
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})
				const newTest2 = await db
					.insert(test)
					.values({
						testName: "test2",
						grade: s.test2,
						type: "TEST",
						coefficient: 1,
					})
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})
				const newTest3 = await db
					.insert(test)
					.values({
						testName: "test3",
						grade: s.test3,
						type: "TEST",
						coefficient: 1,
					})
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})
				const integratedActivities = await db
					.insert(test)
					.values({
						testName: "integratedActivities",
						grade: s.integratedActivities,
						type: "TEST",
						coefficient: 1,
					})
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})

				const newGradeToTest = await db
					.insert(gradesToTests)
					.values([
						{
							gradeId: newGrade?.[0]?.id as
								| number
								| SQL<unknown>
								| Placeholder<string, any>,
							testId: newTest1?.[0]?.id as
								| number
								| SQL<unknown>
								| Placeholder<string, any>,
						},
						{
							gradeId: newGrade?.[0]?.id as
								| number
								| SQL<unknown>
								| Placeholder<string, any>,
							testId: newTest2?.[0]?.id as
								| number
								| SQL<unknown>
								| Placeholder<string, any>,
						},
						{
							gradeId: newGrade?.[0]?.id as
								| number
								| SQL<unknown>
								| Placeholder<string, any>,
							testId: newTest3?.[0]?.id as
								| number
								| SQL<unknown>
								| Placeholder<string, any>,
						},
						{
							gradeId: newGrade?.[0]?.id as
								| number
								| SQL<unknown>
								| Placeholder<string, any>,
							testId: integratedActivities?.[0]?.id as
								| number
								| SQL<unknown>
								| Placeholder<string, any>,
						},
					])
					.returning()
					.catch((err: any) => {
						zodErrors = { ...zodErrors, err: err }
					})
			})
		})

		revalidatePath("/")
		//======================================================================//
		// return validatedFields?.data
		return { success: "sent!" }
	}
}

export const deleteStudentsListfileAction = async () => {
	await db.delete(gradesToTests)
	await db.delete(test)
	await db.delete(grade)
	await db.delete(student)
	await db.delete(profile)
	await db.delete(user).where(not(eq(user.role, "ADMIN")))
	await db.delete(sClass)
	await db.delete(schoolYear)
	revalidatePath("/")
}
