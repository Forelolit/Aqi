import type { FC } from 'react';
import type { SearchProps } from '../types/types';
import { Button, Input } from '@/components/index';

export const Search: FC<SearchProps> = ({ disabled, onChange, onClick, placeholder, value }) => {
    return (
        <div className="border border-neutral-600/60 shadow-[inset_0_1px_1px_rgb(113,113,113)] bg-neutral-600/30 backdrop-blur-sm flex gap-2 p-2 rounded-[15px] w-fit">
            <Input
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                onKeyDown={(e) => e.key === 'Enter' && onClick()}
            />
            <Button variant='outline' disabled={disabled} onClick={onClick}>
                Искать
            </Button>
        </div>
    );
};
