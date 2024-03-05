import React, {cloneElement, FC, ReactNode, useContext, useEffect} from 'react';
import classNames from 'classnames'
import {FormContext} from "./form";
import {RuleItem} from "async-validator";

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

export interface FormItemProps {
    label?: string;
    name: string;
    children?: ReactNode;
    valuePropName?: string;
    trigger?: string;
    getValueFromEvent?: (e: any) => any;
    rules?: RuleItem[];
    validateTrigger?: string;
}

export const FormItem: FC<FormItemProps> = (props) => {
    const {
        label,
        name,
        children,
        valuePropName,
        trigger,
        getValueFromEvent,
        rules,
        validateTrigger,
    } = props as SomeRequired<FormItemProps, 'valuePropName' | 'trigger' | 'getValueFromEvent' | 'validateTrigger'>
    const rowClass = classNames('dans-row', {
        'dans-row-no-label': !label
    })
    const {dispatch, fields, initialValues, validateField} = useContext(FormContext)

    useEffect(() => {
        const value = initialValues && initialValues[name];
        dispatch({type: 'addField', name, value: {label, name, value, rules}})
    }, []);

    // 获取store中对应的value
    const fieldState = fields[name]
    const value = fieldState && fieldState.value
    const errors = fieldState && fieldState.errors
    const isRequired = rules?.some(rule => rule.required)
    const hasError = errors && errors.length > 0
    const labelClass = classNames({
        'dans-form-item-label-required': isRequired
    })
    const itemClass = classNames('dans-form-item-control', {
        'dans-form-item-has-error': hasError
    })
    const onValueUpdate = (e: any) => {
        const value = getValueFromEvent(e)
        dispatch({type: 'updateValue', name, value})
    }
    const onValueValidate = async () => {
        await validateField(name)
    }
    // 1. 手动创建一个属性列表,需要有value以及onChange属性
    const controlProps: Record<string, any> = {}
    controlProps[valuePropName] = value;
    controlProps[trigger] = onValueUpdate
    if (rules) {
        controlProps[validateTrigger] = onValueValidate
    }
    // 2. 获取children数组的第一个元素
    const childrenList = React.Children.toArray(children)
    if (childrenList.length === 0) {
        console.error('在Form.Item中没有发现子元素')
    }
    if (childrenList.length > 1) {
        console.warn('在Form.Item中应该只包含一个子元素')
    }
    if (!React.isValidElement(childrenList[0])) {
        console.error('Form.Item中的元素不是ReactElement')
    }

    const child = childrenList[0] as React.ReactElement
    // 3. 使用cloneElement，混合这个children 以及 手动的属性列表
    const returnChildNode = cloneElement(child, {
        ...child.props,
        ...controlProps
    })

    return (
        <div className={rowClass}>
            {
                label &&
                <div className='dans-form-item-label'>
                    <label title={label} className={labelClass}>
                        {label}
                    </label>
                </div>
            }
            <div className='dans-form-item'>
                <div className={itemClass}>{returnChildNode}</div>
                {   hasError &&
                    <div className='dans-form-item-explain'>
                        <span>{errors[0].message}</span>
                    </div>
                }
            </div>
        </div>
    );
};

FormItem.defaultProps = {
    valuePropName: 'value',
    trigger: 'onChange',
    validateTrigger: 'onBlur',
    getValueFromEvent: (e) => e.target.value,
}

export default FormItem;