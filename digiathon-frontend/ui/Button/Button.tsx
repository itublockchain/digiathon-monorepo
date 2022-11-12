import { MixedElement } from '@ethylene/types';
import { clsnm } from '@ethylene/utils';
import { ComponentPropsWithoutRef, RefObject, useMemo } from 'react';
import { Spinner } from 'ui/Spinner/Spinner';

type ButtonColor = 'primary' | 'light' | 'dark' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: MixedElement;
  rightIcon?: MixedElement;
  forwardedRef?: RefObject<HTMLButtonElement>;
  color: ButtonColor;
  className?: string;
  size?: ButtonSize;
  absolute?: boolean;
}

export function Button({
  loading,
  disabled,
  leftIcon,
  rightIcon,
  forwardedRef,
  className,
  children,
  color,
  size = 'medium',
  absolute,
  ...props
}: ButtonProps) {
  const colorAndSizeClassNames = useButtonClassName(size, color);

  return (
    <button
      ref={forwardedRef}
      className={clsnm(
        `flex items-center rounded-lg outline-none justify-center hover:scale-102 duration-150 ${
          absolute ? 'absolute' : 'relative'
        } ${colorAndSizeClassNames}`,
        className,
        disabled && 'pointer-events-none opacity-60 select-none',
        loading && 'pointer-events-none cursor-wait',
      )}
      {...props}
    >
      {loading && <Spinner className="absolute" />}

      {leftIcon != null ? (
        <div
          className={clsnm(
            'text-xl',
            children != null && 'mr-2',
            loading && 'opacity-0',
          )}
        >
          {leftIcon}
        </div>
      ) : null}
      <span className={clsnm(loading && 'opacity-0')}>{children}</span>
      {rightIcon != null ? (
        <div
          className={clsnm(
            'text-xl',
            children != null && 'ml-2',
            loading && 'opacity-0',
          )}
        >
          {rightIcon}
        </div>
      ) : null}
    </button>
  );
}

// helpers

export const useButtonClassName = (
  size: ButtonSize,
  color: ButtonColor,
): string => {
  const colorAndSizeClassNames = useMemo((): string => {
    let arr: string[] = [];

    /**
     * Apply color styles
     */
    if (color === 'primary') {
      arr = [
        'bg-buttonPrimaryBg',
        'hover:bg-buttonPrimaryBgHover',
        'active:bg-buttonPrimaryBgActive',
        'text-white',
      ];
    } else if (color === 'light') {
      arr = [
        'bg-buttonLightBg',
        'hover:bg-buttonLightBgHover',
        'active:bg-buttonLightBgActive',
        'text-buttonLightColor',
      ];
    } else if (color === 'dark') {
      arr = [
        'bg-buttonDarkBg',
        'hover:bg-buttonDarkBgHover',
        'active:bg-buttonDarkBgActive',
        'text-white',
      ];
    } else if (color === 'danger') {
      arr = [
        'bg-buttonDangerBg',
        'hover:bg-buttonDangerBgHover',
        'active:bg-buttonDangerBgActive',
        'text-white',
      ];
    }

    /**
     * Apply size styles
     */
    if (size === 'small') {
      arr.push('py-1 px-2 text-sm h-9');
    } else if (size === 'medium') {
      arr.push('py-2 px-4 text-base h-10');
    } else if (size === 'large') {
      arr.push('py-2.5 px-6 text-base h-11');
    } else if (size === 'xlarge') {
      arr.push('py-3 px-8 text-lg h-12');
    }
    return arr.join(' ');
  }, [color, size]);

  return colorAndSizeClassNames;
};
