import { newPublicDocument, updatedDocument } from '../../__mocks__/mockData';

const config = require('./config');

module.exports = {
  'Create a new document': function (browser) {
    browser
      .url(config.url)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('.intro', config.waitFor)
      .assert.containsText('div.intro h2', 'Docster')
      .pause(1000)
      .setValue('div#username-or-email input[name=user]', 'admin@docster.com')
      .pause(1000)
      .setValue('div#password-field input', 'docster')
      .pause(1000)
      .click('.signin-btn button[type="button"]')
      .pause(1000)
      .waitForElementVisible('#user-page', config.waitFor)
      .pause(1000)
      .assert.urlEquals(`${config.url}my-documents`)
      .click('.open-create-document-dialog button[type="button"]')
      .pause(1000)
      .waitForElementVisible('.create-document-dialog', 
      config.waitFor)
      .setValue('form input[name=title]', newPublicDocument.title)
      .click('form input[value=public]')
      .pause(1000)
      .keys(browser.Keys.TAB)
      .keys('c')
      .keys('h')
      .keys('e')
      .keys('c')
      .keys('k')
      .keys('p')
      .keys('o')
      .keys('i')
      .keys('n')
      .keys('t')
      .keys(browser.Keys.SPACE)
      .pause(1000)
      .keys('2')
      .click('.create-document-btn button[type="button"]')
      .pause(1000)
      .assert.containsText('.toast-message',
      'Document was successfully created')
      .pause(1000)
  },
  'update a document': function (browser) {
    browser
      .url(`${config.url}my-documents`)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('div.three.columns:nth-child(1)',config.waitFor)
      .click('.open-edit-dialog')
      .pause(1000)
      .waitForElementVisible('.edit-document-dialog', 
      config.waitFor)
      .pause(2000)
      .setValue('form input[name=title]', updatedDocument.title)
      .pause(1000)
      .click('form input[value=role]')
      .pause(1000)
      .click('.update-document-btn button[type="button"]')  
      .pause(1000)
      .assert.containsText('.toast-message', 'Document updated')
      .pause(1000)
  },
  'Delete a document': function (browser) {
    browser
      .url(`${config.url}my-documents`)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('div.three.columns:nth-child(1)',config.waitFor)
      .pause(1000)
      .click('.open-delete-dialog')
      .pause(1000)
      .waitForElementVisible('.confirm-action-dialog', config.waitFor)
      .pause(2000)
      .click('.confirm-action-btn button[type="button"]')
      .pause(1000)  
      .assert.containsText('.toast-message', 'Document deleted')
      .pause(1000)   
  },
  'Signout user': function (browser) {
    browser
      .url(`${config.url}my-documents`)
      .waitForElementVisible('body',config.waitFor)
      .pause(1000)
      .click('.header-items button[type=button]')
      .pause(1000)
      .click('.signout')
      .pause(1000)
      .assert.urlEquals(config.url)             
      .end();
  }
};
