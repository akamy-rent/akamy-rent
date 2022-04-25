import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

export const addContractTest = {
  address: '1234 Kapiolani Blvd, Honolulu, HI, 96814',
  rent: 1500,
  homeownerName: 'John',
  homeownerEmail: 'john@foo.com',
  homeownerPhone: '808-123-4567',
  tenantName: 'Johnny',
  tenantEmail: 'Tsunami',
  tenantPhone: '990-789-1234',
  tAndC: 'test',
};

class AddSmartContractPage {
  constructor() {
    this.pageId = '#add-smart-contract-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async addSmartContract(testController, username, add) {
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

export const addSmartContractPage = new AddSmartContractPage();
