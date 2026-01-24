import React from 'react';
import classNames from 'classnames';

export interface CarouselSideMenuItemProps {
  title: string;
  icon?: React.ElementType;
  selected?: boolean;
  sectionDividerLabel?: string;
  onClick?: () => void;
  className?: string;
}

export const CarouselSideMenuItem: React.FC<CarouselSideMenuItemProps> = ({
  title,
  icon: Icon,
  selected = false,
  onClick,
  className
}) => {
  return (
    <div
      className={classNames(
        'w-[240px] bg-transparent flex items-center justify-start gap-2.5 px-8 py-2.5 rounded-[4px] cursor-pointer transition-colors',
        {
          'bg-white': selected,
          'hover:bg-white': !selected
        },
        className
      )}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      {Icon && (
        <Icon  size={'16px'}
          className={classNames({
            '!text-g-v2-800': selected,
            'text-g-v2-400': !selected
          })}
        />
      )}
      <span
        className={classNames('text-sm-medium', {
          '!text-g-v2-800': selected,
          'text-g-v2-400': !selected
        })}
      >
        {title}
      </span>
    </div>
  );
};