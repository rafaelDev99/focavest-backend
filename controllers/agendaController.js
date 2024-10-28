const fs = require('fs');
const path = require('path');

const agendaFilePath = path.join(__dirname, '../data/agendaData.json');

const getAgendaData = () => {
  const data = fs.readFileSync(agendaFilePath, 'utf8');
  return JSON.parse(data);
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

module.exports = { getAllAgendas, getAgendaByDate };
