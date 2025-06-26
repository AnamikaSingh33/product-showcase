
import { useEffect, useState } from 'react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}: FilterSidebarProps) => {
  const [min, max] = priceRange;

  return (
    <aside className="w-full sm:w-64 p-4 border rounded-lg shadow-md">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="w-1/2 border p-1 rounded"
            value={min}
            onChange={(e) =>
              onPriceChange([Number(e.target.value), max])
            }
            placeholder="Min"
          />
          <span>-</span>
          <input
            type="number"
            className="w-1/2 border p-1 rounded"
            value={max}
            onChange={(e) =>
              onPriceChange([min, Number(e.target.value)])
            }
            placeholder="Max"
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
