import { FC, ReactNode } from 'react';
import { RuleItem } from "async-validator";
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
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
export declare const FormItem: FC<FormItemProps>;
export default FormItem;
