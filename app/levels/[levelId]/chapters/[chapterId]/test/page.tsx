import React from 'react'
import Quiz from '@/app/quiz/page'
import db from '@/lib/db'

export default async function Page({ params }: any) {
  // const allQuizes = await db.quiz?.findMany({
  //   where: {
  //     // level: Number(params.levelId),
  //     level: 1,
  //   },
  // })
  // const allOptions = await db.option?.findMany({
  //   where: {
  //     // level: Number(params.levelId),
  //     quizId: allQuizes[0].id,
  //   },
  // })
  // const correctOptions = await db.option?.findMany({
  //   where: {
  //     // level: Number(params.levelId),
  //     correct: true,
  //   },
  // })

  return (
    <>
      {/* {allQuizes?.map((q) => (
        <Quiz
          question={q.question}
          option1={allOptions[0].content}
          option2={allOptions[1].content}
          option3={allOptions[2].content}
          correctOption={correctOptions[0].id}
        />
      ))} */}
    </>
  )
}
