import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Tree, Icon} from 'antd';

const TreeNode = Tree.TreeNode;

const boxHeight = 280;


const items2keys = (items) => {
    if (!items) {
        return [];
    }
    let citems = [];
    items.map(item => {
        if (item.type === "dept") {
            citems.push(item.id);
        }
    });
    return citems;
}

/**
 * 部门选择
 */
export default class Dept extends Component {

    static propTypes = {
        onFetchDept: PropTypes.func,
        checkedItems: PropTypes.array,
        onChecked: PropTypes.func,
        height: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            treeData: [],
            expandedKeys: [],
            checkedKeys: items2keys(props.checkedItems),
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            checkedKeys: items2keys(props.checkedItems),
        })
    }

    componentWillMount() {
        this.onLoadData();
    }

    onExpand = (expandedKeys) => {
        this.setState({expandedKeys});
    }

    onCheck = (checkedKeys, {checked, node}) => {
        this.setState({checkedKeys});
        let {checkedItems} = this.props;
        if (checked) {
            // 选中
            let im = {};
            im.id = node.props.dataRef.id;
            im.name = node.props.dataRef.name;
            im.type = 'dept';
            checkedItems.push(im);
        } else {
            // 取消选中
            checkedItems = checkedItems.filter(item => item.id !== node.props.dataRef.id);
        }
        this.props.onChecked(checkedItems);
    }


    onLoadData = (treeNode) => {
        let id = null;
        if (treeNode) {
            id = treeNode.props.id;
        }
        return this.props.onFetchDept(id).then(data => {
            if (!data) {
                return;
            }
            let expends = [];
            data = data.map((item, index)=> {
                if (!item.leaf && index === 0) {// 展开第一个节点
                    expends.push(item.id);
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
                this.setState({treeData: data, expandedKeys: expends});
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
        return (
            <div style={{height: this.props.height || boxHeight, overflowY:'auto', border:'1px solid lightgray'}}>
                <Tree
                    showIcon
                    checkable={true}
                    checkStrictly={true}
                    checkedKeys={this.state.checkedKeys}
                    expandedKeys={this.state.expandedKeys}
                    onExpand={this.onExpand}
                    onCheck={this.onCheck}
                    loadData={this.onLoadData}>
                    {this.renderTreeNodes(this.state.treeData)}
                </Tree>
            </div>
        )
    }
}