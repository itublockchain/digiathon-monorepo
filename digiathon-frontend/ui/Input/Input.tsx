import { clsnm } from '@ethylene/utils';
import { ComponentPropsWithoutRef, ReactNode, RefObject } from 'react';
import { Typography } from 'ui/Typography/Typography';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  containerClassName?: string;
  containerRef?: RefObject<HTMLDivElement>;
  forwardedRef?: RefObject<HTMLInputElement>;
  extendHeight?: boolean;
  label?: ReactNode;
  error?: ReactNode;
}

export function Input({
  className,
  containerClassName,
  forwardedRef,
  containerRef,
  extendHeight = false,
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div
      ref={containerRef}
      className={clsnm(
        'flex',
        containerClassName,
        (label != null || error != null) && 'flex-col',
      )}
    >
      {label != null && (
        <>
          {typeof label === 'string' ? (
            <Typography className="ml-1 mb-1">{label}</Typography>
          ) : (
            label
          )}
        </>
      )}
      <input
        ref={forwardedRef}
        className={clsnm(
          'outline-none w-full rounded-lg p-4 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-200 border-neutral-300 dark:border-neutral-800 border-1 focus:border-blue-200 focus:shadow-input dark:focus:shadow-inputDark focus:duration-200',
          className,
          !extendHeight && 'h-12',
        )}
        {...props}
      />
      {error != null && (
        <>
          {typeof error === 'string' ? (
            <Typography extendColor className="ml-1 mt-1 text-red-600 text-sm">
              {error}
            </Typography>
          ) : (
            error
          )}
        </>
      )}
    </div>
  );
}
