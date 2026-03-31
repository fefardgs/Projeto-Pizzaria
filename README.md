# 🍕 Sistema Pizzaria

## 👩‍💻 Integrantes

* Fernanda C. Rodrigues Ferreira
* Isabelle Queiroz Rodrigues

---

## 📌 Sobre o Projeto

Este projeto consiste em uma API de sistema de pizzaria, desenvolvida com o objetivo de simular um cenário real de desenvolvimento, onde o **front-end** e o **back-end** funcionam separadamente/ou no mesmo computador e se comunicam por meio de requisições.

A proposta inicial foi fornecida pelo professor, e o principal desafio era **organizar, corrigir e estruturar o código** de forma funcional, limpa e eficiente.

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* Express
* SQLite
* JavaScript
* HTML5
* CSS3

---

## 📁 Estrutura de Pastas

```
ssistemaPizzaria/
├── node_modules/              # Dependências instaladas pelo NPM

├── public/                    # Arquivos estáticos (Front-end)
│   ├── index.html             # Página principal
│   ├── script.js              # Lógica do lado do cliente
│   └── style.css              # Estilização (CSS)

├── src/                       # Código fonte principal da aplicação
│   ├── database/              # Configuração do banco de dados
│   │   └── sqlite.js
│   │
│   ├── middlewares/           # Interceptadores de requisições (ex: autenticação)
│   │   └── auth.js
│   │
│   ├── models/                # Entidades e regras de negócio
│   │   ├── Cliente.js
│   │   ├── Pedido.js
│   │   ├── Pizza.js
│   │   └── Usuario.js
│   │
│   └── routes/                # Rotas da API
│       └── index.js

├── .env                       # Variáveis de ambiente (sensíveis)
├── .gitignore                 # Arquivos ignorados pelo Git

├── index.js                   # Ponto de entrada do servidor

├── package.json               # Configurações do projeto
├── package-lock.json          # Histórico de dependências

├── pizzaria.db                # Banco de dados SQLite

├── seed.js                    # Script para popular o banco
└── README.md                  # Documentação do projeto

## ⚙️ Como Executar o Projeto

### 🔹 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd sistemaPizzaria
```

### 🔹 2. Instalar as dependências e verificar no **Package.json**

```bash
npm install (*Metodo*)
(*Dependencias*) Express, sql.js, jsonwebtoken, bcryptjs, cors, dotenv

```

### 🔹 3. Configurar o ambiente

Crie um arquivo `.env` na raiz do projeto (caso não exista) e configure as variáveis necessárias.

---

### 🔹 4. Rodar o servidor

```bash
node index.js
```

---

### 🔹 5. Acessar o sistema

Abra o navegador e acesse:

```
http://localhost:3001
```

---

## 🧪 Banco de Dados

O projeto utiliza **SQLite**, com um arquivo local:

```
pizzaria.db
```

Para popular o banco com dados iniciais, utilize:

```bash
node seed.js
```

---

## 🚀 Funcionalidades

* Cadastro de clientes
* Cadastro de pizzas
* Criação de pedidos
* Autenticação de usuários
* Comunicação entre front-end e API

---

## 📚 Aprendizados

Durante o desenvolvimento, foi possível aprender e aplicar conceitos importantes como:

* Organização de projetos Node.js
* Separação de responsabilidades (MVC)
* Uso de middlewares
* Manipulação de banco de dados com SQLite
* Estruturação de APIs REST

---

## 💡 Considerações Finais

O projeto teve como foco principal a **organização e correção de código já existente**, transformando-o em uma aplicação funcional e bem estruturada.

**O projeto teve muitos erros de funcionalidade, e tive muita dificuldade de rodar o codigo, por que eu não tinha instalado as dependencias corretas, e o proprio terminal do Vscode ditava o erro. E eu ultilizei o Gemini como apoio para  os erros que eu não conseguia resolver. Com essa junção, consegui terminar e rodar o projeto limpo.**

---

