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
      filePanes: [],
      logPanes: []
      activeKey: null,
      options: null,
      codeMirrorInstance:null,
    };
  }

  componentDidMount() {
    this.setState({
      textValue: 'ls',
      panes: [
        { tab: 'Mail', key: 1, closeable: false },
        { tab: 'Message', key: 2, closeable: true },
        { tab: 'Setting', key: 3, closeable: true },
        { tab: 'Unread', key: 4, closeable: true },
      ],
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
  }

  handleChange = (editor, data, value) => {
    console.log(value);

    // var editorRef = this.refs.ref;
    // console.log(editorRef.getSelection());
    // const editor = this.refs.editor;
    // // console.log(editor.getSelection());
    // editor.setValue('这里是新的sql内容');
  }


  onClose = (targetKey) => {
    this.remove(targetKey);
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onLogChange = (activeKey) => {
    console.log(activeKey);
  }

  addTabpane = () => {
    this.setState((prevState) => {
      const { panes } = prevState;
      panes.push({ tab: 'new tab', key: Math.random(), closeable: true });
      return { panes };
    });
  }

  remove(targetKey) {
    let activeKey = this.state.activeKey;
    const panes = [];
    this.state.panes.forEach((pane) => {
      if (pane.key != targetKey) {
        panes.push(pane);
      }
    });

    if (targetKey == activeKey) {
      activeKey = panes[0].key;
    }
    this.setState({ panes, activeKey });
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
    const state = this.state;

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
              activeKey={state.activeKey}
              onChange={this.onChange}
              onClose={this.onClose}
              className="custom-tab"
              size="small"
            >
              {state.panes.map(item => <Tab.Item title={item.tab} closeable={item.closeable}></Tab.Item>)}
            </Tab>
          </div >
          <div className="code-mirror">
            <CodeMirror
              ref={ref => this.codeComponent = ref}
              value="test"
              onChange={this.handleChange.bind(this)}
              options={this.state.options}
              codeMirrorInstance={this.state.codeMirrorInstance}
            />
          </div>

          <div className="log-tab">
            <div>
              <Tab
                shape="wrapped"
                activeKey={state.activeKey}
                onChange={this.onLogChange}
                onClose={this.onClose}
                className="custom-tab"
                size="small"
              >
                {state.panes.map(item => <Tab.Item title={item.tab} key={item.key} closeable={item.closeable}></Tab.Item>)}
              </Tab>
            </div>
            <div className="log-text" />
          </div>
        </div>
      </div>
    );
  }
}

