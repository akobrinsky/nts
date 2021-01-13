import React from 'react';
import Modal from './Modal';

const Product = ({ info, idx, modalHandler }) => {
  const { name, description, price, organic, image, badge } = info;

  const replaced =
    name === 'Food taste'
      ? 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE.jpg'
      : null;

  return (
    <article className="card">
      <figure className="image product-image">
        <img
          onClick={(e) => modalHandler(e, idx)}
          src={!replaced ? image : replaced}
          alt={name}
        />
      </figure>
      <div className="card-content">
        <p className="title is-4">{name}</p>
        <p className="subtitle is-6 mb-2">{description}</p>
        <p className="mb-2">{`$${price}`}</p>
        <button
          onClick={(e) => modalHandler(e, idx)}
          className="button is-link is-small mr-3"
        >
          view more
        </button>
        <button className="button is-primary is-small">buy now</button>
        {organic && (
          <span className="badge">
            <img
              alt="certified organic"
              title="certified organic"
              src={badge}
            />
          </span>
        )}
      </div>
    </article>
  );
};

export default Product;
