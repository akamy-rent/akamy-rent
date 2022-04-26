import { Selector } from 'testcafe';

class AddSmartContractPage {
  constructor() {
    this.pageId = '#add-smart-contract-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addSmartContractPage = new AddSmartContractPage();
