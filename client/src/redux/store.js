import {configureStore} from '@reduxjs/toolkit'
import videogameSlice from './videogameSlice'

export default configureStore({
    reducer:{
        videogameSlice
    }
})

