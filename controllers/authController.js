const createUsuarioDto_data = require('../dto/usuario/createUsuarioDto');
const Usuario = require('../entities/usuario');
const usuarioRepository = require('../infra/repository/usuario/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWTSECRET = "asda31231-adas123125-nfansn124"
const { v4: uuidv4 } = require('uuid');

class AuthController {

    async login(body){
        try{
            const loginUsuarioDto = body;
            const usuario = await usuarioRepository.verifyUsuarioByEmail(loginUsuarioDto.email)
            if(!usuario){
                return {
                    'error': true,
                    'message': 'Incorrect email or password.',
                    'body': null
                }
            }
            const password_verification = await bcrypt.compare(loginUsuarioDto.senha, usuario.password_hash)
            if(!password_verification){
                return {
                    'error': true,
                    'message': 'Incorrect email or password.',
                    'body': null
                }
            }
            const token = jwt.sign({ id: usuario.id }, JWTSECRET)
        }catch(err){
            return ({
                'error': true,
                'message': err.message,
                'body': null
            })
        }
    }

    
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