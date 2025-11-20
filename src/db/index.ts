import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// For development and build, use a valid connection string format
const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@example.com:5432/freelance_portal';

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

export * from './schema';
