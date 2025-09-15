import { dbConnect } from '@/utils/db-connect';
import { seedBasicColors } from './colors';

export async function initializeDatabase(): Promise<void> {
  try {
    // Ensure database connection
    await dbConnect();

    // Run all seeders
    await seedBasicColors();

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}
