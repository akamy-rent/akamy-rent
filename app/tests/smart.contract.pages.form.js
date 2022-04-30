import { faker } from '@faker-js/faker';
import { navBar } from './navbar.component';
import { sweetAlertModal } from './common.component.page';

export const addContractTest = (address) => ({
  '#contract-name': address,
  '#unit-address': address,
  '#monthly-rent': `${faker.datatype.number({ min: 300, max: 1500 })}`,
  '#tenant-name': `${faker.name.firstName()} ${faker.name.lastName()}`,
  '#tenant-email': faker.internet.email(),
  '#tenant-phone': faker.phone.phoneNumber('333-333-3333'),
  '#t-and-c': faker.lorem.paragraph(1),
});

class SmartContractPagesForm {
  /** Navigate to the add smart contract page via the Navbar, fill in the page, click save. */
  async fillSmartContract(testController, username, fields) {
    await navBar.isLoggedIn(testController, username);
    Object.keys(fields).forEach(async key => {
      await testController.typeText(key, fields[key]);
    });
    await testController.click('#save');
    // ensure success
    await sweetAlertModal.ensureSuccessMessage(testController);
    // click on ok button in confirmation modal
    await sweetAlertModal.clickToConfirm(testController);
  }
}

export const smartContractPageForm = new SmartContractPagesForm();
