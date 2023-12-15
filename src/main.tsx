import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './index.tsx'
import ErrorPage from './error-pages/ErrorPage.tsx'
import About from '~/pages/About.tsx'
import Home from '~/pages/Home.tsx'
import Examples from '~/pages/examples/Home.tsx'
import * as UIExamples from '~/pages/examples/index.tsx'
import '~/lib/dark-mode.ts'
import Todo from '~/pages/Todo.tsx'
import 'virtual:uno.css'
import { HelmetProvider } from 'react-helmet-async'
import '~/lib/locales'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'todo',
        element: <Todo />,
      },
      {
        path: 'examples',
        element: <Examples />,
        children: [
          {
            path: 'accordion-demo',
            element: <UIExamples.examples.AccordionDemo />,
          },
          { path: 'alert-demo', element: <UIExamples.examples.AlertDemo /> },
          {
            path: 'alert-dialog-demo',
            element: <UIExamples.examples.AlertDialogDemo />,
          },
          {
            path: 'aspect-ratio-demo',
            element: <UIExamples.examples.AspectRatioDemo />,
          },
          { path: 'avatar-demo', element: <UIExamples.examples.AvatarDemo /> },
          { path: 'badge-demo', element: <UIExamples.examples.BadgeDemo /> },
          { path: 'button-demo', element: <UIExamples.examples.ButtonDemo /> },
          {
            path: 'calendar-demo',
            element: <UIExamples.examples.CalendarDemo />,
          },
          { path: 'card-demo', element: <UIExamples.examples.CardDemo /> },
          {
            path: 'checkbox-demo',
            element: <UIExamples.examples.CheckboxDemo />,
          },
          {
            path: 'collapsible-demo',
            element: <UIExamples.examples.CollapsibleDemo />,
          },
          {
            path: 'command-demo',
            element: <UIExamples.examples.CommandDemo />,
          },
          {
            path: 'command-dialog-demo',
            element: <UIExamples.examples.CommandDialogDemo />,
          },
          {
            path: 'command-combobox',
            element: <UIExamples.examples.CommandCombobox />,
          },
          {
            path: 'command-popover',
            element: <UIExamples.examples.CommandPopover />,
          },
          {
            path: 'command-dropdown-menu',
            element: <UIExamples.examples.CommandDropdownMenu />,
          },
          {
            path: 'context-menu-demo',
            element: <UIExamples.examples.ContextMenuDemo />,
          },
          { path: 'dialog-demo', element: <UIExamples.examples.DialogDemo /> },
          {
            path: 'dropdown-menu-checkboxes',
            element: <UIExamples.examples.DropdownMenuCheckboxes />,
          },
          {
            path: 'dropdown-menu-demo',
            element: <UIExamples.examples.DropdownMenuDemo />,
          },
          {
            path: 'dropdown-menu-radio-group-demo',
            element: <UIExamples.examples.DropdownMenuRadioGroupDemo />,
          },
          {
            path: 'hover-card-demo',
            element: <UIExamples.examples.HoverCardDemo />,
          },
          { path: 'input-demo', element: <UIExamples.examples.InputDemo /> },
          {
            path: 'input-disabled',
            element: <UIExamples.examples.InputDisabled />,
          },
          { path: 'input-file', element: <UIExamples.examples.InputFile /> },
          {
            path: 'input-with-button',
            element: <UIExamples.examples.InputWithButton />,
          },
          {
            path: 'input-with-label',
            element: <UIExamples.examples.InputWithLabel />,
          },
          {
            path: 'input-with-text',
            element: <UIExamples.examples.InputWithText />,
          },
          { path: 'label-demo', element: <UIExamples.examples.LabelDemo /> },
          {
            path: 'menubar-demo',
            element: <UIExamples.examples.MenubarDemo />,
          },
          {
            path: 'navigation-menu-demo',
            element: <UIExamples.examples.NavigationMenuDemo />,
          },
          {
            path: 'popover-demo',
            element: <UIExamples.examples.PopoverDemo />,
          },
          {
            path: 'progress-demo',
            element: <UIExamples.examples.ProgressDemo />,
          },
          {
            path: 'radio-group-demo',
            element: <UIExamples.examples.RadioGroupDemo />,
          },
          {
            path: 'scroll-area-demo',
            element: <UIExamples.examples.ScrollAreaDemo />,
          },
          { path: 'select-demo', element: <UIExamples.examples.SelectDemo /> },
          {
            path: 'separator-demo',
            element: <UIExamples.examples.SeparatorDemo />,
          },
          { path: 'sheet-demo', element: <UIExamples.examples.SheetDemo /> },
          { path: 'sheet-size', element: <UIExamples.examples.SheetSize /> },
          {
            path: 'sheet-position',
            element: <UIExamples.examples.SheetPosition />,
          },
          {
            path: 'skeleton-demo',
            element: <UIExamples.examples.SkeletonDemo />,
          },
          { path: 'slider-demo', element: <UIExamples.examples.SliderDemo /> },
          { path: 'switch-demo', element: <UIExamples.examples.SwitchDemo /> },
          { path: 'tabs-demo', element: <UIExamples.examples.TabsDemo /> },
          {
            path: 'textarea-demo',
            element: <UIExamples.examples.TextareaDemo />,
          },
          {
            path: 'textarea-disabled',
            element: <UIExamples.examples.TextareaDisabled />,
          },
          {
            path: 'textarea-with-button',
            element: <UIExamples.examples.TextareaWithButton />,
          },
          {
            path: 'textarea-with-label',
            element: <UIExamples.examples.TextareaWithLabel />,
          },
          {
            path: 'textarea-with-text',
            element: <UIExamples.examples.TextareaWithText />,
          },
          { path: 'toast-demo', element: <UIExamples.examples.ToastDemo /> },
          {
            path: 'toast-destructive',
            element: <UIExamples.examples.ToastDestructive />,
          },
          {
            path: 'toast-simple',
            element: <UIExamples.examples.ToastSimple />,
          },
          {
            path: 'toast-with-title',
            element: <UIExamples.examples.ToastWithTitle />,
          },
          {
            path: 'toast-with-action',
            element: <UIExamples.examples.ToastWithAction />,
          },
          {
            path: 'tooltip-demo',
            element: <UIExamples.examples.TooltipDemo />,
          },
          {
            path: 'typography-blockquote',
            element: <UIExamples.examples.TypographyBlockquote />,
          },
          {
            path: 'typography-demo',
            element: <UIExamples.examples.TypographyDemo />,
          },
          {
            path: 'typography-large',
            element: <UIExamples.examples.TypographyLarge />,
          },
          {
            path: 'typography-lead',
            element: <UIExamples.examples.TypographyLead />,
          },
          {
            path: 'typography-list',
            element: <UIExamples.examples.TypographyList />,
          },
          {
            path: 'typography-p',
            element: <UIExamples.examples.TypographyP />,
          },
          {
            path: 'typography-small',
            element: <UIExamples.examples.TypographySmall />,
          },
          {
            path: 'typography-muted',
            element: <UIExamples.examples.TypographyMuted />,
          },
          {
            path: 'typography-table',
            element: <UIExamples.examples.TypographyTable />,
          },
          { path: 'toggle-demo', element: <UIExamples.examples.ToggleDemo /> },
          { path: 'toggle-sm', element: <UIExamples.examples.ToggleSm /> },
          { path: 'toggle-lg', element: <UIExamples.examples.ToggleLg /> },
          {
            path: 'toggle-outline',
            element: <UIExamples.examples.ToggleOutline />,
          },
          {
            path: 'toggle-disabled',
            element: <UIExamples.examples.ToggleDisabled />,
          },
          {
            path: 'toggle-with-text',
            element: <UIExamples.examples.ToggleWithText />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)
