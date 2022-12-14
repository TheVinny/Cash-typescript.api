###

Projeto elaborado com o intuito de por em prática minhas habilidades

Após rodar o projeto, você poderá importar as rotas no insomnia através do arquivo json na raiz do projeto

## Dependencies

Para rodar o projeto, execute o script npm install ou yarn para instalar as dependências :

- Node.js;
- Express;
- Typescript;
- ESLint;
- Prettier;
- Celebrate;
- CORS;
- JWT;
- BCrypt;
- Nodemailer;
- Postgres;
- TypeORM;
- Docker;

## OBSERVAÇÃO:

Prestar atenção nos arquivos de exemplo na raiz do projeto, modifique conforme as necessidades. Remova o '.example'

## Running

Execute o comando abaixo em seu terminal:

```
 docker-compose up
```

## Arquitetura | Models

### Users

<details>

- id —> PK
- username (o @ do usuário)
- password (_hasheada_)
- accountId —> _FK_ Accounts[id]

</details>

### Accounts

<details>

- id —> _PK_
- balance

</details>

### Transactions

<details>

- id —> _PK_
- debitedAccountId —> _FK_ Accounts[id]
- creditedAccountId —> _FK_ Accounts[id]
- value
- createdAt

</details>

dependências :

- Class Transformer
- Moment;
- Node.js;
- Express;
- Typescript;
- ESLint;
- Prettier;
- Celebrate;
- CORS;
- JWT;
- BCrypt;
- Postgres;
- TypeORM;
- Docker;

Execute o comando abaixo no terminal para subir a aplicação completa

```
 docker-compose up

```

## Regras de negócio

<details>

- Qualquer pessoa deverá poder fazer parte da NG. Para isso, basta realizar o cadastro informando _username_ e _password_

- Deve-se garantir que cada _username_ seja único e composto por, pelo menos, 3 caracteres.

- Deve-se garantir que a _password_ seja composta por pelo menos 8 caracteres, um número e uma letra maiúscula. Lembre-se que ela deverá ser _hashada_ ao ser armazenada no banco.

- Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela **Accounts** com um _balance_ de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado, a tabela **Accounts** não deverá ser afetada.

- Todo usuário deverá conseguir logar na aplicação informando _username_ e _password._ Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.

- Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio _balance_ atual. Um usuário A não pode visualizar o _balance_ de um usuário B, por exemplo.

- Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um _cash-out_ informando o _username_ do usuário que sofrerá o _cash-in_), caso apresente _balance_ suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.

- Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.

- Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (_cash-out_ e _cash-in_) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.

- Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por:
  - Data de realização da transação e/ou
    - Transações de _cash-out;_
    - Transações de _cash-in._

</details>

### Requests

<details>

#### /Users:

- create - post:

  ```
  {
    "username": "marquin2",
    "password": "Marcos@123",
    "password_confirmation": "Marcos@123"
  }
  ```

- update - put:

  ```
  {
    "username": "marqi2to",
    "password": "12345678@mv",
    "old_password": "Marcos@123",
    "password_confirmation": "12345678@mv"
  }
  ```

- delete - delete:

  ```
  {
    "username": "marqi2to",
    "password": "12345678@mv",
    "old_password": "Marcos@123",
    "password_confirmation": "12345678@mv"
  }
  ```

- get all - get:

  ```
  {
    "username": "marqi2to",
    "password": "12345678@mv",
    "old_password": "Marcos@123",
    "password_confirmation": "12345678@mv"
  }
  ```

#### /auth:

- auth - post:

  ```
  {
    "username": "marquin2",
    "password": "Marcos@123"
  }
  ```

#### /account:

- get my account - get:

  ```
  {
    "username": "marquin2",
    "password": "Marcos@123"
  }
  ```

#### /transfer:

- transfer to - post:

  ```
  {
    "username": "marquin2", <- id do remetente
    "value": 2.75
  }
  ```

- get transfers - post:

  ```
  {
    "filter": "send" < Filter pode ser send ou received filtrando por enviados ou recebidos>,
    "date" : "01/01/2023", < Também é possivel filtrar por data, ambos os filtros são opcionais>
  }
  ```

  </details>
