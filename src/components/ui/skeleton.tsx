'use client'

import { cn } from '~/utils/utils.ts'
import { HTMLAttributes } from 'react'

function Skeleton({
                    className,
                    ...props
                  }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }