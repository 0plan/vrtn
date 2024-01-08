// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/examples`
  | `/examples/command/combobox`
  | `/examples/command/demo`
  | `/examples/command/dialog`
  | `/examples/command/dropdown-menu`
  | `/examples/command/popover`
  | `/examples/context-menu/demo`
  | `/examples/dialog/demo`
  | `/examples/dropdown-menu/checkboxes`
  | `/examples/dropdown-menu/demo`
  | `/examples/dropdown-menu/radio-group`
  | `/examples/hover-card/demo`
  | `/examples/input/demo`
  | `/examples/input/disabled`
  | `/examples/input/file`
  | `/examples/input/with-button`
  | `/examples/input/with-label`
  | `/examples/input/with-text`
  | `/examples/label/demo`
  | `/examples/menubar/demo`
  | `/examples/navigation-menu/demo`
  | `/examples/popover/demo`
  | `/examples/progress/demo`
  | `/examples/radio-group/demo`
  | `/examples/scroll-area/demo`
  | `/examples/select/demo`
  | `/examples/separator/demo`
  | `/examples/sheet/demo`
  | `/examples/sheet/position`
  | `/examples/sheet/size`
  | `/examples/skeleton/demo`
  | `/examples/slider/demo`
  | `/examples/switch/demo`
  | `/examples/tabs/demo`
  | `/examples/textarea/demo`
  | `/examples/textarea/disabled`
  | `/examples/textarea/with-button`
  | `/examples/textarea/with-label`
  | `/examples/textarea/with-text`
  | `/examples/toast/demo`
  | `/examples/toast/destructive`
  | `/examples/toast/simple`
  | `/examples/toast/with-action`
  | `/examples/toast/with-title`
  | `/examples/toggle/demo`
  | `/examples/toggle/disabled`
  | `/examples/toggle/lg`
  | `/examples/toggle/outline`
  | `/examples/toggle/sm`
  | `/examples/toggle/with-text`
  | `/examples/tooltip/demo`
  | `/examples/typography/blockquote`
  | `/examples/typography/demo`
  | `/examples/typography/h1`
  | `/examples/typography/h2`
  | `/examples/typography/h3`
  | `/examples/typography/h4`
  | `/examples/typography/inline-code`
  | `/examples/typography/large`
  | `/examples/typography/lead`
  | `/examples/typography/list`
  | `/examples/typography/muted`
  | `/examples/typography/p`
  | `/examples/typography/small`
  | `/examples/typography/table`

export type Params = {}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>()
export const { redirect } = utils<Path, Params>()
