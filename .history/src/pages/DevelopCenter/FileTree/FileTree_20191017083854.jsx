import { Menu, Button, Search, Tree } from '@alifd/next';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { init } from '../../../api/DevelopCenter.js';
import './FileTree.scss';

const { SubMenu, Item, Group, Divider } = Menu;

export default class FileTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      disabled: 'none',
      fileId: 0,
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
    if (data) {
      const root = [{ label: '根目录', key: -1, isLeaf: false, children: [] }];
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
          obj = { label: data[i].name, key: data[i].id, isLeaf: true };
        } else {
          obj = { label: data[i].name, key: data[i].id, isLeaf: false };
        }
        temp = this.buildTree(data, data[i].id);
        if (temp.length > 0) {
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  };


  onRightClick = (info) => {
    console.log(info.node.props);
    console.log(info.node.props.eventKey);
    console.log(info.event.clientX);
    console.log(info.event.clientY);

    this.setState({
      disabled: 'block',
    });
  }
  handleExpand = (keys) => {
    console.log(keys);
  }

  onSelect = async (selectedKeys, extra) => {
    console.log(selectedKeys[0]);
    this.props.onSelect(selectedKeys[0]);
  };

  render() {
    const { nodes } = this.state;
    return (
      <div>
        <div style={{ display: this.state.disabled }}>
          <Menu className="my-menu" disabled={this.state.disabled} defaultOpenKeys="sub-menu">
            <Item key="1">新增文件夹</Item>
            <Item key="1">新建</Item>
            <Item key="1">新增文件夹</Item>
            <Item key="1">新增文件夹</Item>
            <Item key="1">新增文件夹</Item>
            <Item key="1">新增文件夹</Item>
          </Menu>
          </Menu>
          </Menu>
          </Menu>
          </Menu>
          </Menu>
        </div>

        <Tree defaultExpandAll
          showLine
          editable
          isLabelBlock
          dataSource={nodes}
          onRightClick={this.onRightClick.bind(this)}

          onSelect={this.onSelect}
        />
      </div>

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

