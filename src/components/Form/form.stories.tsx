import type {Meta, StoryFn} from '@storybook/react'
import React from 'react';
import Form from './index'
import Item from './formItem'

const meta: Meta<typeof Form> = {
    title: 'Form',
    id: 'Form',
    tags: ['autodocs'],
    component: Form,
}

export default meta;

const Template: StoryFn<typeof Form> = (args) => (
    <Form {...args}>
        <Item label='username' name='username' rules={[{required: true, message:'please input your username'}]}>
            <input type="text"/>
        </Item>
        <Item label='password' name='password' rules={[{required: true, message: 'please input your password'}]}>
            <input type="password"/>
        </Item>
    </Form>
)

export const BaseForm = Template.bind({})
BaseForm.storyName = 'BaseForm'