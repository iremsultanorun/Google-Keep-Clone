import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCollapsed: true,
    logoNames: [],
    activeLogo: "Notes",
    isSettingsModal: false,
    isAppsModal: false,
    isAccountModal: false,
    isSlideModal: false,
    isSearchModal: false,
    isSearchPage: false,
}

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setLogoNames: (state, action) => {
            state.logoNames=action.payload
        },
        setActiveLogo: (state, action) => {
            state.activeLogo = action.payload
        },
        setIsCollapsed: (state) => {
            state.isCollapsed = !state.isCollapsed
        },
        setIsSlideModal: (state) => {
            state.isSlideModal = !state.isSlideModal
        },
        setIsSearchModal: (state,action) => {
            state.isSearchModal = action.payload
        },
        setIsSearchPage: (state, action) => {
            state.isSearchPage = action.payload
if(!state.isSearchPage){
    state.isSearchModal=false
}
        },
        setIsSettingsModal: (state) => {
            state.isSettingsModal = !state.isSettingsModal
        },
        setIsAppsModal: (state) => {
            state.isAppsModal = !state.isAppsModal
        },



    }
})

export const { setLogoNames, setActiveLogo, setIsCollapsed, setIsSettingsModal, setIsAppsModal, setIsAccountModal, setIsSlideModal, setIsSearchModal, setIsSearchPage } = headerSlice.actions
export default headerSlice.reducer