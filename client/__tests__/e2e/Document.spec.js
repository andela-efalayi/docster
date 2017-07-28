import { newPublicDocument } from '../../__mocks__/mockData';

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
      .keys('h')
      .keys('i')
      .keys(',')
      .keys(browser.Keys.SPACE)
      .pause(1000)
      .keys('2')
      .keys('6')
      .keys('!')
      .click('.create-document-btn button[type="button"]')  
      .pause(1000)
  },
  'Delete a document': function (browser) {
    browser
      .url(`${config.url}my-documents`)
      .waitForElementVisible('body',config.waitFor)
      .click('div.three.columns:first-child .open-delete-dialog')
      .pause(2000)
      .waitForElementVisible('.delete-document-dialog', config.waitFor)
      .click('.delete-document-btn')
      .pause(1000)  
      .assert.containsText('.toast-message', 'Document deleted')
      .pause(1000)
      .end();      
  }
};
