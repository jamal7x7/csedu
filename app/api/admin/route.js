// pages/api/register.js

import { PrismaClient, Admin } from '@prisma/client'

const prisma = new PrismaClient()

export default async function POST(req, res) {
  // if (req.method !== 'POST') {
  //   res.setHeader('Allow', ['POST'])
  //   return res.status(405).end('Method Not Allowed')
  // }

  let data = await req.json()

  const {
    level,
    classCode,
    studentNumber,
    firstName,
    lastName,
    email,
    username,
    massarNumber,
    password,
    group,
  } = data

  try {
    const existingAdmin = await prisma.student.findUnique({
      where: {
        OR: [{ email }, { username }, { massarNumber }],
      },
    })

    if (existingAdmin) {
      return res.json({ message: 'Admin already exists' })
    }

    const newAdmin = await prisma.admin.create({
      data: {
        level,
        classCode,
        studentNumber,
        firstName,
        lastName,
        email,
        username,
        massarNumber,
        password,
        group,
      },
    })

    return res.json({
      message: 'Admin registered successfully',
      admin: newAdmin,
    })
  } catch (error) {
    console.error(error)
    return res.json({ message: 'Internal Server Error' })
  } finally {
    await prisma.$disconnect()
  }
}
