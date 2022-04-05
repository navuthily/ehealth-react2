import ApiConstants from '../ApiConstants'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default async function api(
  path: string,
  params: {} | null = {},
  method: string,
  token?: string | null,
) {
  

  if (!token) {
    // token = await AsyncStorage.getItem('token')
    
  }
  let options: {}
  if (!params) {
    options = {
      url: ApiConstants.BASE_URL + path,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        ...(token && { token: token }),
      },
      method: method,
    }
  } else {
    options = {
      url: ApiConstants.BASE_URL + path,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        ...(token && { token: token }),
      },
      method: method,
      ...(params && { body: JSON.stringify(params) }),
      data: params,
    }
  }

  // console.log("=============",options);

  // console.log(new Date());
  // axios({
  //   method: 'post',
  //   url: 'http://api-patient.familyhospital.vn/api/auth/login',
  //   data: { mobile: '0905249014', password: '441111' },
  // }).then((resp) => {
  //   console.log(resp.data);
  // });

  return axios(options)
    .then(resp => {
      // console.log('HIIIIIIIIIIIII',resp.data)
      return resp.data
    })
    .then(json => json)
    .catch(error => {
      // console.log(JSON.stringify(error));
      // const toast = Toast.show(JSON.stringify(error), {
      //   duration: 10000,
      //   position: Toast.positions.BOTTOM,
      //   shadow: true,
      //   animation: true,
      //   hideOnPress: true,
      //   delay: 0,
      //   onShow: () => {
      //     // calls on toast\`s appear animation start
      //   },
      //   onShown: () => {
      //     // calls on toast\`s appear animation end.
      //   },
      //   onHide: () => {
      //     // calls on toast\`s hide animation start.
      //   },
      //   onHidden: () => {
      //     // calls on toast\`s hide animation end.
      //   },
      // });

      return error
    })
}
