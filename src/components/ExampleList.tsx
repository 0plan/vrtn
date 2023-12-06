import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const itemList = [
  { name: 'Store Example', path: '/examples/store-example' },
  { name: 'Router Example', path: '/examples/router-example' }
]
export default function ExampleList() {
  const navigate = useNavigate()
  const location = useLocation()
  const [path, setPath] = React.useState(location.pathname)
  const handleListItemClick = (
    item: { name: string, path: string }
  ) => {
    navigate(item.path)
    setPath(item.path)
  }

  return (
    <div>
      <ul>
        {itemList.map(item => {
          return <li
            key={item.path}
            onClick={() => handleListItemClick(item)}
          >
            {item.name} | item.path
          </li>
        })
        }
      </ul>
    </div>
  )
}
