import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Select, Spin, Icon} from 'antd'

const Option = Select.Option;

const spliter = "#@#";

const optionLabel = (item) => {
    return (
        <div>
            {item.type === "user" && <Icon type="user" />}
            {item.type === "dept" && <Icon type="folder" />}
            {item.type === "tag" && <Icon type="tag" />}
            {item.name}
        </div>
    )
};

const selectedItems = (items=[]) => {
    let result = [];
    items.map(item => {
        let im = {};
        im.key = item.id + spliter + item.name + spliter + item.type;
        im.label = optionLabel(item);
        result.push(im);
    })
    return result;
}

/**
 * 顶部搜索框
 */
export default class SelectSearch extends Component {

    static propTypes = {
        onSearch: PropTypes.func,
        onSelected: PropTypes.func,
        checkedItems: PropTypes.array,
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: selectedItems(props.checkedItems),
            fetching: false,
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: selectedItems(props.checkedItems),
        });
    }


    handleSearch = (value) => {
        if (!value || value === '') {
            this.setState({data: []});
            return;
        }
        this.setState({data: [], fetching: true });
        this.props.onSearch(value).then(data =>{
            this.setState({data, fetching: false})
        }).catch(err=>{
            this.setState({ fetching: false });
        })
    }


    handleChange = (value) => {
        this.setState({
            value,
            data: [],
        });

        let checkedItems = [];
        value.map(item => {
            let tmp = item.key.split(spliter);
            let im = {};
            im.id = tmp[0];
            im.name = tmp[1];
            im.type = tmp[2];
            checkedItems.push(im);
        })
        this.props.onSelected(checkedItems);
    }

    handleFilterOption = (inputValue, option) => {
        const {value} = this.state;
        let keys = [];
        value.map(item => {
            keys.push(item.key);
        });
        if (keys.indexOf(option.key) !== -1) {
            return false;
        }
        return true;
    }

    notFoundContent = (fetching, data) => {
        if (fetching) {
            return (<Spin size="small" />);
        }
        // if (data && data.length === 0) {
        //     return "暂无数据";
        // }
        return null;
    };

    render() {

        const {data, fetching, value} = this.state;

        return (
            <Select
                mode="multiple"
                labelInValue
                allowClear
                style={{width: '100%'}}
                placeholder="请选择"
                notFoundContent={this.notFoundContent(fetching, data)}
                value={value}
                filterOption={this.handleFilterOption}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
            >
                {
                    data.map(d =>
                        <Option key={d.id + spliter + d.name + spliter + d.type}>
                            {optionLabel(d)}
                        </Option>
                    )

                }
            </Select>
        )
    }
}