import { Product, Stall, StallProduct, Order } from "../types";

export const PRODUCTS: Product[] = [
  { id: 'PROD_TOMATE_ITA_EXTRA', grupo_base: 'tomate_italiano', nome_exibicao: 'Tomate Italiano', subclassificacao: 'Extra', categoria: 'Legumes', unidade_medida: 'Caixa 20kg', image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=800' },
  { id: 'PROD_TOMATE_ITA_A', grupo_base: 'tomate_italiano', nome_exibicao: 'Tomate Italiano', subclassificacao: 'Tipo A', categoria: 'Legumes', unidade_medida: 'Caixa 20kg', image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&q=80&w=800' },
  { id: 'PROD_BANANA_NANICA_1', grupo_base: 'banana_nanica', nome_exibicao: 'Banana Nanica', subclassificacao: 'Primeira', categoria: 'Frutas', unidade_medida: 'Caixa 18kg', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=800' },
  { id: 'PROD_ALFACE_CRESPA_G', grupo_base: 'alface_crespa', nome_exibicao: 'Alface Crespa', subclassificacao: 'Grande', categoria: 'Verduras', unidade_medida: 'Maço', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lettuce_mix.jpg' },
  { id: 'PROD_BATATA_MONA_A', grupo_base: 'batata_monalisa', nome_exibicao: 'Batata Monalisa', subclassificacao: 'Tipo A', categoria: 'Legumes', unidade_medida: 'Saco 50kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800' },
  { id: 'PROD_BATATA_MONA_AA', grupo_base: 'batata_monalisa', nome_exibicao: 'Batata Monalisa', subclassificacao: 'Tipo AA', categoria: 'Legumes', unidade_medida: 'Saco 50kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800' },
  { id: 'PROD_BATATA_MONA_LAVADA', grupo_base: 'batata_monalisa', nome_exibicao: 'Batata Monalisa', subclassificacao: 'Lavada', categoria: 'Legumes', unidade_medida: 'Saco 50kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800' },
  { id: 'PROD_CEBOLA_NAC_GRAUDA', grupo_base: 'cebola_nacional', nome_exibicao: 'Cebola Nacional', subclassificacao: 'Graúda', categoria: 'Legumes', unidade_medida: 'Saco 20kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800' },
  { id: 'PROD_MACA_GALA_100', grupo_base: 'maca_gala', nome_exibicao: 'Maçã Gala', subclassificacao: 'Calibre 100', categoria: 'Frutas', unidade_medida: 'Caixa 18kg', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=800' },
];

export const STALLS: Stall[] = [
  { id: 's1', name: 'Hortifruti do Zé', ownerId: 'u2', location: 'Pavilhão A, Box 05', rating: 4.8, image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800' },
  { id: 's2', name: 'Frutas Selecionadas Silva', ownerId: 'u3', location: 'Pavilhão B, Box 12', rating: 4.5, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800', isNew: true } as any,
  { id: 's3', name: 'Verduras Frescas Cia', ownerId: 'u4', location: 'Pavilhão C, Box 01', rating: 4.9, image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=800' },
];

export const STALL_PRODUCTS: StallProduct[] = [
  { id: 'sp1', stallId: 's1', productId: 'PROD_TOMATE_ITA_EXTRA', price: 45.00, stock: 50, updatedAt: new Date().toISOString() },
  { id: 'sp1_2', stallId: 's1', productId: 'PROD_TOMATE_ITA_A', price: 35.00, stock: 80, updatedAt: new Date().toISOString() },
  { id: 'sp2', stallId: 's1', productId: 'PROD_BATATA_MONA_A', price: 85.00, stock: 30, updatedAt: new Date().toISOString() },
  { id: 'sp2_2', stallId: 's1', productId: 'PROD_BATATA_MONA_AA', price: 110.00, stock: 40, updatedAt: new Date().toISOString() },
  { id: 'sp2_3', stallId: 's1', productId: 'PROD_BATATA_MONA_LAVADA', price: 125.00, stock: 20, updatedAt: new Date().toISOString() },
  { id: 'sp3', stallId: 's2', productId: 'PROD_BANANA_NANICA_1', price: 35.00, stock: 100, updatedAt: new Date().toISOString() },
  { id: 'sp4', stallId: 's2', productId: 'PROD_MACA_GALA_100', price: 120.00, stock: 20, updatedAt: new Date().toISOString() },
  { id: 'sp5', stallId: 's3', productId: 'PROD_ALFACE_CRESPA_G', price: 2.50, stock: 200, updatedAt: new Date().toISOString() },
  { id: 'sp6_2', stallId: 's3', productId: 'PROD_CEBOLA_NAC_GRAUDA', price: 80.00, stock: 60, updatedAt: new Date().toISOString() },
];

export const MOCK_DRIVERS = [
  {
    name: 'Ricardo Primo',
    truck: 'Caminhão HR - ABC-1234',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200', // White male, light eyes, beard
    phone: '11999999999',
  },
  {
    name: 'João Pedro',
    truck: 'Fiorino Branca - XYZ-9876',
    photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200',
    phone: '11988888888',
  },
  {
    name: 'Carlos Mendes',
    truck: 'Van Renault - DEF-5678',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    phone: '11977777777',
  },
  {
    name: 'Marcos Souza',
    truck: 'Kombi Branca - GHI-9012',
    photo: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=200',
    phone: '11966666666',
  }
];

export const MOCK_SELLERS = [
  {
    whatsapp: '11999999999',
    password: '123',
    name: 'José da Batata',
    barracaId: 's1', // Hortifruti do Zé
  },
  {
    whatsapp: '11888888888',
    password: '456',
    name: 'Silva das Frutas',
    barracaId: 's2', // Frutas Selecionadas Silva
  },
  {
    whatsapp: '11777777777',
    password: '789',
    name: 'Cia das Verduras',
    barracaId: 's3', // Verduras Frescas Cia
  }
];

export const MOCK_ORDERS: Order[] = [
  { 
    id: 'ORD-7821', 
    date: '01 Abr 2026', 
    total: 145.00, 
    status: 'shipped',
    driver: MOCK_DRIVERS[0],
    items: [
      { name: 'Tomate Italiano', stall: 'Hortifruti do Zé', quantity: '2 Caixa 20kg', price: 45.00, subclassification: 'Extra' },
      { name: 'Alface Crespa', stall: 'Verduras Frescas Cia', quantity: '10 Maço', price: 2.50, subclassification: 'Grande' },
    ]
  },
  { 
    id: 'ORD-7590', 
    date: '28 Mar 2026', 
    total: 89.50, 
    status: 'delivered',
    driver: MOCK_DRIVERS[1],
    items: [
      { name: 'Batata Monalisa', stall: 'Hortifruti do Zé', quantity: '1 Saco 50kg', price: 85.00, subclassification: 'Tipo A' },
    ]
  },
];
