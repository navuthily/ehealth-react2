import defaultUser from '../../utils/default-user';
import Api from './index'
import ApiConstants from '../ApiConstants'




export async function signIn(userName, password) {
  try {
    // Send request
    const dataUser = await Api(ApiConstants.LOGIN, {
            username: userName,
            password: password,
          }, 'post', null)

    if(dataUser.user){
      return {
        isOk: true,
        data: dataUser.user
      };      
    }else{
      return {
        isOk: false,
        message: "Tên đăng nhập hoặc mật khẩu không chính xác!"
      };
    }
  }
  catch {
    return {
      isOk: false,
      message: "Tên đăng nhập hoặc mật khẩu không chính xác!"
    };
  }
}

export async function getUser() {
  try {
    // Send request
    const user = JSON.parse(sessionStorage.getItem("user"))
    if(user){
      return {
        isOk: true,
        data: user
      };      
    }else{
      return {
        isOk: false
      };
    }

  }
  catch {
    return {
      isOk: false
    };
  }

}

export async function createAccount(email, password) {
  try {
    // Send request
    console.log(email, password);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Tên đăng nhập hoặc mật khẩu không chính xác!"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Tên đăng nhập hoặc mật khẩu không chính xác!"
    };
  }
}
