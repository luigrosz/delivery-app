import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Card, CardContent, CardMedia, Chip, Divider, IconButton, Paper, TextField, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from 'prop-types';
import { context } from '../../context';

function ProductCard({ id, name, price, urlImage }) {
  const [quantity, setQuantity] = useState(0);
  const { setProducts } = useContext(context);
  const previousNumber = useRef(quantity);

  useEffect(() => {
    previousNumber.current = quantity;
  });

  const setProductQuantity = (newValue) => {
    setQuantity(newValue);
    setProducts((prevProd) => prevProd.reduce((acc, product) => {
      let newItem = product;
      if (product.id === id) {
        newItem = { ...product, quantity: newValue };
      }
      return [...acc, newItem];
    }, []));
  };

  const handleQnt = ({ target: { value } }) => {
    const parsedValue = +value;
    const newValue = parsedValue || previousNumber.current;
    setProductQuantity(newValue);
  };

  const handleInc = (type) => {
    const value = (type === 'plus') ? quantity + 1 : quantity - 1;
    const validValue = (value < 0) ? 0 : value;
    setProductQuantity(validValue);
  };

  return (
    <Card
      container
      component={ Paper }
      sx={ {
        width: '250px',
        height: '300px',
        margin: '5px',
      } }
    >
      <CardMedia
        sx={ {
          height: '200px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } }
      >
        <Chip
          size="small"
          variant="outlined"
          icon={ <AttachMoneyIcon /> }
          label={ price.toString().replace('.', ',') }
          sx={ {
            position: 'absolute',
            top: '3%',
            left: '3%',
          } }
          data-testid={ `customer_products__element-card-price-${id}` }
        />
        <img
          style={ { height: '200px' } }
          src={ urlImage }
          alt={ name }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </CardMedia>
      <Divider />
      <CardContent
        sx={ {
          backgroundColor: '#e5e5e5',
        } }
      >
        <Typography
          align="center"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </Typography>
        <Container
          sx={ {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          } }
        >
          <IconButton
            variant="contained"
            sx={ {
              minWidth: '30px',
            } }
            onClick={ () => handleInc('minus') }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            variant="standard"
            inputProps={ {
              style: { textAlign: 'center' },
              'data-testid': `customer_products__input-card-quantity-${id}`,
            } }
            value={ quantity }
            onChange={ handleQnt }
            sx={ {
              width: '50px',
              height: '20px',
            } }
          />
          <IconButton
            variant="contained"
            sx={ {
              minWidth: '30px',
            } }
            onClick={ () => handleInc('plus') }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            <AddIcon />
          </IconButton>
        </Container>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default ProductCard;
