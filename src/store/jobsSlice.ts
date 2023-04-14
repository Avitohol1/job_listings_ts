import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import data from "../utils/data.json"
import { JobType } from "../types/JobType"

type jobsState = {
    jobs: JobType[]
    filteredJobs: JobType[]
    filters: string[]
    isLoading: boolean
}

const initialState: jobsState = {
    jobs: [...data],
    filteredJobs: [...data],
    filters: [],
    isLoading: true,
}

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        toggleIsLoading: (state) => {
            state.isLoading = !state.isLoading
        },
        handleFilters: (state, action: PayloadAction<string>) => {
            if (!state.filters.find((el) => el === action.payload)) {
                state.filters.push(action.payload)
                state.filteredJobs = state.jobs.filter((job) => {
                    const { role, level, languages, tools } = job
                    const tags = [role, level, ...languages, ...tools]
                    return state.filters.every((filter) => tags.includes(filter))
                })
            }
        },
        deleteFilter: (state, action: PayloadAction<string>) => {
            state.filters = state.filters.filter((el) => el !== action.payload)
            state.filteredJobs = state.jobs.filter((job) => {
                const { role, level, languages, tools } = job
                const tags = [role, level, ...languages, ...tools]
                return state.filters.every((filter) => tags.includes(filter))
            })
        },
        clearFilters: (state) => {
            state.filters = []
            state.filteredJobs = [...state.jobs]
        },
    },
})

export default jobsSlice.reducer
export const { toggleIsLoading, handleFilters, deleteFilter, clearFilters } =
    jobsSlice.actions
