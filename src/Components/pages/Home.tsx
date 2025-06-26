/// 📁 src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import FilterSidebar from './FilterSidebar';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>("");

const handleSort = (option: string) => {
  setSortOption(option);
};


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);
        const allCategories = Array.from(new Set(data.map((p: Product) => p.category)));
        setCategories(allCategories);
      });
  }, []);

  useEffect(() => {
    const [min, max] = priceRange;
    const filtered = products.filter((product) => {
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchPrice = product.price >= min && product.price <= max;
      return matchCategory && matchPrice;
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, products]);

  useEffect(() => {
  const [min, max] = priceRange;

  let filtered = products.filter((product) => {
    const matchCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchPrice = product.price >= min && product.price <= max;
    return matchCategory && matchPrice;
  });

  if (sortOption === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "rating-desc") {
    filtered = [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
  }

  setFilteredProducts(filtered);
}, [selectedCategory, priceRange, sortOption, products]);


  return (
    <div className="flex flex-col sm:flex-row p-4 gap-4">
      <FilterSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
      />

      <div className="mb-4">
  <label className="mr-2 font-medium">Sort By:</label>
  <select
    value={sortOption}
    onChange={(e) => handleSort(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">Default</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="name-asc">Name: A–Z</option>
    <option value="rating-desc">Popularity</option>
  </select>
</div>


      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
        {filteredProducts.map(product => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg"
          >
            <img src={product.image} alt={product.title} className="h-32 object-contain mx-auto" />
            <h2 className="text-sm font-semibold mt-2">{product.title}</h2>
            <p className="text-green-600 font-bold mt-1">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}


export default Home;