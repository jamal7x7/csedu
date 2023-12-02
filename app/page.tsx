// app/page.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Dashboard from '@/app/(dashboard)/studentDashboard/page'

export default function Page() {
  return (
    <div>
      <Dashboard />
    </div>
  )
}
