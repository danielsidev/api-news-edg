# API de Notícias
Uma api restful para servir notícias

### Instalação

Requer [Node.js](https://nodejs.org/) v12+ , [Docker](https://docs.docker.com/engine/install/ubuntu/) e [Docker Compose](https://docs.docker.com/compose/)

Abra um terminal, na raiz do projeto, e instale as dependências. 
```sh
$ npm install 
```
#### A API conecta-se a um MongoDB online no https://cloud.mongodb.com/. Abri uma conta free e criei um banco para teste.
Após instalar as dependências, rode o docker composer para setar as variáveis de ambiente necessárias.
```sh
$ sudo docker-compose up
```
 ---
# Sobre Autenticação
Esse serviço  foi feito com autenticação com JWT para todas as rotas. 

 ---
 # Acessos
Na raiz do projeto existe um diretório chamado postman. Dentro dele existe uma collection com os exemplos de requisições. Basta importar no postman. O primeiro enndpoit que deve ser sempre acionado é o do login para obter o token e poder adicioná-lo as demais requisições.

 ---
 # Rotas da Aplicação
 #### Host: localhost:9000
 
## Login
Ao acionar esse endpoint o login é feito e se os dados do usuário cadastrado no banco forem validados corretamente, um token com expiração de 1h é emitido.
|Request| POST|
|---|---| 
|Content-Type|application/json| 
|Rota|/api/access/login|

```
Exemplo: http://localhost:9000/api/access/login
 {
    "email":"admin@editora-globo.com",
    "password":"admin123"
}
```
|Response JSON| Status 200| 
|---|---|  

```
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWYyNWMyZGIzNGVlZGIwMDRhNmNlZTExIiwiaWF0IjoxNTk2NDIwODAxLCJleHAiOjE1OTY0MjQ0MDF9.jNYG6yL5N664d3p9tGNIQQ2rlRQ22joh0rCMEoAF0J8",
    "message": "Valid Login"
}
```
|Response JSON| Status 200| 
|---|---|  

```
{
    "auth": false,
    "token": null,
    "message": "Invalid Login"
}
```

|Response JSON| Status 422| 
|---|---|  
```
{
    "auth": false,
    "token": null,
    "message": "Invalid Login"
}
```

|Response JSON| Status 500| 
|---|---|  
```
Internal Server Error
```
--- 
 
## Criação de Notícia
Ao acionar esse endpoint teremos o cadastro de uma notícia.
|Request| POST|
|---|---| 
|Content-Type|application/json| 
|Rota|/api/news|

```
Exemplo:http://localhost:9000/api/news
headers
{
    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWYyNWMyZGIzNGVlZGIwMDRhNmNlZTExIiwiaWF0IjoxNTk2NDI3MzA0LCJleHAiOjE1OTY0MzA5MDR9.ryaWG3CxJlClCQanQ1_t7nLxDHZbxmtc2ZvJxGhzSRg"
}
body
{
    "titulo":"Teste de titulo",
    "conteudo":"Teste de conteudo"
}
```
|Response JSON| Status 201| 
|---|---|  
```
{
    "_id": "5f2619f71d6ccf00ac7681df",
    "titulo": "Teste de titulo ",
    "conteudo": "Teste de conteudo ",
    "data_publicacao": "2020-08-02T01:42:15.712Z",
    "__v": 0
}
```

|Response JSON| Status 422| 
|---|---|  

```
"Sintaxe Error"
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "No token provided."
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid!"
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid or expired!"
}
```
|Response JSON| Status 500| 
|---|---|  
```
Internal Server Error
```
---
## Atualização de Notícia
Ao acionar esse endpoint teremos a atualização de uma notícia.
|Request| PUT|
|---|---| 
|Content-Type|application/json| 
|Rota|/api/news/{id}|

```
Exemplo:http://localhost:9000/api/news/5f2619f71d6ccf00ac7681df
headers
{
    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWYyNWMyZGIzNGVlZGIwMDRhNmNlZTExIiwiaWF0IjoxNTk2NDI3MzA0LCJleHAiOjE1OTY0MzA5MDR9.ryaWG3CxJlClCQanQ1_t7nLxDHZbxmtc2ZvJxGhzSRg"
}
body
{
    "titulo":"Teste de titulo Atualizado",
    "conteudo":"Teste de conteudo Atualizado"
}
```
|Response JSON| Status 200| 
|---|---|  
```
{
    "_id": "5f2619f71d6ccf00ac7681df",
    "titulo": "Teste de titulo Atualizado",
    "conteudo": "Teste de conteudo Atualizado",
    "data_publicacao": "2020-08-02T01:42:15.712Z",
    "__v": 0
}
```
|Response JSON| Status 422| 
|---|---|  

```
"Sintaxe Error"
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "No token provided."
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid!"
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid or expired!"
}
```
|Response JSON| Status 500| 
|---|---|  
```
Internal Server Error
```
---
## Consulta  Notícia por Id
Ao acionar esse endpoint teremos  uma notícia por id.
|Request| GET|
|---|---| 
|Content-Type|application/json| 
|Rota|/api/news/{id}|

```
Exemplo:http://localhost:9000/api/news/5f2619f71d6ccf00ac7681df
headers
{
    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWYyNWMyZGIzNGVlZGIwMDRhNmNlZTExIiwiaWF0IjoxNTk2NDI3MzA0LCJleHAiOjE1OTY0MzA5MDR9.ryaWG3CxJlClCQanQ1_t7nLxDHZbxmtc2ZvJxGhzSRg"
}
```

|Response JSON| Status 200| 
|---|---|  
```
{
    "_id": "5f27812f61e034002196fabd",
    "titulo": "teste 1",
    "conteudo": "teste 1",
    "data_publicacao": "2020-08-03T03:14:55.396Z",
    "__v": 0
}
```
|Response JSON| Status 422| 
|---|---|  

```
"Sintaxe Error"
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "No token provided."
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid!"
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid or expired!"
}
```
|Response JSON| Status 500| 
|---|---|  
```
Internal Server Error
```
---
## Consulta Todas as Notícias
Ao acionar esse endpoint retornamos todas as notícias.
|Request| GET|
|---|---| 
|Content-Type|application/json| 

|Rota|//api/news|

```
Exemplo:http://localhost:9000/api/news
headers
{
    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWYyNWMyZGIzNGVlZGIwMDRhNmNlZTExIiwiaWF0IjoxNTk2NDI3MzA0LCJleHAiOjE1OTY0MzA5MDR9.ryaWG3CxJlClCQanQ1_t7nLxDHZbxmtc2ZvJxGhzSRg"
}
```
|Response JSON| Status 200| 
|---|---|  
```
[
    {
        "_id": "5f27812f61e034002196fabd",
        "titulo": "teste 1",
        "conteudo": "teste 1",
        "data_publicacao": "2020-08-03T03:14:55.396Z",
        "__v": 0
    }
]
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "No token provided."
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid!"
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid or expired!"
}
```
|Response JSON| Status 500| 
|---|---|  
```
Internal Server Error
```
---

## Deleta  Notícia por Id
Ao acionar esse endpoint removemos uma notícia por is.
|Request| DELETE|
|---|---| 
|Content-Type|application/json| 
|Rota|/api/news/{id}|

```
Exemplo:http://localhost:9000/api/news/5f278c47af0b0200ac675540
headers
{
    "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWYyNWMyZGIzNGVlZGIwMDRhNmNlZTExIiwiaWF0IjoxNTk2NDI3MzA0LCJleHAiOjE1OTY0MzA5MDR9.ryaWG3CxJlClCQanQ1_t7nLxDHZbxmtc2ZvJxGhzSRg"
}
```

|Response JSON| Status 200| 
|---|---|  
```
{
    "_id": "5f278c47af0b0200ac675540",
    "titulo": "Teste de titulo 6",
    "data_publicacao": "2020-08-03T04:02:15.866Z",
    "__v": 0
}
```
|Response JSON| Status 422| 
|---|---|  

```
"Sintaxe Error"
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "No token provided."
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid!"
}
```
|Response JSON| Status 401| 
|---|---|  

```
{
    "auth": false,
    "message": "Authenticate token fail. Token invalid or expired!"
}
```
|Response JSON| Status 500| 
|---|---|  
```
Internal Server Error
```
---
 
