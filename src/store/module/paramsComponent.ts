import { createSlice } from "@reduxjs/toolkit";

export interface IParamCompnent {
    [key: string]: Object;
}

const initialState:IParamCompnent = {};

const counterSlice = createSlice({
    name: 'IParams',
    initialState,
    reducers: {
        addParamsToState(state : any, actions : any) {
            console.log(actions.payload);
        },
    },
})

// Extract the action creators object and the reducer
const { actions, reducer } = counterSlice
// Extract and export each action creator by name
export const { addParamsToState } = actions
// Export the reducer, either as a default or named export
export default reducer

