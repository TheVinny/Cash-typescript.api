
const config = [
  {
    "name": "default",
    "type": "postgres",
    "host": "database",
    "port": 5432,
    "username": "postgres",
    "password": "1234",
    "database": "cashapi",
    "entities": ["./src/modules/**/infra/model/*.ts"],
    "migrations": ["./src/shared/infra/database/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/infra/database/migrations"
    }
  },
  {
    "name": "test",
    "type": "postgres",
    "host": "database",
    "port": 5432,
    "username": "postgres",
    "password": "1234",
    "database": "cashtest",
    "entities": ["./src/modules/**/infra/model/*.ts"],
    "migrations": ["./src/shared/infra/database/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/infra/database/migrations"
    }
  }
]


module.exports = config
