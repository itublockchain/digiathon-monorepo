import { clsnm } from '@ethylene/utils';
import React, { ComponentPropsWithoutRef } from 'react';

interface TabsProps extends ComponentPropsWithoutRef<'div'> {}

export function Tabs({ className, children, ...props }: TabsProps) {
  return (
    <div
      className={clsnm(
        'flex space-x-6 border-b-2 pb-2 border-neutral-300 dark:border-neutral-800',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
