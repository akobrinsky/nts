import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Product from './Product';
import Modal from './Modal';

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [modalIndex, setModalIndex] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);
  const loader = useRef(null);

  const loadMore = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        !isFetching && setOffset((offset) => offset + 10);
      }
    },
    [isFetching]
  );

  // using intersection observer api to listen for end-of-page div
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };
    const node = loader.current;
    const observer = new IntersectionObserver(loadMore, options);
    if (loader && node) {
      observer.observe(node);
    }
    return () => observer.unobserve(node);
  }, [loader, loadMore]);

  const modalHandler = (e, idx) => {
    e.preventDefault();
    setModalIndex(idx);
    modalToggle();
  };

  const modalToggle = () => {
    setIsShowing(!isShowing);
  };

  useEffect(() => {
    const config = {
      Authorization: `Bearer ${props.token}`,
    };
    setIsFetching(true);
    axios
      .get(
        `https://api.commercetools.co/nuts-custom-demo-1/products?offset=${offset}&limit=10`,
        { headers: config }
      )
      .then(({ data }) => {
        const fetchedProducts = data.results.reduce((acc, product) => {
          const { current } = product.masterData;
          const { masterVariant } = current;
          const insertObj = {
            id: current.slug.en,
            name: current.name.en,
            description: current.description ? current.description.en : 'N/A',
            price: masterVariant.prices.length
              ? (masterVariant.prices[0].value.centAmount / 100).toFixed(2)
              : 'N/A',
            organic: masterVariant.attributes[1]
              ? masterVariant.attributes[1].value
              : 'N/A',
            badge:
              'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/5e85d71501308335-L2AE6hCf-thumb.jpg',
            image: masterVariant.images.length
              ? masterVariant.images[0].url
              : 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE.jpg',
          };
          acc.push(insertObj);
          return acc;
        }, []);

        setProducts((p) => [...p, ...fetchedProducts]);
        setIsFetching(false);
      });
  }, [offset, props.token]);

  return (
    <div className="container">
      <h1 className="title is-1 my-6">New Products</h1>
      <div className="products">
        {products.length
          ? products.map((prod, idx) => (
              <Product
                key={`${prod.id}${idx}`}
                id={prod.id}
                info={prod}
                modalHandler={modalHandler}
                idx={idx}
              />
            ))
          : null}

        {isShowing && (
          <Modal
            close={modalToggle}
            isShowing={isShowing}
            info={products[modalIndex]}
          />
        )}
      </div>
      <div id="end-of-page" ref={loader}></div>
    </div>
  );
};
export default Products;
