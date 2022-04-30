import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Add TESTCAFE_DELAY as an env variable
    // if the delay needs to be increase, such as for CI pipeline
    const delay = process.env.TESTCAFE_DELAY ?? '1000';
    await testController.wait(parseInt(delay, 10)).expect(this.pageSelector.exists).ok();
  }
}

export const landingPage = new LandingPage();
