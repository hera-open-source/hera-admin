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
    const nodes = tree.data;
    // console.log(nodes);
    const promise = init();
    promise.then((value) => {
      console.log(value);
      // this.setState({
      //   nodes: value,
      // });
    });
    const result = this.convertData(nodes);
    const root =
    console.log(result);
    this.setState({
      nodes: result,
    });
  }

  convertData = (data) => {
    if (data) {
      return data.filter(item => item.isParent & item.parent === -1).map(node => ({
        label: `${node.name}`,
        key: `${node.id}',
        isLeaf: '${node.isParent}`,
        // className: 'folder',
        children: this.findChildren(data, node.id),
      })
      );
    }
  }


  findChildren = (data, id) => {
    const result = [];
    for (const node of data) {
      if (node.parent == id) {
        const nodeTemp = { label: node.name, key: node.id, isLeaf: node.isParent };
        result.push(nodeTemp);
      }
    }
    return result;
  }

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
        {/* rMenu.cssss({"top": y / 2 + "px", "left": x / 2 + "px", "visibility": "visible", position: "absolute"}); */}
        <div style={{ display: this.state.disabled }}>
          <Menu className="my-menu" disabled={this.state.disabled} defaultOpenKeys="sub-menu">
            <Item key="1">Option 1</Item>
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

let tree =
{
  message: null,
  success: true,
  data: [{
    id: 1,
    parent: -1,
    name: '个人文档',
    isParent: true,
  }, {
    id: 3,
    parent: 1,
    name: '2.sh',
    isParent: false,
  }, {
    id: 7,
    parent: 1,
    name: '文件夹2',
    isParent: true,
  }, {
    id: 2,
    parent: -1,
    name: '共享文档',
    isParent: true,
  }, {
    id: 4,
    parent: 2,
    name: '2.hive',
    isParent: false,
  }, {
    id: 5,
    parent: 2,
    name: '3.sh',
    isParent: false,
  }, {
    id: 6,
    parent: 2,
    name: '文件夹2',
    isParent: true,
  }],
};
