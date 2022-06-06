import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/productCard';
import { context } from '../../context';

const Products = () => {
  const { products, totalPrice } = useContext(context);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const handleDisabled = () => {
    if (totalPrice > 0) {
      setDisabled(false);
    } else setDisabled(true);
  };

  useEffect(() => {
    handleDisabled();
  }, [totalPrice]);

  return (
    <>
      <div
        style={ {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        } }
      >
        { products.map((product) => (
          <ProductCard
            key={ product.name }
            { ...product }
          />
        ))}
      </div>
      <Button
        type="submit"
        variant="contained"
        disabled={ disabled }
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
      >
        <Typography data-testid="customer_products__checkout-bottom-value">
          {`Ver Carrinho: R$ ${totalPrice.toString().replace('.', ',')}`}
        </Typography>
      </Button>
    </>
  );
};

export default Products;
