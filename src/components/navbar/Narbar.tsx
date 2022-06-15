import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Product from "../../models/Product";
import SearchBar from "../search-bar/SearchBar";
import logo from "../../logo.png";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
    padding: 10px 10px 10px 40px;
`;

const Heading = styled.h1`
  font-weight: bold;
  align-self:flex-end;
  padding-left:10%;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Middle = styled.div`
  flex:3;
  display:flex;
  align-items:right;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = (props: any) => {
  const navigate = useNavigate();

  const onSearch = props.onProductSearch;

  function onSearchUpdate(productList: Product[]) {
    onSearch(productList);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo src={logo} onClick={() => { navigate('/') }}/>
        </Left>
        <Middle>
          <SearchBar onProductSearch={onSearchUpdate} />
        </Middle>
        <Right>
          <MenuItem onClick={() => { navigate('/register') }}>REGISTER</MenuItem>
          <MenuItem onClick={() => { navigate('/login') }}>SIGN IN</MenuItem>
          <MenuItem onClick={() => { navigate('/cart') }}>
            <Badge color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;