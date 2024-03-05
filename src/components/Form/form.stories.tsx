import type { Meta, StoryObj} from '@storybook/react'
import React from 'react';
import Form from './form'
import Item from './formItem'
import {Story} from "@storybook/blocks";

const meta: Meta<typeof Form> = {
    title: 'Form 表单',
    id: 'Form',
    tags: ['autodocs'],
    component: Form,
    // subcomponents: { 'Item': Item },
    decorators: [
        (Story) => (
            <div style={{width: 550}}>
                <Story />
            </div>
        )
    ]
}

export default meta;

type Story = StoryObj<typeof Form>;

export const BasicForm: Story = {
    render: (args) => (
        <Form {...args}>
            <Item label='username' name='username' rules={[{required: true, message:'please input your username'}]}>
                <input type="text"/>
            </Item>
            <Item label='password' name='password' rules={[{required: true, message: 'please input your password'}]}>
                <input type="password"/>
            </Item>
        </Form>
    )
}