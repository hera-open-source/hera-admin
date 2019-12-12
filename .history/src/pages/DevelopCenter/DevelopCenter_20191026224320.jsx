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
import { find, debug, getLog, findDebugHistory, saveScript } from '../../api/DevelopCenter.js';


const TreeNode = Tree.Node;
// @withRouter
export default class DevelopCenter extends Component {
  constructor(props) {
    super(props);
    this.instance = null;
    this.editorRefs = React.createRef();
    this.state = {
      fileActiveKey: null,
      logActiveKey: null,
      filePanes: [],
      logPanes: [],
      options: null,
      codeMirrorInstance: null,
      codeMirrorValue: null,
      visible: false,
      debugLog: '',
      selectedScripts: '',
      dataSource: [],
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
      const script = node.data.content;
      const panes = this.state.filePanes;

      if (Object.is(panes.length, 0)) {
        const tabDataSession = window.localStorage.getItem('tabData');
        const tabData = JSON.parse(tabDataSession);
        if (Object.is(tabData.length, 0)) {
          // 刷新页面，本身localStorage也无数据
          panes.push(tab);
          this.setState({
            filePanes: panes,
            codeMirrorValue: script,
            fileActiveKey: `${id}`,
          });
          return;
        }

        const result = tabData.filter(item => Object.is(item.key, id));
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
        window.localStorage.setItem('tabData', JSON.stringify(tabData));
        window.localStorage.setItem('fileActiveKey', `${id}`);
        return;
      }

      // 没有刷新页面的情况下添加tab
      const result = panes.filter(item => item.key === id);
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
    this.setState({ codeMirrorValue: value });
    // console.log(value);
    // console.log(data);
    // console.log(editor);
  }


  onFileTabClose = async (targetKey) => {
    const panes = this.state.filePanes;
    const fileActiveKey = this.state.fileActiveKey;
    let file = null;
    if (Object.is(panes.length, 0)) {
      const tabDataSession = window.localStorage.getItem('tabData');
      const tabData = JSON.parse(tabDataSession);
      if (Object.is(tabData.length, 0)) {
        // 刷新页面，本身localStorage也无数据
        return;
      }
      const tabDataResult = tabData.filter(item => !Object.is(item.key, targetKey));
      if (!Object.is(tabDataResult.length, 0)) {
        file = await find({ id: `${tabDataResult[0].key}` });
        this.setState({
          filePanes: tabDataResult,
          fileActiveKey: tabDataResult[0].key,
          codeMirrorValue: file.data.content,
        });
        window.localStorage.setItem('tabData', JSON.stringify(tabDataResult));
        window.localStorage.setItem('fileActiveKey', tabDataResult[0].key);
      } else if (Object.is(tabDataResult.length, 0)) {
        this.setState({
          filePanes: [],
          fileActiveKey: null,
        });
        window.localStorage.setItem('tabData', JSON.stringify([]));
        window.localStorage.setItem('fileActiveKey', null);
      }
    } else if (!Object.is(panes.length, 0)) {
      if (Object.is(targetKey, fileActiveKey)) {
        const arr = panes.filter(item => !Object.is(item.key, targetKey));
        if (arr.length > 0) {
          file = await find({ id: `${arr[0].key}` });
          this.setState({
            filePanes: arr,
            codeMirrorValue: file.data.content,
            fileActiveKey: arr[0].key,
          });
          window.localStorage.setItem('tabData', JSON.stringify(arr));
          window.localStorage.setItem('fileActiveKey', arr[0].key);
        } else {
          this.setState({
            filePanes: [],
            fileActiveKey: null,
          });
          window.localStorage.setItem('tabData', JSON.stringify([]));
          window.localStorage.setItem('fileActiveKey', null);
        }
      } else {
        const arr1 = panes.filter(item => !Object.is(item.key, targetKey));
        if (arr1.length > 0) {
          file = await find({ id: `${fileActiveKey}` });
          this.setState({
            filePanes: arr1,
            codeMirrorValue: file.data.content,
          });
          window.localStorage.setItem('tabData', JSON.stringify(arr1));
        } else {
          this.setState({
            filePanes: [],
            fileActiveKey: null,
          });
          window.localStorage.setItem('tabData', JSON.stringify([]));
          window.localStorage.setItem('fileActiveKey', null);
        }
      }
    }
  }

  onFileTabChange = async (fileActiveKey) => {
    const node = await find({ id: `${fileActiveKey}` });
    this.setState({
      fileActiveKey,
      codeMirrorValue: node.data.content,
    });
  }

  onLogTabChange = async (logActiveKey) => {
    const node = await getLog({ id: `${logActiveKey}` });
    this.setState({
      logActiveKey,
      debugLog: node.data.log,
    });
  }

  onLogTabClose = async (targetKey) => {
    const panes = this.state.logPanes;
    const logActiveKey = this.state.logActiveKey;
    let file = null;
    if (Object.is(panes.length, 0)) {
      const tabDataSession = window.localStorage.getItem('logTabData');
      const tabData = JSON.parse(tabDataSession);
      if (Object.is(tabData.length, 0)) {
        // 刷新页面，本身localStorage也无数据
        return;
      }
      const tabDataResult = tabData.filter(item => !Object.is(item.key, targetKey));
      if (!Object.is(tabDataResult.length, 0)) {
        file = await getLog({ id: `${tabDataResult[0].key}` });
        this.setState({
          logPanes: tabDataResult,
          logActiveKey: tabDataResult[0].key,
          debugLog: file.data.log,
        });
        window.localStorage.setItem('logTabData', JSON.stringify(tabDataResult));
        window.localStorage.setItem('logActiveKey', tabDataResult[0].key);
      } else if (Object.is(tabDataResult.length, 0)) {
        this.setState({
          logPanes: [],
          logActiveKey: null,
        });
        window.localStorage.setItem('logTabData', JSON.stringify([]));
        window.localStorage.setItem('logActiveKey', null);
      }
    } else if (!Object.is(panes.length, 0)) {
      if (Object.is(targetKey, logActiveKey)) {
        const arr = panes.filter(item => !Object.is(item.key, targetKey));
        if (arr.length > 0) {
          file = await getLog({ id: `${arr[0].key}` });
          this.setState({
            logPanes: arr,
            debugLog: file.data.log,
            logActiveKey: arr[0].key,
          });
          window.localStorage.setItem('logTabData', JSON.stringify(arr));
          window.localStorage.setItem('logActiveKey', arr[0].key);
        } else {
          this.setState({
            filePanes: [],
            fileActiveKey: null,
          });
          window.localStorage.setItem('logTabData', JSON.stringify([]));
          window.localStorage.setItem('logActiveKey', null);
        }
      } else {
        const arr1 = panes.filter(item => !Object.is(item.key, targetKey));
        if (arr1.length > 0) {
          file = await getLog({ id: `${logActiveKey}` });
          this.setState({
            filePanes: arr1,
            codeMirrorValue: file.data.log,
          });
          window.localStorage.setItem('logTabData', JSON.stringify(arr1));
        } else {
          this.setState({
            logPanes: [],
            logActiveKey: null,
          });
          window.localStorage.setItem('logTabData', JSON.stringify([]));
          window.localStorage.setItem('logActiveKey', null);
        }
      }
    }
  }

  onExecuteJob = async () => {
    const script = this.state.codeMirrorValue;
    const fileActiveKey = this.state.fileActiveKey || window.localStorage.getItem('fileActiveKey');
    const promise = debug({ id: `${fileActiveKey}`, content: `${script}` });
    let timerHandler = null;

    promise.then((value) => {
      console.log(value);
      const tab = {
        tab: 'debugId:' + `${value.data.debugId}`,
        key: `${value.data.debugId}`,
        closeable: true,
      };
      const logPanes = this.state.logPanes;
      let uniqueResult = [];
      timerHandler = window.setInterval(() => {
        const logPromise = getLog({ id: `${value.data.debugId}` });
        this.setState({ logActiveKey: value.data.debugId });
        window.localStorage.setItem('logActiveKey', value.data.debugId);
        logPromise.then((logData) => {
          const log = logData.data.log;
          this.setState({ debugLog: log });

          if (Object.is(logPanes.length, 0)) {
            const tabDataSession = window.localStorage.getItem('logTabData');
            const tabData = JSON.parse(tabDataSession);
            uniqueResult = tabData.find(item => Object.is(item.key, logData.data.id));
            console.log(uniqueResult);
            if (Object.is(uniqueResult, undefined)) {
              tabData.push(tab);
              window.localStorage.setItem('logTabData', JSON.stringify(tabData));
            }
            this.setState({
              logPanes: tabData,
            });
          } else if (!Object.is(logPanes.length, 0)) {
            uniqueResult = logPanes.find(item => Object.is(item.key, logData.data.id));
            if (Object.is(uniqueResult, undefined)) {
              logPanes.push(tab);
              window.localStorage.setItem('logTabData', JSON.stringify(logPanes));
            }
            this.setState({
              logPanes,
            });
          }

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
    const editor = this.editorRefs.current.editor;
    console.log(editor.getSelection());
    debug({id});
    
  }

  onUpload = () => {

  }

  onSaveJob = () => {
    saveScript({ id: this.state.fileActiveKey, content: this.state.codeMirrorValue });
  }

  onSynJob = () => {

  }

  onRightClick = (info) => {

  }

  onSearchJobHistory = async () => {
    const result = await findDebugHistory({ fileId: this.state.fileActiveKey });
    console.log(result);
    this.setState({
      dataSource: result.data,
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

  onCursorActivity = (e) => {
    // console.log(e.getSelection());
  };

  render() {
    let { fileActiveKey, logPanes, logActiveKey, filePanes, codeMirrorValue, debugLog } = this.state;
    const tabDataSession = JSON.parse(window.localStorage.getItem('tabData'));
    const fileActiveKeySession = window.localStorage.getItem('fileActiveKey');
    const logDataSession = JSON.parse(window.localStorage.getItem('logTabData'));
    const logActiveKeySession = window.localStorage.getItem('logActiveKey');
    if (Object.is(filePanes.length, 0) && !Object.is(tabDataSession.length, 0)) {
      filePanes = tabDataSession;
    }
    if (Object.is(fileActiveKey, null) && !Object.is(fileActiveKeySession, undefined)) {
      fileActiveKey = fileActiveKeySession;
      const file = find({ id: fileActiveKey });
      file.then((value) => {
        codeMirrorValue = value.data.content;
      });
    }
    if (Object.is(logPanes.length, 0) && !Object.is(logDataSession.length, 0)) {
      logPanes = logDataSession;
    }
    if (Object.is(logActiveKey, null) && !Object.is(logActiveKeySession, undefined)) {
      logActiveKey = logActiveKeySession;
      const log = getLog({ id: logActiveKey });
      log.then((value) => {
        debugLog = value.data.log;
      });
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
                value={`${codeMirrorValue}`}
                onChange={this.handleChange.bind(this)}
                options={this.state.options}
                codeMirrorInstance={this.state.codeMirrorInstance}
                onCursorActivity={this.onCursorActivity.bind(this)}
                ref={this.editorRefs}
              />
            </Scrollbars>

          </div>

          <div className="log-tab">
            <div>
              <Tab
                shape="wrapped"
                activeKey={logActiveKey}
                onChange={this.onLogTabChange}
                onClose={this.onLogTabClose}
                className="custom-tab"
                size="small"
              >
                {logPanes.map(item => <Tab.Item title={item.tab} key={item.key} closeable={item.closeable}></Tab.Item>)}
              </Tab>
            </div>
            <Scrollbars style={{ width: 1000, height: 200 }}>
              <p dangerouslySetInnerHTML={{ __html: `${debugLog}` }} />
            </Scrollbars>

            <div>
              <Button onClick={this.onSearchJobHistory} size="medium" type="primary">查看日志</Button>&emsp;
              <Button onClick={this.onSearchJobHistory} size="medium" type="primary">历史日志</Button>&emsp;
              <Dialog visible={this.state.visible}
                onOk={this.onClose.bind(this, 'okClick')}
                onCancel={this.onClose.bind(this, 'cancelClick')}
                onClose={this.onClose}
              >
                <Table dataSource={this.state.dataSource}
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
