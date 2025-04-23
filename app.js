const express = require('express');
const cors = require('cors');

const { specs, swaggerUi } = require('./config/swagger');
const agendaRoutes = require('./routes/agenda');
const usuarioRoutes = require('./routes/usuario')
const alunosRoutes = require('./routes/aluno')
const authRoutes = require('./routes/auth')

const PORT = process.env.PORT || 3000;

// server.js
const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/agendas',agendaRoutes);
app.use('/api/usuarios',usuarioRoutes);
app.use('/api/alunos',alunosRoutes);
app.use('/api/auth',authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
