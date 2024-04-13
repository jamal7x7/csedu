"use server"

import { getTemporalClassEvent } from "@/app/utils/getClassEvent"
import { wait } from "@/app/utils/wait"
import { db } from "@/db"
import { Profile, Student, profile, student, user } from "@/db/schema/users"
import {
	TPairSignUpSchema,
	TSignUpSchema,
	pairSignUpSchema,
	signUpSchema,
} from "@/lib/types"
import { Temporal } from "@js-temporal/polyfill"
import { hash } from "bcrypt"
import { Placeholder, SQL, asc, desc, eq } from "drizzle-orm"

export const signUpAction = async (values: TSignUpSchema) => {
	//   await wait(2000)
	console.log("From login action file ==========>", values)

	const validatedFields = signUpSchema.safeParse(values)

	let zodErrors = {}
	if (!validatedFields.success) {
		validatedFields.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
			//   console.log(zodErrors)
		})

		// return values
		return { error: "error with fields" }
	}
	return { success: "sent!" }
}

export const pairSignUpAction = async (values: TPairSignUpSchema) => {
	// console.log('🚀 ~ pairSignUpAction ~ values:', values)

	const validatedFields = pairSignUpSchema.safeParse(values)
	// // console.log('🚀 ~ pairSignUpAction ~ validatedFields:', validatedFields)

	let zodErrors = {}
	if (!validatedFields.success) {
		validatedFields.error.issues.forEach((issue) => {
			zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
			//   console.log(zodErrors)
		})

		// return values
		return { error: "error with fields" }
	}

	const validPair1 = validatedFields.data?.pair1 as string
	// console.log('🚀 ~ pairSignUpAction ~ validPair1:', validPair1)
	const validPair2 = validatedFields.data?.pair2 as string
	// console.log('🚀 ~ pairSignUpAction ~ validPair2:', validPair2)
	const validPairpass = validatedFields.data?.pairpass as string

	// // console.log('🚀 ~ pairSignUpAction ~ pairName:', pairName)

	const user1 = await db.query.user.findFirst({
		where: eq(user.id, Number(validPair1)),
	})
	// console.log('🚀 ~ pairSignUpAction ~ student1:', user1)
	// let profile1: any = {}
	// if (student1) {
	//   profile1 = await db.query.profile.findFirst({
	//     where: (profile, { eq }) => eq(profile.id, student1?.profileId),
	//   })
	// }
	// let user1: any = {}
	// if (profile1) {
	//   user1 = await db.query.user.findFirst({
	//     where: (user, { eq }) => eq(user.id, profile1?.profileId),
	//   })
	// }

	const user2 = await db.query.user.findFirst({
		where: eq(user.id, Number(validPair2)),
	})
	// console.log('🚀 ~ pairSignUpAction ~ student2:', user2)
	// let profile2: any = {}
	// if (student2) {
	//   profile2 = await db.query.profile.findFirst({
	//     where: (profile, { eq }) => eq(profile.id, student2?.profileId),
	//   })
	// }
	// let user2: any = {}
	// if (profile2) {
	//   user2 = await db.query.user.findFirst({
	//     where: (user, { eq }) => eq(user.id, profile2?.profileId),
	//   })
	// }

	const pairName = [user1?.id, user2?.id].toSorted().join("_&_")
	// console.log('🚀 ~ pairSignUpAction ~ pairName:', pairName)

	const existing = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.username, pairName),
	})
	const existingPair = await db.query.user.findMany({
		where: (user, { eq }) => eq(user.role, "STUDENTS_PAIR"),
	})

	const up = existingPair
		.map((pair) => {
			return pair.username.split("_&_")
		})
		.flat()
	// console.log('🚀 ~ up ~ up:', up)

	if (user1?.id && up.includes(user1.id.toString())) {
		return { error: user1?.firstName + ": est deja inscrit!" }
	}
	if (user2?.id && up.includes(user2.id.toString())) {
		return { error: user1?.firstName + ": est deja inscrit!" }
	}

	if (existing) return { error: "already exists" }
	const hashedPassword = await hash(validPairpass, 10)

	const newuser = await db
		.insert(user)
		.values({
			role: "STUDENTS_PAIR",
			username: pairName,
			password: hashedPassword,
		})
		.returning()
		.catch((err: any) => {
			// console.log('err: ', JSON.stringify(err, null, 2))
			zodErrors = { ...zodErrors, err: err }
		})
	// console.log('🚀 ~ pairSignUpAction ~ newuser:', newuser)

	return { success: "sent!" }
}

export const getUsersAction = async (classCode: string | undefined) => {
	if (classCode === undefined) return []
	const allClassStudent = await db.query.student.findMany({
		where: eq(student.classCode, classCode),
	})

	const allUsers = await db.query.user.findMany({
		where: (user, { eq }) => eq(user.role, "STUDENT"),

		with: {
			profile: {
				with: {
					student: true,
				},
			},
		},
	})

	// const c = getTemporalClassEvent(Temporal.Now.plainDateTimeISO())
	// const c = classCode

	const usersSorted = allUsers
		.filter((s) => s.profile.student.classCode === classCode)
		.sort((a, b) => {
			if (a.profile.student.studentClassNumber === null) {
				return 0
			}
			if (b.profile.student.studentClassNumber === null) {
				return 0
			}

			return (
				a.profile.student.studentClassNumber -
				b.profile.student.studentClassNumber
			)
		})

	// console.dir(usersSorted, { depth: null })
	// // console.log('🚀 ~ getStudentsAction ~ allClassStudent:', allClassStudent)
	// return allClassStudent

	return usersSorted
}
