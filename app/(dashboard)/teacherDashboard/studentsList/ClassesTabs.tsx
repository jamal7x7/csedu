/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SJPlND4Ihqq
 */
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { TabsTrigger, TabsList, TabsContent, Tabs } from '@/components/ui/tabs'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'

export default function Component() {
  return (
    <>
      <div className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
        <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
          <div className='flex h-full max-h-screen flex-col gap-2'>
            <div className='flex h-[60px] items-center border-b px-6'>
              <Link className='flex items-center gap-2 font-semibold' href='#'>
                <UsersIcon className='h-6 w-6' />
                <span className=''>Teacher Dashboard</span>
              </Link>
              <Button className='ml-auto h-8 w-8' size='icon' variant='outline'>
                <BellIcon className='h-4 w-4' />
                <span className='sr-only'>Toggle notifications</span>
              </Button>
            </div>
            <div className='flex-1 overflow-auto py-2'>
              <nav className='grid items-start px-4 text-sm font-medium'>
                <Link
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  href='#'
                >
                  <UserIcon className='h-4 w-4' />
                  Students
                </Link>
                <Link
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  href='#'
                >
                  <FileIcon className='h-4 w-4' />
                  Grades
                </Link>
                <Link
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  href='#'
                >
                  <FolderIcon className='h-4 w-4' />
                  Classes
                </Link>
                <Link
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                  href='#'
                >
                  <ClipboardIcon className='h-4 w-4' />
                  Assignments
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
            <Link className='lg:hidden' href='#'>
              <UsersIcon className='h-6 w-6' />
              <span className='sr-only'>Home</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800'
                  size='icon'
                  variant='ghost'
                >
                  <img
                    alt='Avatar'
                    className='rounded-full'
                    height='32'
                    src='/placeholder.svg'
                    style={{
                      aspectRatio: '32/32',
                      objectFit: 'cover',
                    }}
                    width='32'
                  />
                  <span className='sr-only'>Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
            <Tabs
              className='flex flex-col gap-2 items-start'
              defaultValue='students'
            >
              <TabsList className='w-full justify-start'>
                <TabsTrigger value='students'>Students</TabsTrigger>
                <TabsTrigger value='grades'>Grades</TabsTrigger>
                <TabsTrigger value='classes'>Classes</TabsTrigger>
                <TabsTrigger value='assignments'>Assignments</TabsTrigger>
              </TabsList>
              <TabsContent className='p-1' value='students'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[100px]'>Name</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Class</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>John Doe</TableCell>
                      <TableCell>123456</TableCell>
                      <TableCell>Mathematics</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>Jane Smith</TableCell>
                      <TableCell>789012</TableCell>
                      <TableCell>English</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent className='p-1' value='grades'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[100px]'>Name</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>John Doe</TableCell>
                      <TableCell>Math Test</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>01/01/2024</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>Jane Smith</TableCell>
                      <TableCell>English Essay</TableCell>
                      <TableCell>B+</TableCell>
                      <TableCell>01/02/2024</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent className='p-1' value='classes'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[100px]'>Class Name</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>No. of Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>Mathematics</TableCell>
                      <TableCell>Mr. Johnson</TableCell>
                      <TableCell>30</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>English</TableCell>
                      <TableCell>Ms. Smith</TableCell>
                      <TableCell>28</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent className='p-1' value='assignments'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[100px]'>
                        Assignment Name
                      </TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>Math Test</TableCell>
                      <TableCell>Mathematics</TableCell>
                      <TableCell>01/10/2024</TableCell>
                      <TableCell>Completed</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>
                        English Essay
                      </TableCell>
                      <TableCell>English</TableCell>
                      <TableCell>01/15/2024</TableCell>
                      <TableCell>Pending</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  )
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
      <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
    </svg>
  )
}

function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
      <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
    </svg>
  )
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
      <polyline points='14 2 14 8 20 8' />
    </svg>
  )
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z' />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  )
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  )
}
