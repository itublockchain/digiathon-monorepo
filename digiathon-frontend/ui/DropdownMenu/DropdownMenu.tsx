import { clsnm } from '@ethylene/utils';
import { ComponentPropsWithoutRef } from 'react';

export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  closeOnClickOutside?: boolean;
  close?: () => void;
  disablePadding?: boolean;
}

export const DropdownMenu = ({
  children,
  className,
  disablePadding,
  ...props
}: DropdownMenuProps) => {
  return (
    <div
      className={clsnm(
        'w-48 drop-shadow-lg bg-white border-1 border-neutral-200 dark:bg-neutral-800 dark:border-neutral-900 rounded-md',
        !disablePadding && 'px-5 py-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
