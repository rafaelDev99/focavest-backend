const createVestibularDto_data = require('../dto/vestibular/createVestiularDto');
const updateVestibularDto_data = require('../dto/vestibular/updateVestibularDto');
const vestibularRepository = require('../infra/repository/vestibular/vestibular')

class VestibularController {
    async getVestibularById(id){
        return await vestibularRepository.getVestibularById(id);
    }
    async getAllVestibulares(){
        return await vestibularRepository.getAllVestibulares();
    }
    async create(body){
        try {
            const createVestibularDto = createVestibularDto_data(body);
            
            const created_at = new Date();

            const vestibular = {
                data: createVestibularDto.data,
                pfp: createVestibularDto.pfp,
                uni: createVestibularDto.uni,
                curso: createVestibularDto.curso,
                site: createVestibularDto.site,
                criado_em: created_at,
            }   

            const result = await vestibularRepository.createVestibular(vestibular)
            return {
                'error': false,
                'message': 'Vestibular created Successfuly!',
                'body': result
            }
        }catch(err){
            return ({
                'error': true,
                'message': err.message,
                'body': null
            })
        }
    }
    async update(id, body) {
        try {
            const updateVestibularDto = updateVestibularDto_data(body);
    
            const updatedFields = {};
    
            if (updateVestibularDto.data) updatedFields.data = updateVestibularDto.data;
            if (updateVestibularDto.pfp) updatedFields.pfp = updateVestibularDto.pfp;
            if (updateVestibularDto.uni) updatedFields.uni = updateVestibularDto.uni;
            if (updateVestibularDto.curso) updatedFields.curso = updateVestibularDto.curso;
            if (updateVestibularDto.site) updatedFields.site = updateVestibularDto.site;
    
            const result = await vestibularRepository.updateVestibular(id, updatedFields);
    
            return {
                error: false,
                message: 'Vestibular updated successfully!',
                body: result,
            };
        } catch (err) {
            return {
                error: true,
                message: err.message,
                body: null,
            };
        }
    }
    async delete(id) {
        try {
            const vestibular = await vestibularRepository.deleteVestibular(id);
    
            if (!vestibular) {
                return {
                    error: true,
                    message: 'Vestibular não encontrado'
                };
            }
    
            return {
                error: false,
                message: 'Vestibular deletado com sucesso'
            };
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    }
    
}

module.exports = new VestibularController();