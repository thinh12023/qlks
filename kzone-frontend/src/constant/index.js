export const TYPE_OVERTIME_BY_DAY = 0;
export const TYPE_OVERTIME_BY_HOUR = 1;
export const TYPE_EARLY_BY_DAY = 2;
export const TYPE_EARLY_BY_HOUR = 3;
export const TYPE_HOURLY = 4;

export const TRANG_THAI_PHONG = {
  KHA_DUNG: {
    value: 0,
    title: "Khả dụng",
    color: "#4CAF50",
  },
  DA_DAT_PHONG: {
    value: 1,
    title: "Đã đặt trước",
    color: "#4CAF50",
  },
  CHUA_DON_BUONG: {
    value: 2,
    title: "Chưa dọn buồng",
    color: "#757575",
  },
  DANG_SUA_PHONG: {
    value: 3,
    title: "Đang sửa chữa",
    color: "#757575",
  },
  KHACH_DANG_O: {
    value: 4,
    title: "Khách đang ở",
    color: "#b92323ba",
  },
};

export const STATUS_ROOM = [
  {
    value: 0,
    title: "Khả dụng",
    color: "#4CAF50",
  },
  {
    value: 1,
    title: "Đã đặt trước",
    color: "#4CAF50",
  },
  {
    value: 2,
    title: "Chưa dọn buồng",
    color: "#757575",
  },
  {
    value: 3,
    title: "Đang sửa chữa",
    color: "#757575",
  },
  {
    value: 4,
    title: "Khách đang ở",
    color: "#B71C1C",
  },
];

export const STATUS = [
  {
    value: 0,
    title: "Khả dụng",
  },
  {
    value: 1,
    title: "Không khả dụng",
  },
];

export const LOAI_KHACH_HANG = {
  KHACH_LE: 0,
  KHACH_DOAN: 1,
}
export const LOAI_THUE_PHONG = {
  THEO_GIO: 0,
  THEO_NGAY: 1,
  QUA_DEM: 2,
}
export const DS_ = [
  {
    value: 0,
    title: "Theo giờ",
  },
  {
    value: 1,
    title: "Theo ngày",
  },
  {
    value: 2,
    title: "Qua đêm",
  }
]
export const TRANG_THAI_PHIEU = {
  DAT_PHONG: 0,
  NHAN_PHONG: 1,
  TRA_PHONG: 2,
  DA_HUY: null,
}
export const TRANG_THAI_PHIEU_S = [
  { title: "ĐẶT PHÒNG", value: 0 },
  { title: "NHẬN PHÒNG", value: 1 },
  { title: "TRẢ PHÒNG", value: 2 },
  { title: "ĐÃ HỦY", value: 3 },
]
export const TRANG_THAI_THANH_TOAN = [
  {
    title: "Đã thanh toán",
    value: 0,
  },
  {
    title: "Chưa thanh toán",
    value: 1,
  },
];
export const TRANG_THAI_HOA_DON = {
  DA_THANH_TOAN: 0,
  CHUA_THANH_TOAN: 1,
  THEM_CONG_NO: 2,
}
export const FORMAT = {
  FORMAT_DATE: "YYYY-MM-DD",
  FORMAT_TIME: "HH:mm",
  DATE_TIME: "YYYY-MM-DD HH:mm:ss"
}

export const LOAI_PHIEU_THU = {
  CONG_NO: 0,
  TRA_TRUOC: 1,
}

export const ROOM_DIRECTION = [
  {
    value: 0,
    name: "Đường phố",
  },
  {
    value: 1,
    name: "Ban công / Sân hiên",
  },
  {
    value: 2,
    name: "Thành phố",
  },
]