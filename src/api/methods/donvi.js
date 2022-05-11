import Api from './index'
import ApiConstants from '../ApiConstants'


export const CRUDDonvi = async(method,   data = null) => {
  switch(method){
    case "GET":
     
      return Api(ApiConstants.DON_VI_URL, null, method, null);
      
    case "POST":
      return Api(ApiConstants.DON_VI_URL, data.values, method, null)
      
    case "PATCH":
      return Api(ApiConstants.DON_VI_URL + '/' + data.key, data.values, method, null)

    case "DELETE":
        return Api(ApiConstants.DON_VI_URL + '/' + data.key, null, method, null)
       
      default: return Api(ApiConstants.DON_VI_URL , data.values, method, null)
  }
  
}

