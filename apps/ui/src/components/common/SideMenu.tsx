import React from 'react';
import { CarouselSideMenuItem, CarouselSideMenuItemProps } from './SideMenuItem';

export interface CarouselSideMenuProps {
  items: CarouselSideMenuItemProps[];
  selectedIndex?: number;
  label?: string;
  onSelect?: (index: number) => void;
  className?: string;
}

export const CarouselSideMenu: React.FC<CarouselSideMenuProps> = ({
  items = [],
  selectedIndex,
  onSelect,
  label,
  className
}) => {
  return (
    <nav className={`carousel-side-menu flex flex-col gap-1 ${className || ''}`}>
      {label && <label>{label} </label>}
      {items.map((item, idx) => (
        <div key={`side-item-${idx}`}>
          {item?.sectionDividerLabel && (
            <label className='mt-[10px]'>{label} </label>
          )}
          <CarouselSideMenuItem
            key={idx}
            {...item}
            selected={selectedIndex === idx}
            onClick={() => onSelect?.(idx)}
          />
        </div>
      ))}
    </nav>
  );
};