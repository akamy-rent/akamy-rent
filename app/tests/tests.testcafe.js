import { faker } from '@faker-js/faker';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { messengerPage } from './messenger.page';
import { navBar } from './navbar.component';
import { smartContractPageForm, addContractTest } from './smart.contract.pages.form';
import { addSmartContractPage } from './add.smart.contract.page';
import { editSmartContractPage } from './edit.smart.contract.page';
import { testSmartContractPage } from './test.smart.contract.page';
import { dashboardPage } from './dashboard.page';
import { viewProfilePage } from './viewprofile.page';
import { editProfilePage } from './editprofile.page';
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

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

test('Test that view and edit profile pages show up', async (testController) => {
  const randomSha = faker.git.commitSha();
  const randomAddress = faker.datatype.hexadecimal(20);
  const profTestData = {
    firstName: 'Joe',
    lastName: 'Donald',
    phoneNumber: '808-123-4567',
    walletAddress: `${randomAddress}`,
    imageURL: 'https://ssl.gstatic.com/onebox/media/sports/logos/udQ6ns69PctCv143h-GeYw_48x48.png',
    privateKey: `${randomSha}`,
    owner: 'john@foo.com',
  };
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoViewProfilePage(testController);
  await viewProfilePage.isDisplayed(testController);
  await navBar.gotoEditProfilePage(testController);
  await editProfilePage.isDisplayed(testController);
  await editProfilePage.fillProfile(testController, profTestData);
});

test('Test profile pages for sign up', async (testController) => {
  const newUserName = faker.internet.email();
  const newPswd = faker.internet.password();
  const randomSha = faker.git.commitSha();
  const randomAddress = faker.datatype.hexadecimal(20);
  const profTestData = {
    firstName: 'Joe',
    lastName: 'Donald',
    phoneNumber: '808-123-4567',
    walletAddress: `${randomAddress}`,
    imageURL: 'https://ssl.gstatic.com/onebox/media/sports/logos/udQ6ns69PctCv143h-GeYw_48x48.png',
    privateKey: `${randomSha}`,
    owner: `${newUserName}`,
  };
  await navBar.ensureLogout(testController);
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, newUserName, newPswd);
  await editProfilePage.isDisplayed(testController);
  profTestData.owner = newUserName;
  await editProfilePage.fillProfile(testController, profTestData);
});

test('Test that dashboard page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoDashboardPage(testController);
  await dashboardPage.isDisplayed(testController);
  await dashboardPage.hasTable(testController);
});

test('Test that contracts can be created and edited', async (testController) => {
  // sign in
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  // use navbar to go to page
  await navBar.gotoAddSmartContractPage(testController);
  // check if component is rendered
  await addSmartContractPage.isDisplayed(testController);
  // attempt to fill out the form
  const address = faker.address.streetAddress(true);
  await smartContractPageForm.fillSmartContract(testController, credentials.username, addContractTest(address));
  // Go to dashboard and ensure that contract is there
  await navBar.gotoDashboardPage(testController);
  await dashboardPage.hasSmartContractWithName(testController, address);

  // test editing
  // navigate to edit smart contract
  await dashboardPage.clickEditSmartContractWithName(testController, address);
  // remove rent
  const update = {
    '#monthly-rent': `${faker.datatype.number({ min: 1500, max: 3000 })}`,
  };
  await editSmartContractPage.removeTextForEdit(testController, Object.keys(update), credentials.username);
  await smartContractPageForm.fillSmartContract(testController, credentials.username, update);
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
