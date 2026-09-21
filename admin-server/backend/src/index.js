const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/staff', require('./routes/staff'));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутрішня помилка сервера' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Admin server listening on :${PORT}`));
