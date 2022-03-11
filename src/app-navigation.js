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
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile',
        children: [
          {
            // component: ProfilePage,
            meta: { text: 'Profile', icon: 'folder', path: '/profile' }
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
      }
    ]
  }
];
