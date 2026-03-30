// =====================================
//  BANCO DE DADOS DA PIZZARIA
// Usando SQLite (sql.js)
// =====================================


//  IMPORTAÇÕES

// Biblioteca que cria o banco SQLite em JavaScript
const initSqlJs = require('sql.js');

// Módulo para ler e salvar arquivos
const fs = require('fs');

// Módulo para trabalhar com caminhos de arquivos
const path = require('path');


// 📁 CAMINHO DO BANCO

// Se existir variável de ambiente, usa ela
// Senão, cria o arquivo pizzaria.db
const DB_PATH = process.env.DB_PATH
  || path.join(__dirname, '..', '..', 'pizzaria.db');


//  ESTADO DO BANCO (fica na memória)
const state = { db: null };


// INICIALIZAÇÃO DO BANCO
const ready = (async () => {

  // Inicia o SQL
  const SQL = await initSqlJs();

  // Se já existir banco salvo...
  if (fs.existsSync(DB_PATH)) {

    // Lê o arquivo
    const fileBuffer = fs.readFileSync(DB_PATH);

    // Carrega o banco na memória
    state.db = new SQL.Database(fileBuffer);

  } else {

    // Se não existir, cria novo banco
    state.db = new SQL.Database();
  }

  const db = state.db;

  // 🔗 Ativa relacionamento entre tabelas
  db.run('PRAGMA foreign_keys = ON');


  // =====================================
  //  TABELA: USUÁRIOS
  // ====================================
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      nome        TEXT    NOT NULL,
      email       TEXT    NOT NULL UNIQUE,
      senha       TEXT    NOT NULL,
      perfil      TEXT    NOT NULL DEFAULT 'Atendente',
      ativo       INTEGER NOT NULL DEFAULT 1,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);


  // =====================================
  //  TABELA: CLIENTES
  // =====================================
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      nome        TEXT    NOT NULL,
      telefone    TEXT    NOT NULL,
      endereco    TEXT    NOT NULL DEFAULT '{}',
      observacoes TEXT    NOT NULL DEFAULT '',
      ativo       INTEGER NOT NULL DEFAULT 1,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);


  // =====================================
  // 🍕 TABELA: PIZZAS
  // =====================================
  db.run(`
    CREATE TABLE IF NOT EXISTS pizzas (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      nome         TEXT    NOT NULL,
      descricao    TEXT    NOT NULL DEFAULT '',
      ingredientes TEXT    NOT NULL,
      precos       TEXT    NOT NULL DEFAULT '{"P":0,"M":0,"G":0}',
      disponivel   INTEGER NOT NULL DEFAULT 1,
      categoria    TEXT    NOT NULL DEFAULT 'tradicional',
      created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);


  // =====================================
  //  TABELA: PEDIDOS
  // =====================================
  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      numero_pedido   INTEGER,
      cliente_id      INTEGER NOT NULL REFERENCES clientes(id),
      subtotal        REAL    NOT NULL DEFAULT 0,
      taxa_entrega    REAL    NOT NULL DEFAULT 0,
      total           REAL    NOT NULL DEFAULT 0,
      forma_pagamento TEXT    NOT NULL,
      troco           REAL    NOT NULL DEFAULT 0,
      status          TEXT    NOT NULL DEFAULT 'recebido',
      observacoes     TEXT    NOT NULL DEFAULT '',
      mesa            INTEGER,
      origem          TEXT    NOT NULL DEFAULT 'balcao',
      garcom_id       INTEGER REFERENCES usuarios(id),
      created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);


  // =====================================
  //  TABELA: ITENS DO PEDIDO
  // =====================================
  db.run(`
    CREATE TABLE IF NOT EXISTS itens_pedido (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id      INTEGER NOT NULL REFERENCES pedidos(id),
      pizza_id       INTEGER NOT NULL REFERENCES pizzas(id),
      nome_pizza     TEXT    NOT NULL,
      tamanho        TEXT    NOT NULL,
      quantidade     INTEGER NOT NULL DEFAULT 1,
      preco_unitario REAL    NOT NULL DEFAULT 0,
      subtotal       REAL    NOT NULL DEFAULT 0
    )
  `);


  //  Salva o banco no arquivo
  salvar();

  console.log('✅ Banco conectado:', DB_PATH);

  return db;
})();


// =====================================
//  FUNÇÃO PARA SALVAR O BANCO
// =====================================
function salvar() {
  if (!state.db) return;

  const data = state.db.export();

  fs.writeFileSync(DB_PATH, Buffer.from(data));
}


// =====================================
//  BUSCAR VÁRIOS REGISTROS
// =====================================
function query(sql, params = []) {
  // Array onde vamos guardar os resultados

  const stmt = state.db.prepare(sql);
  // Passa os valores (parâmetros) para o SQL
  // Isso evita erro e também protege contra SQL Injection

  const results = [];

  stmt.bind(params);

  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }

  stmt.free();

  return results;
}


// =====================================
//  BUSCAR UM REGISTRO
// =====================================
function get(sql, params = []) {
  const rows = query(sql, params);
  return rows[0] || null;
}


// =====================================
// INSERT / UPDATE / DELETE
// =====================================
function run(sql, params = []) {
  
  state.db.run(sql, params); // Executa o comando SQL (INSERT, UPDATE ou DELETE)
  // Pergunta ao banco:
  // - qual foi o último ID criado?
  // - quantas linhas foram alteradas?
  const meta = query(
    'SELECT last_insert_rowid() as id, changes() as changes'
  );

  //  salva sempre que altera algo
  salvar();

  return {
    lastInsertRowid: meta[0]?.id,
    changes: meta[0]?.changes,
  };
}


// =====================================
//  EXPORTAÇÃO
// =====================================
module.exports = {
  ready, // Função que inicializa o banco de dados // (carrega ou cria o banco)
  query,  // Função para buscar vários dados (SELECT)
  get,  // Função para buscar apenas um registro
  run,  // Função para inserir, atualizar ou deletar dados
  salvar   // Função para salvar o banco no arquivo
};