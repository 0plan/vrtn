import { Outlet } from 'react-router-dom'
import ExampleList from '@components/ExampleList.tsx'

export default function Index() {
  return (
    <main className={'flex'}>
      <ExampleList />
      <div className="container">
        <Outlet />
      </div>
    </main>
  )
}
