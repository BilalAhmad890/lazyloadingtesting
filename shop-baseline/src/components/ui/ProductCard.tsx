import { Link } from 'react-router-dom';
import Button from './Button';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative pb-[75%]"> {/* 4:3 aspect ratio */}
        <img 
          src={product.image} 
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-medium text-gray-900 mb-2">{product.title}</h2>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-medium text-lg text-blue-600">{product.price.toFixed(2)} kr</span>
          <Link to={`/products/${product.id}`}>
            <Button size="sm">Show</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;