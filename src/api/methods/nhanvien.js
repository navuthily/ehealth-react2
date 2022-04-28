import Api from './index'
import ApiConstants from '../ApiConstants'


export const CRUDNhanvien = async(method,  data = null) => {
  switch(method){
    case "GET":
        if(data?.key){
            return Api(ApiConstants.NHAN_VIEN_URL+'/'+data.key+ApiConstants.PARAM_NHAN_VIEN , null, method, null);
        }
      return Api(ApiConstants.NHAN_VIEN_URL+ApiConstants.PARAM_NHAN_VIEN , null, method, null);
      

    case "POST":
      return Api(ApiConstants.NHAN_VIEN_URL, data.values, method, null)
      

    case "PATCH":
      return Api(ApiConstants.NHAN_VIEN_URL + '/' + data.key, data.values, method, null)

    case "DELETE":
        return Api(ApiConstants.NHAN_VIEN_URL + '/' + data.key, null, method, null)
       
      default: return Api(ApiConstants.NHAN_VIEN_URL , data.values, method, null)
  }
  
}

