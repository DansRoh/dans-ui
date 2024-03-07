import React, {ChangeEvent, forwardRef, InputHTMLAttributes, ReactElement} from 'react';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon";

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>{
    /** 是否禁用 */
    disabled?: boolean;
    icon?: IconProp;
    size?: InputSize;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Input = forwardRef<HTMLInputElement, InputProps>((props,ref) => {
    const {
        disabled,
        icon,
        size,
        prepend,
        append,
        style,
        ...restProps
    } = props
    const classnames = classNames('dans-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })
    return (
        <div className={classnames} style={style}>
            {prepend && <div className="dans-input-group-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input
                ref={ref}
                className="dans-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="dans-input-group-append">{append}</div>}
        </div>
    );
})

export default Input;