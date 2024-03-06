import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import React from 'react';
import Form from './index'
import Item from './formItem'

const meta: Meta<typeof Form> = {
    title: 'Form 表单',
    id: 'Form',
    tags: ['autodocs'],
    component: Form,
    decorators: [
        (Story) => (
            <div style={{width: 550}}>
                <Story />
            </div>
        )
    ]
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