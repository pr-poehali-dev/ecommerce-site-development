import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">ЭлектроМаркет</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
