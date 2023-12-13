import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const itemList = [
  { name: 'Store Example', path: '/examples/store-example' },
  { name: 'Router Example', path: '/examples/router-example' },
  { name: 'accordion-demo', path: 'accordion-demo' },
  { name: 'alert-demo', path: 'alert-demo' },
  { name: 'alert-dialog-demo', path: 'alert-dialog-demo' },
  { name: 'alert-destructive', path: 'alert-destructive' },
  { name: 'aspect-ratio-demo', path: 'aspect-ratio-demo' },
  { name: 'avatar-demo', path: 'avatar-demo' },
  { name: 'badge-demo', path: 'badge-demo' },
  { name: 'badge-destructive', path: 'badge-destructive' },
  { name: 'badge-outline', path: 'badge-outline' },
  { name: 'badge-secondary', path: 'badge-secondary' },
  { name: 'button-demo', path: 'button-demo' },
  { name: 'button-ghost', path: 'button-ghost' },
  { name: 'button-destructive', path: 'button-destructive' },
  { name: 'button-link', path: 'button-link' },
  { name: 'button-loading', path: 'button-loading' },
  { name: 'button-outline', path: 'button-outline' },
  { name: 'button-secondary', path: 'button-secondary' },
  { name: 'button-with-icon', path: 'button-with-icon' },
  { name: 'calendar-demo', path: 'calendar-demo' },
  { name: 'calendar-date-picker', path: 'calendar-date-picker' },
  { name: 'calendar-date-range-picker', path: 'calendar-date-range-picker' },
  { name: 'calendar-date-picker-with-presets', path: 'calendar-date-picker-with-presets' },
  { name: 'card-demo', path: 'card-demo' },
  { name: 'card-with-form', path: 'card-with-form' },
  { name: 'checkbox-demo', path: 'checkbox-demo' },
  { name: 'checkbox-disabled', path: 'checkbox-disabled' },
  { name: 'checkbox-with-text', path: 'checkbox-with-text' },
  { name: 'collapsible-demo', path: 'collapsible-demo' },
  { name: 'command-demo', path: 'command-demo' },
  { name: 'command-dialog-demo', path: 'command-dialog-demo' },
  { name: 'command-combobox', path: 'command-combobox' },
  { name: 'command-popover', path: 'command-popover' },
  { name: 'command-dropdown-menu', path: 'command-dropdown-menu' },
  { name: 'context-menu-demo', path: 'context-menu-demo' },
  { name: 'dialog-demo', path: 'dialog-demo' },
  { name: 'dropdown-menu-checkboxes', path: 'dropdown-menu-checkboxes' },
  { name: 'dropdown-menu-demo', path: 'dropdown-menu-demo' },
  { name: 'dropdown-menu-radio-group-demo', path: 'dropdown-menu-radio-group-demo' },
  { name: 'hover-card-demo', path: 'hover-card-demo' },
  { name: 'input-demo', path: 'input-demo' },
  { name: 'input-disabled', path: 'input-disabled' },
  { name: 'input-file', path: 'input-file' },
  { name: 'input-with-button', path: 'input-with-button' },
  { name: 'input-with-label', path: 'input-with-label' },
  { name: 'input-with-text', path: 'input-with-text' },
  { name: 'label-demo', path: 'label-demo' },
  { name: 'menubar-demo', path: 'menubar-demo' },
  { name: 'navigation-menu-demo', path: 'navigation-menu-demo' },
  { name: 'popover-demo', path: 'popover-demo' },
  { name: 'progress-demo', path: 'progress-demo' },
  { name: 'radio-group-demo', path: 'radio-group-demo' },
  { name: 'scroll-area-demo', path: 'scroll-area-demo' },
  { name: 'select-demo', path: 'select-demo' },
  { name: 'separator-demo', path: 'separator-demo' },
  { name: 'sheet-demo', path: 'sheet-demo' },
  { name: 'sheet-size', path: 'sheet-size' },
  { name: 'sheet-position', path: 'sheet-position' },
  { name: 'skeleton-demo', path: 'skeleton-demo' },
  { name: 'slider-demo', path: 'slider-demo' },
  { name: 'switch-demo', path: 'switch-demo' },
  { name: 'tabs-demo', path: 'tabs-demo' },
  { name: 'textarea-demo', path: 'textarea-demo' },
  { name: 'textarea-disabled', path: 'textarea-disabled' },
  { name: 'textarea-with-button', path: 'textarea-with-button' },
  { name: 'textarea-with-label', path: 'textarea-with-label' },
  { name: 'textarea-with-text', path: 'textarea-with-text' },
  { name: 'toast-demo', path: 'toast-demo' },
  { name: 'toast-destructive', path: 'toast-destructive' },
  { name: 'toast-simple', path: 'toast-simple' },
  { name: 'toast-with-title', path: 'toast-with-title' },
  { name: 'toast-with-action', path: 'toast-with-action' },
  { name: 'tooltip-demo', path: 'tooltip-demo' },
  { name: 'typography-blockquote', path: 'typography-blockquote' },
  { name: 'typography-demo', path: 'typography-demo' },
  { name: 'typography-h1', path: 'typography-h1' },
  { name: 'typography-h2', path: 'typography-h2' },
  { name: 'typography-h3', path: 'typography-h3' },
  { name: 'typography-h4', path: 'typography-h4' },
  { name: 'typography-inline-code', path: 'typography-inline-code' },
  { name: 'typography-large', path: 'typography-large' },
  { name: 'typography-lead', path: 'typography-lead' },
  { name: 'typography-list', path: 'typography-list' },
  { name: 'typography-p', path: 'typography-p' },
  { name: 'typography-small', path: 'typography-small' },
  { name: 'typography-muted', path: 'typography-muted' },
  { name: 'typography-table', path: 'typography-table' },
  { name: 'toggle-demo', path: 'toggle-demo' },
  { name: 'toggle-sm', path: 'toggle-sm' },
  { name: 'toggle-lg', path: 'toggle-lg' },
  { name: 'toggle-outline', path: 'toggle-outline' },
  { name: 'toggle-disabled', path: 'toggle-disabled' },
  { name: 'toggle-with-text', path: 'toggle-with-text' }
]
export default function ExampleList() {
  const navigate = useNavigate()
  const location = useLocation()
  const [path, setPath] = useState(location.pathname)
  const handleListItemClick = (
    item: { name: string, path: string }
  ) => {
    navigate(item.path)
    setPath(item.path)
  }

  return (
    <div>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
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
