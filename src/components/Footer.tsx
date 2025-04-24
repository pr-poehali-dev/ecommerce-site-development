import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-accent mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ЭлектроМаркет</h3>
            <p className="text-muted-foreground">
              Ваш надежный поставщик электронных компонентов и устройств
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Разделы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-foreground transition">
                  Корзина
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-muted-foreground hover:text-foreground transition">
                  Оформление заказа
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <address className="not-italic text-muted-foreground">
              <p>ул. Электронная, 42</p>
              <p>Москва, Россия</p>
              <p className="mt-2">Тел: +7 (123) 456-78-90</p>
              <p>Email: info@electromarket.ru</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} ЭлектроМаркет. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
