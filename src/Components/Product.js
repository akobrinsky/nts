import React from 'react';

const Product = ({ info, idx, modalHandler }) => {
  const { name, price, organic, image, badge } = info;

  // just couldn't take the test image, so replacing with the placeholder
  const replaced =
    name === 'Food taste'
      ? 'https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE.jpg'
      : null;
  const priceText = price === 'N/A' ? 'N/A' : `$${price}`;

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
        <p className="title is-4 mb-2">{name}</p>
        <p className="mb-2">{priceText}</p>
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
