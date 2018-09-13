import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Tree, Row, Col, Icon, List, Checkbox, Button, Spin, Divider} from 'antd';

const TreeNode = Tree.TreeNode;

const boxHeight = 280;
const pageSize = 10;

const spliter = "#@#";

const items2keys = (items) => {
    if (!items) {
        return [];
    }
    let citems = [];
    items.map(item => {
        if (item.type === "user") {
            citems.push(item.id + spliter + item.name);
        }
    });
    return citems;
}
/**
 * 用户选择
 */
export default class User extends Component {
    static propTypes = {
        onFetchDept: PropTypes.func,
        onFetchUser: PropTypes.func,
        checkedItems: PropTypes.array,
        onChecked: PropTypes.func,
        height: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            expandedKeys: [],
            selectedKeys: [],
            dataSource: [],
            loading: false,
            loadingMore: false,
            showLoadingMore: false, // 是否要显示加在更多按钮
            checkedValues: items2keys(props.checkedItems),
        }
        this.pageNo = 1;
    }

    componentWillReceiveProps(props) {
        this.setState({
            checkedValues: items2keys(props.checkedItems),
        })
    }

    componentWillMount() {
        this.pageNo = 1;
        this.loadDepts();
    }

    onExpand = (expandedKeys) => {
        this.setState({expandedKeys});
    }

    onSelect = (selectedKeys) => {
        this.setState({selectedKeys});
        this.pageNo = 1;
        this.setState({dataSource: []})
        this.loadUsers(selectedKeys[0]);
    }

    onChecked = (checkedValues) => {
        this.setState({checkedValues});
        let items = [];
        checkedValues.map(value => {
            let vls = value.split(spliter);
            let item = {};
            item.id = vls[0];
            item.name = vls[1];
            item.type = "user";
            items.push(item);
        });
        let checkedItems = this.props.checkedItems;
        // 非用户的item需要保留
        checkedItems = checkedItems.filter(item => item.type !== "user");
        this.props.onChecked([...checkedItems, ...items]);
    }

    loadUsers = (deptId) => {
        this.setState({loading: true, loadingMore: true})
        return this.props.onFetchUser(deptId, this.pageNo++).then(array => {
            this.setState({loading: false, loadingMore: false})
            if (array) {
                this.setState({
                    dataSource: this.state.dataSource.concat(array),
                    showLoadingMore: array.length >= pageSize,
                });
            }
        })
    }

    loadDepts = (treeNode) => {
        let id = null;
        if (treeNode) {
            id = treeNode.props.id;
        }
        return this.props.onFetchDept(id).then(data => {
            if (!data) {
                return;
            }
            let selectedKey = null;
            data = data.map((item, index)=> {
                if (!item.leaf && index === 0) {// 展开第一个节点
                    selectedKey = item.id;
                }
                return {
                    ...item,
                    title: item.name,
                    key: item.id,
                    isLeaf: item.leaf,
                };
            });
            if (treeNode) {
                treeNode.props.dataRef.children = data;
                this.setState({treeData: [...this.state.treeData]});
            } else {
                this.setState({treeData: data});
                if (selectedKey) {
                    this.setState({expandedKeys: [selectedKey], selectedKeys: [selectedKey]});
                    this.pageNo = 1;
                    this.loadUsers(selectedKey);
                }
            }
        })
    }


    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode icon={<Icon type="folder" theme="outlined" />} {...item} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode icon={<Icon type="folder" theme="outlined" />} {...item} dataRef={item} />;
        });
    }

    render() {

        const {loadingMore, showLoadingMore} = this.state;

        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 12,height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.loadUsers.bind(this)}>加载更多...</Button>}
            </div>
        ) : null;

        const renderItem = item => {
            return (
                <List.Item>
                    <Checkbox value={item.id + spliter + item.name} style={{marginLeft:'10px'}}>
                        {item.name}
                    </Checkbox>
                </List.Item>
            )
        };

        return (
            <Row style={{height: this.props.height || boxHeight, border: '1px solid lightgray'}}>
                <Col span={12} style={{height: '100%', overflowY:'auto', borderRight:'1px solid lightgray'}}>
                    <Tree
                        showIcon
                        expandedKeys={this.state.expandedKeys}
                        selectedKeys={this.state.selectedKeys}
                        onExpand={this.onExpand}
                        onSelect={this.onSelect}
                        loadData={this.loadDepts}>
                        {this.renderTreeNodes(this.state.treeData)}
                    </Tree>
                </Col>
                <Col span={12} style={{height: '100%', overflowY:'auto'}}>
                    <Checkbox.Group style={{width:'100%'}} onChange={this.onChecked} value={this.state.checkedValues}>
                        <List
                            split
                            loadMore={loadMore}
                            loading={this.state.loading}
                            dataSource={this.state.dataSource}
                            renderItem={renderItem}
                        />
                        {
                            !showLoadingMore && <Divider style={{ margin: 0 }}/>
                        }
                    </Checkbox.Group>
                </Col>
            </Row>
        )
    }
}