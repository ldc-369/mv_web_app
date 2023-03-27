import { createSlice } from '@reduxjs/toolkit'


export const homeSlice = createSlice({
    name: 'home_slice_webtool',
    initialState: {
        url_slice: {},
        genres_slice: {}
    },
    reducers: {
        getApiConfiguration: (state, action)=>{     
            state.url_slice = action.payload;
        },
        getGenres: (state, action)=>{
            state.genres_slice = action.payload;
        }
    },
})

export const { getApiConfiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer