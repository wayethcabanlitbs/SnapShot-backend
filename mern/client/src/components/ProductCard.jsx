// Card component to display individual camera products
export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white shadow-lg rounded-3xl overflow-hidden p-5 product-card">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-contain rounded-xl mb-5"
      />

      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.color}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-gray-900">${product.price}</span>

        <span className="bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1">
          ⭐ {product.rating}
        </span>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition btn-enhanced"
      >
        Add to Cart
      </button>
    </div>
  );
}
