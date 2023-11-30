import React, { useCallback, useState, useEffect } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [uniqueCartItems, setUniqueCartItems] = useState([]);

  useEffect(() => {
    const uniqueItems = Array.from(new Set(cartItems.map((item) => item.code)));
    setUniqueCartItems(uniqueItems);
  }, [cartItems]);

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddToCart: useCallback((item) => {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }, []),

    onDeleteFromCart: useCallback((item) => {
      setCartItems((prevItems) => prevItems.filter((i) => i.code !== item.code));
    }, []),
  };

  const openCart = useCallback(() => {
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  return (
    <PageLayout>
      <Head
        title="Приложение"
        onOpenCart={openCart}
        uniqueItemCount={uniqueCartItems.length}
        totalQuantity={cartItems.reduce((total, item) => total + item.quantity, 0)}
      />
      <List
        list={store.getState().list}
        onDeleteItem={callbacks.onDeleteItem}
        onSelectItem={callbacks.onSelectItem}
        onAddToCart={callbacks.onAddToCart}
      />
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onClose={closeCart}
          onDeleteFromCart={callbacks.onDeleteFromCart}
        />
      )}
    </PageLayout>
  );
}

export default App;
