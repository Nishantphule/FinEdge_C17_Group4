/**
 * Auto-categorize expenses using keyword matching
 * This is a simple rule-based AI approach
 */

// Category keyword mappings
const categoryKeywords = {
  food: ['restaurant', 'cafe', 'food', 'grocery', 'supermarket', 'dining', 'pizza', 'burger', 'coffee', 'lunch', 'dinner', 'breakfast', 'meal'],
  transportation: ['uber', 'taxi', 'gas', 'fuel', 'parking', 'metro', 'bus', 'train', 'flight', 'airline', 'car', 'vehicle', 'transport'],
  utilities: ['electricity', 'water', 'gas bill', 'internet', 'phone', 'wifi', 'utility', 'power', 'energy'],
  shopping: ['amazon', 'store', 'mall', 'shopping', 'purchase', 'buy', 'retail', 'market'],
  entertainment: ['movie', 'cinema', 'netflix', 'spotify', 'game', 'concert', 'theater', 'entertainment', 'fun'],
  healthcare: ['pharmacy', 'doctor', 'hospital', 'medicine', 'medical', 'health', 'clinic', 'dental'],
  education: ['school', 'tuition', 'course', 'book', 'education', 'university', 'college', 'learning'],
  bills: ['bill', 'payment', 'subscription', 'membership', 'fee'],
  salary: ['salary', 'paycheck', 'income', 'wage', 'earnings'],
  investment: ['investment', 'stock', 'dividend', 'return', 'profit'],
  other: [] // Default category
};

/**
 * Match description to category based on keywords
 * @param {String} description - Transaction description
 * @param {String} type - Transaction type (income/expense)
 * @returns {String} - Matched category
 */
const matchCategory = (description, type = 'expense') => {
  if (!description || typeof description !== 'string') {
    return 'uncategorized';
  }

  const lowerDescription = description.toLowerCase();
  let bestMatch = 'uncategorized';
  let maxMatches = 0;

  // For income, prioritize income-related categories
  if (type === 'income') {
    if (categoryKeywords.salary.some(keyword => lowerDescription.includes(keyword))) {
      return 'salary';
    }
    if (categoryKeywords.investment.some(keyword => lowerDescription.includes(keyword))) {
      return 'investment';
    }
    return 'income';
  }

  // For expenses, find best matching category
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (category === 'other' || category === 'salary' || category === 'investment') {
      continue; // Skip these for expenses
    }

    const matches = keywords.filter(keyword => lowerDescription.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = category;
    }
  }

  return bestMatch;
};

/**
 * Get confidence score for category match
 * @param {String} description - Transaction description
 * @param {String} category - Suggested category
 * @returns {Number} - Confidence score (0-1)
 */
const getConfidence = (description, category) => {
  if (!description || !category) {
    return 0;
  }

  const lowerDescription = description.toLowerCase();
  const keywords = categoryKeywords[category] || [];
  
  if (keywords.length === 0) {
    return 0.5; // Default confidence for uncategorized
  }

  const matches = keywords.filter(keyword => lowerDescription.includes(keyword)).length;
  return Math.min(matches / keywords.length, 1);
};

/**
 * Suggest multiple possible categories with confidence scores
 * @param {String} description - Transaction description
 * @param {String} type - Transaction type
 * @returns {Array} - Array of {category, confidence} objects
 */
const suggestCategories = (description, type = 'expense') => {
  if (!description) {
    return [{ category: 'uncategorized', confidence: 1 }];
  }

  const lowerDescription = description.toLowerCase();
  const suggestions = [];

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (type === 'expense' && (category === 'salary' || category === 'investment')) {
      continue;
    }
    if (type === 'income' && category !== 'salary' && category !== 'investment' && category !== 'other') {
      continue;
    }

    const matches = keywords.filter(keyword => lowerDescription.includes(keyword)).length;
    if (matches > 0) {
      const confidence = Math.min(matches / Math.max(keywords.length, 1), 1);
      suggestions.push({ category, confidence });
    }
  }

  // Sort by confidence (highest first)
  suggestions.sort((a, b) => b.confidence - a.confidence);

  // If no matches, return uncategorized
  if (suggestions.length === 0) {
    return [{ category: 'uncategorized', confidence: 0.5 }];
  }

  return suggestions.slice(0, 3); // Return top 3 suggestions
};

module.exports = {
  matchCategory,
  getConfidence,
  suggestCategories,
  categoryKeywords
};
