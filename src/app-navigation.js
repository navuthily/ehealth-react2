
export const navigation = [
  {
    text: "Danh mục",
    icon: "folder",
    items: [
      {
        text: "Mẫu hợp đồng",
        path: "/template-contract",
        children: [
          {
            // component: TasksPage,
            meta: {
              text: "Mẫu hợp đồng",
              icon: "folder",
              path: "/template-contract",
            },
          },
        ],
      },
      {
        text: "Nhân viên",
        path: "/staff",
        children: [
          {
            // component: TasksPage,
            meta: { text: " Nhân viên", icon: "folder", path: "/staff" },
          },
        ],
      },
    ],
  },
];
