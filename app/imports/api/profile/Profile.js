import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfileCollection. It encapsulates state and variable values for Profile.
 */
class ProfileCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfileCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      phoneNumber: {
        type: String,
        regEx: SimpleSchema.RegEx.Phone,
        min: 10,
      },
      walletAddress: {
        type: String,
        min: 20,
      },
      imageURL: String,
      privateKey: {
        type: String,
        label: 'Private Key (do not share this with anyone!!)',
      },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.publicProfilePublicationName = `${this.name}.publication.publicprofile`;
  }
}

/**
 * The singleton instance of the ProfileCollection.
 * @type {ProfileCollection}
 */
export const Profiles = new ProfileCollection();
