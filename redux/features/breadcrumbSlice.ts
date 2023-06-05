'use client'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BreadCrumbState {
    value: string
}

const initialState: BreadCrumbState = {
    value: '1asd',
}

export const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        breadcrumb: (state) => {
            state.value = 'Thanh cong Redux'
        }
        
    }
})

export const { breadcrumb } = breadcrumbSlice.actions
export default breadcrumbSlice.reducer
