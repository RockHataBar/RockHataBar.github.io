const menuData = {
  cocktails: [
    { name: 'ГРАНАТОВИЙ ВІСКІ САУРЕР', desc: 'ВІСКІ / СИРОП ГРАНАТ / СІК ГРАНАТ / ЛИМОННИЙ ФРЕШ', volume: '150 МЛ', price: '180 ₴', img: 'img/whisky_sauer.jpg' },
    { name: 'CHERRY IVANSON', desc: 'ЗОЛОТИЙ РОМ / СИРОП ВИШНЯ / СІК ВИШНЯ / ЛИМОННИЙ ФРЕШ', volume: '150 МЛ', price: '180 ₴', img: '' },
    { name: 'ДЖИН & ТОНІК', desc: 'ДЖИН / ТОНІК / ЛАЙМ', volume: '150 МЛ', price: '100 ₴', img: '' },
    { name: 'ТЕКІЛА САНРАЙЗ', desc: 'ТЕКІЛА / АПЕЛЬСИНОВИЙ СІК / ГРЕНАДИН', volume: '150 МЛ', price: '120 ₴', img: '' },
    { name: 'СЕКС ON ЗЕ БІЧ', desc: 'ГОРІЛКА / ПЕРСИКОВИЙ ЛІКЕР / АПЕЛЬСИНОВИЙ СІК / СІК ЖУРАВЛИНИ', volume: '200 МЛ', price: '110 ₴', img: '' },
    { name: 'NEGRONI', desc: 'СУХИЙ ДЖИН / ЧЕРВОНИЙ ВЕРМУТ / БІТТЕР', volume: '200 МЛ', price: '200 ₴', img: '' },
    { name: 'ROSO TONIC', desc: 'ЧЕРВОНИЙ ВЕРМУТ / ТОНІК / АПЕЛЬСИН', volume: '200 МЛ', price: '120 ₴', img: '' }
  ],
  drinks: [
    { name: 'CUBA LIBRE', desc: 'ЗОЛОТИЙ РОМ / COCA COLA / ЛАЙМ', volume: '150 МЛ', price: '100 ₴', img: '' },
    { name: 'СИНІЙ КАМІКАДЗЕ', desc: 'ГОРІЛКА / ЛИМОННИЙ СІК / BLU CURASAO', volume: '150 МЛ', price: '80 ₴', img: '' },
    { name: 'КРИВАВА МЕРІ', desc: 'ГОРІЛКА / ТОМАТНИЙ СІК / ТАБАСКО / ВУСТЕРСЬКИЙ СОУС / ЛАЙМ', volume: '150 МЛ', price: '80 ₴', img: '' }
  ],
  beer: [
    { name: 'pivko', desc: 'smachne', volume: '500 МЛ', price: 'desheve ₴', img: 'img/pivko.jpg' },
    { name: 'pivko', desc: 'smachne', volume: '500 МЛ', price: 'desheve ₴', img: 'img/pivko.jpg' },
    { name: 'pivko', desc: 'smachne', volume: '500 МЛ', price: 'desheve ₴', img: 'img/pivko.jpg' },

  ],
  shots: [
    { name: 'ПАН ІВАН', desc: 'ГОРІЛКА / ЛИМОННИЙ СІК / ГРЕНАДИН', volume: '50 МЛ', price: '80 ₴', img: '' },
    { name: 'ПРАПОР', desc: 'ГОРІЛКА / ЛІКЕР АПЕЛЬСИНОВИЙ', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'КАЙДАШ', desc: 'ГОРІЛКА / ТАБАСКО / ГРЕНАДИН', volume: '50 МЛ', price: '60 ₴', img: '' },
    { name: 'ЗЕЛЕНИЙ МЕКСИКАНЕЦЬ', desc: 'ТЕКІЛА / ЛІКЕР ЗЕЛЕНИЙ БАНАН / ФРЕШ ЛАЙМА', volume: '50 МЛ', price: '110 ₴', img: '' },
    { name: 'МЕРКУРІЙ', desc: 'САМБУКА / БЕЙЛІЗ / ГРЕНАДИН', volume: '50 МЛ', price: '90 ₴', img: '' }
  ],
  snacks: [
    { name: 'КАРТОПЛЯ ФРІ', desc: '', volume: '', price: '100 ₴', img: '' },
    { name: 'НАГЕТСИ', desc: '', volume: '', price: '140 ₴', img: '' },
    { name: 'СИРНІ ПАЛИЧКИ', desc: '', volume: '', price: '220 ₴', img: '' }
  ],
  liqueurs: [
    { name: 'АПЕЛЬСИН', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЛЯЛЯ ЧОРНА', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЛИМОН', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ШОКОЛАД', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЯГІДНИЙ', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЛАЙМ', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'МАЛИНА', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'КАВА З МЕДОМ', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ВИШНЯ', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'БАРБАРИС', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЖУРАВЛИНА', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЦУКЕРКА', desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: "ЛИМОН М'ЯТА", desc: '20%', volume: '50 МЛ', price: '50 ₴', img: '' }
  ],
  nastoyanky: [
    { name: 'АНІС', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЯГІДНА', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ТАРХУН', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'МЕНТОЛ', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'СМАК ДИТИНСТВА', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ТВІСТ', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ГОРОБИНА З МЕДОМ', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ВИШНЯ', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЗЕЛЕНИЙ ЗМІЙ', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ROCK HATA', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ROCK-&-ROLL', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'БУГІ-ВУГІ', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'БАЙРАКТАР', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЧОРНОБАЇВКА', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'МАЛИНА', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'АБРИКОС', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ДЖОННІ', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'ЛИМОНАДНИЙ ДЖО', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' },
    { name: 'АВАТАР', desc: '40%', volume: '50 МЛ', price: '50 ₴', img: '' }
  ]
};
