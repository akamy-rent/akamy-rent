import { Selector } from 'testcafe';

class ListSmartContractPage {
  constructor() {
    this.pageId = '#listSmartContractPage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(90000).expect(this.pageSelector.exists).ok();
  }

  /** Asserts that this page has a table with one row. */
  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(1);
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(90000).expect(this.pageSelector.exists).ok();
  }
}

export const listSmartContractPage = new ListSmartContractPage();
