import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Ваша корзина пуста</h2>
      <p className="text-muted-foreground mb-6">Добавьте товары для оформления заказа</p>
      <Link to="/">
        <Button>Перейти к товарам</Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
