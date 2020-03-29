# 500 cidades serverless Graphql API

Guideline e exemplos para for 500 cidades serverless Graphql.

## Pré-requisitos

* [Baixar e instalar Nodejs](https://nodejs.org)
* [Baixar e instalar Yarn](https://yarnpkg.com)
* [Baixar e instalar MongoDB](https://docs.mongodb.com/manual/installation/)
* Baixar e instalar editor de texto que preferir

## Rodando localmente

Encontre todas as informações sobre como funciona o serverless aqui [here](https://serverless.com/framework/docs/getting-started/)

Antes de começar, instale o serverless usando o yarn:
```
yarn global add serverless
```

Ou via npm
```
nom i -g serverless
```

Primeiro clone o projeto com a ssh
```
git clone git@github.com:midianinja/graph-api-500-cidades.git
```

Ou clone com https: 

```
git clone https://github.com/midianinja/graph-api-500-cidades.git
```
Vá para a pasta do projeto
```
cd som-api
```

Na pasta do projeto, instale as dependências com o Yarn:
```
yarn
```

Ou com npm
```
npm i
```

Rode o banco de dados, por padrão o endereço da base de dados é "mongodb://localhost/500-cities":
```
sudo service mongod start
```

Ou crie o arquivo *.env* com sua endeço para o banco de dados Mongo:
```
/* .env */

MONGO_URL=mongodb+srv://USUARIO:SENHA@cluster0-zxrtz.mongodb.net/BANCO?retryWrites=true&w=majority
```

Comece a rodar o servidor localmente:
```
yarn dev
```

Ou rode usando um IP e/ou porta (A porta padrão é 3000)
```
yarn dev --host 192.168.0.1 --port 3000
```

Rotas disponiveis:
```
  "/playground" - para abrir a area de testes da api
```
```
  "/" - para bater na api com as suas mutations e queries
```

## Construido com

* [Serverless](https://serverless.com/) - A arquitetura da infra
* [GraphQL](https://www.graphql.com/) - O esquema de api
* [MongoDb](https://www.mongodb.com/) - O banco de dados
* [Apollo GraphQL](https://www.apollographql.com/) - Framework para o graph
* [Yarn](https://yarnpkg.com) - Gerenciamento de dependências
* [ESLint](https://eslint.org/) - Ferramenta para analise de código. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) 
* [JSDOC](http://usejsdoc.org) - Documentação para JavaScript