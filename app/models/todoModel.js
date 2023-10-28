const { MongoClient, ObjectId } = require('mongodb');

class TodoModel {
  constructor(title, description, category, completed) {
      this.title = title;
      this.description = description;
      this.category = category;
      this.completed = completed || false; // Por defecto, un TODO se crea como incompleto
    }
  }
  
  module.exports = TodoModel;

