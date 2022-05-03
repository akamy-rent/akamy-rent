import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class EditProfilePage {
  constructor() {
    this.pageId = '#editProfilePage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async fillProfile(testController, profileData) {
    await testController.typeText('#fname', profileData.firstName, { replace: true });
    await testController.typeText('#lname', profileData.lastName, { replace: true });
    await testController.typeText('#phone', profileData.phoneNumber, { replace: true });
    await testController.typeText('#wallet', profileData.walletAddress, { replace: true });
    await testController.typeText('#key', profileData.privateKey, { replace: true });
    await testController.typeText('#image', profileData.imageURL, { replace: true });
    await testController.click('#submitButton');
    await navBar.isLoggedIn(testController, profileData.owner);
  }
}

export const editProfilePage = new EditProfilePage();
