import { navBar } from './navbar.component';

export const addContractTest = {
  address: '1234 Kapiolani Blvd, Honolulu, HI, 96814',
  rent: 1500,
  homeownerName: 'John',
  homeownerEmail: 'john@foo.com',
  homeownerPhone: '808-123-4567',
  tenantName: 'Johnny Tsunami',
  tenantEmail: 'tsunami@foo.com',
  tenantPhone: '990-789-1234',
  tAndC: 'test',
};

export const editContractTest = {
  address: '456 Mailee Way Honolulu, HI 96822',
  rent: 1500,
  homeownerName: 'Barack Obama',
  homeownerEmail: 'barack@foo.com',
  homeownerPhone: '808-123-4567',
  tenantName: 'Naruto Uzumaki',
  tenantEmail: 'naruto@foo.com',
  tenantPhone: '808-106-9999',
  tAndC: 'test',
};

class SmartContractPagesForm {

  /** Navigate to the add smart contract page via the Navbar, fill in the page, click save. */
  async fillSmartContract(testController, username, add) {
    await navBar.isLoggedIn(testController, username);
    await testController.typeText('#unit-address', add.address);
    await testController.typeText('#monthly-rent', add.rent.toString());
    await testController.typeText('#homeowner-name', add.homeownerName);
    await testController.typeText('#homeowner-email', add.homeownerEmail);
    await testController.typeText('#homeowner-phone', add.homeownerPhone);
    await testController.typeText('#tenant-name', add.tenantName);
    await testController.typeText('#tenant-email', add.tenantEmail);
    await testController.typeText('#tenant-phone', add.tenantPhone);
    await testController.typeText('#t-and-c', add.tAndC);
    await testController.click('#save');
  }
}

export const smartContractPageForm = new SmartContractPagesForm();
