// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice/issues/new',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'home',
  },
  {
    name: '机器组监控',
    path: '/machineMonitor/machineMonitor',
    icon: 'MachineMonitor',
  },

  {
    name: '系统管理',
    path: '/systemManage/userManage',
    icon: 'directory',
    children: [
      { name: '用户管理', path: '/systemManage/userManage' },
      { name: '机器组管理', path: '/systemManage/machineGroupManage' },
      { name: 'worker管理', path: '/systemManage/machineManage' },
    ],
  },
  {
    name: '任务管理',
    path: '/jobMange/jobDetail',
    icon: 'directory',
    children: [
      { name: '任务详情', path: '/jobMange/jobDetail' },
      { name: '任务依拉图', path: '/jobMange/jobDependGraph' },
    ],
  },
  {
    name: '开发中心',
    path: '/developCenter',
    icon: 'directory',
  },
  {
    name: '调度中心',
    path: '/scheduleCenter',
    icon: 'directory',
  },
  {
    name: '建议',
    path: '/suggest',
    icon: 'directory',
  },
  {
    name: '作品',
    icon: 'publish',
    path: '/post',
    children: [
      {
        name: '阅读统计',
        path: '/post/analysis',
      },
      {
        name: '作品列表',
        path: '/post/list',
      },
      {
        name: '发布作品',
        path: '/post/new',
      },
    ],
  },
  {
    name: '账号',
    icon: 'yonghu',
    path: '/account',
    children: [
      {
        name: '我的主页',
        path: '/account/my',
      },
      {
        name: '设置',
        path: '/account/settings',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
