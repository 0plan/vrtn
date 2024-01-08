import { Fragment, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollArea } from '@components/ui/scroll-area.tsx'
import { Separator } from '@components/ui/separator.tsx'

const itemList = [
  { name: `/examples/command/combobox`, path: `/examples/command/combobox` },
  { name: `/examples/command/demo`, path: `/examples/command/demo` },
  { name: `/examples/command/dialog`, path: `/examples/command/dialog` },
  {
    name: `/examples/command/dropdown-menu`,
    path: `/examples/command/dropdown-menu`,
  },
  { name: `/examples/command/popover`, path: `/examples/command/popover` },
  { name: `/examples/context-menu/demo`, path: `/examples/context-menu/demo` },
  { name: `/examples/dialog/demo`, path: `/examples/dialog/demo` },
  {
    name: `/examples/dropdown-menu/checkboxes`,
    path: `/examples/dropdown-menu/checkboxes`,
  },
  {
    name: `/examples/dropdown-menu/demo`,
    path: `/examples/dropdown-menu/demo`,
  },
  {
    name: `/examples/dropdown-menu/radio-group`,
    path: `/examples/dropdown-menu/radio-group`,
  },
  { name: `/examples/hover-card/demo`, path: `/examples/hover-card/demo` },
  { name: `/examples/input/demo`, path: `/examples/input/demo` },
  { name: `/examples/input/disabled`, path: `/examples/input/disabled` },
  { name: `/examples/input/file`, path: `/examples/input/file` },
  { name: `/examples/input/with-button`, path: `/examples/input/with-button` },
  { name: `/examples/input/with-label`, path: `/examples/input/with-label` },
  { name: `/examples/input/with-text`, path: `/examples/input/with-text` },
  { name: `/examples/label/demo`, path: `/examples/label/demo` },
  { name: `/examples/menubar/demo`, path: `/examples/menubar/demo` },
  {
    name: `/examples/navigation-menu/demo`,
    path: `/examples/navigation-menu/demo`,
  },
  { name: `/examples/popover/demo`, path: `/examples/popover/demo` },
  { name: `/examples/progress/demo`, path: `/examples/progress/demo` },
  { name: `/examples/radio-group/demo`, path: `/examples/radio-group/demo` },
  { name: `/examples/scroll-area/demo`, path: `/examples/scroll-area/demo` },
  { name: `/examples/select/demo`, path: `/examples/select/demo` },
  { name: `/examples/separator/demo`, path: `/examples/separator/demo` },
  { name: `/examples/sheet/demo`, path: `/examples/sheet/demo` },
  { name: `/examples/sheet/position`, path: `/examples/sheet/position` },
  { name: `/examples/sheet/size`, path: `/examples/sheet/size` },
  { name: `/examples/skeleton/demo`, path: `/examples/skeleton/demo` },
  { name: `/examples/slider/demo`, path: `/examples/slider/demo` },
  { name: `/examples/switch/demo`, path: `/examples/switch/demo` },
  { name: `/examples/tabs/demo`, path: `/examples/tabs/demo` },
  { name: `/examples/textarea/demo`, path: `/examples/textarea/demo` },
  { name: `/examples/textarea/disabled`, path: `/examples/textarea/disabled` },
  {
    name: `/examples/textarea/with-button`,
    path: `/examples/textarea/with-button`,
  },
  {
    name: `/examples/textarea/with-label`,
    path: `/examples/textarea/with-label`,
  },
  {
    name: `/examples/textarea/with-text`,
    path: `/examples/textarea/with-text`,
  },
  { name: `/examples/toast/demo`, path: `/examples/toast/demo` },
  { name: `/examples/toast/destructive`, path: `/examples/toast/destructive` },
  { name: `/examples/toast/simple`, path: `/examples/toast/simple` },
  { name: `/examples/toast/with-action`, path: `/examples/toast/with-action` },
  { name: `/examples/toast/with-title`, path: `/examples/toast/with-title` },
  { name: `/examples/toggle/demo`, path: `/examples/toggle/demo` },
  { name: `/examples/toggle/disabled`, path: `/examples/toggle/disabled` },
  { name: `/examples/toggle/lg`, path: `/examples/toggle/lg` },
  { name: `/examples/toggle/outline`, path: `/examples/toggle/outline` },
  { name: `/examples/toggle/sm`, path: `/examples/toggle/sm` },
  { name: `/examples/toggle/with-text`, path: `/examples/toggle/with-text` },
  { name: `/examples/tooltip/demo`, path: `/examples/tooltip/demo` },
  {
    name: `/examples/typography/blockquote`,
    path: `/examples/typography/blockquote`,
  },
  { name: `/examples/typography/demo`, path: `/examples/typography/demo` },
  { name: `/examples/typography/h1`, path: `/examples/typography/h1` },
  { name: `/examples/typography/h2`, path: `/examples/typography/h2` },
  { name: `/examples/typography/h3`, path: `/examples/typography/h3` },
  { name: `/examples/typography/h4`, path: `/examples/typography/h4` },
  {
    name: `/examples/typography/inline-code`,
    path: `/examples/typography/inline-code`,
  },
  { name: `/examples/typography/large`, path: `/examples/typography/large` },
  { name: `/examples/typography/lead`, path: `/examples/typography/lead` },
  { name: `/examples/typography/list`, path: `/examples/typography/list` },
  { name: `/examples/typography/muted`, path: `/examples/typography/muted` },
  { name: `/examples/typography/p`, path: `/examples/typography/p` },
  { name: `/examples/typography/small`, path: `/examples/typography/small` },
  { name: `/examples/typography/table`, path: `/examples/typography/table` },
]

export default function ExampleList() {
  const navigate = useNavigate()
  const location = useLocation()
  const [path, setPath] = useState(location.pathname)
  const handleListItemClick = (item: { name: string; path: string }) => {
    navigate(item.path)
    setPath(item.path)
  }

  return (
    <ScrollArea className="h-96 w-52 rounded-md border">
      <div className="p-4">
        {itemList.map((item) => (
          <Fragment>
            <div
              className="cursor-pointer text-sm"
              key={item.path}
              onClick={() => handleListItemClick(item)}
            >
              {item.name}
            </div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
