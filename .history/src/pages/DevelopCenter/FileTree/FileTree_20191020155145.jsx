import { Menu, Button, Search, Tree } from '@alifd/next';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { init, find, addFile, deleteFile } from '../../../api/DevelopCenter.js';
import './FileTree.scss';

const { SubMenu, Item, Group, Divider } = Menu;

export default class FileTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      disabled: 'none',
      fileId: 0,
      rightClickId: 0,
    };
  }

  componentDidMount() {
    this.loadData();
    this.setState({
      disabled: 'none',
    });
  }

  loadData = () => {
    // const nodes = tree.data;
    const promise = init();
    promise.then((value) => {
      const result = this.convertData(value.data);
      this.setState({
        nodes: result,
      });
    });
  }

  convertData = (data) => {
    console.log(data);
    if (data) {
      const root = [{ label: '根目录', key: '-1', isLeaf: false, children: [] }];
      const node = this.buildTree(data, -1);
      for (let i = 0; i < node.length; i++) {
        root[0].children.push(node[i]);
      }
      return root;
    }
  }

  buildTree = (data, pid) => {
    const result = [];
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      if (data[i].parent === pid) {
        if (data[i].isParent === false) {
          // eslint-disable-next-line no-template-curly-in-string
          obj = { label: data[i].name, key: '${data[i].id}', isLeaf: true };
        } else {
          // eslint-disable-next-line no-template-curly-in-string
          obj = { label: data[i].name, key: '${data[i].id}', isLeaf: false };
        }
        // eslint-disable-next-line no-template-curly-in-string
        temp = this.buildTree(data, '${data[i].id}');
        if (temp.length > 0) {
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  };

  onItemClick = async (key, item, event) => {
    // console.log(item);
    // console.log(event);
    const id = this.state.rightClickId;
    // console.log(id);
    let promise;
    let params;
    switch (key) {
      case '1':
        params = { parent: id, type: 1, name: '文件夹1' };
        promise = addFile(params);
        promise.then((value) => {
          console.log('new folder success');
        });
        this.loadData();
        break;
      case '2':
        params = { parent: id, type: 2, name: 'hive1..hive' };
        promise = addFile(params);
        promise.then((value) => {
          console.log('new hive success');
        });
        this.loadData();
        break;
      case '3':
        params = { parent: id, type: 2, name: 'shell1.sh' };
        promise = addFile(params);
        promise.then((value) => {
          console.log('new shell success');
        });
        this.loadData();
        break;
      case '4':
        params = { parent: id, type: 2, name: 'spark1.spark' };
        promise = addFile(params);
        promise.then((value) => {
          console.log('new spark success');
        });
        this.loadData();
        break;
      case '5':
      case '6':
        params = { id };
        promise = deleteFile(params);
        promise.then((value) => {
          console.log('delete folder success');
        });
        this.loadData();
        break;
      case 7:
        params = { id };
        promise = deleteFile(params);
        promise.then((value) => {
          console.log('delete script file success');
        });
        this.loadData();
        break;
      // case 8:
      default:
    }
  }


  onRightClick = async (info) => {
    // console.log(info.node.props);
    // console.log(info.node.props.eventKey);
    // console.log(info.event.clientX);
    // console.log(info.event.clientY);

    const event = info.event;
    event.persist();

    event.preventDefault();
    const target = event.target;
    const { top, left } = target.getBoundingClientRect();
    const id = info.node.props.eventKey;
    this.setState({ rightClickId: id });

    const promise = find({ id: info.node.props.eventKey });
    promise.then((value) => {
      const result = value.data;
      // console.log(result);
      if (result.type === 1) {
        Menu.create({
          target: event.target,
          offset: [event.clientX - left, event.clientY - top],
          className: 'context-menu',
          popupClassName: 'context-menu',
          onItemClick: this.onItemClick,
          selectedKeys: this.state.selectedKeys,
          selectMode: 'single',
          onSelect: this.handleSelect,
          children: [
            <Item key="1">新增文件夹</Item>,
            <Item key="2">新建Hive</Item>,
            <Item key="3">新建Shell</Item>,
            <Item key="4">新建Spark</Item>,
            <Item key="5">重命名</Item>,
            <Item key="6">删除</Item>,
          ],
        });
      } else if (result.type === 2) {
        Menu.create({
          target: event.target,
          offset: [event.clientX - left, event.clientY - top],
          className: 'context-menu',
          popupClassName: 'context-menu',
          onItemClick: this.onItemClick.bind(this),
          // selectedKeys: this.state.selectedKeys,
          selectMode: 'single',
          onSelect: this.handleSelect,
          children: [
            <Item key="7">删除</Item>,
            <Item key="8">重命名</Item>,
          ],
        });
      }
    });
  }

  handleExpand = (keys) => {
    console.log(keys);
  }

  onSelect = async (selectedKeys, extra) => {
    console.log(selectedKeys[0]);
    this.props.onSelect(selectedKeys[0]);
  };

  createContextMenu = (e) => {
    // e.preventDefault();

    // const target = e.target;
    // const { top, left } = target.getBoundingClientRect();

    // Menu.create({
    //   target: e.target,
    //   offset: [e.clientX - left, e.clientY - top],
    //   className: 'context-menu',
    //   popupClassName: 'context-menu',
    //   onItemClick: console.log,
    //   selectedKeys: this.state.selectedKeys,
    //   selectMode: 'multiple',
    //   onSelect: this.handleSelect,
    //   children: [
    //     <Item key="1">新增文件夹</Item>,
    //     <Item key="2">新建Hive</Item>,
    //     <Item key="3">新建Shell</Item>,
    //     <Item key="4">新建Spark</Item>,
    //     <Item key="5">重命名</Item>,
    //     <Item key="6">删除</Item>,
    //   ],
    // });
  };

  render() {
    const { nodes } = this.state;
    return (
      <div>
        <Tree defaultExpandAll
          showLine
          editable
          isLabelBlock
          dataSource={nodes}
          onRightClick={this.onRightClick.bind(this)}
          onSelect={this.onSelect}
        />
      </div >

    );
  }
}

const data = [{
  label: 'Component',
  key: '1',
  children: [{
    label: 'Form',
    key: '2',
    selectable: false,
    children: [{
      label: 'Input',
      key: '4',
    }, {
      label: 'Select',
      key: '5',
      disabled: true,
    }],
  }, {
    label: 'Display',
    key: '3',
    children: [{
      label: 'Table',
      key: '6',
    }],
  }],
}];

