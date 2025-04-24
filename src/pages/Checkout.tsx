import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import OrderSuccess from '@/components/checkout/OrderSuccess';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

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
    return <OrderSuccess />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
              />
            </div>

            <div>
              <OrderSummary 
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
                isFormValid={isFormValid()}
              />
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
