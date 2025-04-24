import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { CartItem } from '@/context/CartContext';

interface CartSummaryProps {
  cartItems: CartItem[];
  getTotalPrice: () => number;
  onCheckout: () => void;
}

const CartSummary = ({ cartItems, getTotalPrice, onCheckout }: CartSummaryProps) => {
  const hasInvalidItems = cartItems.some(item => item.quantity > item.stock);
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Итого</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Товары ({cartItems.length}):</span>
            <span>{getTotalPrice().toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Доставка:</span>
            <span>Бесплатно</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between text-lg font-bold">
          <span>Итого:</span>
          <span>{getTotalPrice().toLocaleString()} ₽</span>
        </div>
        
        {hasInvalidItems && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              В корзине есть товары, количество которых превышает доступное на складе. 
              Пожалуйста, измените количество перед оформлением заказа.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button 
          className="w-full" 
          size="lg"
          onClick={onCheckout}
          disabled={hasInvalidItems}
        >
          Оформить заказ
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
