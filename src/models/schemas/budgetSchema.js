const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  monthlyGoal: {
    type: Number,
    required: [true, 'Monthly goal is required'],
    min: [0, 'Monthly goal must be positive']
  },
  savingsTarget: {
    type: Number,
    default: 0,
    min: [0, 'Savings target must be positive']
  },
  month: {
    type: String,
    required: [true, 'Month is required'],
    match: [/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'],
    default: () => new Date().toISOString().substring(0, 7)
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Optional for now, can be required later with auth
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Convert _id to id and remove __v in JSON output
budgetSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Index for better query performance
budgetSchema.index({ userId: 1, month: 1 }, { unique: true });

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;