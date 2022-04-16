const ApiConstants = {
  //   BASE_URL: 'http://192.168.1.107:9000/',
  BASE_URL: 'http://localhost:7000/',

  LOGIN: 'auth/login',

  MODULE_NAME: 'thoigianlichhenkhamngay/module',


  THOI_GIAN_LICH_HEN_KHAM_NGAY_URL: 'thoigianlichhenkhamngay',
  GET_ALL_THOI_GIAN_LICH_HEN_KHAM_NGAY: 'thoigianlichhenkhamngay?join=userCreatedBy||nickname&join=userUpdatedBy||nickname',
  

  THOI_GIAN_LICH_HEN_KHAM_GIO_URL: 'thoigianlichhenkhamgio',
  GET_ALL_THOI_GIAN_LICH_HEN_KHAM_GIO: 'thoigianlichhenkhamgio?join=userCreatedBy||nickname&join=userUpdatedBy||nickname&filter=thoigianlichhenkham_id||$eq||'




}

export default ApiConstants
