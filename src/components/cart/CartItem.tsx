import { Link } from 'react-router-dom';
import { Trash, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  return (
    <TableRow>
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
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </Button>
          <span className="mx-2 w-8 text-center">{item.quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
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
          onClick={() => onRemove(item.id)}
        >
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
