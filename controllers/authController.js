const Usuario = require('../entities/usuario');
const alunoRepository = require('../infra/repository/aluno/aluno')
const bcrypt = require('bcrypt')

class AuthController {
    async register(createUsuarioDto){

        //find by email let usuario = await usuarioRepository.getByEmail(createUsuarioDto.email)
        if(usuario){
            return {
                'error': true,
                'message': 'User already exisits. Please sign in',
                'body': null
            }
        }else{
            try{
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, salt)
                
                return {
                    'error': false,
                    'message': 'User created Successfuly!',
                    'body': null
                } 
            }catch(err){
                return {
                    'error': true,
                    'message': err.message,
                    'body': null
                }
            }
        }
        return await alunoRepository.getAllAluno();
    }
}

module.exports = new AuthController();