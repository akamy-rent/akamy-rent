import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The SmartContractCollection. It encapsulates state and variable values for smartContract.
 */
class SmartContractCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SmartContractCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      email: String,
      phoneNumber: String,
      role: {
        type: String,
        allowedValues: ['Tenet', 'Homeowner'],
        defaultValue: 'Tenet',
      },
      unitAddress: String,
      monthlyRent: Number,
      stance: {
        type: String,
        allowedValues: ['I do not agree to the terms and conditions', 'I agree to the terms and conditions', ''],
        defaultValue: '',
      },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the SmartContractCollection.
 * @type {SmartContractCollection}
 */
export const SmartContracts = new SmartContractCollection();
