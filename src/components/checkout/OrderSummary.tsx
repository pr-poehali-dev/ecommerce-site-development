import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/context/CartContext';

interface OrderSummaryProps {
  cartItems: CartItem[];
  getTotalPrice: () => number;
  isFormValid: boolean;
}

const OrderSummary = ({ cartItems, getTotalPrice, isFormValid }: OrderSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ваш заказ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} x {item.price.toLocaleString()} ₽
                  </p>
                </div>
              </div>
              <span className="font-medium">
                {(item.price * item.quantity).toLocaleString()} ₽
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Товары:</span>
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
      </CardContent>
      <CardFooter>
        <Button 
          type="submit"
          form="checkout-form"
          className="w-full" 
          size="lg"
          disabled={cartItems.length === 0 || !isFormValid}
        >
          Оформить заказ
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
