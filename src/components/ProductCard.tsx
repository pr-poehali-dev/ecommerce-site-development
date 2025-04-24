import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, stock, image } = product;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      quantity: 1,
      stock,
      image,
    });
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <Link to={`/product/${id}`}>
        <img 
          src={image} 
          alt={name} 
          className="h-48 w-full object-contain border-b p-4"
        />
      </Link>
      
      <CardContent className="p-4 flex-grow">
        <Link to={`/product/${id}`} className="hover:underline">
          <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
        </Link>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold text-lg">{price.toLocaleString()} ₽</span>
          <span className={`text-sm ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {stock > 0 ? `В наличии: ${stock} шт.` : 'Нет в наличии'}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
