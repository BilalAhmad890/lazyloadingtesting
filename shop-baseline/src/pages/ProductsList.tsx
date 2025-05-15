import { useState, useEffect } from 'react';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ui/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorMessage from '../components/ui/ErrorMessage';

import type { Product } from '../types';
import { products, searchProducts } from '../data/products';


const ProductsList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      try {
        setFilteredProducts(products);
        setLoading(false);
      } catch (err) {
        setError('Ett fel uppstod vid hämtning av produkter. Försök igen senare.');
        setLoading(false);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const results = searchProducts(query);
      setFilteredProducts(results);
    }
  };
  
  if (error) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Produkter</h1>
        <SearchBar onSearch={handleSearch} />
        <ErrorMessage message={error} />
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Produkter</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <LoadingSkeleton />
      ) : filteredProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;