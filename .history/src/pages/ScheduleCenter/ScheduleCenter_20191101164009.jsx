import React, { Component } from 'react';
import './ScheduleCenter.scss';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';


import JobEditForm from './component/JobForm/JobEditForm';
import FolderEditForm from './component/FolderForm/FolderEditForm';

import FileTree from './component/FileTree/FileTree';
import { init, getJobMessage } from '../../api/ScheduleCenter.js';


export default class ScheduleCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 2,
      labelAlign: 'left',
      options: null,
      treeNodes: {},
      textValue: 'ls',
      jobForm: null,
    };
  }

  componentDidMount() {
    const result = init();
    result.then((value) => {
      console.log(value);
      this.setState({ treeNodes: value.data });
    });
  }

  componentWillMount() {

  }

  onFileTabChange = (activeKey) => {
    this.setState({ activeKey: `${activeKey}` });
  }

  onSelect = async (id) => {
    const result = await getJobMessage({ jobId: id });
    console.log(result);
    this.setState({ jobForm: result.data });
  }

  render() {
    const { activeKey, treeNodes } = this.state;
    return (
      <div className="schedule-center-container">
        <div>
          <Tab
            shape="wrapped"
            activeKey={activeKey}
            onChange={this.onFileTabChange.bind(this)}
            className="custom-tab"
            size="small"
          >
            <Tab.Item title="我的调度任务" key="1">
              <FileTree dataSource={treeNodes.myJob} />
            </Tab.Item>
            <Tab.Item title="全部调度任务" key="2">
              <FileTree dataSource={treeNodes.myJob} onSelect={this.onSelect} />
            </Tab.Item>
          </Tab>
        </div>
{/* 
        <div>
          <FolderEditForm jobForm={this.state.jobForm} />
        </div> */}
      </div>
    );
  }
}
