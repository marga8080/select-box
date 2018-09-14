/**
 * Created by Administrator
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'antd';
import SelectBox from '../components/SelectBox';
import {fetchDept, fetchUser, fetchTag, search} from "../services/DataService";


export default class SelectModal {

    static open(options) {
        let div = document.getElementById("select-modal-box");
        if (!div) {
            div = document.createElement('div');
            div.id = 'select-modal-box';
            document.body.appendChild(div);
        }

        ReactDOM.render(<SelectModalComponent {...options} />, div);
    }

}


class SelectModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            visible: true,
            title: props.title
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            visible: true,
            title: nextProps.title
        });
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

    handleFetchTag = (pageNo) => {
        return fetchTag(pageNo);
    }

    handleChange = (value) => {
        console.log(value)
        this.setState({value})
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.props.onOk(this.state.value)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.props.onCancel()
    }

    render() {
        return (
            <Modal
                ref="modal"
                title={this.state.title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={600}
            >
                {
                    this.state.visible ? (
                        <div style={{margin: '-10px'}}>
                            <SelectBox
                                height={280}
                                value={this.state.value}
                                onChange={this.handleChange}
                                onSearch={this.handleSearch}
                                onFetchDept={this.handleFetchDept}
                                onFetchUser={this.handleFetchUser}
                                onFetchTag={this.handleFetchTag}
                            />
                        </div>
                    ) : null
                }

            </Modal>
        );
    }


}