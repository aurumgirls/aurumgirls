export type FlavorColor = string;

export const flavorColors: Record<string, FlavorColor> = {
  bal: '#FFF8E1',
  murebbe: '#FFEBEE',
  keklikotu: '#E8F5E9',
  'sari-cicek': '#FFFDE7',
  'dag-cayi': '#F1F8E9',
  seti: '#F7F3E9',
};

export type FeaturedProduct = {
  id: number;
  name: string;
  slug: string;
  price: number;
  size: string;
  image?: string;
  flavorColor: string;
  description: string;
};

export const featuredProducts: FeaturedProduct[] = [
  { id: 1, name: 'Hədiyyə Seti (5-i 1-ində)', slug: 'hadiyya-seti', price: 42, size: 'Tam Dəst', image: '/images/aurum-gift-set-real.jpg', flavorColor: '#F7F3E9', description: 'Bütün 5 təbii kənd məhsulumuz xüsusi hədiyyə qutusunda (Bal, Mürəbbə, Kəklikotu, Sarı Çiçək, Dağ Çayı).' },
  { id: 2, name: 'Təbii Dağ Balı', slug: 'dali-bal', price: 15, size: '500q', image: undefined, flavorColor: '#FFF8E1', description: 'Yüksək dağ yaylalarından toplanmış 100% xalis dağ balı.' },
  { id: 3, name: 'Ev Mürəbbəsi', slug: 'murebbe', price: 10, size: '450q', image: undefined, flavorColor: '#FFEBEE', description: 'Ənənəvi kənd üsulu ilə bişirilmiş meşə giləmeyvələri mürəbbəsi.' },
  { id: 4, name: 'Kəklikotu / Thyme', slug: 'keklikotu', price: 6, size: '100q', image: undefined, flavorColor: '#E8F5E9', description: 'Qafqaz dağlarından əllə toplanmış ətirli dağ kəklikotusu.' },
  { id: 5, name: 'Sarı Çiçək / Baf Çayı', slug: 'sari-cicek', price: 7, size: '80q', image: undefined, flavorColor: '#FFFDE7', description: 'Təbii dağ çiçəyi və ıhlamur qarışığı.' },
  { id: 6, name: 'Dağ Çayı Blend', slug: 'dag-cayi', price: 8, size: '120q', image: undefined, flavorColor: '#F1F8E9', description: 'Təbiətin ətri ilə zəngin xüsusi dağ bitkiləri çayı.' },
];

export const impactStats = [
  { value: '50+', label: 'Kəndli Qadın Sənətkar' },
  { value: '100%', label: 'Təbii & Ekoloji Qida' },
  { value: '5 Məhsul', label: 'Tək və ya Set Şəklində' },
  { value: 'Azərpoçt', label: 'Ölkəüzrə Çatdırılma' },
];

export const valuePillars = [
  { icon: 'organic', title: '100% Təbii', description: 'Heç bir kimyəvi qatqı və ya qoruyucu istifadə olunmur' },
  { icon: 'women', title: 'Qadın Əməyi', description: 'Kəndli qadınlarımızın əl əməyi və sosial dəstək' },
  { icon: 'delivery', title: 'Azərpoçt Çatdırılma', description: 'Azərbaycanın hər bir bölgəsinə etibarlı poçt çatdırılması' },
  { icon: 'payment', title: 'Onlayn Ödəniş', description: 'Sayt üzərindən təhlükəsiz bank kartı ödənişi' },
  { icon: 'box', title: 'Hədiyyə Seti', description: 'Xüsusi dizaynlı qutuda 5 məhsul bir yerdə' },
];

export const recipes = [
  { title: 'Təbii Dağ Balı və Kəklikotu Çayı', description: 'Boğaz sakitləşdirici və immunitet qaldırıcı dağ çayı resepti.', category: 'İçki', prepTime: '5 dəq', protein: 'Antioksidant', image: undefined, flavorUsed: 'Kəklikotu' },
  { title: 'Mürəbbəli Səhər Yeməyi', description: 'Ev mürəbbəsi və təbii bal ilə zənginləşdirilmiş səhər süfrəsi.', category: 'Səhər Yeməyi', prepTime: '10 dəq', protein: 'Vitamin C', image: undefined, flavorUsed: 'Mürəbbə' },
];

export const retailers = [
  'Azərpoçt Şöbələri', 'Bravo Supermarket', 'Neptun', 'Rahat Market',
  'Onlayn Çatdırılma', 'Bakı Poçt Məntəqələri',
];
