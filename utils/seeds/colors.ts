import { Color } from '@/models/color';

export const basicColors = [
  { name: 'Red', hexValue: '#FF0000' },
  { name: 'Blue', hexValue: '#0000FF' },
  { name: 'Green', hexValue: '#008000' },
  { name: 'Yellow', hexValue: '#FFFF00' },
  { name: 'Black', hexValue: '#000000' },
  { name: 'White', hexValue: '#FFFFFF' },
  { name: 'Orange', hexValue: '#FFA500' },
  { name: 'Purple', hexValue: '#800080' },
  { name: 'Pink', hexValue: '#FFC0CB' },
  { name: 'Gray', hexValue: '#808080' }
];

export async function seedBasicColors(): Promise<void> {
  try {
    // Check if any colors exist
    const existingColorsCount = await Color.countDocuments();

    if (existingColorsCount === 0) {
      console.log('No colors found, seeding basic colors...');

      // Insert all basic colors
      await Color.insertMany(basicColors);
      console.log(`Successfully seeded ${basicColors.length} basic colors`);
    } else {
      console.log(`Database already contains ${existingColorsCount} colors, skipping seed`);
    }
  } catch (error) {
    console.error('Error seeding basic colors:', error);
    throw error;
  }
}
