import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Tabs, Button} from 'antd'
import Dept from "./Dept";
import User from "./User";
import SelectSearch from "./SelectSearch";

const TabPane = Tabs.TabPane;

export default class SelectBox extends Component {

    static propTypes = {
        onSearch: PropTypes.func,
        onFetchDept: PropTypes.func,
        onFetchUser: PropTypes.func,
        onChange: PropTypes.func,
        height: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: props.value || [],
        }
    }
    
    componentWillReceiveProps(props) {
        this.setState({
            checkedItems: props.value || [],
        })
    }

    onSelected = (checkedItems) => {
        this.setState({checkedItems});
    }

    handleOk = () => {
        this.props.onChange(this.state.checkedItems);
    }

    handleSearch = (value) => {
        return this.props.onSearch(value);
    }

    handleFetchDept = (id) => {
        return this.props.onFetchDept(id);
    }


    handleFetchUser = (deptId, pageNo) => {
        return this.props.onFetchUser(deptId, pageNo);
    }

    render() {
        const {checkedItems} = this.state;

        return (
            <div>
                <SelectSearch
                    checkedItems={checkedItems}
                    onSelected={this.onSelected}
                    onSearch={this.handleSearch}/>
                <Tabs defaultActiveKey="1" tabBarGutter={5} >
                    <TabPane tab="部门" key="1">
                        <Dept
                            checkedItems={checkedItems}
                            onChecked={this.onSelected}
                            onFetchDept={this.handleFetchDept}/>
                    </TabPane>
                    <TabPane tab="成员" key="2">
                        <User
                            checkedItems={checkedItems}
                            onChecked={this.onSelected}
                            onFetchDept={this.handleFetchDept}
                            onFetchUser={this.handleFetchUser}/>
                    </TabPane>
                </Tabs>
                <div style={{textAlign:'right', margin: '10px 10px -10px'}}>
                    <Button type="primary" onClick={() => this.handleOk.bind(this)}>确定</Button>
                </div>
            </div>
        )
    }

}