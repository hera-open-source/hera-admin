import React, { Component } from 'react';
import { Tree, Button, Tab, Icon, Dialog, Input, Form, Grid, Balloon } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';

export default class FileEditButton extends Component {
  

  render() {
    return (
      <div >
        <ul>
          <li>
            <Button onClick={this.onExecuteSelectJob} size="medium" type="primary">返回</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onUpload} size="medium" type="primary">上传资源</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onSaveJob} size="medium" type="primary">保存</Button>&emsp;
          </li>
        </ul>
      </div>
    );
  }
}
