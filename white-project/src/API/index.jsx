/* eslint-disable react-refresh/only-export-components */


export const getAllProducts = () => {
    return fetch('https://dummyjson.com/products')
        .then(res => res.json());
};

export const getProductByCategory = (category) => {
  return fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json());
};

export const getCart=()=>{
  return fetch('https://dummyjson.com/carts/1')
  .then(res => res.json())
}

export const AddToCart=(id)=>{
    return fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          products: [
            {
              id: id,
              quantity: 4,
            }
          ]
        })
      })
      .then(res => res.json())
    }