import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <img src={product.image} className="h-60 object-contain mb-4" alt={product.title} />
      <h1 className="text-xl font-bold">{product.title}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-green-600 text-lg mt-2 font-semibold">${product.price}</p>
     <button
  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>
    </div>
  );
}

export default ProductDetail;

