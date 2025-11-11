import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 *
 * @param args 'px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]'
 * @returns hover:bg-dark-red p-3 bg-[#B91C1C]
 */
export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}