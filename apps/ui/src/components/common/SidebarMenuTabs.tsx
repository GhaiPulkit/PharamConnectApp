
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CarouselSideMenuItemProps } from './SideMenuItem';
import React from 'react';
import { CarouselSideMenu } from './SideMenu';

export type CarouselSideMenuItemContentProps = CarouselSideMenuItemProps & {
  content: ReactNode;
};
export type CarouselSideMenuTabsProps = {
  sideMenuItems: CarouselSideMenuItemContentProps[];
  label?: string;
};

const CarouselSideMenuTabs = ({ sideMenuItems, label }: CarouselSideMenuTabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(sideMenuItems?.length ? 0 : null);
  const sectionRefs = Array.from({ length: sideMenuItems?.length || 0 }).map(() => useRef<HTMLDivElement | null>(null));

  const onSelect = (idx: number) => {
    setSelectedIndex(idx);
    const targetRef = sectionRefs[idx];
    if (targetRef && idx !== null && targetRef?.current) {
      targetRef?.current && scrollTo(targetRef);
    }
    // setSelectedItem(sideMenuItems[idx]);
  };

  const conatinerRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    if (!sideMenuItems?.length) {
      return;
    }
  }, [sideMenuItems]);

  useEffect(() => {
    const observerOptions = {
      root: conatinerRef.current,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries?.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find the index of the element that entered the view
          const index = sectionRefs?.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) {
            setSelectedIndex(index);
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing each ref
    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  return (
    <div className="w-full h-full overflow-hidden p-1">
      <div className="h-full grid grid-cols-[auto_1fr] w-full">
        <div className="w-auto h-full">
          <CarouselSideMenu
            items={sideMenuItems}
            selectedIndex={0}
            onSelect={onSelect}
            label={label}
          />
        </div>
        <div
          ref={conatinerRef}
          className="min-h-0 overflow-y-auto p-2 overflow-x-hidden custom-scrollbar scroll-smooth flex flex-col gap-2"
        >
          {sideMenuItems?.map((item, index) => (
            <div key={`side-menu-item-${index}`} ref={sectionRefs[index]}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSideMenuTabs;