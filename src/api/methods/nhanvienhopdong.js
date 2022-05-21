import Api from './index'
import ApiConstants from '../ApiConstants'


export const CRUDHopdongNhanvien = async(method,  data = null) => {
  switch(method){
    case "GET":
        if(data?.idNhanvien){
            return Api(ApiConstants.GET_HOP_DONG_NHAN_VIEN+ApiConstants.FILTER_HOP_DONG_NHAN_VIEN+data?.idNhanvien , null, method, null);
        }
      return Api(ApiConstants.GET_HOP_DONG_NHAN_VIEN, null, method, null);
      

    case "POST":
      return Api(ApiConstants.HOP_DONG_NHAN_VIEN, data.values, method, null)
      

    case "PATCH":
      return Api(ApiConstants.HOP_DONG_NHAN_VIEN + '/' + data.key, data.values, method, null)

    case "DELETE":
        return Api(ApiConstants.HOP_DONG_NHAN_VIEN + '/' + data.key, null, method, null)
       
      default: return Api(ApiConstants.HOP_DONG_NHAN_VIEN , data.values, method, null)
  }
  
}

