import React, { Component } from 'react';
import { Button, Input, Form } from '@alifd/next';

const FormItem = Form.Item;

export default class JobDependGraph extends Component {
  render() {
    return (
      <div>npm install react-d3-graph
        <div style={{ display: 'flex' }}>
          <div>
            <FormItem label="任务ID">
              <Input name="jobId" />
            </FormItem>
          </div>
          <div>
            <Button onClick={this.onSynJob} size="medium" type="primary">上游任务链</Button>&emsp;
            <Button onClick={this.onSynJob} size="medium" type="primary">下游任务链</Button>&emsp;
            <Button onClick={this.onSynJob} size="medium" type="primary">展示全部</Button>&emsp;
          </div>
        </div>
        <div />
      </div>
    );
  }
}


