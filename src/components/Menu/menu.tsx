import React, {Children, cloneElement, createContext, FunctionComponentElement, ReactNode, useState} from 'react';
import classNames from "classnames";
import {MenuItemProps} from "./menuItem";

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex:string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    children?: ReactNode;
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({index: '0'})
const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex,className,mode,style,onSelect,children,defaultOpenSubMenus} = props;
    const [currentActive, setCurrentActive] = useState(defaultIndex)
    const classes = classNames("dans-menu", className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index: string) => {
        setCurrentActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext:IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return Children.map(children, (child,index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error('Warning: Menu有一个Child不是MenuItem')
            }
        })
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
};

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu;