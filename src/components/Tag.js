import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {List, Checkbox, Button, Spin, Divider, Icon} from 'antd';


const boxHeight = 280;
const pageSize = 10;


const items2keys = (items) => {
    if (!items) {
        return [];
    }
    let citems = [];
    items.map(item => {
        if (item.type === "tag") {
            citems.push(item.id);
        }
    });
    return citems;
}

/**
 * 列表选择
 */
export default class Tag extends Component {
    static propTypes = {
        onFetchTag: PropTypes.func,
        checkedItems: PropTypes.array,
        onChecked: PropTypes.func,
        height: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
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
        this.loadList();
    }

    loadList() {
        this.setState({loading: true, loadingMore: true})
        return this.props.onFetchTag(this.pageNo++).then(array => {
            this.setState({loading: false, loadingMore: false})
            if (array) {
                this.setState({
                    dataSource: this.state.dataSource.concat(array),
                    showLoadingMore: array.length >= pageSize,
                });
            }
        })
    }

    onClickCheckBoxItem(item) {
        item.type = this.props.type;
        let checkedItems = this.props.checkedItems;
        let findres = checkedItems.find(it => it.type === item.type && it.id.toString() === item.id.toString());
        if (findres) { //存在则取消选中
            checkedItems = checkedItems.filter(it => !(it.type === item.type && it.id.toString() === item.id.toString()));
        } else {
            checkedItems.push(item);
        }
        this.props.onChecked(checkedItems);
    }

    render() {

        const {loadingMore, showLoadingMore} = this.state;

        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 12,height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.loadList.bind(this)}>加载更多...</Button>}
            </div>
        ) : null;

        const renderItem = item => {
            return (
                <List.Item
                    className={"list-item"}
                    onClick={this.onClickCheckBoxItem.bind(this, item)}
                    actions={[<Checkbox value={item.id} style={{marginLeft:'10px'}}/>]}>
                    <Icon type="tag" style={{marginRight: 8}}/> {item.name}
                </List.Item>
            )
        };

        return (
            <div style={{height: this.props.height || boxHeight, overflowY:'auto', border:'1px solid lightgray'}}>
                <Checkbox.Group style={{width:'100%'}} value={this.state.checkedValues}>
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
            </div>
        )
    }

}