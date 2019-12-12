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
      treeNodes: {},
      jobForm: {},
    };
  }

  componentDidMount() {

  }

  async componentWillMount() {
    const result = await init();
    this.setState({ treeNodes: result.data });
  }

  onTreeTabChange = (activeKey) => {
    this.setState({ activeKey: `${activeKey}` });
  }

  onSelect = async (id) => {
    const result = await getGroupMessage({ groupId: id });
    console.log(result);
    this.setState({ jobForm: result === null ? {} : result.data });
  }

  render() {
    const { activeKey, treeNodes } = this.state;
    console.log(treeNodes)
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
              <FileTree dataSource={treeNodes.myJob} onSelect={this.onSelect} />
            </Tab.Item>
            <Tab.Item title="全部调度任务" key="2">
              <FileTree dataSource={treeNodes.allJob} onSelect={this.onSelect} />
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