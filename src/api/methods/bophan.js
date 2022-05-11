import Api from './index'
import ApiConstants from '../ApiConstants'


export const CRUDBophan = async(method,   data = null) => {
  switch(method){
    case "GET":
     
      return Api(ApiConstants.BO_PHAN_URL, null, method, null);
      
    case "POST":
      return Api(ApiConstants.BO_PHAN_URL, data.values, method, null)
      
    case "PATCH":
      return Api(ApiConstants.BO_PHAN_URL + '/' + data.key, data.values, method, null)

    case "DELETE":
        return Api(ApiConstants.BO_PHAN_URL + '/' + data.key, null, method, null)
       
      default: return Api(ApiConstants.BO_PHAN_URL , data.values, method, null)
  }
  
}

