import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemsTable from '@/components/cart/CartItemsTable';
import CartSummary from '@/components/cart/CartSummary';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    const invalidItems = cartItems.filter(item => item.quantity > item.stock);
    
    if (invalidItems.length > 0) {
      toast({
        variant: "destructive",
        title: "Ошибка проверки наличия",
        description: "Некоторые товары недоступны в указанном количестве",
      });
    } else {
      navigate('/checkout');
    }
  };
  
  const confirmRemove = (id: number) => {
    setItemToRemove(id);
  };
  
  const handleRemove = () => {
    if (itemToRemove !== null) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
    }
  };
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Корзина</h1>
          <Link to="/" className="inline-flex items-center text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Продолжить покупки
          </Link>
        </div>
        
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemsTable 
                items={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemoveConfirm={confirmRemove}
              />
            </div>
            
            <div>
              <CartSummary 
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      
      <AlertDialog open={itemToRemove !== null} onOpenChange={() => setItemToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удаление товара</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить этот товар из корзины?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Cart;
