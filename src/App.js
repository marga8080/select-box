import React, {Component} from 'react';
import {Button} from 'antd'
import SelectModal from "./widgets/SelectModal";

class App extends Component {
    state = {
        visible: false,
        value: []

    }

    open = () => {
        const {value} = this.state;
        const _this = this;
        SelectModal.open({
            title: '选择...',
            value,
            onOk(result) { //确定按钮 返回选中的json 与input结构相同
                _this.setState({value: result})
            },
            onCancel() { //取消按钮

            },
        })
    }

    render() {
        return (
            <div style={{marginTop: 50, marginLeft: 50}}>
                <Button type="primary" size={"large"} onClick={this.open}>打开</Button>
                <div style={{marginTop: 10, fontSize: 16}}>
                结果：
                    <pre style={{width: 500, maxHeight: 500, padding: 10, overflow: 'auto', backgroundColor: '#F3F3F3'}}>
                        {require('js-beautify')(JSON.stringify(this.state.value))}
                    </pre>
                </div>
            </div>
        );
    }
}

export default App;
