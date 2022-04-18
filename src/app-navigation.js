import { HomePage } from 'pages/index';

export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
    children: [
      {
        component: HomePage,
        meta: { text: 'Home', icon: 'home', path: '/home' }
      }
    ]
  },
  {
    text: 'Bác sĩ Gia Đình',
    icon: 'folder',
    items: [
      {
        text: 'Cấu hình thời gian cho phép đặt lịch',
        path: '/bacsigiadinh',
        children: [
          {
            // component: ProfilePage,
            meta: { text: 'Cấu hình thời gian cho phép đặt lịch', icon: 'folder', path: '/bacsigiadinh' }
          }
        ]
      },
      {
        text: 'Tasks',
        path: '/tasks',
        children: [
          {
            // component: TasksPage,
            meta: { text: 'Tasks', icon: 'folder', path: '/tasks' }
          }
        ]
      },
      {
        text: 'New staff',
        path: '/new-staff',
        children: [
          {
            // component: TasksPage,
            meta: { text: ' New Staff', icon: 'folder', path: '/new-staff' }
          }
        ]
      },
      {
        text: 'Đặt lịch hẹn',
        path: '/datlichhen',
        children: [
          {
            // component: TasksPage,
            meta: { text: 'Đặt lịch hẹn', icon: 'folder', path: '/datlichhen' }
          }
        ]
      },
      {
        text: 'Danh Mục Vật Tư',
        path: '/danhmuc-vattu',
        children: [
          {
            // component: TasksPage,
            meta: { text: 'Danh Mục Vật Tư', icon: 'folder', path: '/danhmuc-vattu' }
          }
        ]
      },
      {
        text: 'Nhóm Vật Tư',
        path: '/nhom-vattu',
        children: [
          {
            // component: TasksPage,
            meta: { text: 'Nhóm Vật Tư', icon: 'folder', path: '/nhom-vattu' }
          }
        ]
      },
    ]
  }
  // {
  //   text: 'Bác sĩ Gia Đình',
  //   path: '/bacsigiadinh',
  //   icon: 'home',
  //   children: [
  //     {
  //       component: Bacsigiadinh,
  //       meta: { text: 'Bác sĩ Gia Đình', icon: 'home', path: '/bacsigiadinh' }
  //     }
  //   ]
  // },
  // {
  //   text: 'Examples',
  //   icon: 'folder',
  //   items: [
  //     {
  //       text: 'Profile',
  //       path: '/profile',
  //       children: [
  //         {
  //           // component: ProfilePage,
  //           meta: { text: 'Profile', icon: 'folder', path: '/profile' }
  //         }
  //       ]
  //     },
  //     {
  //       text: 'Tasks',
  //       path: '/tasks',
  //       children: [
  //         {
  //           // component: TasksPage,
  //           meta: { text: 'Tasks', icon: 'folder', path: '/tasks' }
  //         }
  //       ]
  //     },
  //     {
  //       text: 'New staff',
  //       path: '/new-staff',
  //       children: [
  //         {
  //           // component: TasksPage,
  //           meta: { text: ' New Staff', icon: 'folder', path: '/new-staff' }
  //         }
  //       ]
  //     }
  //   ]
  // }
];
