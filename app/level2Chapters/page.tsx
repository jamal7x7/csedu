// app/page.tsx
import {Button} from "@/components/ui/button"; 
  import Link from 'next/link';


export default function Page() {
  return (


<main className="flex min-h-screen flex-col items-center justify-between p-24">
<div className="flex flex-col gap-8">
        {/* ============================Chapiter 1========================== */}
          <Link href="/dashboard" passHref>
            <div className='group p-4  flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl '>
            
                  <div className="relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-primary ">
                     <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all"></span>
                    <p  className='relative font-bold text-4xl group-hover:text-primary-foreground' >1</p>
                  </div>
                  
                  <div className='p-4 flex flex-col items-start justify-between'>

                    <small className="text-default-500">Chapiter 1</small>
                    <h1 className=" font-black text-2xl ">  La Cofiguration Materielle d'un Ordinateur</h1>
                  </div>

              </div>
            </Link>
        {/* ============================Chapiter 1-End============================ */}
        {/* ============================Chapiter 2========================== */}
          <Link href="/dashboard" passHref>
            <div className='group p-4  flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl '>
            
                  <div className="relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-primary ">
                     <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all"></span>
                    <p  className='relative font-bold text-4xl group-hover:text-primary-foreground' >2</p>
                  </div>
                  
                  <div className='p-4 flex flex-col items-start justify-between'>

                    <small className="text-default-500">Chapitre 2</small>
                    <h1 className=" font-black text-2xl ">  Le Réseau Informatique</h1>
                  </div>

              </div>
            </Link>
        {/* ============================Chapiter 2-End============================ */}
        {/* ============================Chapiter 3========================== */}
          <Link href="/dashboard" passHref>
            <div className='group p-4  flex  items-center justify-start hover:bg-secondary/90 bg-secondary/50 rounded-3xl '>
            
                  <div className="relative flex flex-shrink-0 h-20 w-20 items-center justify-center rounded-full  bg-muted  md:h-[72px] md:w-[72px] group-hover:bg-primary ">
                     <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-muted group-hover:bg-primary  opacity-20 group-hover:transition-all"></span>
                    <p  className='relative font-bold text-4xl group-hover:text-primary-foreground' >3</p>
                  </div>
                  
                  <div className='p-4 flex flex-col items-start justify-between'>

                    <small className="text-default-500">Chapitre 3</small>
                    <h1 className=" font-black text-2xl ">  Le Systeme d'Exploitation Reseau</h1>
                  </div>

              </div>
            </Link>
        {/* ============================Chapiter 3-End============================ */}







    </div>
    </main>
  )
}




