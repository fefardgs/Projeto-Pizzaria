// O que é middleware de autenticação?
// Middleware de autenticação é uma função que executada antes de acessar uma rota protegida, verificando se o usuarioesta autenticado. 
// Ele geralmente verifica a presença de um token de autenticação, valida esse token e, se for valido, permite o acesso a rota
//caso contrario ele retorna um erro de autencidade 
//No caso da pizzaria, o middleware de autenticação é usado para proteger as rotas que listam pizzas, clientes e pedidos, garantido que apenas usuarios autenticads possam acessar.
const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token      = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido. Faça login.' });
  }

  try {
    const payload  = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario    = payload;
    next();
  } catch (erro) {
    return res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}

module.exports = autenticar;
