import React, {Component} from 'react';
import {Button, Modal} from 'antd'
import SelectBox from "./components/SelectBox";
import {search, fetchDept, fetchUser} from './services/DataService'

class App extends Component {
    state = {
        visible: false,
        value: []

    }

    handleSearch = (value) => {
        return search(value);
    }

    handleFetchDept = (id) => {
        return fetchDept(id);
    }


    handleFetchUser = (deptId, pageNo) => {
        return fetchUser(deptId, pageNo);
    }

    handleChange = (value) => {
        this.setState({value})
    }

    render() {
        return (
            <div style={{marginTop: 80, textAlign: 'center'}}>
                <Button type="primary" size={"large"} onClick={() => {
                    this.setState({visible: true})
                }}>打开</Button>
                <Modal
                    title="Basic Modal"
                    onCancel={() => this.setState({visible: false})}
                    footer={null}
                    maskClosable={false}
                    width={620}
                    visible={this.state.visible}>
                    <SelectBox
                        value={this.state.value}
                        onChange={this.handleChange}
                        onSearch={this.handleSearch}
                        onFetchDept={this.handleFetchDept}
                        onFetchUser={this.handleFetchUser}
                    />
                </Modal>
            </div>
        );
    }
}

export default App;
