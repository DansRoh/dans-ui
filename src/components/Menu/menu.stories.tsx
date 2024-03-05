import React from 'react';
import {Meta, StoryObj} from "@storybook/react";
import {Story} from "@storybook/blocks";
import Menu from "./menu";
import Item from "./menuItem"
import SubMenu from "./subMenu";

const meta: Meta<typeof Menu> = {
    title: 'Menu',
    id: 'Menu',
    tags: ['autodocs'],
    args: {mode: "vertical", defaultOpenSubMenus: ['3']},
    component: Menu,
    decorators: [
        (Story) => (
            <div>
                <Story></Story>
            </div>
        )
    ]
}

export default meta;

type Story = StoryObj<typeof Menu>;

export const BasicMenu: Story = {
    render: (args) => (
        <Menu {...args}>
            <Item>你好</Item>
            <Item>中午和i</Item>
            <Item>撒的发大水</Item>
            <SubMenu title={'选项1'}>
                <Item>1-1</Item>
                <Item>1-2</Item>
                <Item>1-3</Item>
            </SubMenu>
        </Menu>
    )
}

