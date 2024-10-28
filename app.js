// server.js
const express = require('express');
const app = express();
const agendaRoutes = require('./routes/agenda');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', agendaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
