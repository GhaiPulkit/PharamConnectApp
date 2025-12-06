import React from 'react';
import { cn } from '../../../utils';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ElementType;
    iconSize?: string;
    title?: React.ReactNode;
    isActive?: boolean;
};

const PrimaryButton = ({ icon: Icon, iconSize = '1rem', title, isActive, className = '', ...props }: PrimaryButtonProps) => {
    return (
        <button
            {...props}
            className={cn(`rounded-2xl w-fit h-auto overflow-hidden flex justify-center items-center ${className}`.trim(), {
                '!bg-gradient-to-r from-grey-300 via-grey-500 to-white scale-[1.05]': isActive,
            })}
            style={{
                boxShadow:
                    'rgb(255 255 255) -1px -12px 30px 6px, rgb(160 160 160) 8px 5px 12px 1px',
            }}
            onClick={props.onClick}
        >
            <div className="w-fit p-[0.15rem] overflow-visible">
                <div className="content h-full w-full rounded-xl px-4 py-2 flex flex-col items-center gap-2">
                    {Icon && <Icon color={'grey'} size={iconSize}/>}
                    <span className="text-sm"> {title}</span>
                </div>
            </div>
        </button>
    );
}

export default PrimaryButton;