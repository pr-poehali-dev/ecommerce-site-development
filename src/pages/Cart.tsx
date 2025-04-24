import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash, ChevronLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent,
  CardFooter 
} from '@/components/ui/card';
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
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Ваша корзина пуста</h2>
            <p className="text-muted-foreground mb-6">Добавьте товары для оформления заказа</p>
            <Link to="/">
              <Button>Перейти к товарам</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Фото</TableHead>
                        <TableHead>Товар</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Количество</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Link to={`/product/${item.id}`}>
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-contain"
                              />
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link to={`/product/${item.id}`} className="font-medium hover:underline">
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell>{item.price.toLocaleString()} ₽</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                              >
                                +
                              </Button>
                              
                              {item.quantity > item.stock && (
                                <div className="flex items-center ml-2 text-destructive text-xs">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  <span>Доступно: {item.stock}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => confirmRemove(item.id)}
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div>
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
                  
                  {cartItems.some(item => item.quantity > item.stock) && (
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
                    onClick={handleCheckout}
                    disabled={cartItems.some(item => item.quantity > item.stock)}
                  >
                    Оформить заказ
                  </Button>
                </CardFooter>
              </Card>
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
