import { Injectable } from '@nestjs/common';
import { knex, Knex } from 'knex';
import * as path from 'path';

@Injectable()
export class OrgService {
    private masterKnex: Knex;

    constructor() {
        this.masterKnex = knex({
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'ankushtyagi',
                password: 'Admin@123',
                database: 'master',
            },
        });
    }

    async createTenant(orgName: string): Promise<string> {
        const dbName = `tenant_${orgName.toLowerCase()}`;

        // Insert into master.tenant table
        await this.masterKnex('tenants').insert({ name: orgName, db_name: dbName });

        // Create the tenant DB
        await this.masterKnex.raw(`CREATE DATABASE ${dbName};`);

        // Run migrations on the new DB
        const tenantKnex = knex({
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'ankushtyagi',
                password: 'Admin@123',
                database: dbName,
            },
            migrations: {
                directory: path.join(__dirname, '../../migrations'),
            },
        });

        await tenantKnex.migrate.latest();
        await tenantKnex.destroy();

        return `Tenant DB '${dbName}' created with users table.`;
    }
}