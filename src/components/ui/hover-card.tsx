import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cn } from '~/lib/utils.ts';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = forwardRef<
  ElementRef<typeof HoverCardPrimitive.Content>,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({
  className, align = 'center', sideOffset = 4, ...props
}, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'animate-in zoom-in-90 z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
