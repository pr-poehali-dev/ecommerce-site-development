import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16 flex-grow">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
            <Link to="/">
              <Button>Вернуться на главную</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      stock: product.stock,
      image: product.image,
    });
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(product.stock, prev + 1));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Link to="/" className="inline-flex items-center text-primary mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Вернуться к каталогу
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-square object-contain border rounded-lg p-4"
            />
          </div>
          
          <div>
            <div className="mb-4">
              <Badge>{product.category}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)}</span>
            </div>
            
            <p className="text-3xl font-bold mb-4">{product.price.toLocaleString()} ₽</p>
            
            <div className={`mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 
                ? `В наличии: ${product.stock} шт.` 
                : 'Нет в наличии'}
            </div>
            
            {product.stock > 0 && (
              <div className="flex items-center mb-6">
                <span className="mr-4">Количество:</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            <Button 
              size="lg" 
              className="w-full mb-6"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Нет в наличии' : 'Добавить в корзину'}
            </Button>
            
            <Separator className="mb-6" />
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Описание</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Характеристики</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b last:border-0">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
