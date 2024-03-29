import Api from './index'
import ApiConstants from '../ApiConstants'


export const CRUDLoaiHopDong = async(method,   data = null) => {
  switch(method){
    case "GET":
     
      return Api(ApiConstants.LOAI_HOP_DONG_URL, null, method, null);
      
    case "POST":
      return Api(ApiConstants.LOAI_HOP_DONG_URL, data.values, method, null)
      
    case "PATCH":
      return Api(ApiConstants.LOAI_HOP_DONG_URL + '/' + data.key, data.values, method, null)

    case "DELETE":
        return Api(ApiConstants.LOAI_HOP_DONG_URL + '/' + data.key, null, method, null)
       
      default: return Api(ApiConstants.LOAI_HOP_DONG_URL , data.values, method, null)
  }
  
}

