import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { addStudentsListfileAction } from '@/actions/fileActions'

import { useState } from 'react'
import { FileText, Frown, UploadCloud, XCircle } from 'lucide-react'
import * as XLSX from 'xlsx'

import { excelformSchema, TExcelformSchema } from '@/lib/types'

const AddFiles = () => {
  const [fileNames, setFileNames] = useState<string[]>([])

  const [fileData, setFileData] = useState<any[]>([])

  const form = useForm<TExcelformSchema>({
    resolver: zodResolver(excelformSchema),
    defaultValues: {
      files: [] as Blob[],
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hello!', JSON.stringify(form, null, 2))
    if (event.target.files) {
      const names = Array.from(event.target.files).map((file) => file.name)
      setFileNames(names)
      const reader = new FileReader()
      reader.onload = (event) => {
        const data = event.target?.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(worksheet)
        setFileData(parsedData)
        console.log(parsedData)
      }
      reader.readAsArrayBuffer(event.target.files[0])
    }
  }

  const handleRemoveFile = (index: number) => {
    const updatedFileNames = fileNames.filter((_, i) => i !== index)
    setFileNames(updatedFileNames)
  }

  const onSubmit = () => {
    //TODO:
    console.log(fileData)
  }

  //   console.log(fileNames)
  const readUploadFileActionHandler: () => void = form.handleSubmit(
    async (values) => {
      const d = await addStudentsListfileAction(values)
      console.log('form!', JSON.stringify(form, null, 2))
      console.log('data!', JSON.stringify(d, null, 2))

      //   form.reset()
    }
  )

  return (
    <>
      <div className='px-4 mb-8 bg-neutral-800/10 mx-2 py-2'>
        {fileNames.length > 0 ? (
          fileNames.map((name, index) => (
            <li key={index} className='list-none flex items-center gap-2'>
              <FileText size={20} />
              <p className='text-sm'>{name}</p>
              <button
                type='button'
                className='text-red-500 ml-auto'
                onClick={() => handleRemoveFile(index)}
              >
                <XCircle size={20} />
              </button>
            </li>
          ))
        ) : (
          <div className='text-center text-neutral-300 flex items-center justify-center gap-x-2'>
            <Frown size={20} />
            <p className=' text-sm'>No FIle Uploaded</p>
          </div>
        )}
      </div>
      <div className='mx-2 bg-neutral-900/10 px-4 py-6 rounded-md'>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            // onSubmit={readUploadFileActionHandler}
            action={readUploadFileActionHandler}
            className='flex flex-col items-center gap-y-6'
          >
            <div className='flex items-center gap-x-2'>
              <UploadCloud />
              <p className='text-xs text-neutral-100'>Upload Files</p>
            </div>
            <FormField
              name='files'
              render={({ field }) => {
                return (
                  <FormItem className='flex flex-col items-center justify-center space-y-4 col-span-2'>
                    <FormControl>
                      <Input
                        className='bg-neutral-900/20 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed file:bg-transparent file:text-neutral-200 file:border-none file:outline-none file:text-xs placeholder:text-neutral-400 focus:outline-none hover:cursor-pointer text-xs font-light'
                        type='file'
                        accept='.xlsx, .xls'
                        // accept='application/msword,text/plain,application/pdf'
                        multiple
                        // name='files'
                        {...field}
                        // value={field.value ?? new Blob()}
                        onChange={(event) => {
                          handleFileChange(event)
                          field.onChange(event)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button size='sm' className='px-8 py-1 bg-[#1d78f2] text-white'>
              Add
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default AddFiles
