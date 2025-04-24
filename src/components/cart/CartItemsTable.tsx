import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { CartItem as CartItemType } from '@/context/CartContext';
import CartItem from './CartItem';

interface CartItemsTableProps {
  items: CartItemType[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemoveConfirm: (id: number) => void;
}

const CartItemsTable = ({ items, onQuantityChange, onRemoveConfirm }: CartItemsTableProps) => {
  return (
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
            {items.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemoveConfirm}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CartItemsTable;
