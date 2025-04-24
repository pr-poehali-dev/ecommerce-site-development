import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductsFilter from '@/components/ProductsFilter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Фильтрация по поиску
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Фильтрация по категории
    if (category !== 'all') {
      result = result.filter(product => product.category === category);
    }
    
    // Сортировка
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock-asc':
          return a.stock - b.stock;
        case 'stock-desc':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });
    
    return result;
  }, [products, searchQuery, sortBy, category]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">ЭлектроМаркет</h1>
          <p className="text-muted-foreground">Магазин электронных товаров и компонентов</p>
        </div>
        
        <ProductsFilter 
          onSearch={setSearchQuery}
          onSort={setSortBy}
          onCategoryChange={setCategory}
          categories={categories}
        />
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold">Товары не найдены</h2>
            <p className="text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
