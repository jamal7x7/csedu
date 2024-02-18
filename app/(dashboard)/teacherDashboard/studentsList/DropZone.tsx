import { Muted, Small } from '@/components/Typography/Typography'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Frown, Target, UploadCloud, X, XCircle } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import * as XLSX from 'xlsx'

const variants = {
  hidden: { opacity: 0, x: 100, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

function DropZone({
  setUpLoadedData,
}: {
  setUpLoadedData: (data: any[]) => void
}) {
  const [fileNames, setFileNames] = useState<string[]>([])
  const [rejectedfiles, setRejectedfiles] = useState<any[]>([])
  const [acceptedRawFiles, setAcceptedRawFiles] = useState<any[]>([])
  console.log('🚀 ~ DropZone ~ acceptedRawFiles:', acceptedRawFiles)

  const [fileData, setFileData] = useState<any[]>([])
  //   fileData.length > 0 ? setUpData(fileData) : setUpData([])
  setUpLoadedData(fileData)
  const onDrop = useCallback((acceptedFiles: Blob[], fileRejections: any[]) => {
    acceptedFiles?.forEach((file) => {
      setAcceptedRawFiles((prev) => [...prev, file])
      console.log('🚀 ~ acceptedFiles.forEach ~ file:', file)
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        // console.log(binaryStr)
        const workbook = XLSX.read(binaryStr, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(worksheet)
        setFileData((prev) => [...prev, parsedData])
        // console.log('🚀 ~ acceptedFiles.forEach ~ parsedData:', parsedData)
      }
      reader.readAsArrayBuffer(file)
    })
    fileRejections?.forEach((file) => {
      setRejectedfiles((prev) => [...prev, file])
    })
  }, [])
  rejectedfiles?.forEach((rejected) => {
    console.log('🚀 ~ DropZone ~ fileRejections:', rejected)
  })
  console.log('🚀 ~ acceptedFiles.forEach ~ fileData:', fileData)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xls',
        '.xlsx',
      ],
      'text/csv': [],
      'text/html': ['.html', '.htm'],
    },
    maxSize: 1024 * 100,
    maxFiles: 4,
  })

  const handleRemoveRejectedFile = (index: number) => {
    const updatedRejFile = rejectedfiles.filter((_, i) => i !== index)
    setRejectedfiles(updatedRejFile)
  }
  const handleRemoveAcceptedRawFile = (index: number) => {
    const updatedAccFile = acceptedRawFiles.filter((_, i) => i !== index)
    setAcceptedRawFiles(updatedAccFile)
  }

  return (
    <form>
      <div
        className={cn(
          'h-24 bg-muted/40  rounded-xl flex justify-center items-center border-dashed border-2 ',
          isDragActive && 'bg-muted '
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className='flex items-center gap-x-2    cursor-crosshair'>
            <div className='relative -left-6 -top-3'>
              <Target className='absolute stroke-muted-foreground/70  animate-ping' />
              <Target className=' absolute stroke-muted-foreground/70 animate-pulse ' />
            </div>
            <p className='text-xs text-muted-foreground'>
              Drop the files here ...
            </p>
          </div>
        ) : (
          <>
            <div className='flex  items-center  gap-x-4 hover:bg-muted-foreground/10 px-4 py-3 rounded-md cursor-pointer'>
              <UploadCloud className='stroke-muted-foreground/70 ' />
              <div className='flex flex-col items-start '>
                <Small className=' text-muted-foreground'>
                  Drag 'n' drop some files here, or click to select files
                </Small>
                <p className='text-xs text-muted-foreground/50'>
                  up to 10 xlsx files, 10MB per file
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {/* {rejectedfiles.length < 0 && (
        <div className='mt-8 h-24 bg-muted/10  rounded-xl flex justify-center items-center gap-2 border-dashed border-2 border-amber-700 '>
          {rejectedfiles.map((rejectedFile) => (
            <div className='flex flex-col justify-center items-center  bg-rose-500/50 rounded-xl  p-4 text-xs text-muted-foreground'>
              <p>{rejectedFile.file.name}</p>
              <p>{rejectedFile.errors[0].message}</p>
            </div>
          ))}
        </div>
      )} */}
      <div className='p-4 mb-8 bg-muted/20 mx-2 py-2 border grid grid-cols-3  items-center gap-2 '>
        {rejectedfiles.length > 0 || acceptedRawFiles.length > 0 ? (
          <AnimatePresence mode='popLayout'>
            {acceptedRawFiles.map((aFile, index) => (
              <motion.li
                key={'accepted-' + index}
                variants={variants}
                initial='hidden'
                animate='enter'
                exit='exit'
                transition={{ ease: [0.45, 0, 0.55, 1], duration: 0.35 }}
                className='list-none  flex items-center gap-2 bg-emerald-500/20 rounded-xl  p-4 text-xs text-muted-foreground'
              >
                <FileText className='stroke-emerald-500 ' size={20} />
                <div>
                  <p className=' '>{aFile.name}</p>{' '}
                  <Small className=' text-emerald-900/50 dark:text-emerald-300/50 '>
                    {(aFile.size / 1024).toFixed(1) + ' KB'}
                  </Small>
                </div>
                <button
                  type='button'
                  className='p-1 rounded-sm hover:bg-muted-foreground/20 text-muted-foreground/30 hover:text-muted-foreground ml-auto'
                  onClick={() => handleRemoveAcceptedRawFile(index)}
                >
                  <X className='' size={20} />
                </button>
              </motion.li>
            ))}
            {rejectedfiles.map((rejectedFile, index) => (
              <motion.li
                key={'rejected-' + index}
                variants={variants}
                initial='hidden'
                animate='enter'
                exit='exit'
                transition={{ ease: [0.45, 0, 0.55, 1], duration: 0.35 }}
                className='list-none  flex items-center gap-2 bg-rose-500/20 rounded-xl  p-4 text-xs text-muted-foreground'
              >
                <FileText className='stroke-rose-500 ' size={20} />
                <div>
                  <p className=' '>{rejectedFile.file.name}</p>{' '}
                  <Small className='text-rose-900/50 dark:text-rose-300/70'>
                    {(rejectedFile.file.size / 1024).toFixed(1) +
                      ' KB - ' +
                      rejectedFile.errors[0].message}
                  </Small>
                </div>
                <button
                  type='button'
                  className='p-1 rounded-sm hover:bg-muted-foreground/20 text-muted-foreground/30 hover:text-muted-foreground ml-auto'
                  onClick={() => handleRemoveRejectedFile(index)}
                >
                  <X className='' size={20} />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        ) : (
          <div className='text-center col-span-3 text-neutral-300 flex items-center justify-center gap-x-2'>
            <Frown className='stroke-muted-foreground/70' size={20} />
            <p className='text-xs text-muted-foreground'>No FIle Uploaded</p>
          </div>
        )}
      </div>
    </form>
  )
}
export default DropZone
