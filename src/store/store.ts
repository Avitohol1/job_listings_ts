import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import jobsSlice from "./jobsSlice"

export const store = configureStore({
    reducer: {
        jobs: jobsSlice,
    },
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
    useSelector
