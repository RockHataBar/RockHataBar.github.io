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
  drinks: [],
  beer: [
    { name: 'Dunkel', desc: 'ТЕМНЕ', volume: '500 мл', price: '80 ₴', img: '' },
    { name: 'Staropramen з/б', desc: '', volume: '500 мл', price: '80 ₴', img: '' },
    { name: 'Львівське Фірмове', desc: 'СВІТЛЕ', volume: '500 мл', price: '80 ₴', img: '' },
    { name: 'Blanche 1664 б/а', desc: '', volume: '300 мл', price: '80 ₴', img: '' }
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
  snacks: [
    { name: 'КАРТОПЛЯ ФРІ', desc: '', volume: '200 гр', price: '120 ₴', img: '' },
    { name: 'НАГЕТСИ', desc: '', volume: '6 шт', price: '140 ₴', img: '' },
    { name: 'ЦИБУЛЕВІ КІЛЬЦЯ', desc: '', volume: '10 шт', price: '150 ₴', img: '' },
    { name: 'АРАХІС BigBob', desc: 'смаки в асортименті', volume: '60 гр', price: '50 ₴', img: '' },
    { name: 'ЧИПСИ LAY\'S', desc: 'смаки в асортименті', volume: '60 гр', price: '80 ₴', img: '' }
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
  ]
};
