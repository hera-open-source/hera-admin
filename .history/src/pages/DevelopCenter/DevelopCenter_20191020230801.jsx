import React, { Component } from 'react';
import { Tree, Button, Tab, Icon, Dialog } from '@alifd/next';
import './DevelopCenter.scss';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/ambiance.css';
import FileTree from './FileTree/FileTree';
import { find, debug } from '../../api/DevelopCenter.js';


const TreeNode = Tree.Node;
// @withRouter
export default class DevelopCenter extends Component {
  constructor(props) {
    super(props);
    this.instance = null;
    this.state = {
      textValue: 'ls',
      fileActiveKey: null,
      logActiveKey: null,
      filePanes: [],
      logPanes: [],
      activeKey: null,
      options: null,
      codeMirrorInstance: null,
      codeMirrorValue: null,
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({
      textValue: 'ls',
      options: {
        lineNumbers: true, // 显示行号
        mode: { name: 'text/x-mysql' }, // 定义mode
        extraKeys: { Ctrl: 'autocomplete' }, // 自动提示配置
        theme: 'ambiance', // 选中的theme
      },
      codeMirrorInstance: require('codemirror'),

    });
  }

  onSelect = async (id) => {
    const node = await find({ id: `${id}` });
    if (node.data.type === 2) {
      this.setState({
        fileActiveKey: `${id}`,
      });
      const tab = { tab: node.data.name, key: id, closeable: true };
      // 从数据库拉取脚本，填充代码编辑区
      const script = node.data.content;
      const panes = this.state.filePanes;
      const result = panes.filter(item => item.id === id);
      if (result.length === 0) {
        panes.push(tab);
        this.setState({
          filePanes: panes,
          codeMirrorValue: script,
        });
      } else {
        this.setState({
          codeMirrorValue: script,
        });
      }
    }
  }

  handleChange = (editor, data, value) => {
    console.log(value);
    console.log(data);
    console.log(editor);
  }


  onFileTabClose = (targetKey) => {
    const panes = this.state.filePanes;
    const fileActiveKey = this.state.fileActiveKey;
    const script = 'ldds';
    const result = panes.filter(item => item.key !== targetKey);
    console.log(result);

    if (result.length === 0) {
      this.setState({
        filePanes: [],
        codeMirrorValue: null,
        fileActiveKey: null,
      });
      return;
    }
    if (targetKey === fileActiveKey) {
      this.setState({
        filePanes: result,
        codeMirrorValue: script,
        fileActiveKey: result[0].key,
      });
    } else {
      this.setState({
        filePanes: result,
        codeMirrorValue: script,
      });
    }
  }

  onFileTabChange = async (activeKey) => {
    const node = await find({ id: `${activeKey}` });
    this.setState({
      fileActiveKey: activeKey,
      codeMirrorValue: node.data.content,
    });
  }

  onLogTabChange = (activeKey) => {
    this.setState({
      logActiveKey: activeKey,
    });
  }

  onExecuteJob = (id) => {
    let promise = find(id);
    let script = this.codeMirrorValue;
    

  }

  onExecuteSelectJob = () => {

  }

  onUpload = () => {

  }

  onSaveJob = () => {

  }

  onSynJob = () => {

  }

  onRightClick = (info) => {

  }

  onSearchJobHistory = () => {
    this.setState({
      visible: true,
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { fileActiveKey } = this.state;

    return (
      <div className="develop-center-container">
        <div className="file-tree">
          <FileTree onSelect={this.onSelect} />
        </div>
        <div className="code-zone">
          <div className="button-operation">
            <Button onClick={this.onExecuteJob} size="medium" type="primary">执行</Button>&emsp;
            <Button onClick={this.onExecuteSelectJob} size="medium" type="primary">执行选中代码</Button>&emsp;
            <Button onClick={this.onUpload} size="medium" type="primary">上传资源</Button>&emsp;
            <Button onClick={this.onSaveJob} size="medium" type="primary">保存脚本</Button>&emsp;
            <Button onClick={this.onSynJob} size="medium" type="primary">同步任务</Button>&emsp;
          </div>
          <div className="file-tab">
            <Tab
              shape="wrapped"
              activeKey={fileActiveKey}
              onChange={this.onFileTabChange.bind(this)}
              onClose={this.onFileTabClose.bind(this)}
              className="custom-tab"
              size="small"
            >
              {this.state.filePanes.map(item => <Tab.Item title={item.tab} key={item.key} closeable={item.closeable}></Tab.Item>)}
            </Tab>
          </div >
          <div className="code-mirror">
            <CodeMirror
              value={this.state.codeMirrorValue}
              onChange={this.handleChange.bind(this)}
              options={this.state.options}
              codeMirrorInstance={this.state.codeMirrorInstance}
            />
          </div>

          <div className="log-tab">
            <div>
              <Tab
                shape="wrapped"
                activeKey={this.state.logActiveKey}
                onChange={this.onLogTabChange}
                onClose={this.onLogTabClose}
                className="custom-tab"
                size="small"
              >
                {this.state.logPanes.map(item => <Tab.Item title={item.tab} key={item.key} closeable={item.closeable}></Tab.Item>)}
              </Tab>
            </div>
            <div className="log-text" />
            <div>
              <Button onClick={this.onSearchJobHistory} size="medium" type="primary">查看日志</Button>&emsp;
              <Button onClick={this.onSearchJobHistory} size="medium" type="primary">历史日志</Button>&emsp;
              <Dialog visible={this.state.visible}
                onOk={this.onClose.bind(this, 'okClick')}
                onCancel={this.onClose.bind(this, 'cancelClick')}
                onClose={this.onClose}
              />

            </div>

          </div>
        </div>
      </div>
    );
  }
}

