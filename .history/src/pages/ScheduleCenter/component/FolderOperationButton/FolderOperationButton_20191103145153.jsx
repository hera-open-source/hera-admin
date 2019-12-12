import React, { Component } from 'react';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';

export default class FolderOperationButton extends Component {
  render() {
    return (
      <div >
        <ul>
          <li>
            <Button onClick={this.onExecuteSelectJob} size="medium" type="primary">任务总览</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onUpload} size="medium" type="primary">添加组</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSaveJob} size="medium" type="primary">编辑</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSynJob} size="medium" type="primary">添加任务</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSaveJob} size="medium" type="primary">删除</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSynJob} size="medium" type="primary">配置管理员</Button>&emsp;
          </li>
        </ul>
      </div>
    );
  }
}
