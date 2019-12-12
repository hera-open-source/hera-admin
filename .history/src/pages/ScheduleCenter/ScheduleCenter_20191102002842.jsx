import React, { Component } from 'react';
import './ScheduleCenter.scss';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';
import JobEditForm from './component/JobForm/JobEditForm';
import FolderEditForm from './component/FolderForm/FolderEditForm';
import FileTree from './component/FileTree/FileTree';
import { init, getJobMessage, getGroupMessage } from '../../api/ScheduleCenter.js';


export default class ScheduleCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 2,
      treeNodes: [],
      jobForm: {},
    };
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

  convertData = (data) => {
    const root = [{ label: 'hera分布式调度系统', key: 'group_1', isLeaf: false, children: [] }];
    const node = this.buildTree(data, 'group_1');
    for (let i = 0; i < node.length; i++) {
      root[0].children.push(node[i]);
    }
    return root;
  }

  async componentWillMount() {
    const promise = await init();
    const nodes = this.convertData(promise.data.allJob);
    console.log(nodes);
    this.setState({ treeNodes: nodes });
    // promise.then((value) => {
    //   console.log(value);
    //   const nodes = this.loadData(value.data.allJob);
    //   console.log(nodes);
    //   this.setState({ treeNodes: nodes });
    // });
  }

  onTreeTabChange = (activeKey) => {
    this.setState({ activeKey: `${activeKey}` });
  }

  onSelect = async (id, extra) => {
    const result = await getGroupMessage({ groupId: id });
    console.log(extra);
    // this.setState({ jobForm: result === null ? {} : result.data });
  }


  render() {
    const { activeKey, treeNodes } = this.state;
    console.log(treeNodes);
    return (
      <div className="schedule-center-container">
        <div>
          <Tab
            shape="wrapped"
            activeKey={activeKey}
            onChange={this.onTreeTabChange.bind(this)}
            className="custom-tab"
            size="small"
          >
            <Tab.Item title="我的调度任务" key="1">
              <FileTree dataSource={treeNodes} onSelect={this.onSelect.bind(this)} />
            </Tab.Item>
            <Tab.Item title="全部调度任务" key="2">
              <FileTree dataSource={treeNodes} onSelect={this.onSelect.bind(this)} />
            </Tab.Item>
          </Tab>
        </div>

        {/* <div>
          <FolderEditForm jobForm={this.state.jobForm} />
        </div> */}
      </div>
    );
  }
}
