import {Meta, StoryFn} from '@storybook/react';
import Menu from "./index";
import React from 'react';
import Item from "./menuItem";
import SubMenu from "./subMenu";

const meta: Meta<typeof Menu> = {
    title: 'Menu',
    id: 'Menu',
    component: Menu,
    tags: ['autodocs'],
    args: {
        defaultIndex: '1'
    }
}

export default meta

const Template: StoryFn<typeof Menu> = (args) => (
    <Menu {...args}>
        <Item>
            选项一
        </Item>
        <Item>
            选项二
        </Item>
        <Item disabled>
            选项三
        </Item>
        <SubMenu title={'下拉选项'}>
            <Item>
                4-1
            </Item>
            <Item>
                4-2
            </Item>
        </SubMenu>
    </Menu>
)

export const DefaultMenu = Template.bind({})
DefaultMenu.storyName = '默认Menu'

export const ClickMenu = Template.bind({})
ClickMenu.args = {
    defaultIndex: '0',
    mode: 'vertical'
}
ClickMenu.storyName = '纵向Menu'

