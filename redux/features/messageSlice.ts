import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MessageState {
    message: string
}

const initialState: MessageState = {
    message: '',
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        success: (state) => {
            state.message = "Thanh cong Redux"
        },
        unsucces: (state) => {
            state.message = "That bai Redux"
        }
    }
})
export const { success, unsucces} = messageSlice.actions
export default messageSlice.reducer