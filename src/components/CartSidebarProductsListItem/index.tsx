import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { products } from '../../miragejs/products'
import {
  Container,
  ImageContainer,
  ProductImage,
  ProductDetails,
  Title,
  Price,
  Unit,
  Actions,
  Quantity,
  MinusButton,
  PlusButton,
  RemoveButton
} from './styles'

interface IProductCart {
  product: IProduct
}

export const CartSidebarProductsListItem = ({ product }: IProductCart): JSX.Element => {
  return (
    <>
      <Container role="listitem">
        <ImageContainer>
          <ProductImage src={product.image.url} alt={product.image.description} />
        </ImageContainer>

        <ProductDetails>
          <Title>{product.title}</Title>
          <Price>
            ${product.price} <Unit>/kg</Unit>
          </Price>
        </ProductDetails>

        <Actions>
          <MinusButton>
            <FiMinus size={22} color="#fff" />
          </MinusButton>

          <Quantity>{product.quantity}</Quantity>

          <PlusButton>
            <FiPlus size={22} color="#fff" />
          </PlusButton>

          <RemoveButton>
            <FiTrash2 size={22} color="#fd7272" />
          </RemoveButton>
        </Actions>
      </Container>
    </>
  )
}
