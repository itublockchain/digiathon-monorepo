import { clsnm } from '@ethylene/utils';
import React, { CSSProperties, ReactNode } from 'react';

interface TypographyProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
  extendColor?: boolean;
  style?: CSSProperties;
}

export function Typography({
  as = 'span',
  children,
  className,
  extendColor = false,
  style = {},
  ...props
}: TypographyProps) {
  const Component: any = as;
  return (
    <Component
      className={clsnm(
        !extendColor && 'text-tdark dark:text-tlight',
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}
