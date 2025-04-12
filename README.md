# 🧠 create-stupid

A Node.js API generator with support for Models, Controllers, JWT, Migrations (Knex.js) and more.

## 🚀 Installation

```bash
npm install -g stupid-framework
```

## Creating a new project

```bash
create-stupid project-name
```

## Available commands

📦 Generate a model

```bash
stupid generate:model Name
```

Example: 

```bash
stupid generate:model User
```

Creates a model in the `app/models` directory.

---

🎮 Generate a controller

```bash
stupid generate:controller Name
```

Example:

```bash
stupid generate:controller User
```

Creates a controller in the `app/controllers` directory and auto-generates the REST routes.

---

🧱 Generate a migration

```bash
stupid generate:migration name
```

Example:

```bash
stupid generate:migration create_users_table
```

Creates a migration file in the `database/migrations` directory.

---

🔐 Generate a JWT controller

```bash
stupid generate:jwt controller
```

Creates:

- `authJWT.js` middleware
- `generateJWT.js` for token generation
- JWT-protected routes

---

⏫ Run latest migrations

```bash
stupid migrate:last
```

Executes the latest migration files using Knex.

---

⏪ Rollback last migration

```bash
stupid migrate:rollback
```

Rolls back the last executed migration.

---

## Project structure

```
project-name/
app
├── controllers
│   └── UserController.js
├── database
│   └── migrations
│       └── 20250412071716_create_users_table.js
├── models
│   └── User.js
└── routes
    └── routes.js
config
└── database.js

1 directory, 1 file

```

---

## Requirements

- Node.js 16+
- NPM
- [Knex.js CLI](https://knexjs.org)

---

## Author

Made with 💻 by [Cesar Motta](https://github.com/cesarmotta)

---

## License

MIT
