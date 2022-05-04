import { createSlice } from '@reduxjs/toolkit';

interface Foo {
  [key: string]: Object;
}

const initialState : Foo =  {'Nhân viên':[{'meta' : { text: 'Nhân viên', icon: 'Nhân viên', path: '/staff' }}]};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addMenuRouter(state,actions) {
      
      const {text}  = actions?.payload[0]?.meta;
      if(!state.hasOwnProperty(text)){
        state[text] = actions?.payload;
      }
      return state;
    },
    removeMenuRouter(state,actions) {
      const {text}  = actions?.payload;
      if(state.hasOwnProperty(text)){
        delete state[text];
      };
      return state;
    },
    removeAllMenuRouter(state,actions) {
      const {text}  = actions?.payload;
      if(state.hasOwnProperty(text)){
        delete state[text];
      };
      return state;
    },
    onTabDrop(state,actions) {
      const newObject:any = {};
        actions?.payload.map((index:any,key:any) => {
          newObject[index.text] = [{meta:index}];
        })
       state = newObject;
       return state;
    },
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = counterSlice
// Extract and export each action creator by name
export const { addMenuRouter, removeMenuRouter,removeAllMenuRouter,onTabDrop} = actions
// Export the reducer, either as a default or named export
export default reducer