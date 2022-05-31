import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import { apiGetSaleProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";

const Container = styled.div`
    display: flex;
    background-color: ${sessionStorage.getItem('colorMode') === 'lightMode' ? '#e5ebed' : '#474C55'};
    flex-wrap: wrap;
    justify-content: space-between;
`;

const HR = styled.div`
    height:10px;
    background-color: ${sessionStorage.getItem('colorMode') === 'lightMode' ? '#F26925' : '#72A4C2'};
`;

const Heading = styled.h1`
font-family: "Roboto","Helvetica","Arial",sans-serif;
    padding: 5px;
    font-size:x-large;
    background-color: ${sessionStorage.getItem('colorMode') === 'lightMode' ? '#b5bbbd' : '#272C35'};
    color: ${sessionStorage.getItem('colorMode') === 'lightMode' ? 'black' : 'white'};
    border-radius:10px;
    margin-top: 100px;
    width: 20%;
    text-align:center;
    position: relative;
    top: 42px;
    right:-70%;
    z-index:99;
`;

export const DisplayProducts = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [saleProducts,setSaleProducts]= useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts()
      setProducts(result.payload)
      const saleResult = await apiGetSaleProducts()
      setSaleProducts(saleResult.payload)
    }
    fetchData()
  }, [])

  function onSearch(productList: Product[]) {
    setProducts(productList);
  }

  return (
    <React.Fragment>
        <Navbar onProductSearch={onSearch} />

        <Heading>Sale Products</Heading>
        <HR/>
        <Container>
        {saleProducts.map(item => <ProductCard product={item} key={item.id} />)}
        </Container>
        <Heading>All Products</Heading>
        <HR/>
        <Container>
        {products.map(item =><ProductCard product={item} key={item.id}/>)}
        </Container>
    </React.Fragment>
  );
};