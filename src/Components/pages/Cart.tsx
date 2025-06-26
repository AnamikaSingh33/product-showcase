import { useCart } from '../../context/CartContext';
function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return <div className="p-8 text-center text-xl">Your cart is empty.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-6">
        {cart.map(item => (
          <div key={item.id} className="flex gap-4 items-center border-b pb-4">
            <img src={item.image} className="h-20 object-contain" alt={item.title} />
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >-</button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >+</button>
              </div>
            </div>
            <button
              className="text-red-500 text-sm underline"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 text-lg font-bold">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;
