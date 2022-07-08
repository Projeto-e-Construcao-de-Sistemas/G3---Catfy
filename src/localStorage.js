// carrinho de compras
export const getCartItems = () => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  return cartItems;
};
export const setCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// favoritos
export const getFavoritesItems = () => {
  const favoritesItems = localStorage.getItem('favoritesItems')
    ? JSON.parse(localStorage.getItem('favoritesItems'))
    : [];
  return favoritesItems;
};
export const setFavoritesItems = (favoritesItems) => {
  localStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
};

// usuarios
export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  password = '',
  token = '',
  isAdmin = false,
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      _id,
      name,
      email,
      password,
      token,
      isAdmin,
    })
  );
};
export const clearUser = () => {
  localStorage.removeItem('userInfo');
};
export const getUserInfo = () => {
  return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { name: '', email: '', password: '' };
};
export const getShipping = () => {
  const shipping = localStorage.getItem('shipping')
    ? JSON.parse(localStorage.getItem('shipping'))
    : {
        address: '',
          complemento: '',
        city: '',
        postalCode: '',
        uf: '',
      };
  return shipping;
};
export const setShipping = ({
  address = '', complemento = '',
  city = '',
  postalCode = '',
  uf = '',
}) => {
  localStorage.setItem(
    'shipping',
    JSON.stringify({ address, complemento, city, postalCode, uf })
  );
};

export const getPayment = () => {
  const payment = localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : {
        paymentMethod: 'paypal',
      };
  return payment;
};
export const setPayment = ({ paymentMethod = 'paypal' }) => {
  localStorage.setItem('payment', JSON.stringify({ paymentMethod }));
};
export const cleanCart = () => {
  localStorage.removeItem('cartItems');
};
export const cleanFavorites = () => {
  localStorage.removeItem('favoritesItems');
};
