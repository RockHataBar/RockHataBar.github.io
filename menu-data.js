// Щоб позиція частіше траплялася у боті-порадники напоїв (за настроєм) —
// додайте їй поле boost: true, наприклад:
// { name: 'ROSO TONIC', ..., boost: true }
const menuData = {
  cocktails: [
    { name: 'ДЖИН ТОНІК', desc: 'джин/ тонік/ лайм', volume: '150 мл', price: '120 ₴', img: '' },
    { name: 'CHERRY IVANSON', desc: 'JIM BEAM RedStag / СИРОП ВИШНЯ / СІК ВИШНЯ / ЛИМОННИЙ ФРЕШ', volume: '150 мл', price: '180 ₴', img: '' },
    { name: 'ТЕКІЛА САНРАЙЗ', desc: 'ТЕКІЛА / АПЕЛЬСИНОВИЙ СІК / ГРЕНАДИН', volume: '150 мл', price: '150 ₴', img: '' },
    { name: 'СЕКС ON ЗЕ БІЧ', desc: 'ГОРІЛКА / ПЕРСИКОВИЙ ЛІКЕР / АПЕЛЬСИНОВИЙ СІК / СІК ЖУРАВЛИНИ', volume: '200 мл', price: '120 ₴', img: '' },
    { name: 'NEGRONI', desc: 'СУХИЙ ДЖИН / ЧЕРВОНИЙ ВЕРМУТ / БІТТЕР', volume: '200 мл', price: '230 ₴', img: '' },
    { name: 'ROSO TONIC', desc: 'ЧЕРВОНИЙ ВЕРМУТ / ТОНІК / АПЕЛЬСИН', volume: '200 МЛ', price: '120 ₴', img: '' },
    { name: 'CUBA LIBRE', desc: 'ЗОЛОТИЙ РОМ/ COCA COLA/ ЛАЙМ', volume: '150 мл', price: '110 ₴', img: '' },
    { name: 'КРИВАВА МЕРІ', desc: 'ТОМАТНИЙ СІК/ ГОРІЛКА/ ТАБАСКО/ ВУСТРСЬКИЙ СОУС/ ЛАЙМ', volume: '150 мл', price: '120 ₴', img: '' },
    { name: 'СИНІЙ КАМІКАДЗЕ', desc: 'ГОРІЛКА/ ЛИМОННИЙ СІК/ BLUE CURASAO', volume: '150 мл', price: '100 ₴', img: '' },
    { name: 'АНАСТЕЙША', desc: 'БІЛИЙ РОМ/ SPRITE/ ЛИМОННИЙ СІК/ BLUE CERASAO', volume: '300 мл', price: '180 ₴', img: '' }
  ],
  shots: [
    { name: 'ПАН ІВАН', desc: 'ГОРІЛКА / ЛИМОННИЙ СІК / ГРЕНАДИН', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ПРАПОР', desc: 'ГОРІЛКА / ЛІКЕР АПЕЛЬСИНОВИЙ', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'КАЙДАШ', desc: 'ГОРІЛКА / ТАБАСКО / ГРЕНАДИН', volume: '50 мл', price: '80 ₴', img: '' },
    { name: 'ЗЕЛЕНИЙ МЕКСИКАНЕЦЬ', desc: 'ТЕКІЛА / ЛІКЕР ЗЕЛЕНИЙ БАНАН / ФРЕШ ЛАЙМА', volume: '50 мл', price: '120 ₴', img: '' },
    { name: 'МЕРКУРІЙ', desc: 'САМБУКА / БЕЙЛІЗ / ГРЕНАДИН', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'ВЕРШКОВИЙ МАРЦИПАН', desc: 'БЕЙЛІЗ/ АМАРЕТТО', volume: '50 МЛ', price: '100 ₴', img: '' },
    { name: 'ІНТЕРСІТІ', desc: 'СЕТ З ДЕСЯТИ ШОТІВ КРАФТОВИХ НАСТОЯНОК 20% ТА 40%', volume: '500 МЛ', price: '500 ₴', img: '' }
  ],
  strongAlcohol: [
    { name: 'Ром Captain Morgan Spiced Gold', desc: '', volume: '50 мл', price: '90 ₴', img: '' },
    { name: 'Ром Captain Morgan TIKI', desc: '', volume: '50 мл', price: '90 ₴', img: '' },
    { name: 'Ром Oakheart Original 35%', desc: '', volume: '50 мл', price: '90 ₴', img: '' },
    { name: 'Ром Bacardi CartaBianca', desc: '', volume: '50 мл', price: '90 ₴', img: '' },
    { name: 'Текіла Sierra Blanko', desc: '', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'Віскі Jameson', desc: '', volume: '50 мл', price: '120 ₴', img: '' },
    { name: 'Віскі Jack Daniels', desc: '', volume: '50 мл', price: '120 ₴', img: '' },
    { name: 'Віскі Paddy', desc: '', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'Бурбон Jim Beam White', desc: '', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'Бурбон Jim Beam Red Stag', desc: '', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'Джин Finsbury Platinum 47%', desc: '', volume: '50 мл', price: '90 ₴', img: '' },
    { name: 'Джин Finsbury Wild Strawberry', desc: '', volume: '50 мл', price: '90 ₴', img: '' },
    { name: 'Лікер Jagermeister', desc: '', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'Лікер Jagermeister Orange', desc: '', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'Настоянка Becherovka', desc: '', volume: '50 мл', price: '80 ₴', img: '' },
    { name: 'Лікер Baileys', desc: '', volume: '50 мл', price: '110 ₴', img: '' },
    { name: 'Лікер SAMBUCA', desc: '', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'Абсент', desc: '', volume: '50 мл', price: '100 ₴', img: '' },
    { name: 'Бренді Couronnier Napoleon', desc: '', volume: '50 мл', price: '70 ₴', img: '' },
    { name: 'Горілка Хортиця', desc: '', volume: '50 мл', price: '30 ₴', img: '' },
    { name: 'Вермут Martini Rosso', desc: '', volume: '50 мл', price: '70 ₴', img: '' },
    { name: 'Лікер Амаретто SanMartino', desc: '', volume: '50 мл', price: '70 ₴', img: '' },
    { name: 'Лікер Вишневий SanMartino', desc: '', volume: '50 мл', price: '70 ₴', img: '' },
    { name: 'Лікер Лімончелло SanMartino', desc: '', volume: '50 мл', price: '70 ₴', img: '' }
  ],
  nastoyanky: [
    { name: 'ЗЕЛЕНИЙ ЗМІЙ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ЯГІДНА', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ROCK HATA', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ВИШНЯК', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ROCK-n-ROLLA', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'БУГІ ВУГІ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'МАЛИНА', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ДЖОННІ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'Лимонадний ДЖО', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'АВАТАР', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ТАРХУН', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'МЕНТОЛ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'СМАК ДИТИНСТВА', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'TWIST', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'СЛИВ\'ЯНА', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ТРАВИ З МЕДОМ', desc: '40%', volume: '50 мл', price: '50 ₴', img: '' }
  ],
  liqueurs: [
    { name: 'АПЕЛЬСИН', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ЛИМОН', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ШОКОЛАД', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ЯГІДНИЙ', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ЛАЙМ', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'МАЛИНА', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'КАВА З МОЛОКОМ', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ВИШНЯ', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'БАРБАРИС', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ЖУРАВЛИНА', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' },
    { name: 'ЛИМОН М\'ЯТА', desc: '20%', volume: '50 мл', price: '50 ₴', img: '' }
  ],
  beer: [
    { name: 'Львівське Фірмове', desc: 'СВІТЛЕ', volume: '500 мл', price: '80 ₴', img: '' },
    { name: 'DUNKEL', desc: 'ТЕМНЕ', volume: '500 мл', price: '80 ₴', img: '' },
    { name: 'STAROPRAMEN З/Б', desc: 'СВІТЛЕ', volume: '500 мл', price: '80 ₴', img: '' },
    { name: 'Б/а Krounenbourg 1664', desc: '', volume: '0.33 мл', price: '80 ₴', img: '' }
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
    { name: 'АРАХІС BigBob', desc: 'смаки в асортименті', volume: '60 гр', price: '50 ₴', img: '' },
    { name: 'ЧИПСИ LAY\'S', desc: 'смаки в асортименті', volume: '60 гр', price: '80 ₴', img: '' }
  ],
  extras: [
    { name: 'АПЕЛЬСИН', desc: '', volume: '10 гр', price: '15 ₴', img: '' },
    { name: 'ЛАЙМ', desc: '', volume: '10 гр', price: '10 ₴', img: '' },
    { name: 'ЛИМОН', desc: '', volume: '10 гр', price: '10 ₴', img: '' },
    { name: 'Вершки', desc: '', volume: '10 гр', price: '10 ₴', img: '' }
  ]
};
