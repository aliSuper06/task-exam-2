import { configureStore } from '@reduxjs/toolkit'
import { productSlice } from './reducer/product.slice'

const store = configureStore({
    reducer: {
        [productSlice.name]: productSlice.reducer,
    },
})

export default store
