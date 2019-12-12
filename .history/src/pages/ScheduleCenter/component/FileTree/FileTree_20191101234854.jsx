import { Menu, Button, Search, Tree } from '@alifd/next';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

const { SubMenu, Item, Group, Divider } = Menu;

export default class FileTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      disabled: 'none',
      fileId: 0,
      dataSource: null,
    };
  }

  componentWillMount() {
    this.loadData();
    this.setState({
      disabled: 'none',
    });
  }

  loadData = () => {
    const nodes = this.state.dataSource || this.props.dataSource;
    console.log(nodes);
    const result = this.convertData(nodes);
    this.setState({
      nodes: result,
    });
  }

  convertData = (data) => {
    const root = [{ label: 'hera分布式调度系统', key: 'group_1', isLeaf: false, children: [] }];
    const node = this.buildTree(data, 'group_1');
    for (let i = 0; i < node.length; i++) {
      root[0].children.push(node[i]);
    }
    return root;
  }

  buildTree = (data, pid) => {
    const result = [];
    let temp = [];

    for (let i = 0; i < data.length; i++) {
      let obj = {};
      if (data[i].parent === pid) {
        if (data[i].directory === null) {
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
    console.log(extra);
    this.props.onSelect(selectedKeys[0]);
  };

  componentWillReceiveProps(nextProps) {
    this.field.setValues(nextProps.dataSource);
    if (this.props.dataSource !== nextProps.dataSource){
      if (nextProps.dataSource){
          this.handleGetCard();
      }
  }

作者：mykurisu
链接：https://juejin.im/post/5a39de3d6fb9a045154405ec
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
  }


  render() {
    const { dataSource } = this.props;
    console.log(dataSource);
    return (
      <div>
        <Tree defaultExpandAll
          showLine
          editable
          isLabelBlock
          dataSource={dataSource}
          onRightClick={this.onRightClick.bind(this)}
          onSelect={this.onSelect}
        />
      </div>

    );
  }
}

const treeData = {
  message: null,
  success: true,
  data: {
    myJob: [
      {
        id: 'group_3',
        parent: 'group_1',
        name: 'bigD1(3)',
        directory: 0,
        jobName: 'bigD1',
        jobId: 3,
        isParent: true,
      },
      {
        id: '1',
        parent: 'group_2',
        name: 'echoTest(1)',
        directory: null,
        jobName: 'echoTest',
        jobId: 1,
        isParent: false,
      },
      {
        id: 'group_1',
        parent: 'group_0',
        name: 'hera分布式调度系统(1)',
        directory: 0,
        jobName: 'hera分布式调度系统',
        jobId: 1,
        isParent: true,
      },
      {
        id: 'group_4',
        parent: 'group_3',
        name: 'smallD1(4)',
        directory: 0,
        jobName: 'smallD1',
        jobId: 4,
        isParent: true,
      },
      {
        id: 'group_5',
        parent: 'group_4',
        name: 'smallD1(5)',
        directory: 1,
        jobName: 'smallD1',
        jobId: 5,
        isParent: true,
      },
      {
        id: '4',
        parent: 'group_5',
        name: 'smallShell1(4)',
        directory: null,
        jobName: 'smallShell1',
        jobId: 4,
        isParent: false,
      },
      {
        id: '2',
        parent: 'group_2',
        name: 'test(2)',
        directory: null,
        jobName: 'test',
        jobId: 2,
        isParent: false,
      },
      {
        id: 'group_2',
        parent: 'group_1',
        name: 'test(2)',
        directory: 1,
        jobName: 'test',
        jobId: 2,
        isParent: true,
      },
      {
        id: '3',
        parent: 'group_2',
        name: 'test(3)',
        directory: null,
        jobName: 'test',
        jobId: 3,
        isParent: false,
      },
    ],
    allJob: [
      {
        id: 'group_3',
        parent: 'group_1',
        name: 'bigD1(3)',
        directory: 0,
        jobName: 'bigD1',
        jobId: 3,
        isParent: true,
      },
      {
        id: '1',
        parent: 'group_2',
        name: 'echoTest(1)',
        directory: null,
        jobName: 'echoTest',
        jobId: 1,
        isParent: false,
      },
      {
        id: 'group_1',
        parent: 'group_0',
        name: 'hera分布式调度系统(1)',
        directory: 0,
        jobName: 'hera分布式调度系统',
        jobId: 1,
        isParent: true,
      },
      {
        id: 'group_4',
        parent: 'group_3',
        name: 'smallD1(4)',
        directory: 0,
        jobName: 'smallD1',
        jobId: 4,
        isParent: true,
      },
      {
        id: 'group_5',
        parent: 'group_4',
        name: 'smallD1(5)',
        directory: 1,
        jobName: 'smallD1',
        jobId: 5,
        isParent: true,
      },
      {
        id: '4',
        parent: 'group_5',
        name: 'smallShell1(4)',
        directory: null,
        jobName: 'smallShell1',
        jobId: 4,
        isParent: false,
      },
      {
        id: 'group_2',
        parent: 'group_1',
        name: 'test(2)',
        directory: 1,
        jobName: 'test',
        jobId: 2,
        isParent: true,
      },
      {
        id: '2',
        parent: 'group_2',
        name: 'test(2)',
        directory: null,
        jobName: 'test',
        jobId: 2,
        isParent: false,
      },
      {
        id: '3',
        parent: 'group_2',
        name: 'test(3)',
        directory: null,
        jobName: 'test',
        jobId: 3,
        isParent: false,
      },
    ],
  },
};
