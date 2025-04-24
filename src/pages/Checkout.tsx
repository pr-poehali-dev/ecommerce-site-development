import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    region: '',
    deliveryMethod: 'стандартная',
    paymentMethod: 'картой-онлайн',
    notes: ''
  });
  
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'region', 'zip'];
    return required.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        variant: "destructive",
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
      });
      return;
    }

    // Здесь будет отправка данных на сервер
    
    // Симуляция успешного оформления заказа
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 1000);
  };

  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 flex-grow">
          <Card className="max-w-xl mx-auto">
            <CardHeader className="text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary mb-4" />
              <CardTitle className="text-2xl">Заказ успешно оформлен!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6">
                Спасибо за ваш заказ. Мы отправили подтверждение на вашу электронную почту.
              </p>
              <p className="text-muted-foreground">
                Номер заказа: #{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate('/')}>
                Вернуться на главную
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Данные получателя</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <CardTitle className="text-lg">Адрес доставки</CardTitle>

                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес *</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Город *</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Регион *</Label>
                      <Input 
                        id="region" 
                        name="region" 
                        value={formData.region}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Индекс *</Label>
                      <Input 
                        id="zip" 
                        name="zip" 
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryMethod">Способ доставки</Label>
                      <Select 
                        defaultValue={formData.deliveryMethod}
                        onValueChange={(value) => handleSelectChange('deliveryMethod', value)}
                      >
                        <SelectTrigger id="deliveryMethod">
                          <SelectValue placeholder="Выберите способ доставки" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="стандартная">Стандартная доставка (3-7 дней)</SelectItem>
                          <SelectItem value="экспресс">Экспресс доставка (1-2 дня)</SelectItem>
                          <SelectItem value="самовывоз">Самовывоз из пункта выдачи</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Способ оплаты</Label>
                      <Select 
                        defaultValue={formData.paymentMethod}
                        onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                      >
                        <SelectTrigger id="paymentMethod">
                          <SelectValue placeholder="Выберите способ оплаты" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="картой-онлайн">Картой онлайн</SelectItem>
                          <SelectItem value="картой-курьеру">Картой курьеру</SelectItem>
                          <SelectItem value="наличными">Наличными при получении</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Примечания к заказу</Label>
                    <Textarea 
                      id="notes" 
                      name="notes" 
                      placeholder="Дополнительная информация к заказу" 
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
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
                  disabled={cartItems.length === 0}
                >
                  Оформить заказ
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
