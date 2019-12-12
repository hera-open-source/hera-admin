import React, { Component } from 'react';
import { Tree, Button, Tab, Icon } from '@alifd/next';
import './DevelopCenter.scss';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';
import IceTextEdit from '@ali/ice-text-edit';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/ambiance.css';
import FileTree from './FileTree/FileTree';


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
    };
  }

  componentDidMount() {
    this.setState({
      textValue: 'ls',
      // filePanes: [
      //   { tab: 'Mail', key: 1, closeable: false },
      //   { tab: 'Message', key: 2, closeable: true },
      //   { tab: 'Setting', key: 3, closeable: true },
      //   { tab: 'Unread', key: 4, closeable: true },
      // ],
      options: {
        lineNumbers: true, // 显示行号
        mode: { name: 'text/x-mysql' }, // 定义mode
        extraKeys: { Ctrl: 'autocomplete' }, // 自动提示配置
        theme: 'ambiance', // 选中的theme
      },
      codeMirrorInstance: require('codemirror'),

    });
  }

  onSelect = (id) => {
    console.log(`单击叶子${id}`);
    this.setState({
      fileActiveKey: `${id}`,
    });
    const tab = { tab: `文件${id}`, key: id, closeable: true };

    // 从数据库拉取脚本，填充代码编辑区
    const script = 'ls';


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

  handleChange = (editor, data, value) => {
    console.log(value);
    console.log(data);
    console.log(editor);
  }


  onClose = (targetKey) => {
    this.remove(targetKey);
  }

  onFileTabChange = (activeKey) => {

    const panes = this.state.filePanes;
    const fileActiveKey = this.state.fileActiveKey;

    const result = panes.filter(item => item.id === activeKey);
    if (result[0].key === 0) {
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

onLogChange = (activeKey) => {
  console.log(activeKey);
}

onExecuteJob = () => {

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

render() {
  const { fileActiveKey } = this.state;
  console.log(fileActiveKey);

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
            onChange={this.onFileTabChange}
            onClose={this.onClose}
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
              onChange={this.onLogChange}
              onClose={this.onClose}
              className="custom-tab"
              size="small"
            >
              {this.state.logPanes.map(item => <Tab.Item title={item.tab} key={item.key} closeable={item.closeable}></Tab.Item>)}
            </Tab>
          </div>
          <div className="log-text" />
        </div>
      </div>
    </div>
  );
}
}

