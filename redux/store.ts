'use client'

import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './features/messageSlice'
import breadcrumbReducer from './features/breadcrumbSlice'

export const store = configureStore({
    reducer: {
        message: messageReducer,
        breadcrumb: breadcrumbReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch