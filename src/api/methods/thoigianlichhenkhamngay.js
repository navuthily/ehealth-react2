import Api from './index'
import ApiConstants from '../ApiConstants'


export const getModule = async() => {
  return Api(ApiConstants.MODULE_NAME, null, 'get', null)
}


export const CRUDThoigianlichhenkhamngay = async(method, data = null) => {
  switch(method){
    case "GET":
      return Api(ApiConstants.GET_ALL_THOI_GIAN_LICH_HEN_KHAM_NGAY, null, method, null);
      

    case "POST":
      return Api(ApiConstants.THOI_GIAN_LICH_HEN_KHAM_NGAY_URL, data.values, method, null)
      

    case "PATCH":
      return Api(ApiConstants.THOI_GIAN_LICH_HEN_KHAM_NGAY_URL + '/' + data.key, data.values, method, null)

    case "DELETE":
        return Api(ApiConstants.THOI_GIAN_LICH_HEN_KHAM_NGAY_URL + '/' + data.key, null, method, null)
       
      default: return Api(ApiConstants.THOI_GIAN_LICH_HEN_KHAM_NGAY_URL, data.values, method, null)
  }




  
}

