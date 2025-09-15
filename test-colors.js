const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

// Color model (simplified version)
const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hexValue: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message: 'Invalid hex color format'
    }
  }
}, {
  timestamps: true
});

const Color = mongoose.models.Color || mongoose.model('Color', colorSchema);

async function addInitialColors() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Sample colors to add
    const initialColors = [
      { name: 'Red', hexValue: '#FF0000' },
      { name: 'Blue', hexValue: '#0000FF' },
      { name: 'Green', hexValue: '#008000' },
      { name: 'Yellow', hexValue: '#FFFF00' },
      { name: 'Black', hexValue: '#000000' },
      { name: 'White', hexValue: '#FFFFFF' },
      { name: 'Orange', hexValue: '#FFA500' },
      { name: 'Purple', hexValue: '#800080' },
      { name: 'Pink', hexValue: '#FFC0CB' },
      { name: 'Gray', hexValue: '#808080' },
    ];

    // Add colors (skip if they already exist)
    for (const colorData of initialColors) {
      try {
        const existingColor = await Color.findOne({ name: colorData.name });
        if (!existingColor) {
          const newColor = new Color(colorData);
          await newColor.save();
          console.log(`Added color: ${colorData.name} (${colorData.hexValue})`);
        } else {
          console.log(`Color ${colorData.name} already exists`);
        }
      } catch (error) {
        console.error(`Error adding color ${colorData.name}:`, error.message);
      }
    }

    console.log('Initial colors setup complete');

    // List all colors
    const allColors = await Color.find({});
    console.log('All colors in database:');
    allColors.forEach(color => {
      console.log(`- ${color.name}: ${color.hexValue}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addInitialColors();
