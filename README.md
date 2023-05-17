# node-typescript-starter
Consolidando o conhecimento em node.js com typescript e mongoDB através do curso do Andrew Rosário, segue o link a baixo:

### Link do curso
https://www.youtube.com/playlist?list=PLn3kOoc0oI2cQDdUEQxj75sxgRH53DmSc

### Pré-requisitos

Antes de começar, você vai precisar configurar a sua string de conexão do mongoDB no arquivo app.ts e precisa emitir essa string no site do [mongoDB](https://mongodb.com). 

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/EduardoBarbosa-TI/node-typescript-starter.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd node-typescript-starter

# Instale as dependências
$ npm install

# Coloque a sua string gerada do mongoDB no arquivo app.ts
const connectionString = `mongodb+srv://${username}:${password}@edudb.uqsau8h.mongodb.net/?retryWrites=true&w=majority`;

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:8000 
```
