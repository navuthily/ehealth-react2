import { createSlice } from '@reduxjs/toolkit'
const loginUser = createSlice({
    name:'login',
    initialState: {username: null, nickname: null, phongbanId: null ,holotNhanVien: null, tennhanvien: null, token: null ,id:null },
    reducers: {
        login: (state,{payload}) =>
        {
          console.log("login nè", payload);
          
            state.username = payload.user.username;
            state.id = payload.user.id;
            state.nickname = payload.user.nickname;
            state.phongbanId = payload.user.phongbanId;
            state.holotNhanVien = payload.user.holotNhanVien;
            state.tennhanvien = payload.user.tennhanvien;
            state.token = payload.token.accessToken
        

        },
        logout: (state, {payload}) => {
            state.username = null;
            state.nickname = null;
            state.phongbanId = null;
            state.holotNhanVien = null;
            state.tennhanvien = null;
            state.token = null
            state.id =null;
        }
    }

})

const { actions, reducer } = loginUser
export const { login } = actions
// export const tokenUser = (state) => state.token

export default reducer