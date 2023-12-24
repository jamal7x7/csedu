// 'use client'

// import React from 'react'
// import { addTitleAction } from '@/actions/actions'
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'

// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'

// import AddChapterButton from '@/components/addChapterButton'

// const AddChapterForm = ({ levelId, form }: { levelId: string; form: any }) => {
//   const addTitleActionWithLevelId = addTitleAction.bind(null, levelId, form)

//   return (
//     <Form {...form}>
//       <form
//         action={addTitleActionWithLevelId}
//         // onSubmit={form.handleSubmit(onSubmit)}
//         className='space-y-8'
//       >
//         <FormField
//           control={form.control}
//           name='title'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Titre de l'unite</FormLabel>
//               <FormControl>
//                 <Input placeholder="Titre de l'unite" {...field} />
//               </FormControl>
//               {/* <FormDescription>unitTitle</FormDescription> */}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <AddChapterButton />
//       </form>
//     </Form>
//   )
// }

// export default AddChapterForm
