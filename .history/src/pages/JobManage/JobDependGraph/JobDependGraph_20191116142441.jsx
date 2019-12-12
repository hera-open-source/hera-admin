import React, { Component } from 'react';
import { Button, Input, Form } from '@alifd/next';
import * as d3 from 'd3';
import { Graph } from 'react-d3-graph';

const FormItem = Form.Item;

export default class JobDependGraph extends Component {
  render() {
    return (
      <div>
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
        <Graph
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={data}
    // config={myConfig}
    // onClickNode={onClickNode}
    // onRightClickNode={onRightClickNode}
    // onClickGraph={onClickGraph}
    // onClickLink={onClickLink}
    // onRightClickLink={onRightClickLink}
    // onMouseOverNode={onMouseOverNode}
    // onMouseOutNode={onMouseOutNode}
    // onMouseOverLink={onMouseOverLink}
    // onMouseOutLink={onMouseOutLink}
    // onNodePositionChange={onNodePositionChange}
/>;
      </div>
    );
  }
}

const mock = {
  message: '成功',
  success: true,
  data: {
    edges: [
      {
        nodeA: {
          nodeName: 0,
          remark: 'start_node',
          auto: null,
        },
        nodeB: {
          nodeName: 1,
          remark: '任务ID：1 任务名称: echoTest任务状态：success执行时间：2019-09 - 22 12: 14: 51结束时间：2019-09 - 22 12: 14: 51耗时：0s',
          auto: 1,
        },
      },
      {
        nodeA: {
          nodeName: 1,
          remark: '任务ID：1任务名称: echoTest任务状态：success执行时间：2019-09 - 22 12: 14: 51结束时间：2019-09 - 22 12: 14: 51耗时：0s',
          auto: 1,
        },
        nodeB: {
          nodeName: 2,
          remark: '任务ID：2任务名称：test',
          auto: 1,
        },
      },
    ],
    headNode: {
      nodeName: 0,
      remark: 'start_node',
      auto: null,
    },
  },
};


