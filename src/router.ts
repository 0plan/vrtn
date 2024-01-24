// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from "@generouted/react-router/client";

export type Path =
  | `/`
  | `/example`
  | `/example/command/combobox`
  | `/example/command/demo`
  | `/example/command/dialog`
  | `/example/command/dropdown-menu`
  | `/example/command/popover`
  | `/example/context-menu/demo`
  | `/example/dialog/demo`
  | `/example/dropdown-menu`
  | `/example/dropdown-menu/checkboxes`
  | `/example/dropdown-menu/radio-group`
  | `/example/hover-card/demo`
  | `/example/input/demo`
  | `/example/input/disabled`
  | `/example/input/file`
  | `/example/input/with-button`
  | `/example/input/with-label`
  | `/example/input/with-text`
  | `/example/label/demo`
  | `/example/menubar/demo`
  | `/example/navigation-menu/demo`
  | `/example/popover/demo`
  | `/example/progress/demo`
  | `/example/radio-group/demo`
  | `/example/scroll-area/demo`
  | `/example/select/demo`
  | `/example/separator/demo`
  | `/example/sheet/demo`
  | `/example/sheet/position`
  | `/example/sheet/size`
  | `/example/skeleton/demo`
  | `/example/slider/demo`
  | `/example/switch/demo`
  | `/example/tabs/demo`
  | `/example/textarea/demo`
  | `/example/textarea/disabled`
  | `/example/textarea/with-button`
  | `/example/textarea/with-label`
  | `/example/textarea/with-text`
  | `/example/toast/demo`
  | `/example/toast/destructive`
  | `/example/toast/simple`
  | `/example/toast/with-action`
  | `/example/toast/with-title`
  | `/example/toggle/demo`
  | `/example/toggle/disabled`
  | `/example/toggle/lg`
  | `/example/toggle/outline`
  | `/example/toggle/sm`
  | `/example/toggle/with-text`
  | `/example/tooltip/demo`
  | `/example/typography/blockquote`
  | `/example/typography/demo`
  | `/example/typography/h1`
  | `/example/typography/h2`
  | `/example/typography/h3`
  | `/example/typography/h4`
  | `/example/typography/inline-code`
  | `/example/typography/large`
  | `/example/typography/lead`
  | `/example/typography/list`
  | `/example/typography/muted`
  | `/example/typography/p`
  | `/example/typography/small`
  | `/example/typography/table`;

export type Params = {};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>();
export const { redirect } = utils<Path, Params>();
