// MongoDB connection setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/room_planner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schemas for users, rooms, furniture, and designs
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const roomSchema = new mongoose.Schema({
  name: String,
  length: Number,
  width: Number,
  // You can add more properties like color, flooring, etc.
});

const furnitureSchema = new mongoose.Schema({
  name: String,
  type: String, // Chair, table, sofa, etc.
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  // You can add more properties like material, color, etc.
});

const designSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  roomId: mongoose.Schema.Types.ObjectId,
  furniture: [{
    furnitureId: mongoose.Schema.Types.ObjectId,
    position: {
      x: Number,
      y: Number,
    },
  }],
  // You can add more properties like date, description, etc.
});

const User = mongoose.model('User', userSchema);
const Room = mongoose.model('Room', roomSchema);
const Furniture = mongoose.model('Furniture', furnitureSchema);
const Design = mongoose.model('Design', designSchema);

// Example usage
const user = new User({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'password123',
});

user.save((err) => {
  if (err) return console.error(err);
  console.log('User saved.');
});

const room = new Room({
  name: 'Living Room',
  length: 20,
  width: 15,
});

room.save((err) => {
  if (err) return console.error(err);
  console.log('Room saved.');
});

const sofa = new Furniture({
  name: 'Sofa',
  type: 'Sofa',
  dimensions: { length: 80, width: 30, height: 35 },
});

sofa.save((err) => {
  if (err) return console.error(err);
  console.log('Furniture saved.');
});

const design = new Design({
  userId: user._id,
  roomId: room._id,
  furniture: [
    {
      furnitureId: sofa._id,
      position: { x: 5, y: 5 },
    },
  ],
});

design.save((err) => {
  if (err) return console.error(err);
  console.log('Design saved.');
});