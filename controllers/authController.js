const createUsuarioDto_data = require('../dto/usuario/createUsuarioDto');
const Usuario = require('../entities/usuario');
const usuarioRepository = require('../infra/repository/usuario/usuario')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');

class AuthController {
    async register(body){
        try{
            const createUsuarioDto = createUsuarioDto_data(body);
            const usuario_return = await usuarioRepository.getUsuarioByEmail(createUsuarioDto.email)
            if(usuario_return){
                return {
                    'error': true,
                    'message': 'User already exisits. Please sign in',
                    'body': null
                }
            }else{
                const id = uuidv4();
                const created_at = new Date();
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, salt)

                const usuario = new Usuario(
                    id,
                    createUsuarioDto.nome,
                    createUsuarioDto.email,
                    hashedPassword,
                    'aluno',
                    created_at
                );

                const result = await usuarioRepository.createUsuario(usuario)
                return {
                    'error': false,
                    'message': 'User created Successfuly!',
                    'body': result
                }
            }
        }catch(err){
            return ({
                'error': true,
                'message': err.message,
                'body': null
            })
        }
    }
}

module.exports = new AuthController();