export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
  rating: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Процессор Intel Core i7-12700K",
    category: "Процессоры",
    price: 29990,
    stock: 15,
    image: "/placeholder.svg",
    description: "Высокопроизводительный процессор Intel Core i7-12700K для настольных компьютеров. 12 ядер, 20 потоков, базовая частота 3.6 ГГц, турбо до 5.0 ГГц.",
    specifications: {
      "Ядра": "12 (8P + 4E)",
      "Потоки": "20",
      "Базовая частота": "3.6 ГГц",
      "Турбо частота": "5.0 ГГц",
      "Кэш": "25 МБ Intel Smart Cache",
      "TDP": "125 Вт"
    },
    rating: 4.8
  },
  {
    id: 2,
    name: "Видеокарта NVIDIA GeForce RTX 3080",
    category: "Видеокарты",
    price: 89990,
    stock: 8,
    image: "/placeholder.svg",
    description: "Мощная видеокарта NVIDIA GeForce RTX 3080 с поддержкой трассировки лучей и DLSS. Идеальное решение для игр в разрешении 4K.",
    specifications: {
      "Графический процессор": "NVIDIA GA102",
      "Видеопамять": "10 ГБ GDDR6X",
      "Шина памяти": "320-бит",
      "Ядра CUDA": "8704",
      "Частота памяти": "19 Гбит/с",
      "Разъемы": "1x HDMI 2.1, 3x DisplayPort 1.4a"
    },
    rating: 4.9
  },
  {
    id: 3,
    name: "Материнская плата ASUS ROG Strix Z690-E Gaming",
    category: "Материнские платы",
    price: 36990,
    stock: 12,
    image: "/placeholder.svg",
    description: "Высококлассная материнская плата ASUS ROG Strix Z690-E Gaming для процессоров Intel 12-го поколения с сокетом LGA 1700.",
    specifications: {
      "Чипсет": "Intel Z690",
      "Сокет": "LGA 1700",
      "Память": "4x DIMM, DDR5, до 128 ГБ",
      "Слоты расширения": "2x PCIe 5.0 x16, 1x PCIe 3.0 x16",
      "Сеть": "Intel 2.5G Ethernet, Wi-Fi 6E",
      "USB": "2x USB 3.2 Gen 2x2, 4x USB 3.2 Gen 2, 6x USB 3.2 Gen 1"
    },
    rating: 4.7
  },
  {
    id: 4,
    name: "Оперативная память Corsair Vengeance RGB Pro 32GB",
    category: "Оперативная память",
    price: 12990,
    stock: 20,
    image: "/placeholder.svg",
    description: "Набор из двух модулей оперативной памяти Corsair Vengeance RGB Pro общим объемом 32 ГБ (2x16 ГБ) с RGB-подсветкой.",
    specifications: {
      "Тип": "DDR4",
      "Объем": "32 ГБ (2x16 ГБ)",
      "Частота": "3600 МГц",
      "Тайминги": "CL18-22-22-42",
      "Напряжение": "1.35V",
      "Подсветка": "RGB"
    },
    rating: 4.6
  },
  {
    id: 5,
    name: "Твердотельный накопитель Samsung 980 PRO 1TB",
    category: "Накопители",
    price: 15990,
    stock: 25,
    image: "/placeholder.svg",
    description: "Высокоскоростной NVMe SSD от Samsung объемом 1 ТБ с интерфейсом PCIe 4.0. Обеспечивает скорость чтения до 7000 МБ/с.",
    specifications: {
      "Интерфейс": "PCIe 4.0 x4 NVMe",
      "Объем": "1 ТБ",
      "Скорость чтения": "до 7000 МБ/с",
      "Скорость записи": "до 5000 МБ/с",
      "Контроллер": "Samsung Elpis",
      "NAND": "Samsung V-NAND 3-bit MLC"
    },
    rating: 4.9
  },
  {
    id: 6,
    name: "Блок питания Corsair RM850x",
    category: "Блоки питания",
    price: 13990,
    stock: 18,
    image: "/placeholder.svg",
    description: "Высокоэффективный модульный блок питания Corsair RM850x мощностью 850 Вт с сертификатом 80 PLUS Gold.",
    specifications: {
      "Мощность": "850 Вт",
      "Сертификат": "80 PLUS Gold",
      "Модульность": "Полностью модульный",
      "Охлаждение": "135 мм вентилятор с низким уровнем шума",
      "Защита": "OVP, UVP, OCP, OPP, SCP",
      "Гарантия": "10 лет"
    },
    rating: 4.8
  }
];
