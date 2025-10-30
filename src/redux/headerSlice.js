import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCollapsed: false,
    logoNames: [],
    activeLogo: "Notes",
    isSettingsModal: false,
    isAppsModal: false,
    isAccountModal: false,

}

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setLogoNames: (state, action) => {
            state.logoNames = action.payload
        },
        setActiveLogo: (state, action) => {
            state.activeLogo = action.payload
        },
        setIsCollapsed: (state, action) => {
            state.isCollapsed = action.payload
        },
        setIsSettingsModal: (state) => {
            state.isSettingsModal = !state.isSettingsModal
        },
        setIsAppsModal: (state) => {
            state.isAppsModal =  !state.isAppsModal
        },
        setIsAccountModal: (state) => {
            state.isAccountModal = !state.isAccountModal
        }

    }
})

export const { setLogoNames, setActiveLogo, setIsCollapsed, setIsSettingsModal, setIsAppsModal, setIsAccountModal } = headerSlice.actions
export default headerSlice.reducer