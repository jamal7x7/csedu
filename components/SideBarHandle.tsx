import React from 'react'

export const SideBarHandle = () => {
  return (
    <div className='flex h-[72px] w-8 items-center justify-center relative left-[2px] group cursor-pointer z-[5000] '>
      <div className='flex size-6 flex-col items-center'>
        <div
          className='h-3 w-1 rounded-full SideBarHandle__line__up bg-muted group-hover:bg-muted-foreground group-hover:rotate-[25deg] group-hover:translate-y-[0.15rem] group-hover:translate-x-0 '
          //   style='background: var(--text-tertiary); transform: translateY(0.15rem) rotate(15deg) translateZ(0px);'
        />
        <div
          className='h-3 w-1 rounded-full SideBarHandle__line__down bg-muted group-hover:bg-muted-foreground group-hover:-rotate-[25deg] group-hover:-translate-y-[0.15rem] group-hover:translate-x-0 '
          //   style={'background: var(--text-tertiary); transform: translateY(-0.15rem) rotate(-15deg) translateZ(0px);'}
        />
      </div>
    </div>
  )
}
