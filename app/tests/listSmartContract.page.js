import { Selector } from 'testcafe';

class ListSmartContractPage {
  constructor() {
    this.pageId = '#listSmartContractPage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page has a table with one row. */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(1);
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const listSmartContractPage = new ListSmartContractPage();
