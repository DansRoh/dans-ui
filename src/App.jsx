import Button from "./components/Button/button";

function App() {
    return (
        <div className="App">
            <Button btnType={'primary'} size='lg'>按钮</Button>
            <Button btnType={'danger'} size='sm'>按钮</Button>
            <Button btnType={'default'} size='lg'>按钮</Button>
            <Button size='sm' disabled>禁用</Button>
            <Button btnType='link' href={'baidu.com'} size='sm'>link</Button>
        </div>
    );
}

export default App;
