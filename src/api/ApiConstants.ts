const ApiConstants = {
  // BASE_URL: 'http://192.168.1.107:9000/',
  BASE_URL: 'http://localhost:7000/',
  LOGIN: 'auth/login',
  MODULE_NAME: 'thoigianlichhenkhamngay/module',
  THOI_GIAN_LICH_HEN_KHAM_NGAY_URL: 'thoigianlichhenkhamngay',
  GET_ALL_THOI_GIAN_LICH_HEN_KHAM_NGAY: 'thoigianlichhenkhamngay?join=userCreatedBy||nickname&join=userUpdatedBy||nickname',
  THOI_GIAN_LICH_HEN_KHAM_GIO_URL: 'thoigianlichhenkhamgio',
  GET_ALL_THOI_GIAN_LICH_HEN_KHAM_GIO: 'thoigianlichhenkhamgio?join=userCreatedBy||nickname&join=userUpdatedBy||nickname&filter=thoigianlichhenkham_id||$eq||',
  THOI_GIAN_CHO_PHEP_DAT_LICH_KHAM: "thoigiandatlich",
  // GET_ALL_NHAN_VIEN: 'users',
  NHAN_VIEN_URL: "users",
  PARAM_NHAN_VIEN:"?join=chucvu||id,tenchucvu&join=chucdanh&join=thoihanhopdong&join=dmhopdong&join=dmtrinhdo&join=dmdantoc&join=dmquoctich&join=dmloaitinhluong&join=dmnganhang&join=dmbophan&join=dmphongban&join=dmloaikhoi&join=chuyenkhoa&join=nhanvienhopdongs&join=nccmnd&join=nccchn&join=phamvichungchihanhnghe&join=phamvihanhnghebosung&join=dienthianhvans&join=nhanvienbangcaps&join=nhanvienbangcaps.loaibangcap&join=nhanvienhopdongs.loaihopdong&join=dmbophan.phongban",
  MAU_HOP_DONG_URL: "templatehd",
  LOAI_HOP_DONG_URL: "dmloaihopdong",
  GET_HOP_DONG_NHAN_VIEN:"nhanvienhopdong?join=loaihopdong||tenloaihopdong",
  HOP_DONG_NHAN_VIEN:"nhanvienhopdong",
  FILTER_HOP_DONG_NHAN_VIEN:"&filter=nhanvienId||eq||",
  CHUC_DANH_URL: "chucdanh",
  CHUC_VU_URL:"chucvu",
  LOAI_TINH_LUONG_URL:"dmloaitinhluong",
  BO_PHAN_URL:"dmbophan",
  CHUYEN_KHOA_URL:"chuyenkhoa",
  TRINH_DO_URL:"dmtrinhdo",
  LOAI_KHOI_URL:"dmloaikhoi",
  PHONG_BAN_URL:"dmphongban",
}

export default ApiConstants
