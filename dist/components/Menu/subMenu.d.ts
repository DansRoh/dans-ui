import { FC, ReactNode } from 'react';
export interface SubMenuProps {
    title: string;
    index?: string;
    children?: ReactNode;
    className?: string;
}
declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
