import React from "react";
import './style.css';

function Cart({ cartItems, onClose, onDeleteFromCart }) {
  return (
    <div className="CartOverlay">
    <div className="Cart">
      <h2>Корзина</h2>
      {cartItems.map((item) => (
        <div key={item.code} className="Cart-item">
          <span>{item.title}</span>
          <span>Количество: {item.quantity}</span>
          <button onClick={() => onDeleteFromCart(item)}>Удалить из корзины</button>
        </div>
      ))}
      <div className="Cart-total">Общая сумма: {calculateTotal(cartItems)}</div>
      <button onClick={onClose}>Закрыть</button>
    </div>
    </div>
  );
}

function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

export default React.memo(Cart);
