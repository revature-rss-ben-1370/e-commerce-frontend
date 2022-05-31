import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Navbar from "../navbar/Narbar";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Button as MuiButton } from "@mui/material";
import { integerPropType } from "@mui/utils";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ProductDetail = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const SalePrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  /**
   * Removes product from {@link CartContext}
   * @param {number} id - id of product to be removed
   */
  function removeItemFromCart(id: number) {
    const newCart = [...cart].filter(p => id !== p.id)
    setCart(newCart)
  }

  const navigate = useNavigate();


  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => { navigate('/') }}>CONTINUE SHOPPING</TopButton>
          <TopButton onClick={() => { navigate('/checkout') }}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {
              cart.map((product) => (
                <>
                  <Product>
                    <ProductDetail>
                      <Image src={product.image} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount> Qty: {product.quantity} </ProductAmount>
                        <MuiButton sx={{marginLeft: 5}} endIcon={<RemoveShoppingCartIcon />} variant="outlined" color="error" onClick={() => {removeItemFromCart(product.id)}}>Remove</MuiButton>
                      </ProductAmountContainer>
                      <ProductPrice>$ {product.sale ? (product.price - (product.price * (product.saleRate / 100))).toFixed(2) : product.price.toFixed(2)}</ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </>
              ))
            }
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${Number(
                cart.filter(product => !product.sale).reduce<number>((total, product) => total + product.price * product.quantity, 0) +
                cart.filter(product => product.sale).reduce<number>((total, product) => total +
                  (product.price - (product.price * (product.saleRate / 100))) * product.quantity, 0)
              ).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${Number(
                cart.filter(product => !product.sale).reduce<number>((total, product) => total + product.price * product.quantity, 0) +
                cart.filter(product => product.sale).reduce<number>((total, product) => total +
                  (product.price - (product.price * (product.saleRate / 100))) * product.quantity, 0)
              ).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => { navigate('/checkout') }}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};