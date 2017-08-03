const config = require('./config');

module.exports = {
  'View all user documents': function (browser) {
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
      .assert.containsText('.page-title p span:nth-child(1)',
      'My Documents')
      .pause(1000)
  },
  'View public documents': function (browser) {
    browser
      .click('.header-items button[type=button]')
      .pause(1000)
      .click('.public-documents')
      .pause(1000)
      .assert.containsText('.page-title p span:nth-child(1)',
      'Public Documents')
      .pause(1000);      
  },
  'View role documents': function (browser) {
    browser
      .click('.header-items button[type=button]')
      .pause(1000)
      .click('.role-documents')
      .pause(1000)
      .assert.containsText('.page-title p span:nth-child(1)',
      'Role Documents')
      .pause(1000)    
  },
  'View user profile': function (browser) {
    browser
      .click('.header-items button[type=button]')
      .pause(1000)
      .click('.profile')
      .pause(1000)
      .assert.containsText('.page-title p span:nth-child(1)', 'User Profile')
      .pause(1000)
      .click('.header-items button[type=button]')
      .pause(1000)
      .click('.signout')
      .end();      
  }
};
