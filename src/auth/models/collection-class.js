"use strict";

class Collection {
  constructor(model) {
    this.model = model;
  }
  async create(json) {
    try {

      let record = await this.model.create(json);
      
      return record;
    } catch (err) {
      console.error(`Error creating data for model : ${this.model.name}`);
      return err;
    }
  }

  async read(id, options = {}) {

    // Initialize it/ just to have it ready and empty
    let record = null;

    try {
      if (id) {
        options['where'] = { id }
        record = await this.model.findOne(options)
      } else {
        record = await this.model.findAll(options)
      }
      return record
    } catch (err) {
      console.error(`Error reading data for model : ${this.model.name}`);
      return err;
    }
  }

  async update(id, json) {
    try {
      if (!id) throw new Error(`No record ID provided for model: ${this.model}`);

      let record = await this.model.findOne({ where: { id }});
      let updatedRecord = await record.update(json);
      return updatedRecord;
      
    } catch (err) {
      console.error(`Error updating data for model : ${this.model.name}`);
      return err;
    }
  }

  async delete(id) {
    try {
      if (!id) throw new Error(`No record ID provided for model: ${this.model}`);

      let record = await this.model.destroy({ where: { id }})
      return record;
    } catch (err) {
      console.error(`Error deleting data for model : ${this.model.name}`);
      return err;
    }
  }
}

module.exports = Collection;
