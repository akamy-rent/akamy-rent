import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { messengerPage } from './messenger.page';
import { navBar } from './navbar.component';
import { smartContractPageForm, addContractTest, editContractTest } from './smart.contract.pages.form';
import { addSmartContractPage } from './add.smart.contract.page';
import { editSmartContractPage } from './edit.smart.contract.page';
import { testSmartContractPage } from './test.smart.contract.page';
import { listSmartContractPage } from './listSmartContract.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'barack@foo.com', password: 'changeme' };

fixture('akamy-rent localhost test with default db')
  .page('http://localhost:3004');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// eslint-disable-next-line no-unused-vars
test('Test that profile page shows up', async (testController) => {
  // ToDo: Write this @Beemnet and remove the comment with eslint-disable-next-line
});

// eslint-disable-next-line no-unused-vars
test('Test that dashboard page shows up', async (testController) => {
  // ToDo: Write this @Yang and remove the comment with eslint-disable-next-line
});

// eslint-disable-next-line no-unused-vars
test('Test that smart contract page shows up', async (testController) => {
  // ToDo: Write this @Devin and remove the comment with eslint-disable-next-line
  // Probably just focus on the list conntracts instead of all 3 or 4 pages for smart contracts
});

test('Test that add contract page shows up and works', async (testController) => {
  // sign in
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  // use navbar to go to page
  await navBar.gotoAddSmartContractPage(testController);
  // check if component is rendered
  await addSmartContractPage.isDisplayed(testController);
  // attempt to fill out the form
  await smartContractPageForm.fillSmartContract(testController, credentials.username, addContractTest);
});

test('Test that edit contract page shows up and works', async (testController) => {
  // sign in
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  // go to the smart contract
  await editSmartContractPage.navigateToEditSmartContractPage(testController);
  // check if edit component works
  await editSmartContractPage.isDisplayed(testController);
  // remove all previous text
  await editSmartContractPage.removeTextForEdit(testController, credentials2.username);
  // fill out the blank forms
  await smartContractPageForm.fillSmartContract(testController, credentials2.username, editContractTest);
});

test('Test that Messenger page shows up and works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMessengerPage(testController);
  await messengerPage.isDisplayed(testController);
  // ensure feed items show up
  await messengerPage.hasFeedItems(testController);
  // ensure that user can select a group
  await messengerPage.gotoChat(testController, 'Default');
  // ensure that user can see messages for selected group
  await messengerPage.hasMessagesInChat(testController);
  // ensure that user can send a message in the selected group
  await messengerPage.canSendMessageInChat(testController, `test message - ${new Date().toISOString()}`);
});

// eslint-disable-next-line no-unused-vars
test('Test that the test page exists with the 4 buttons', async (testController) => {
  await testSmartContractPage.smartContractTesting(testController);
});

test('Test the ListSmartContracts page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListSmartContractPage(testController);
  await listSmartContractPage.isDisplayed(testController);
  await listSmartContractPage.hasTable(testController);
});
