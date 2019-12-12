import React, { Component } from 'react';
import { Button, Dialog, Table, Pagination } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';


export default class FileOperationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logVisible: false,
      dagVisible: false,
      dataSource: [],
    };
  }
  onClose = () => {
    this.setState({
      logVisible: false,
      dagVisible: false,
    });
  }

  onGetJobHistory = () => {
    this.setState({
      logVisible: true,
    });
  }

  expandedRowRender = () => { }

  operation = () => {

  }

  onGenerateVersion = () => {

  }
  onShowDag = () => {
    this.setState({
      dagVisible: true,
    });
  }
  render() {
    return (
      <div className="operation-button" >
        <ul className="file-button-ul">
          <li>
            <Button onClick={this.onGetJobHistory.bind(this)} size="medium" type="primary">运行日志</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onGenerateVersion} size="medium" type="primary">版本生成</Button>&emsp;
          </li>
          <li>
            <Button onClick={this.onShowDag} size="medium" type="primary">依赖图</Button>&emsp;
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

        <div>
          <Dialog visible={this.state.logVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
          >
            <Table dataSource={this.state.dataSource}
              isZebra={this.state.isZebra}
              hasBorder={false}
              hasExpandedRowCtrl
              expandedRowRender={this.expandedRowRender.bind(this)}
            >
              <Table.Column title="id" dataIndex="id" sortable />
              <Table.Column title="版本号" dataIndex="fileId" />
              <Table.Column title="任务ID" dataIndex="fileId" />
              <Table.Column title="执行状态" dataIndex="fileId" />
              <Table.Column title="开始时间" dataIndex="startTime" />
              <Table.Column title="结束时间" dataIndex="endTime" />
              <Table.Column title="时长(分)" dataIndex="endTime" />
              <Table.Column title="说明" dataIndex="endTime" />
              <Table.Column title="触发类型" dataIndex="endTime" />
              <Table.Column title="机器|执行人" dataIndex="endTime" />
              <Table.Column title="操作" cell={this.operation.bind(this)} width={200} />
            </Table>
            <Pagination defaultCurrent={this.state.current} onChange={this.onPageChange} />
          </Dialog>

          <Dialog visible={this.state.dagVisible}
            onOk={this.onClose.bind(this, 'okClick')}
            onCancel={this.onClose.bind(this, 'cancelClick')}
            onClose={this.onClose}
            title="任务链路图"
            
          >
        </div>

      </div>

    );
  }
}
