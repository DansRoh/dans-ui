import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Button from './button'

const meta: Meta<typeof Button> = {
    title: 'Button 按钮',
    id: 'Button',
    component: Button,
    tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    name: 'button',
    args: {
        //👇 The args you need here will depend on your component
        children: 'primary button',
        btnType: 'default'
    },
};




