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
      return Api(ApiConstants.GET_ALL_THOI_GIAN_LICH_HEN_KHAM_NGAY, data.values, method, null)
      

    case "PATCH":
      return Api(ApiConstants.GET_ALL_THOI_GIAN_LICH_HEN_KHAM_NGAY + '/' + data.key, data.values, method, null)

    case "DELETE":
        return Api(ApiConstants.GET_ALL_THOI_GIAN_LICH_HEN_KHAM_NGAY + '/' + data.key, null, method, null)
       
      default: return Api(ApiConstants.GET_ALL_THOI_GIAN_LICH_HEN_KHAM_NGAY, data.values, method, null)
  }




  
}

