const vestibularRepository = require('../infra/repository/vestibular/vestibular')

class VestibularController {
    async getVestibularById(id){
        return await vestibularRepository.getVestibularById(id);
    }
    async getAllVestibulares(){
        return await vestibularRepository.getAllVestibulares();
    }
}

module.exports = new VestibularController();