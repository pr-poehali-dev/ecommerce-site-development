import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface CheckoutFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    region: string;
    deliveryMethod: string;
    paymentMethod: string;
    notes: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const CheckoutForm = ({ formData, handleInputChange, handleSelectChange }: CheckoutFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Данные получателя</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="checkout-form" className="space-y-6">
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
  );
};

export default CheckoutForm;
