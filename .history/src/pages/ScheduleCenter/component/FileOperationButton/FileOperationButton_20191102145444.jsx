import React, { Component } from 'react';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';


export default class FileOperationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div className="operation-button">
        <ul className="file-button-ul">
          <li>
            <Button onClick={this.onGetJobHistory} size="medium" type="primary">运行日志</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onExecuteSelectJob} size="medium" type="primary">版本生成</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onUpload} size="medium" type="primary">依赖图</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSaveJob} size="medium" type="primary">编辑</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSynJob} size="medium" type="primary">手动执行</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onExecuteJob} size="medium" type="primary">手动恢复</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onExecuteSelectJob} size="medium" type="primary">开启/关闭</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onUpload} size="medium" type="primary">失效</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSaveJob} size="medium" type="primary">删除</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSynJob} size="medium" type="primary">配置管理员</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onExecuteJob} size="medium" type="primary">关注该任务</Button>&emsp;
          </li>
        </ul>
      </div>

      <Dialog>
        
      </Dialog>
    );
  }
}
