import { Selector } from 'testcafe';

class MessengerPage {
  constructor() {
    this.pageId = '#messenger-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Expect at least 1 group based on the default data for default user */
  async hasFeedItems(testController) {
    const feedItemCount = Selector('.ui .feed > .event').count;
    await testController.expect(feedItemCount).gte(1);
  }

  async gotoChat(testController, groupname) {
    const groupLink = Selector('.ui .feed')
      .child('.event')
      .child('.content')
      .child('.summary')
      .child('.user')
      .withText(groupname);
    await testController.click(groupLink);
  }

  async hasMessagesInChat(testController) {
    const messageCount = Selector('.ui .floated .segment').count;
    await testController.expect(messageCount).gte(1);
  }

  async canSendMessageInChat(testController, message) {
    await testController.typeText('#messenger-text-input', message);
    await testController.click('#messenger-submit-text');
    const messageExists = Selector('div')
      .withExactText(message);
    await testController.expect(messageExists.innerText).eql(message);
  }
}

export const messengerPage = new MessengerPage();
