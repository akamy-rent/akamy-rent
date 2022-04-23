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
      homeownerName: String,
      homeownerEmail: String,
      homeownerPhoneNumber: String,
      homeownerSignature: {
        type: String,
        defaultValue: '',
      },
      tenetName: String,
      tenetEmail: String,
      tenetPhoneNumber: String,
      tenetStance: {
        type: String,
        allowedValues: ['I do not agree to the terms and conditions', 'I agree to the terms and conditions', 'Select one'],
        defaultValue: 'Select one',
      },
      tenetSignature: {
        type: String,
        defaultValue: '',
      },
      unitAddress: String,
      monthlyRent: Number,
      status: {
        type: String,
        allowedValues: ['Pending', 'Active', 'Terminated'],
        defaultValue: 'Pending',
      },
      termsAndConditions: {
        type: String,
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
