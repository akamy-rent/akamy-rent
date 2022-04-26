import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class EditSmartContractPage {
  constructor() {
    this.pageId = '#edit-smart-contract-page';
    this.pageSelector = Selector(this.pageId);
  }

  async removeTextForEdit(testController, username) {
    await navBar.isLoggedIn(testController, username);
    await testController.click('#unit-address').pressKey('ctrl+a delete');
    await testController.click('#monthly-rent').pressKey('ctrl+a delete');
    await testController.click('#homeowner-name').pressKey('ctrl+a delete');
    await testController.click('#homeowner-email').pressKey('ctrl+a delete');
    await testController.click('#homeowner-phone').pressKey('ctrl+a delete');
    await testController.click('#tenant-name').pressKey('ctrl+a delete');
    await testController.click('#tenant-email').pressKey('ctrl+a delete');
    await testController.click('#tenant-phone').pressKey('ctrl+a delete');
    await testController.click('#t-and-c').pressKey('ctrl+a delete');
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async navigateToEditSmartContractPage(testController) {
    await testController.navigateTo('http://localhost:3004/#/edit/ZqnsitcyEb8SHSz7s');
  }
}

export const editSmartContractPage = new EditSmartContractPage();
