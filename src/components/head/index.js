import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, onOpenCart, uniqueItemCount, totalQuantity }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className="Head-cart">
        <div>
          Уникальных товаров: {uniqueItemCount} | Общее количество: {totalQuantity}
        </div>
        <button onClick={onOpenCart}>Корзина</button>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
