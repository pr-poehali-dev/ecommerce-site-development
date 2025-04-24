import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

type ProductsFilterProps = {
  onSearch: (query: string) => void;
  onSort: (sort: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
};

const ProductsFilter = ({ 
  onSearch, 
  onSort, 
  onCategoryChange,
  categories 
}: ProductsFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  
  return (
    <div className="bg-accent p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="mb-2 block">Поиск по названию</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Введите название товара..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="md:w-1/4">
          <Label htmlFor="category" className="mb-2 block">Категория</Label>
          <Select onValueChange={onCategoryChange} defaultValue="all">
            <SelectTrigger id="category">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:w-1/4">
          <Label htmlFor="sort" className="mb-2 block">Сортировка</Label>
          <Select onValueChange={onSort} defaultValue="name-asc">
            <SelectTrigger id="sort">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">По названию (А-Я)</SelectItem>
              <SelectItem value="name-desc">По названию (Я-А)</SelectItem>
              <SelectItem value="price-asc">Сначала дешевле</SelectItem>
              <SelectItem value="price-desc">Сначала дороже</SelectItem>
              <SelectItem value="stock-asc">По наличию (мин-макс)</SelectItem>
              <SelectItem value="stock-desc">По наличию (макс-мин)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
