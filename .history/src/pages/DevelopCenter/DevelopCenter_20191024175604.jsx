import React, { Component } from 'react';
import { Tree, Button, Tab, Table, Dialog } from '@alifd/next';
import './DevelopCenter.scss';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/theme/ambiance.css';
import FileTree from './FileTree/FileTree';
import { find, debug, getLog } from '../../api/DevelopCenter.js';


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
      debugLog: '',
    };
  }

  componentWillMount() {
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
      if (Object.is(panes.length, 0)) {
        const tabDataSession = window.localStorage.getItem('tabData');
        const tabData = JSON.parse(tabDataSession);
        console.log(tabData);

        const result = panes.filter(item => item.id === id);
        if (result.length === 0) {
          tabData.push(tab);
          this.setState({
            filePanes: tabData,
            codeMirrorValue: script,
          });
        } else {
          this.setState({
            codeMirrorValue: script,
          });
        }
        window.localStorage.setItem('tabData', JSON.stringify(panes));
        window.localStorage.setItem('fileActiveKey', `${id}`);
        return;
      }


      const result = panes.filter(item => item.id === id);
      // panes.push(tabData);
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
      window.localStorage.setItem('tabData', JSON.stringify(panes));
      window.localStorage.setItem('fileActiveKey', `${id}`);
    }
  }

  handleChange = (editor, data, value) => {
    console.log(value);
    console.log(data);
    console.log(editor);
  }


  onFileTabClose = async (targetKey) => {
    const panes = this.state.filePanes;
    console.log(panes);
    const fileActiveKey = this.state.fileActiveKey;
    const result = panes.filter(item => item.key != targetKey);
    if (Object.is(panes.length, 0)) {
      const tabDataSession = window.localStorage.getItem('tabData');
      const tabData = JSON.parse(tabDataSession);
      console.log(tabData);

      const result = panes.filter(item => item.id != targetKey);
      if (result.length === 0) {
        this.setState({
          filePanes: tabData,
          // codeMirrorValue: script,
        });
      } else {
        this.setState({
          filePanes: result,
          // codeMirrorValue: script,
        });
      }
      window.localStorage.setItem('tabData', JSON.stringify(panes));
      // window.localStorage.setItem('fileActiveKey', `${id}`);

      this.setState({
        filePanes: [],
        codeMirrorValue: null,
        fileActiveKey: null,
      });
      window.localStorage.setItem('tabData', JSON.stringify([]));
      window.localStorage.setItem('fileActiveKey', null);
      return;
    }

    if (targetKey === fileActiveKey) {
      const file = await find({ id: `${result[0].key}` });
      this.setState({
        filePanes: result,
        codeMirrorValue: file.data.content,
        fileActiveKey: result[0].key,
      });
      window.localStorage.setItem('tabData', JSON.stringify(result));
      window.localStorage.setItem('fileActiveKey', result[0].key);
    } else {
      this.setState({
        filePanes: result,
      });
      window.localStorage.setItem('tabData', JSON.stringify(result));
      window.localStorage.setItem('fileActiveKey', fileActiveKey);
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

  onExecuteJob = () => {
    const script = this.state.codeMirrorValue;
    const promise = debug({ id: `${this.state.fileActiveKey}`, content: `${script}` });
    let timerHandler = null;

    promise.then((value) => {
      console.log(value);
      const tab = {
        tab: 'debugId:' + `${value.data.debugId}`,
        key: `${value.data.debugId}`,
        closeable: false,
      };
      const logPanes = this.state.logPanes;
      logPanes.push(tab);

      this.setState({ logPanes, logActiveKey: `${value.data.debugId}` });
      window.localStorage.setItem('tabData', JSON.stringify(logPanes));
      window.localStorage.setItem('fileActiveKey', `${value.data.debugId}`);

      timerHandler = window.setInterval(() => {
        const logPromise = getLog({ id: `${value.data.debugId}` });

        logPromise.then((logData) => {
          const log = logData.data.log;
          this.setState({ debugLog: log });
          if (logData.data.status === 'running') {
            window.setInterval(timerHandler, 2000);
          } else {
            window.clearInterval(timerHandler);
          }
        }, 2000);
      });
    });
  };

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

  operation = () => {

  }

  onExpandedRowClick = (id) => {

  }

  onScroll = (e) => {
    // 几个可能用到的值可以打印看看 e.target.scrollTop  e.target.scrollHeight  e.target.offsetHeight
    if (e.target.scrollTop = e.target.scrollHeight) {
      // 滚动到底部，可以继续发请求获取数据或干点什么
    }
  }

  render() {
    let { fileActiveKey, logPanes, filePanes } = this.state;
    const tabDataSession = window.localStorage.getItem('tabData');
    const fileActiveKeySession = window.localStorage.getItem('fileActiveKey');
    if (filePanes.length === 0) {
      filePanes = JSON.parse(tabDataSession);
    }
    if (fileActiveKey === null) {
      fileActiveKey = fileActiveKeySession;
    }

    return (
      <div className="develop-center-container" >
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
              {filePanes.map(item => <Tab.Item title={item.tab} key={item.key} closeable={item.closeable}></Tab.Item>)}
            </Tab>
          </div >
          <div className="code-mirror">
            <Scrollbars style={{ width: 1000, height: 200 }}>
              <CodeMirror
                value={this.state.codeMirrorValue}
                onChange={this.handleChange.bind(this)}
                options={this.state.options}
                codeMirrorInstance={this.state.codeMirrorInstance}
              />
            </Scrollbars>

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
                {logPanes.map(item => <Tab.Item title={item.tab} key={item.key} closeable={item.closeable}></Tab.Item>)}
              </Tab>
            </div>
            <Scrollbars style={{ width: 1000, height: 200 }}>
              <p dangerouslySetInnerHTML={{ __html: this.state.debugLog }} />
            </Scrollbars>

            <div>
              <Button onClick={this.onSearchJobHistory} size="medium" type="primary">查看日志</Button>&emsp;
              <Button onClick={this.onSearchJobHistory} size="medium" type="primary">历史日志</Button>&emsp;
              <Dialog visible={this.state.visible}
                onOk={this.onClose.bind(this, 'okClick')}
                onCancel={this.onClose.bind(this, 'cancelClick')}
                onClose={this.onClose}
              >
                <Table dataSource={dataSource}
                  isZebra={this.state.isZebra}
                  hasBorder={false}
                  // onSort={this.onSort.bind(this)}
                  expandedRowRender={record => record.title}
                  onRowClick={() => console.log('rowClick')}
                  onExpandedRowClick={() => console.log('expandedRowClick')}
                  expandedRowIndent={this.state.expandedRowIndent}
                >
                  <Table.Column title="id" dataIndex="id" sortable />
                  <Table.Column title="fileId" dataIndex="fileId" />
                  <Table.Column title="开始时间" dataIndex="startTime" />
                  <Table.Column title="结束时间" dataIndex="endTime" />
                  <Table.Column title="操作" cell={this.operation.bind(this)} width={200} />
                </Table>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const dataSource = [{
  id: '1',
  fileId: '1',
  startTime: '2019-10-20',
  endTime: '2019-10-20',
  status: 'success',
},
{
  id: '2',
  fileId: '1',
  startTime: '2019-10-20',
  endTime: '2019-10-20',
  status: 'success',
}];
