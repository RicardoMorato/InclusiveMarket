import { createContext, useCallback, useContext, useState } from 'react'

interface ICartContextData {
  products: Array<ICartProduct>
  addProduct: (product: IProduct) => void
  removeProduct: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  getNumberOfProductsInTheCart: () => number
}

const CartContext = createContext<ICartContextData>({} as ICartContextData)

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ICartProduct[]>([])

  const addProduct = useCallback((product: IProduct) => {
    setProducts(previousState => {
      const productIndex = previousState.findIndex(
        previousProduct => previousProduct.product.id === product.id
      )

      const productAlreadyExists = productIndex !== -1

      if (productAlreadyExists) {
        previousState[productIndex].quantity += 1

        return previousState
      }

      return [...previousState, { product, quantity: 1 }]
    })
  }, [])

  const removeProduct = useCallback((productId: string) => {
    setProducts(previousState =>
      previousState.filter(
        previousProduct => previousProduct.product.id !== productId
      )
    )
  }, [])

  const increaseQuantity = useCallback((productId: string) => {
    setProducts(previousState =>
      previousState.map(previousProduct => {
        if (previousProduct.product.id === productId)
          return {
            product: previousProduct.product,
            quantity: previousProduct.quantity + 1
          }

        return previousProduct
      })
    )
  }, [])

  const decreaseQuantity = useCallback((productId: string) => {
    setProducts(previousState =>
      previousState.map(previousProduct => {
        if (
          previousProduct.product.id === productId &&
          previousProduct.quantity > 1
        )
          return {
            product: previousProduct.product,
            quantity: previousProduct.quantity - 1
          }

        return previousProduct
      })
    )
  }, [])

  const getNumberOfProductsInTheCart = useCallback(() => {
    let totalNumberOfProducts = 0

    products.forEach(product => (totalNumberOfProducts += product.quantity))

    return totalNumberOfProducts
  }, [products])

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        getNumberOfProductsInTheCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartContext, CartProvider, useCart }
