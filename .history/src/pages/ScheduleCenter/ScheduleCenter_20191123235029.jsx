import React, { Component } from 'react';
import './ScheduleCenter.scss';
import { Tab } from '@alifd/next';
import JobForm from './component/JobForm/JobForm';
import JobEditForm from './component/JobEditForm/JobEditForm';
import FolderEditForm from './component/FolderEditForm/FolderEditForm';
import FolderForm from './component/FolderForm/FolderForm';
import FileTree from './component/FileTree/FileTree';
import { init, getJobMessage, getGroupMessage } from '../../api/ScheduleCenter.js';


export default class ScheduleCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 2,
      allTreeNodes: [],
      myTreeNodes: [],
      folderData: {},
      jobData: {},
      showJob: 1,
      editable: 0,
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
    this.setState({ allTreeNodes: nodes });
    const isFolder = window.localStorage.getItem('isFolder');
    let result = null;
    if (Object.is(isFolder, '1')) {
      const groupId = window.localStorage.getItem('groupId');
      result = await getGroupMessage({ groupId });
      const folderData = result.data;
      this.setState({ folderData, showJob: 1 });
      this.forceUpdate();
    } else {
      const jobId = window.localStorage.getItem('jobId');
      result = await getJobMessage({ jobId });
      const jobData = result.data;
      this.setState({ jobData, showJob: 0 });
      this.forceUpdate();
    }
  }

  onTreeTabChange = async (activeKey) => {
    const promise = await init();
    let nodes;
    if (Object.is(activeKey, 1)) {
      nodes = this.convertData(promise.data.myJob);
      this.setState({ activeKey: `${activeKey}`, allTreeNodes: nodes });
    } else {
      nodes = this.convertData(promise.data.allJob);
      this.setState({ activeKey: `${activeKey}`, myTreeNodes: nodes });
    }
  }

  onSelect = async (id) => {
    let result;
    if (id.toString().startsWith('group')) {
      const groupId = id.slice(6);
      result = await getGroupMessage({ groupId });
      this.setState({ folderData: result.data, showJob: 1 });
      window.localStorage.setItem('groupId', groupId);
      window.localStorage.setItem('isFolder', 1);
      this.forceUpdate();
    } else {
      const jobId = id;
      result = await getJobMessage({ jobId });
      this.setState({ jobData: result.data, showJob: 0 });
      window.localStorage.setItem('jobId', jobId);
      window.localStorage.setItem('isFolder', 0);
      this.forceUpdate();
    }
  }

  onEditGroup = async (editable) => {
    const groupId = window.localStorage.getItem('groupId');
    const result = await getGroupMessage({ groupId });
    const folderData = result.data;
    this.setState({ folderData, showJob: 1, editable });
    this.forceUpdate();
  }

  onEditJob = async (editable) => {
    const jobId = window.localStorage.getItem('jobId');
    const result = await getJobMessage({ jobId });
    const jobData = result.data;
    this.setState({ jobData, showJob: 0, editable });
    this.forceUpdate();
  }

  onJobTypeChange = async (jobRunType) => {
    await getJobMessage({ jobId });
    // const jobData = result.data;
    // this.setState({ jobData }); // console.log(jobRunType);
    // const jobId = window.localStorage.getItem('jobId');
    // const result =
    this.forceUpdate();
  }

  render() {
    const { activeKey, jobData, showJob, folderData, myTreeNodes, allTreeNodes, editable } = this.state;
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
              <FileTree dataSource={myTreeNodes} onSelect={this.onSelect.bind(this)} />
            </Tab.Item>
            <Tab.Item title="全部调度任务" key="2">
              <FileTree dataSource={allTreeNodes} onSelect={this.onSelect.bind(this)} />
            </Tab.Item>
          </Tab>
        </div>
        {showJob === 0 ?
          (editable === 0 ? <JobForm onEditJob={this.onEditJob.bind(this)} jobForm={jobData} /> : <JobEditForm onBack={this.onEditJob.bind(this)} onJobTypeChange={this.onJobTypeChange.bind(this)} jobForm={jobData} />) :
          (editable === 0 ? <FolderForm onBack={this.onEditJob.bind(this)} onEditGroup={this.onEditGroup.bind(this)} folderForm={folderData} /> :
          <FolderEditForm onBack={this.onEditGroup.bind(this)} folderForm={folderData} />)
        }
      </div>
    );
  }
}
