import React, {FC, ReactNode, createContext} from 'react';
import useStore from "./useStore";
import {FormItemProps} from "./formItem";

export interface FormProps {
    name?: string;
    initialValues?: Record<string, any>
    children?: ReactNode;
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'>
    & Pick<FormProps, 'initialValues'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = (props) => {
    const {name, children, initialValues} = props;
    const {form, fields, dispatch, validateField} = useStore()
    const passedContext: IFormContext = {
        dispatch,
        fields,
        initialValues,
        validateField
    }

    return (
        <form style={{width: 600}} name={name} className='dans-form'>
            <FormContext.Provider value={passedContext}>
                {children}
            </FormContext.Provider>
        </form>
    );
};
Form.defaultProps = {
    name: 'dans-form'
}

export default Form;