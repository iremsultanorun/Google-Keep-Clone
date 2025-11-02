import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCollapsed: false,
    logoNames: [],
    activeLogo: "Notes",
    isSettingsModal: false,
    isAppsModal: false,
    isAccountModal: false,
isSlideModal:false,
isSearchModal:false,
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
        setIsCollapsed: (state) => {
            state.isCollapsed = !state.isCollapsed 
        },
        setSlideModal: (state) => {
            state.isSlideModal = !state.isSlideModal
        },
        setIsSearchModal: (state) => {
            state.isSearchModal = !state.isSearchModal
        },
        setIsSettingsModal: (state) => {
            state.isSettingsModal = !state.isSettingsModal
        },
        setIsAppsModal: (state) => {
            state.isAppsModal =  !state.isAppsModal
        },
       

    }
})

export const { setLogoNames, setActiveLogo, setIsCollapsed, setIsSettingsModal, setIsAppsModal, setIsAccountModal,setSlideModal,setIsSearchModal } = headerSlice.actions
export default headerSlice.reducer