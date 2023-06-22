import { createSlice } from '@reduxjs/toolkit'
import { getProduct } from './productThunk'

const initialState = {
    isLoading: false,
    productT: [],
    isError: '',
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        plus: (state, action) => {
            state.productT = state.productT.map((item) =>
                item.id === action.payload
                    ? {
                          ...item,
                          orderQuantity: item.orderQuantity + 1,
                          total: item.total + item.price,
                      }
                    : item
            )
        },

        minus: (state, action) => {
            state.productT = state.productT.map((item) =>
                item.id === action.payload
                    ? {
                          ...item,
                          orderQuantity: item.orderQuantity - 1,
                          total: item.total - item.price,
                      }
                    : item
            )
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, action) => {
            action.payload.map((items) => {
                items.orderQuantity = 0
                items.total = 0
                return items
            })

            state.productT = action.payload
            state.isLoading = false
        })

        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getProduct.rejected, (state) => {
            state.isLoading = false
            state.isError = 'Error'
        })
    },
})

export const ActionsType = productSlice.actions
