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
}

export const dashboardPage = new DashboardPage();
