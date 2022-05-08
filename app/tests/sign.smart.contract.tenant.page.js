import { Selector } from 'testcafe';
import { sweetAlertModal } from './common.component.page';

class SignPage {
  constructor() {
    this.pageId = '#sign-smart-contract-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that tenant can agree and save tenantStance */
  async agreeTenantStance(testController) {
    await testController.click('#save-tenant-stance');
    // ensure success
    await sweetAlertModal.ensureSuccessMessage(testController);
    // click on ok button in confirmation modal
    await sweetAlertModal.clickToConfirm(testController);
  }

  // Checks that tenant can correctly sign and save their signature
  async signSignature(testController, name) {
    // Type in name
    await testController.typeText('#signature-field', name);
    await testController.click('#save-signature');
    // ensure success
    await sweetAlertModal.ensureSuccessMessage(testController);
    // click on ok button in confirmation modal
    await sweetAlertModal.clickToConfirm(testController);
  }

  // Checks that tenant incorrect signature gives error
  async signIncorrectSignature(testController, name) {
    // Type in incorrect name
    await testController.typeText('#signature-field', name);
    await testController.click('#save-signature');
    // ensure error
    await sweetAlertModal.ensureErrorMessage(testController);
    // click on ok button in confirmation modal
    await sweetAlertModal.clickToConfirm(testController);
  }
}

export const signPage = new SignPage();
