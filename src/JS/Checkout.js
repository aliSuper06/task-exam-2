import { useEffect } from 'react'
import styles from './Checkout.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { ActionsType } from '../store/reducer/product.slice'
import { getProduct } from '../store/reducer/productThunk'
import { styled } from 'styled-components'
import { Button } from '@mui/material'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
    PlusHadnler,
    MinusHandler,
}) => {
    const disapledPlus = orderedQuantity === availableCount
    const disabledMinus = orderedQuantity !== 0
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>#{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${total.toFixed(2)}</td>
            <td>
                <Button onClick={() => PlusHadnler(id)} disabled={disapledPlus}>
                    +
                </Button>
                <Button
                    onClick={() => MinusHandler(id)}
                    disabled={!disabledMinus}
                >
                    -
                </Button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const dispatch = useDispatch()
    const { productT, isError, isLoading } = useSelector(
        (state) => state.product
    )

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])
    const PlusHadnler = (id) => {
        dispatch(ActionsType.plus(id))
    }

    const MinusHandler = (id) => {
        dispatch(ActionsType.minus(id))
    }

    const Price = productT.reduce((sum, productss) => sum + productss.total, 0)
    const totalDiscount = Price - (Price * 10) / 100
    const discount = Price * 0.1

    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                {isLoading && <p>Loading....</p>}
                {isError && (
                    <SomethingError style={{ color: 'red' }}>
                        Some thing went wrong
                    </SomethingError>
                )}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th># Available</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productT.map((product) => (
                            <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                availableCount={product.availableCount}
                                orderedQuantity={product.orderQuantity}
                                total={product.total}
                                PlusHadnler={PlusHadnler}
                                MinusHandler={MinusHandler}
                            />
                        ))}
                    </tbody>
                </table>
                <Total>Summ</Total>
                {Price >= 1000 ? (
                    <Paragraph>Discount = {discount.toFixed(2)}$</Paragraph>
                ) : null}
                {Price >= 1000 ? (
                    <Paragraph>Sum = {totalDiscount.toFixed(2)}$</Paragraph>
                ) : null}
            </main>
        </div>
    )
}
const Total = styled.h2`
    display: flex;
    justify-content: center;
`
const Paragraph = styled.p`
    display: flex;
    justify-content: center;
`

const SomethingError = styled.h4`
    display: flex;
    justify-content: center;
`

export default Checkout
