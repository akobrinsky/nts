import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ info, isShowing, close }) => {
  return isShowing ? (
    <div className={`modal ${isShowing && ' is-active'}`}>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{info.name}</p>
          <button
            onClick={(e) => close(e)}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <img src={info.image} alt={info.name} />
          <p>{info.description}</p>
          <p>
            <strong>{`$${info.price}`}</strong>
          </p>
        </section>
        <footer className="modal-card-foot">
          <button onClick={(e) => close(e)} className="button is-danger">
            Cancel
          </button>
          <button onClick={(e) => close(e)} className="button is-primary">
            Add to Cart
          </button>
        </footer>
      </div>
    </div>
  ) : null;
};
export default Modal;
