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
  PARAM_NHAN_VIEN:"?join=chucvu||id,tenchucvu&join=chucdanh&join=thoihanhopdong&join=dmhopdong&join=dmtrinhdo&join=dmdantoc&join=dmquoctich&join=dmloaitinhluong&join=dmnganhang&join=dmdonvi&join=dmbophan&join=dmphongban&join=dmloaikhoi&join=tinhtranghonnhan&join=chuyenkhoa&join=nhanvienhopdongs&join=nccmnd&join=nccchn&join=phamvichungchihanhnghe&join=phamvihanhnghebosung&join=dienthianhvans&join=nhanvienbangcaps&join=nhanvienbangcaps.loaibangcap&join=nhanvienhopdongs.loaihopdong",
  MAU_HOP_DONG_URL: "templatehd",
  GET_HOP_DONG_NHAN_VIEN:"nhanvienhopdong?join=loaihopdong||tenloaihopdong",
  HOP_DONG_NHAN_VIEN:"nhanvienhopdong",
  FILTER_HOP_DONG_NHAN_VIEN:"&filter=nhanvienId||eq||"
}

export default ApiConstants
