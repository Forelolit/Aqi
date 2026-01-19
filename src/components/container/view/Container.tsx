import type { FC } from 'react';
import type { ContainerProps } from '../types/types';
import classNames from 'classnames';

export const Container: FC<ContainerProps> = ({ children, className = '' }) => {
    return <div className={classNames(className, 'container mx-auto')}>{children}</div>;
};
