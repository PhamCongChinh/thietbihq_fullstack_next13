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
        breadcrumb: (state, actions) => {
            state.value = actions.payload
        }
        
    }
})

export const { breadcrumb } = breadcrumbSlice.actions
export default breadcrumbSlice.reducer
