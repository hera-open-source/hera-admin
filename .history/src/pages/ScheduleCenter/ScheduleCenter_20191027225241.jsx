import React, { Component } from 'react';
import './ScheduleCenter.scss';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/ambiance.css';

import JobEditForm from './component/JobForm/JobEditForm';
import FileOperationButton from './component/FileOperationButton/FileOperationButton';
import FolderOperationButton from './component/FolderOperationButton/FolderOperationButton';

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
      options: {
        lineNumbers: true, // 显示行号
        mode: { name: 'text/x-mysql' }, // 定义mode
        extraKeys: { Ctrl: 'autocomplete' }, // 自动提示配置
        theme: 'ambiance', // 选中的theme
      },
      codeMirrorInstance: require('codemirror'),
    };
  }

  componentDidMount() {
    const result = init();
    result.then((value) => {
      console.log(value);
      // this.setState({ treeNodes: value.data });
    });
  }

  componentWillMount() {

  }

  handleChange = (editor, data, value) => {
    console.log(value);
    console.log(data);
    console.log(editor);
  }

  onFileTabChange = (activeKey) => {
    this.setState({ activeKey: `${activeKey}` });
  }

  onSelect = async (id) => {
    let promise = await getJobMessage({ jobId: id });
    promise.th
  }

  render() {
    const { activeKey, treeNodes } = this.state;
    return (
      <div className="schedule-center-container">
        <div className="file-tree">
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
        <div className="code-editor">
          <div className="job-info-form">
            <JobEditForm />
          </div>
          <div className="config-form">
            配置信息
          </div>
          <div className="code-mirror">
            <CodeMirror
              value={this.state.codeMirrorValue}
              onChange={this.handleChange.bind(this)}
              options={this.state.options}
              codeMirrorInstance={this.state.codeMirrorInstance}
            />
          </div>
          <div className="inherit-config-form">
            继承配置
          </div>
        </div>
        <div className="operation-zone">
          <FileOperationButton />
          <div className="folder-button-ul">
            <FolderOperationButton />
          </div>
        </div >
      </div>
    );
  }
}

