// ================= БАЗА ДАНИХ МЕНЮ =================
// Заповніть вашими реальними позиціями
const menuData = [
    {
        id: 'cocktails',
        title: 'Авторські Коктейлі',
        items: [
            { id: 'c1', name: 'Rock Margarita', desc: 'Текіла, тріпл сек, лаймовий фреш, сироп агави, чорна сіль.', price: 180, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=200&q=80' },
            { id: 'c2', name: 'Nirvana', desc: 'Джин, пюре маракуї, лимонний фреш, білок.', price: 210, img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=200&q=80' },
            { id: 'c3', name: 'AC/DC Shot', desc: 'Міцний і швидкий. Абсент, самбука, бейліс.', price: 150, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=200&q=80' },
            { id: 'c4', name: 'ГРАНАТОВИЙ ВІСКІ САУРЕР', desc: 'ВІСКІ / СИРОП ГРАНАТ / СІК ГРАНАТ / ЛИМОННИЙ ФРЕШ', price: 180},
    // { name: 'CHERRY IVANSON', desc: 'ЗОЛОТИЙ РОМ / СИРОП ВИШНЯ / СІК ВИШНЯ / ЛИМОННИЙ ФРЕШ', volume: '150 МЛ', price: '180 ₴', img: '' },
   // { name: 'ДЖИН & ТОНІК', desc: 'ДЖИН / ТОНІК / ЛАЙМ', volume: '150 МЛ', price: '100 ₴', img: '' },
    //{ name: 'ТЕКІЛА САНРАЙЗ', desc: 'ТЕКІЛА / АПЕЛЬСИНОВИЙ СІК / ГРЕНАДИН', volume: '150 МЛ', price: '120 ₴', img: '' },
  //  { name: 'СЕКС ON ЗЕ БІЧ', desc: 'ГОРІЛКА / ПЕРСИКОВИЙ ЛІКЕР / АПЕЛЬСИНОВИЙ СІК / СІК ЖУРАВЛИНИ', volume: '200 МЛ', price: '110 ₴', img: '' },
    //{ name: 'NEGRONI', desc: 'СУХИЙ ДЖИН / ЧЕРВОНИЙ ВЕРМУТ / БІТТЕР', volume: '200 МЛ', price: '200 ₴', img: '' },
    //{ name: 'ROSO TONIC', desc: 'ЧЕРВОНИЙ ВЕРМУТ / ТОНІК / АПЕЛЬСИН', volume: '200 МЛ', price: '120 ₴', img: '' }
        ]
    },
    {
        id: 'beer',
        title: 'Пиво',
        items: [
            { id: 'b1', name: 'Craft IPA', desc: 'Світле крафтове, гірке та ароматне. 0.5л', price: 120, img: 'https://images.unsplash.com/photo-1538481199005-9715ce1eb3f5?auto=format&fit=crop&w=200&q=80' },
            { id: 'b2', name: 'Dark Stout', desc: 'Щільне темне з кавовими нотами. 0.5л', price: 130, img: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80' }
        ]
    },
    {
        id: 'snacks',
        title: 'Закуски',
        items: [
            { id: 's1', name: 'Начос з сиром', desc: 'Кукурудзяні чіпси, сирний соус, халапеньйо.', price: 160, img: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&w=200&q=80' },
            { id: 's2', name: 'В\'ялене м\'ясо', desc: 'Сет домашніх джеркі (яловичина, курка).', price: 190, img: 'https://images.unsplash.com/photo-1599598425947-330026296b00?auto=format&fit=crop&w=200&q=80' }
        ]
    }
];
