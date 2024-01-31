import React from "react";
import Form from "./components/Form/form";
import Item from "./components/Form/formItem"
import Button from "./components/Button/button";

function App() {
    return (
        <div className="App">
            <Form initialValues={{name: '罗达', agreement: true}}>
                <Item name='name' label='用户名' rules={[{required: true, message: '请填写用户名'}]}>
                    <input type="text"/>
                </Item>
                <Item name='password' label='密码'>
                    <input type="password"/>
                </Item>
                <Item name='nolabel'>
                    <input placeholder='no-label'/>
                </Item>
                <div className='agreement-section' style={{display: "flex",justifyContent: "center"}}>
                    <Item name='agreement' valuePropName={'checked'} getValueFromEvent={(e) => e.target.checked}>
                        <input type="checkbox"/>
                    </Item>
                    <span className='agree-text'>注册即代表你同意<a href='http://baidu.com'>用户协议</a></span>
                </div>
                <div className='dans-form-submit-area'>
                    <Button style={{width: 120}} type='submit' btnType='primary' size='sm'>登陆</Button>
                </div>
            </Form>
        </div>
    );
}

export default App;
