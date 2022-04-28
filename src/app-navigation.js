
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
        text: "New staff",
        path: "/new-staff",
        children: [
          {
            // component: TasksPage,
            meta: { text: " New Staff", icon: "folder", path: "/new-staff" },
          },
        ],
      },
    ],
  },
];
