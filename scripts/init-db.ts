#!/usr/bin/env node

/**
 * Database initialization script
 *
 * This script can be run manually to initialize the database with basic data.
 * Usage: npm run db:init (add this to package.json scripts)
 * Or: npx tsx scripts/init-db.ts
 */

import { config } from 'dotenv';
import { initializeDatabase } from '../utils/seeds';

// Load environment variables
config();

async function main() {
  console.log('Starting database initialization...');

  try {
    await initializeDatabase();
    console.log('✅ Database initialization completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  main();
}
