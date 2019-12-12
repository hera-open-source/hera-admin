import React, { Component } from 'react';
import JobDetailTable from './component/JobDetailTable/JobDetailTable';

export default class JobDetail extends Component {

  render() {
    const data = mock;
    return (
      <div>
        <JobDetailTable data={data} />
      </div>
    );
  }

}

const mock = {
  'message': '查询成功',
  'success': true,
  'data': [
    {
      'jobId': '1',
      'actionId': null,
      'startTime': '2019-09-22 12:14:51.0',
      'endTime': '2019-09-22 12:14:51.0',
      'executeHost': 'localhost',
      'status': 'success',
      'operator': 'hera',
      'description': '输出测试',
      'jobName': 'echoTest',
      'groupName': 'test',
      'times': 1
    }
  ]
};