import { Selector } from 'testcafe';

class DashboardPage {
  constructor() {
    this.pageId = '#list-dashboard-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(1);
  }

  async hasSmartContractWithName(testController, address) {
    const contractExists = Selector('td')
      .withText(address);
    await testController.expect(contractExists.innerText).eql(address);
  }

  async clickEditSmartContractWithName(testController, address) {
    // for homeowners, first link is edit, second is sign
    const linkSelector = Selector('td')
      .withText(address)
      .sibling()
      .nth(-1)
      .child('a')
      .nth(0);
    await testController.expect(linkSelector.exists).ok();
    await testController.click(linkSelector);
  }

  /** Expect the user is logged in and then to click on sign. */
  async gotoSignSmartContractPage(testController) {
    await testController.expect(Selector('#sign-button').exists).ok();
    await testController.click('#sign-button');
  }
}

export const dashboardPage = new DashboardPage();
