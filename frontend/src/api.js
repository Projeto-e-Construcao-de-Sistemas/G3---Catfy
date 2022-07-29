import axios from 'axios';
import { apiUrl } from './config';
import { getUserInfo } from './localStorage';
//import sgMail from '@sendgrid/mail';
//sgMail.setApiKey('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');

export const getProducts = async ({searchKeyword = ''}) => {
  try {
    let queryString = '?';
    if (searchKeyword) { queryString += `searchKeyword=${searchKeyword}&`; }

    const response = await axios({
      url: `${apiUrl}/api/products${queryString}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getAdoptions = async (searchKeyword = '') => {
  try {
    let queryString = '?';
    if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;

    const response = await axios({
      url: `${apiUrl}/api/adoption${queryString}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getCustomizes = async (searchKeyword = '') => {
  try {
    let queryString = '?';
    if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;

    const response = await axios({
      url: `${apiUrl}/api/customizeproduct${queryString}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getAdoption = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/adoption/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const getCustomize = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/customizeproduct/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const createProduct = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};
//TODO: CREATE ADOPTION
export const createAdoption = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/adoption`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const createCustomize = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/customizeproduct`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const createReview = async (productId, review) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${productId}/reviews`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: review,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${productId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const deleteAdoption = async (adoptionId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/adoption/${adoptionId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const deleteCustomize = async (customizeId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/customizeproduct/${customizeId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const updateProduct = async (product) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${product._id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: product,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const updateAdoption = async (adoption) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/adoption/${adoption._id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: adoption,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const updateCustomize = async (customize) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/customizeproduct/${customize._id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: customize,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const uploadProductImage = async (formData) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/uploads`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const uploadAdoptionImage = async (formData) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/uploads`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const signin = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const register = async ({ name, email, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/register`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const update = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: order,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};
export const getOrders = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};
export const deleteOrder = async (orderId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};
export const getOrder = async (id) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};
export const getMyOrders = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/mine`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};
export const getPaypalClientId = async () => {
  const response = await axios({
    url: `${apiUrl}/api/paypal/clientId`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.statusText !== 'OK') {
    throw new Error(response.data.message);
  }
  return response.data.clientId;
};

export const payOrder = async (orderId, paymentResult) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}/pay`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: paymentResult,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};
export const deliverOrder = async (orderId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}/deliver`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};
export const getSummary = async () => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/summary`,
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const viaCepApi = async (cep) => {

    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          return response.data;
        })
        .catch(err => {
          console.log(err);
        });
};

export const sendMail = async () => {

  fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "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"
    },
    body: '{"personalizations":[{"to":[{"email":"allanis@edu.unirio.br","name":"Allanis"}],"subject":"teste"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"lojacatfy@gmail.com","name":"catfy"},"reply_to":{"email":"lojacatfy@gmail.com","name":"catfy"}}'
  });
};


