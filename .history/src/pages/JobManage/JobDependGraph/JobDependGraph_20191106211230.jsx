import React, { Component } from 'react';


export default class JobDependGraph extends Component {

  render() {
    return (
      <div>
        <h2>任务依赖图</h2>
      </div>
    );
  }
}

const mock = {
  'message': '成功',
  'success': true,
  'data': {
    'edges': [
      {
        'nodeA': {
          'nodeName': 0,
          'remark': 'start_node',
          'auto': null
        },
        'nodeB': {
          'nodeName': 1,
          'remark': '任务ID：1 任务名称: echoTest任务状态：success执行时间：2019-09 - 22 12: 14: 51结束时间：2019-09 - 22 12: 14: 51耗时：0s',
          'auto': 1
        }
      },
      {
        'nodeA': {
          'nodeName': 1,
          'remark': '任务ID：1任务名称: echoTest任务状态：success执行时间：2019-09 - 22 12: 14: 51结束时间：2019-09 - 22 12: 14: 51耗时：0s',
          'auto': 1
        },
        'nodeB': {
          'nodeName': 2,
          'remark': '任务ID：2任务名称：test',
          'auto': 1
        }
      }
    ],
    'headNode': {
      'nodeName': 0,
      'remark': 'start_node',
      'auto': null
    }
  }
};
