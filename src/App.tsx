import { Route, Routes } from 'react-router-dom';
import Home from './Components/pages/Home';
import ProductDetail from './Components/pages/ProductDetail';
import Cart from './Components/pages/Cart';
import Header from './Components/pages/Header';

function App() {
  return (
 <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;


