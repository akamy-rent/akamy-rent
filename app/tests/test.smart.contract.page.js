import { Selector } from 'testcafe';

class TestSmartContract {
  constructor() {
    this.pageId = '#test-contract-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that this page has test buttons. */
  async hasButtons(testController) {
    const buttonCount = Selector('button').count;
    await testController.expect(buttonCount).gte(4);
  }

  /** Checks for buttons. But is meant to test smart contract processes: compile, deploy, call, and destroy. Also create an object to save transaction */
  async smartContractTesting(testController) {
    await testController.navigateTo('http://localhost:3004/#/test');
    await this.isDisplayed(testController);
  }
}

export const testSmartContractPage = new TestSmartContract();
