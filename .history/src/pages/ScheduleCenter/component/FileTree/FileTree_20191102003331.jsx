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
      dataSource: [],
    };
  }

  componentWillMount() {
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
    console.log(extra.node.is);

    this.props.onSelect(selectedKeys[0], extra);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return false;
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
