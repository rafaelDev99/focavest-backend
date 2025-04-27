const express = require('express');
const cors = require('cors');

const { specs, swaggerUi } = require('./config/swagger');
// const agendaRoutes = require('./routes/agenda');
const usuarioRoutes = require('./routes/usuario')
// const alunosRoutes = require('./routes/aluno')
const authRoutes = require('./routes/auth');
const atividadeRoutes = require('./routes/atividade');
const vestibularRoutes = require('./routes/vestibular');
const rotinaRoutes = require('./routes/rotina')
const { authenticateToken } = require('./middlewares/security');

const PORT = process.env.PORT || 3000;

// server
const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// app.use('/api/agendas',authenticateToken, agendaRoutes);
app.use('/api/usuarios',authenticateToken, usuarioRoutes);
app.use('/api/atividades',authenticateToken, atividadeRoutes);
app.use('/api/vestibulares',authenticateToken, vestibularRoutes);
app.use('/api/rotinas',authenticateToken, rotinaRoutes);
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
