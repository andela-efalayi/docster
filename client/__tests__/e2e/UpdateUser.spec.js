const config = require('./config');

module.exports = {
  'Update user role (admin function)': function (browser) {
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
      .click('.header-items button[type=button]')
      .pause(1000)
      .click('.all-users')
      .pause(1000)
      .waitForElementVisible('#all-users', config.waitFor)
      .waitForElementVisible('tr:nth-child(3)', config.waitFor)
      .waitForElementVisible('td:nth-child(3)', config.waitFor)
      .pause(1000)
      .click('tr:nth-child(3) td:nth-child(3) .role-menu button[type="button"]')
      .pause(1000)
      .click('span[role="menuitem"]') 
      .pause(1000)
      .waitForElementVisible('.confirm-action-dialog', config.waitFor)
      .pause(1000)
      .click('.confirm-action-btn button[type="button"]')
      .pause(1000)  
      .assert.containsText('.toast-message', 'User role updated')
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
