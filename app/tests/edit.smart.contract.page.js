import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class EditSmartContractPage {
  constructor() {
    this.pageId = '#edit-smart-contract-page';
    this.pageSelector = Selector(this.pageId);
  }

  // editable fields: '#unit-address', '#monthly-rent', '#tenant-name'
  // '#tenant-email', '#tenant-phone', '#t-and-c'
  async removeTextForEdit(testController, fieldIds, username) {
    await navBar.isLoggedIn(testController, username);
    fieldIds.forEach(async id => {
      await testController.click(id).pressKey('ctrl+a delete');
    });
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
