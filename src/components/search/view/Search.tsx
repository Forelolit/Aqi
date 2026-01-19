import type { FC } from 'react';
import type { SearchProps } from '../types/types';
import { Button, Input } from '@/components/index';

export const Search: FC<SearchProps> = ({ disabled, onChange, onClick, placeholder, value }) => {
    return (
        <div className="bg-neutral-600/30 backdrop-blur-sm flex gap-2 p-2 rounded-[15px] w-fit">
            <Input
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                onKeyDown={(e) => e.key === 'Enter' && onClick()}
            />
            <Button disabled={disabled} onClick={onClick}>
                Искать
            </Button>
        </div>
    );
};
