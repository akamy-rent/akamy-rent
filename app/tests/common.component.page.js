import { Selector } from 'testcafe';

// Sweet Alert component
class SweetAlertModal {
  async clickToConfirm(testController) {
    const okButton = Selector('div > .swal-button-container')
      .child('button');
    await testController.expect(okButton.exists).ok();
    await testController.click(okButton);
  }

  async ensureSuccessMessage(testController) {
    const result = Selector('div > .swal-title');
    await testController.expect(result.innerText).eql('Success');
  }

  async ensureErrorMessage(testController) {
    const result = Selector('div > .swal-title');
    await testController.expect(result.innerText).eql('Error');
  }
}

export const sweetAlertModal = new SweetAlertModal();
