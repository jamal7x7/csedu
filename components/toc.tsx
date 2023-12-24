'use client'

import * as React from 'react'
import { ChevronsUpDown, List, ListTree, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Resume } from '@/app/(dashboard)/studentDashboard/levels/[levelId]/chapters/[chapterId]/resume/page'

function Toc() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className='fixed  bottom-8 right-8  z-50 '>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='w-[250px] space-y-2'
      >
        <CollapsibleContent className='space-y-2 mb-96'>
          <div className=' px-4 py-3 font-mono text-sm'>
            Le Réseau Informatique
          </div>
          <div className=' px-4 py-3 font-mono text-sm'>
            Objectif des Réseaux
          </div>
          <div className=' px-4 py-3 font-mono text-sm'>Types Des reseaux</div>
        </CollapsibleContent>

        <div className='flex items-center justify-end gap-2'>
          <Resume />
          <CollapsibleTrigger asChild>
            <Button variant='outline' size='sm' className='w-9 p-0'>
              <List className='h-4 w-4' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  )
}

export default Toc
