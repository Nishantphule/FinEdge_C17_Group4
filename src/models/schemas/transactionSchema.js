const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['income', 'expense'],
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    default: 'uncategorized'
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true,
    default: ''
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
transactionSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Index for better query performance
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ type: 1, category: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;