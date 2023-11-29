// app/page.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LevelMenu() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col gap-8'>
        {/* ============================1 er annee========================== */}
        <Link href='/levels/units' passHref>
          <div className='group p-4  flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl hover:shadow-[0_0px_50px_10px_rgba(0,0,0,0.3)]  hover:shadow-blue-500/20'>
            <div className='relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-blue-500 '>
              <span className='group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all'></span>
              <p className='relative font-bold text-4xl group-hover:text-primary-foreground'>
                1
              </p>
            </div>

            <div className='p-4 flex flex-col items-start justify-between'>
              <small className='text-default-500 group-hover:text-blue-950 dark:group-hover:text-blue-200'>
                Niveau 1
              </small>
              <h1 className=' font-black text-2xl group-hover:text-blue-500 '>
                {' '}
                Année
              </h1>
            </div>
          </div>
        </Link>
        {/* ============================2 eme annee-End============================ */}
        {/* ============================2 eme annee========================== */}
        <Link href='/levels/units' passHref>
          <div className='group p-4 pr-40 flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl hover:shadow-[0_0px_50px_10px_rgba(0,0,0,0.3)]  hover:shadow-green-500/20'>
            <div className='relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-green-500 '>
              <span className='group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all'></span>
              <p className='relative font-bold text-4xl group-hover:text-primary-foreground'>
                2
              </p>
            </div>

            <div className='p-4 flex flex-col items-start justify-between'>
              <small className='text-default-500 group-hover:text-green-950 dark:group-hover:text-green-200'>
                Niveau 2
              </small>
              <h1 className=' font-black text-2xl group-hover:text-green-500'>
                {' '}
                Année
              </h1>
            </div>
          </div>
        </Link>
        {/* ============================2 eme annee-End============================ */}
        {/* ============================2 eme annee========================== */}
        <Link href='/levels/units' passHref>
          <div className='group p-4 pr-40 flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl hover:shadow-[0_0px_50px_10px_rgba(0,0,0,0.3)]  hover:shadow-orange-500/20'>
            <div className='relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-orange-500 '>
              <span className='group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all'></span>
              <p className='relative font-bold text-4xl group-hover:text-primary-foreground'>
                3
              </p>
            </div>

            <div className='p-4 flex flex-col items-start justify-between'>
              <small className='text-default-500 group-hover:text-orange-950 dark:group-hover:text-orange-200'>
                Niveau 3
              </small>
              <h1 className=' font-black text-2xl group-hover:text-orange-500'>
                {' '}
                Année
              </h1>
            </div>
          </div>
        </Link>
        {/* ============================2 eme annee-End============================ */}

        {/* 

        <div className="p-10 flex flex-col flex-wrap gap-4 items-center">
          <Link href="/path/to/page" passHref>
               <div className="flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full dark:bg-slate-800 bg-slate-100  md:h-[72px] md:w-[72px] p-2">
                  <p  className='font-bold text-4xl' >1</p>
               </div>
      
            <Button size={'xl'}  className="bg-gradient-to-tr from-cyan-300 to-blue-500 font-bold text-medium text-neutral-700 shadow-lg p-7">
              <var><em>1</em><sup>er</sup></var>  Annee 
            </Button>  
          </Link> 
         */}
        {/* 
          <Link href="/dashboard" passHref>
            <Button  className="bg-gradient-to-tr from-lime-300 to-cyan-300 font-bold text-medium text-neutral-700 shadow-lg p-7 ">
              <var><em>2</em><sup>ème</sup></var>  Annee 
            </Button>
          </Link>  
        
          <Link href="/path/to/page" passHref>
            <Button  className="bg-gradient-to-tr from-orange-300 to-red-500 font-bold text-m text-neutral-700 shadow-lg p-7">
              <var><em>3</em><sup>ème</sup></var>  Annee 
            </Button>  
          </Link>
        </div> */}
      </div>
    </main>
  )
}

// export default function Page() {
//   return <>
//    <div className="p-10">

//   <h1>Hello, Next.js!</h1>
//   {/* <button className="btn btn-primary">Button</button> */}
//    </div>
//   </>

// }

// import Image from 'next/image'

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }
