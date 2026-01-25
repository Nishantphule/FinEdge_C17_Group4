const User = require('./schemas/userSchema');

/**
 * Create a new user
 */
const create = async (userData) => {
  const user = new User({
    username: userData.username,
    email: userData.email,
    password: userData.password,
  });
  
  return await user.save();
};

/**
 * Find user by email
 */
const findByEmail = async (email) => {
  return await User.findOne({ email: email.toLowerCase() });
};

/**
 * Find user by ID
 */
const findById = async (id) => {
  return await User.findById(id);
};

/**
 * Find user by username
 */
const findByUsername = async (username) => {
  return await User.findOne({ username });
};

/**
 * Update user
 */
const update = async (id, updateData) => {
  return await User.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
};

/**
 * Delete user
 */
const deleteUser = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result !== null;
};

module.exports = {
  create,
  findByEmail,
  findById,
  findByUsername,
  update,
  delete: deleteUser
};