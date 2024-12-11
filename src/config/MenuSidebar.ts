export interface MenuSidebarType {
  key: number;
  title: string;
  path: string;
  children?: MenuSidebarType[];
}

export const MenuSidebar: MenuSidebarType[] = [
  {
    key: 1,
    title: 'Tin tức',
    path: 'tin-tuc'
  },
  {
    key: 2,
    title: 'Dự đoán chiều cao',
    path: 'du-doan-chieu-cao',
  },
  {
    key: 3,
    title: 'Đơn hàng',
    path: 'don-hang',
  },
  {
    key: 4,
    title: 'Mã tích điểm',
    path: 'ma-tich-diem',
  },
  {
    key: 5,
    title: 'Quản lý người dùng',
    path: 'quan-ly-nguoi-dung',
  },
  {
    key: 6,
    title: 'Quản lý quà',
    path: '#',
    children: [
      {
        key: 61,
        title: '• Danh sách quà',
        path: 'danh-sach-qua',
      },
      {
        key: 62,
        title: '• Lịch sử đổi quà',
        path: 'lich-su-doi-qua',
      }
    ]
  },
]