import { MixedElement } from '@ethylene/types';
import { clsnm } from '@ethylene/utils';
import { ReactNode } from 'react';
import { Typography } from 'ui/Typography/Typography';

type TabProps = {
  onClick: <T>(to: T) => void;
  children: ReactNode;
  textProps?: any;
  isActive: boolean;
  icon?: MixedElement;
};

export function Tab({
  onClick,
  children,
  isActive,
  textProps,
  icon,
}: TabProps) {
  return (
    <div onClick={onClick}>
      <Typography
        extendColor
        className={clsnm(
          'text-sm md:text-base lg:text-lg cursor-pointer select-none',
          textProps?.className,
          isActive
            ? 'text-black dark:text-white'
            : 'text-neutral-400 dark:text-neutral-500',
        )}
        {...textProps}
      >
        <div className="flex space-x-2 md:space-x-4 items-center">
          {icon != null && (
            <div className="flex items-center justify-center mr-1">{icon}</div>
          )}
          {children}
        </div>
      </Typography>
    </div>
  );
}
