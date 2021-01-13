import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Product from './Product';
import Modal from './Modal';

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [modalId, setModalID] = useState({});
  const loader = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setOffset((offset) => offset + 10);
    }
  };
  const modalHandler = (e, id) => {
    e.preventDefault();
    const productInfo = products[id];
    setModalID(productInfo);
    setIsShowing(true);
  };
  const modalToggle = () => {
    setIsShowing(!isShowing);
  };

  useEffect(() => {
    setLoading(true);
    const config = {
      Authorization: `Bearer ${props.token}`,
    };
    axios
      .get(
        `https://api.commercetools.co/nuts-custom-demo-1/products?offset=${offset}&limit=10`,
        { headers: config }
      )
      .then(({ data }) => {
        const fetchedProducts = data.results.reduce((acc, product) => {
          const { current } = product.masterData;
          const { masterVariant } = current;
          console.log(masterVariant.images);
          const insertObj = {
            id: current.slug.en,
            name: current.name.en,
            description: current.description ? current.description.en : 'n/a',
            price: masterVariant.prices.length
              ? (masterVariant.prices[0].value.centAmount / 100).toFixed(2)
              : '0.00',
            organic: masterVariant.attributes[1]
              ? masterVariant.attributes[1].value
              : 'n/a',
            badge:
              'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/5e85d71501308335-L2AE6hCf-thumb.jpg',
            image: masterVariant.images.length
              ? masterVariant.images[0].url
              : 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE.jpg',
          };
          acc.push(insertObj);
          return acc;
        }, []);
        setProducts([...products, ...fetchedProducts]);
        setLoading(false);
      });
  }, [offset]);

  return (
    <div className="container py-4">
      <h1 className="title is-1 my-6">New Products</h1>
      <div className="products">
        {products.length
          ? products.map((prod, idx) => (
              <Product
                key={prod.id}
                id={prod.id}
                info={prod}
                modalHandler={modalHandler}
                idx={idx}
              />
            ))
          : null}

        {isShowing && (
          <Modal close={modalToggle} isShowing={isShowing} info={modalId} />
        )}
      </div>
      <div id="end-of-page" ref={loader}></div>
      {loading && (
        <button className="button is-block has-text-centered">
          Loading more products
        </button>
      )}
    </div>
  );
};
export default Products;
