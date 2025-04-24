import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

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
              Номер заказа: #{orderNumber}
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
};

export default OrderSuccess;
