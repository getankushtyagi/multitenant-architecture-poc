# NestJS Multitenant Architecture POC using Knex + PostgreSQL

This project demonstrates how to implement a multitenant architecture in NestJS using the **database-per-tenant** strategy with PostgreSQL and Knex.js.

---

## 📦 Tech Stack

- **NestJS** – Backend framework
- **Knex.js** – SQL query builder & migration tool
- **PostgreSQL** – Database engine
- **TypeScript**

---

## 📌 Features

- Maintains a central `master` database to track all tenants.
- Automatically creates a new tenant database when a new organization is registered.
- Runs initial migrations in the new tenant DB to set up predefined tables (e.g., `users`).
- Clean modular structure with NestJS best practices.

---

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nestjs-multitenant-knex
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup PostgreSQL

Ensure PostgreSQL is running and create a master database:

```sql
CREATE DATABASE master;
\c master

CREATE TABLE tenants (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  db_name VARCHAR NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Configure Knex

Edit `knexfile.ts` with your PostgreSQL credentials:

```typescript
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'your_password',
      database: 'master',
    },
    migrations: {
      directory: './migrations',
    },
  },
};
```

### 5. Create Migrations

```bash
npx knex --knexfile knexfile.ts migrate:make create_users_table
```

Edit the migration file (example):

```typescript
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique();
  });
}

export async function down(knex) {
  await knex.schema.dropTable('users');
}
```

---

## 🚀 Running the App

```bash
npm run start:dev
```

### Register a New Organization

```bash
curl -X POST http://localhost:3000/org/create \
     -H "Content-Type: application/json" \
     -d '{"name": "AcmeCorp"}'
```

This will:
- Insert into `master.tenants` table.
- Create a new PostgreSQL database called `tenant_acmecorp`.
- Run migrations (e.g., users table) inside the new DB.

---

## 📁 Project Structure

```
src/
├── org/
│   ├── org.controller.ts
│   ├── org.module.ts
│   └── org.service.ts
├── app.module.ts
knexfile.ts
migrations/
```

---

## 📌 Future Enhancements

- Dynamic DB connection per request
- Support for per-tenant query routing
- Tenant-aware authentication
- Seeders and fixtures for tenant databases

---

## 🧠 Concepts Used

- Dynamic PostgreSQL database creation
- Multi-DB connection handling in NestJS
- Knex-based migration on-the-fly

---

## 🧪 Example DBs Created

- `master` → Tracks tenants
- `tenant_acmecorp` → Has users table
- `tenant_foobar` → Another tenant DB

---

## 🛡️ License

MIT

---

## 🤝 Author

Built with ❤️ by **Ankush Tyagi** (2025)

---

*Let me know if you'd like this auto-synced into a `README.md` file inside your project or want to add Docker support or GitHub Actions for this.*