import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#editProfilePage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(100).expect(this.pageSelector.exists).ok();
  }
}

export const editProfilePage = new EditProfilePage();
