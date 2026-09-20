// Щоб позиція частіше траплялася у боті-порадники напоїв (за настроєм) —
// додайте їй поле boost: true, наприклад:
// { name: 'ROSO TONIC', ..., boost: true }
//
// Поле strength (1-3) — міцність напою для міні-індикатора біля назви
// (▪▪▫ тощо). 1 = легкий, 2 = середній, 3 = міцний. Не додавайте його
// безалкогольним позиціям, снекам і додаткам — індикатор для них не
// показується.
//
// Поле hit: true — позначає хіт розділу (1-2 позиції на розділ):
// назва виводиться крупніше, з лейблом "Хіт бару" і товщим
// роздільником зверху, щоб виділятись серед списку.
const menuData = {
  cocktails: [
    { name: 'ДЖИН ТОНІК', desc: 'джин/ тонік/ лайм', volume: '150 мл', price: '120 ₴', img: 'img/gin_tonic.jpg', strength: 1 },
    { name: 'NEGRONI', desc: 'СУХИЙ ДЖИН / ЧЕРВОНИЙ ВЕРМУТ / БІТТЕР', volume: '200 мл', price: '230 ₴', img: 'img/negroni.jpg', strength: 3, hit: true },
    { name: 'CHERRY IVANSON', desc: 'JIM BEAM RedStag / СИРОП ВИШНЯ / СІК ВИШНЯ / ЛИМОННИЙ ФРЕШ', volume: '150 мл', price: '180 ₴', img: 'img/cherry_ivanson.jpg', strength: 2 },
    { name: 'ТЕКІЛА САНРАЙЗ', desc: 'ТЕКІЛА / АПЕЛЬСИНОВИЙ СІК / ГРЕНАДИН', volume: '150 мл', price: '150 ₴', img: 'img/tequila_sunrise.jpg', strength: 1 },
    { name: 'СЕКС ON ЗЕ БІЧ', desc: 'ГОРІЛКА / ПЕРСИКОВИЙ ЛІКЕР / АПЕЛЬСИНОВИЙ СІК / СІК ЖУРАВЛИНИ', volume: '200 мл', price: '120 ₴', img: 'img/sex_on_the_beach.jpg', strength: 1 },
    { name: 'ROSO TONIC', desc: 'ЧЕРВОНИЙ ВЕРМУТ / ТОНІК / АПЕЛЬСИН', volume: '200 МЛ', price: '120 ₴', img: 'img/roso_tonic.jpg', strength: 1 },
    { name: 'CUBA LIBRE', desc: 'ЗОЛОТИЙ РОМ/ COCA COLA/ ЛАЙМ', volume: '150 мл', price: '110 ₴', img: 'img/cuba_libre.jpg', strength: 2 },
    { name: 'КРИВАВА МЕРІ', desc: 'ТОМАТНИЙ СІК/ ГОРІЛКА/ ТАБАСКО/ ВУСТРСЬКИЙ СОУС/ ЛАЙМ', volume: '150 мл', price: '120 ₴', img: 'img/krivava_meri.jpg', strength: 1 },
    { name: 'СИНІЙ КАМІКАДЗЕ', desc: 'ГОРІЛКА/ ЛИМОННИЙ СІК/ BLUE CURASAO', volume: '150 мл', price: '100 ₴', img: 'img/siniy_kamikadze.jpg', strength: 2 },
    { name: 'АНАСТЕЙША', desc: 'БІЛИЙ РОМ/ SPRITE/ ЛИМОННИЙ СІК/ BLUE CERASAO', volume: '300 мл', price: '180 ₴', img: 'img/anastasia.jpg', strength: 1 }
  ],
  shots: [
    { name: 'ПАН ІВАН', desc: 'ГОРІЛКА / ЛИМОННИЙ СІК / ГРЕНАДИН', volume: '50 мл', price: '50 ₴', img: 'img/pan_ivan.jpg', strength: 3 },
    { name: 'ЗЕЛЕНИЙ МЕКСИКАНЕЦЬ', desc: 'ТЕКІЛА / ЛІКЕР ЗЕЛЕНИЙ БАНАН / ФРЕШ ЛАЙМА', volume: '50 мл', price: '120 ₴', img: 'img/zeleniy_meksikanets.jpg', strength: 3, hit: true },
    { name: 'ПРАПОР', desc: 'ГОРІЛКА / ЛІКЕР АПЕЛЬСИНОВИЙ', volume: '50 мл', price: '50 ₴', img: 'img/prapor.jpg', strength: 3 },
    { name: 'КАЙДАШ', desc: 'ГОРІЛКА / ТАБАСКО / ГРЕНАДИН', volume: '50 мл', price: '80 ₴', img: 'img/kaidash.jpg', strength: 3 },
    { name: 'МЕРКУРІЙ', desc: 'САМБУКА / БЕЙЛІЗ / ГРЕНАДИН', volume: '50 мл', price: '100 ₴', img: 'img/merkuriy.jpg', strength: 2 },
    { name: 'ВЕРШКОВИЙ МАРЦИПАН', desc: 'БЕЙЛІЗ/ АМАРЕТТО', volume: '50 МЛ', price: '100 ₴', img: 'img/vershkoviy_martsypan.jpg', strength: 1 },
    { name: 'ІНТЕРСІТІ', desc: 'СЕТ З ДЕСЯТИ ШОТІВ КРАФТОВИХ НАСТОЯНОК 20% ТА 40%', volume: '500 МЛ', price: '500 ₴', img: '', strength: 3 }
  ],
  strongAlcohol: [
    { name: 'Ром Captain Morgan Spiced Gold', desc: '', volume: '50 мл', price: '90 ₴', img: '', strength: 3 },
    { name: 'Ром Captain Morgan TIKI', desc: '', volume: '50 мл', price: '90 ₴', img: '', strength: 3 },
    { name: 'Ром Oakheart Original 35%', desc: '', volume: '50 мл', price: '90 ₴', img: '', strength: 3 },
    { name: 'Ром Bacardi CartaBianca', desc: '', volume: '50 мл', price: '90 ₴', img: '', strength: 3 },
    { name: 'Текіла Sierra Blanko', desc: '', volume: '50 мл', price: '100 ₴', img: '', strength: 3 },
    { name: 'Віскі Jameson', desc: '', volume: '50 мл', price: '120 ₴', img: '', strength: 3 },
    { name: 'Віскі Jack Daniels', desc: '', volume: '50 мл', price: '120 ₴', img: '', strength: 3 },
    { name: 'Віскі Paddy', desc: '', volume: '50 мл', price: '100 ₴', img: '', strength: 3 },
    { name: 'Бурбон Jim Beam White', desc: '', volume: '50 мл', price: '100 ₴', img: '', strength: 3 },
    { name: 'Бурбон Jim Beam Red Stag', desc: '', volume: '50 мл', price: '100 ₴', img: '', strength: 3 },
    { name: 'Джин Finsbury Platinum 47%', desc: '', volume: '50 мл', price: '90 ₴', img: '', strength: 3 },
    { name: 'Джин Finsbury Wild Strawberry', desc: '', volume: '50 мл', price: '90 ₴', img: '', strength: 3 },
    { name: 'Лікер Jagermeister', desc: '', volume: '50 мл', price: '100 ₴', img: '', strength: 3 },
    { name: 'Лікер Jagermeister Orange', desc: '', volume: '50 мл', price: '100 ₴', img: '', strength: 3 },
    { name: 'Настоянка Becherovka', desc: '', volume: '50 мл', price: '80 ₴', img: '', strength: 3 },
    { name: 'Лікер Baileys', desc: '', volume: '50 мл', price: '110 ₴', img: '', strength: 1 },
    { name: 'Лікер SAMBUCA', desc: '', volume: '50 мл', price: '100 ₴', img: '', strength: 3 },
    { name: 'Абсент', desc: '', volume: '50 мл', price: '100 ₴', img: '', strength: 3 },
    { name: 'Бренді Couronnier Napoleon', desc: '', volume: '50 мл', price: '70 ₴', img: '', strength: 3 },
    { name: 'Горілка Nemiroff original', desc: '', volume: '50 мл', price: '40 ₴', img: '', strength: 3 },
    { name: 'Вермут Martini Rosso', desc: '', volume: '50 мл', price: '70 ₴', img: '', strength: 1 },
    { name: 'Лікер Амаретто VillaCardea', desc: '', volume: '50 мл', price: '70 ₴', img: '', strength: 2 },
    { name: 'Лікер Вишневий SanMartino', desc: '', volume: '50 мл', price: '70 ₴', img: '', strength: 2 },
    { name: 'Лікер Лімончелло SanMartino', desc: '', volume: '50 мл', price: '70 ₴', img: '', strength: 2 }
  ],
  nastoyanky: [
    { name: 'ЗЕЛЕНИЙ ЗМІЙ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'ЯГІДНА', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'ROCK HATA', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'ВИШНЯК', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'ROCK-n-ROLLA', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'БУГІ ВУГІ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'МАЛИНА', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'ДЖОННІ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'Лимонадний ДЖО', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'АВАТАР', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'ТАРХУН', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'МЕНТОЛ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'СМАК ДИТИНСТВА', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'TWIST', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'СЛИВ\'ЯНА', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 },
    { name: 'ТРАВИ З МЕДОМ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '', strength: 3 }
  ],
  liqueurs: [
    { name: 'АПЕЛЬСИН', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'ЛИМОН', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'ШОКОЛАД', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'ЯГІДНИЙ', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'ЛАЙМ', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'МАЛИНА', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'КАВА З МОЛОКОМ', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'ВИШНЯ', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'БАРБАРИС', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'ЖУРАВЛИНА', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 },
    { name: 'ЛИМОН М\'ЯТА', desc: '20%', volume: '50 мл', price: '50 ₴', img: '', strength: 2 }
  ],
  beer: [
    { name: 'Львівське Фірмове', desc: 'СВІТЛЕ', volume: '500 мл', price: '80 ₴', img: '', strength: 1 },
    { name: 'DUNKEL', desc: 'ТЕМНЕ', volume: '500 мл', price: '80 ₴', img: '', strength: 1 },
    { name: 'STAROPRAMEN З/Б', desc: 'СВІТЛЕ', volume: '500 мл', price: '80 ₴', img: '', strength: 1 },
    { name: 'Б/а Krounenbourg 1664', desc: '', volume: '0.33 мл', price: '80 ₴', img: '', strength: 1 }
  ],
  wine: [

  ],
  nonAlcohol: [
    { name: 'Кава', desc: 'зварена в турці', volume: '', price: '60 ₴', img: '' },
    { name: 'Чай', desc: 'Чорний, зелений, трав\'яний, фруктовий', volume: '', price: '40 ₴', img: '' },
    { name: 'Енергетичний напій Battery', desc: '', volume: '0.33 мл', price: '50 ₴', img: '' },
    { name: 'Тонік SWEPPES', desc: '', volume: '250 мл', price: '40 ₴', img: '' },
    { name: 'CocaCola', desc: '', volume: '250 мл', price: '40 ₴', img: '' },
    { name: 'Sprite', desc: '', volume: '250 мл', price: '40 ₴', img: '' },
    { name: 'Пиво Б/а Krounenbourg 1664', desc: '', volume: '0.33 мл', price: '80 ₴', img: '' },
    { name: 'ЛИМОНАД', desc: 'смаки в асортименті', volume: '250 мл', price: '80 ₴', img: '' },
    { name: 'СІК', desc: 'смаки в асортименті', volume: '250 мл', price: '50 ₴', img: '' }
  ],
  snacks: [
    { name: 'КАРТОПЛЯ ФРІ', desc: '', volume: '200 гр', price: '120 ₴', img: '' },
    { name: 'НАГЕТСИ', desc: '', volume: '6 шт', price: '140 ₴', img: '' },
    { name: 'ЦИБУЛЕВІ КІЛЬЦЯ', desc: '', volume: '10 шт', price: '150 ₴', img: '' },
    { name: 'АРАХІС BigBob', desc: 'смаки в асортименті', volume: '60 гр', price: '60 ₴', img: '' },
    { name: 'ГРІНКИ JExtraSI', desc: 'смаки в асортименті', volume: '90 гр', price: '120 ₴', img: '' },
    { name: 'Kabanosy', desc: '', volume: '60 гр', price: '120 ₴', img: '' }
  ],
  extras: [
    { name: 'АПЕЛЬСИН', desc: '', volume: '10 гр', price: '15 ₴', img: '' },
    { name: 'ЛАЙМ', desc: '', volume: '10 гр', price: '10 ₴', img: '' },
    { name: 'ЛИМОН', desc: '', volume: '10 гр', price: '10 ₴', img: '' },
    { name: 'Вершки', desc: '', volume: '10 гр', price: '10 ₴', img: '' }
  ]
};
