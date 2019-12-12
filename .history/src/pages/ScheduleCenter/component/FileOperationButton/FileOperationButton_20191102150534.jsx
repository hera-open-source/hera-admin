import React, { Component } from 'react';
import { Button, Dialog, Table, Pagination } from '@alifd/next';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Link, withRouter } from 'react-router-dom';


export default class FileOperationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logVisible: false,
    };
  }
  onClose = () => {
    this.setState({
      logVisible: false,
    });
  }

  onGetJobHistory = () => {
    this.setState({
      logVisible: true,
    });
  }

  render() {
    return (
      <div className="operation-button" >
        <ul className="file-button-ul">
          <li>
            <Button onClick={this.onGetJobHistory.bind()} size="medium" type="primary">运行日志</Button>&emsp;
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
              // onSort={this.onSort.bind(this)}
              // expandedRowRender={() => { }}
              // expandedRowRender={record => <div><p dangerouslySetInnerHTML={{ __html: `${record.log}` }} /></div>}
              expandedRowRender={this.expandedRowRender.bind(this)}
            >
              <Table.Column title="id" dataIndex="id" sortable />
              <Table.Column title="fileId" dataIndex="fileId" />
              <Table.Column title="开始时间" dataIndex="startTime" />
              <Table.Column title="结束时间" dataIndex="endTime" />
              <Table.Column title="操作" cell={this.operation.bind(this)} width={200} />
            </Table>
            <Pagination defaultCurrent={this.state.current} onChange={this.onPageChange} />
          </Dialog>
        </div>
      </div>

    );
  }
}
