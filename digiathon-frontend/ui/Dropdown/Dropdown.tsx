import { clsnm } from '@ethylene/utils';
import { Placement } from '@floating-ui/react-dom';
import { useDropdown } from 'hooks';
import { memo, ReactNode } from 'react';

type DropdownProp = {
  strategy?: 'fixed' | 'absolute';
  topDistance?: number;
  leftDistance?: number;
  placement?: Placement;
};

type Props = {
  children: ReactNode;
  reference: ReactNode;
  dropdownProps?: DropdownProp;
  closeOnClick?: boolean;
  referenceClassName?: string;
  containerClassName?: string;
};

export const Dropdown = ({
  children,
  reference,
  closeOnClick = true,
  dropdownProps = {},
  referenceClassName,
  containerClassName,
}: Props) => {
  const {
    closeRef,
    isOpen,
    toggle,
    close,
    floating,
    reference: referenceEl,
    popperStyles,
  } = useDropdown(dropdownProps);

  const ReferenceElement = memo(function ReferenceCompnent() {
    return (
      <div
        className={clsnm(referenceClassName)}
        ref={referenceEl}
        onClick={toggle}
      >
        {reference}
      </div>
    );
  });

  return (
    <div ref={closeRef} className={clsnm('flex w-max', containerClassName)}>
      <ReferenceElement />
      {isOpen && (
        <div
          onClick={() => {
            if (closeOnClick) {
              close();
            }
          }}
          ref={floating}
          style={popperStyles}
        >
          {children}
        </div>
      )}
    </div>
  );
};
