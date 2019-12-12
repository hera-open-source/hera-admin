import { Input, Button, Dialog, Form, Table, Balloon, Field, Radio } from '@alifd/next';
import React, { Component, Fragment } from 'react';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
export default class MachineTable extends Component {

  field = new Field(this);

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

  }

  componentDidMount() {
    this.setState({
      visible: false
    });
  }

  renderStatus = (value, idx, obj) => {

    switch (obj.effective) {
      case 0:
        return (
                    <div ><span>已失效</span></div>
        );
      case 1:
        return (
                    <div ><span>有效</span></div>
        );
    }

  }

  renderOperation = (value, idx, obj) => {
    return (
            <div>
                <Button type="primary" onClick={this.onEdit.bind(this, obj.id)}>编辑</Button>&nbsp;&nbsp;
                <Button type="normal" onClick={this.onDelete.bind(this, obj.id)} warning>删除</Button>
            </div>
    );
  }


  onClose = () => {
        // console.log(this.field.getValues());

    this.setState({
      visible: false
    });
  }

  onCreate = () => {
    this.setState({
      visible: true
    });
  }

  onEdit = (id) => {
    console.log(id);
    let mock1 = { name: 'dd', effective: '1', description: 'test' };
    this.field.setValues(mock1);
    this.setState({
      visible: true
    });
  }

  onDelete = (id) => {
    console.log(id);
  }
  render() {

    const { data } = this.props;
    const init = this.field.init;
    return (
            <Fragment>
                <Button type="primary" onClick={this.onCreate.bind(this)}>新增</Button>
                <Table dataSource={data} >
                    <Table.Column title="序号" dataIndex="id" />
                    <Table.Column title="ip地址" dataIndex="host" />
                    <Table.Column title="机器组" dataIndex="hostGroupId" />
                    <Table.Column title="操作" cell={this.renderOperation.bind(this)} />
                </Table>
                <div>
                    <Dialog
                      title="编辑框"
                      visible={this.state.visible}
                      onOk={this.onClose.bind(this, 'okClick')}
                      onCancel={this.onClose.bind(this, 'cancelClick')}
                      onClose={this.onClose}
                      style={{ width: 300, height: 300 }}>
                        <Form>
                            <FormItem label="ip地址:">
                                <Input name="host" {...init('host')} placeholder="请输入ip地址" />
                            </FormItem>

                            <FormItem label="机器组:">
                                <Input name="hostGroupId" {...init('hostGroupId')} placeholder="请输入机器组" />
                            </FormItem>
                        </Form>
                    </Dialog>
                </div>
            </Fragment>
    );
  }
}