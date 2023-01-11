/* eslint-disable react/display-name */
import { render, screen, fireEvent, within } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { CartSidebarProductsListItem } from '..'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

const decreaseQuantityMock = jest.fn().mockImplementation(() => {})
const increaseQuantityMock = jest.fn().mockImplementation(() => {})

describe('<CartSidebarProductsListItem />', () => {
  let server: Server
  let cartProducts: ICartProduct[]

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  const renderCartSidebar = () => {
    return render(
      <div>
        {cartProducts.map(cartProduct => (
          <CartSidebarProductsListItem
            product={cartProduct.product}
            quantity={cartProduct.quantity}
            key={cartProduct.product.id}
            increaseQuantity={increaseQuantityMock}
            decreaseQuantity={decreaseQuantityMock}
          />
        ))}
      </div>
    )
  }

  beforeAll(async () => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', 1)

    cartProducts = (await fetchProducts()).map(product => ({
      product,
      quantity: 1
    }))
  })

  afterAll(() => {
    server.shutdown()
  })

  it('should render the product with its info', async () => {
    renderCartSidebar()

    const { product } = cartProducts[0]

    const cartSidebarListItem = await screen.findByRole('listitem')

    const image = within(cartSidebarListItem).getByRole('img', {
      name: product.image.description
    })

    expect(image).toBeInTheDocument()
  })
})
