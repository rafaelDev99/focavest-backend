const fs = require('fs');
const path = require('path');

const agendaFilePath = path.join(__dirname, '../data/agendaData.json');

const getAgendaData = () => {
  const data = fs.readFileSync(agendaFilePath, 'utf8');
  return JSON.parse(data);
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adiciona 1 ao mês (0-11) e formata com 2 dígitos
  const day = currentDate.getDate().toString().padStart(2, '0'); // Formata o dia com 2 dígitos

  return `${year}-${month}-${day}`;
};

const getAllAgendas = (req, res) => {
  try {
    const data = getAgendaData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving agendas' });
  }
};

const getAgendaByDate = (req, res) => {
  try {
    const data = getAgendaData();
    const agenda = data.find(item => item.date === req.params.date);
    if (agenda) {
      res.status(200).json(agenda);
    } else {
      res.status(404).json({ message: 'Agenda not found for the specified date' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving agenda by date' });
  }
};


const addTask = (req, res) => {
  try {

    console.log("start req")
    const { date } = req.params; // Data da agenda enviada na URL
    const newTask = req.body; // Dados da nova tarefa enviados no corpo da requisição
    const currentDate = getCurrentDate();

    console.log("date req: "+date)
    console.log("date body: " )
    console.log(req.body)

    if(date < currentDate){
      return res.status(400).json({ message: 'You cannot create tasks for past dates.' });
    }

    // Valida se todos os campos obrigatórios da tarefa estão presentes
    const requiredFields = ['subject', 'topic', 'priority', 'time', 'estimatedDuration'];
    const missingFields = requiredFields.filter(field => !(field in newTask));
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Lê os dados existentes do arquivo JSON
    const data = getAgendaData();

    // Busca a agenda pelo campo "date"
    let agenda = data.find(item => item.date === date);

    if (!agenda) {
      console.log("current date: "+currentDate)
      console.log("req date: "+date)

      agenda = {
        date: date,
        tasks: []
      }

      // Adiciona a nova tarefa na agenda
      agenda.tasks.push(newTask);

      data.push(agenda);
      fs.writeFileSync(agendaFilePath, JSON.stringify(data, null, 2), 'utf8');

      return res.status(201).json({ message: 'Task added successfully', agenda });
    }

    // Adiciona a nova tarefa na agenda
    agenda.tasks.push(newTask);

    // Escreve os dados atualizados no arquivo JSON
    fs.writeFileSync(agendaFilePath, JSON.stringify(data, null, 2), 'utf8');

    console.log()
    console.log("End req ")
    res.status(201).json({ message: 'Task added successfully', agenda });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
};


module.exports = { getAllAgendas, getAgendaByDate, addTask };
