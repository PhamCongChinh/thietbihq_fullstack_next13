'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BreadCrumbState {
    value: string
}

const initialState: BreadCrumbState = {
    value: '',
}

export const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        success: (state) => {
            state.value = "Thanh cong Redux"
        },
        unsucces: (state) => {
            state.value = "That bai Redux"
        }
    }
})

export const { success, unsucces} = breadcrumbSlice.actions
export default breadcrumbSlice.reducer
