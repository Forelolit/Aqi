import type { ChangeEventHandler } from 'react';

export interface SearchProps {
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
    value: string | number | readonly string[] | undefined;
    placeholder: string;
    disabled: boolean;
    onClick: () => void;
}
