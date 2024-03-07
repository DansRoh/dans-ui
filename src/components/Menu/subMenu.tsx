import React, {Children, cloneElement, FC, FunctionComponentElement, ReactNode, useContext, useState, MouseEvent} from 'react';
import {MenuContext} from "./menu";
import classNames from "classnames";
import Transition from "../Transition";
import Icon from "../Icon";

export interface SubMenuProps {
    title: string;
    index?: string;
    children?: ReactNode;
    className?: string;
}
export const SubMenu:FC<SubMenuProps> = (props) => {
    const { title,index,className,children} = props
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setMenuOpen] = useState(isOpened)
    const classes = classNames("menu-item submenu-item", className, {
        'is-active': index === context.index,
        'is-vertical': context.mode === 'vertical',
        'is-opened': menuOpen
    })
    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer: any;
    const handleMouse = (e: MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(( ) => {
            setMenuOpen(toggle)
        }, 30)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode === 'horizontal' ? {
        onMouseMove: (e: MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: MouseEvent) => { handleMouse(e, false) }
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('dans-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<SubMenuProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                return cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning: SubMenu有一个Child不是MenuItem')
            }
        })

        return (
            <Transition
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"/>
            </div>
            { renderChildren() }
        </li>
    );
};
SubMenu.displayName = 'SubMenu'
export type subMenuType = typeof SubMenu
export default SubMenu;