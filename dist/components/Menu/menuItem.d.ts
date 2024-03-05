import React, { FC, ReactNode } from 'react';
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
}
declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
