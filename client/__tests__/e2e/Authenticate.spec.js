import { newUser } from '../../__mocks__/mockData';

const config = require('./config');

module.exports = {
  'New user signup with no info': function (browser) {
    browser
      .url(config.url)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('.intro', config.waitFor)
      .assert.containsText('div.intro h2', 'Docster')
      .pause(1000)
      .click('.form-tabs button[type=button]')
      .pause(1000)
      .setValue('input[name=fullName]','')
      .pause(1000)
      .setValue('input[name=userName]', '')
      .pause(1000)
      .setValue('input[name=email]', '')
      .pause(1000)
      .setValue('input[name=password]', '')
      .pause(1000)
      .setValue('input[name=confirmPassword]', '')
      .pause(1000)
      .click('.signup-btn button[type="button"]')
      .pause(1000)
      .assert.containsText('.form div.columns:nth-child(1) p',
      'fullname is required')
      .assert.containsText('.form div.columns:nth-child(2) p',
      'username is required')
      .assert.containsText('.form div.columns:nth-child(3) p',
      'email is required')
      .assert.containsText('.form div.columns:nth-child(4) p',
      'password is required')    
  },
  'New user signup with wrong confirmpassword': function (browser) {
    browser
      .url(config.url)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('.intro', config.waitFor)
      .assert.containsText('div.intro h2', 'Docster')
      .pause(1000)
      .click('.form-tabs button[type=button]')
      .pause(1000)
      .setValue('input[name=fullName]', newUser.fullName)
      .pause(1000)
      .setValue('input[name=userName]', newUser.userName)
      .pause(1000)
      .setValue('input[name=email]', newUser.email)
      .pause(1000)
      .setValue('input[name=password]', newUser.password)
      .pause(1000)
      .setValue('input[name=confirmPassword]', 'anothertext')
      .pause(1000)
      .click('.signup-btn button[type="button"]')
      .pause(1000)
      .assert.containsText('.form div.columns:nth-child(5) p',
      'Passwords do not match')     
  },
  'New user signup with already existing username/email': function (browser) {
    browser
      .url(config.url)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('.intro', config.waitFor)
      .assert.containsText('div.intro h2', 'Docster')
      .pause(1000)
      .click('.form-tabs button[type=button]')
      .pause(1000)
      .setValue('input[name=fullName]', newUser.fullName)
      .pause(1000)
      .setValue('input[name=userName]', newUser.userName)
      .pause(1000)
      .setValue('input[name=email]', 'admin@docster.com')
      .pause(1000)
      .setValue('input[name=password]', newUser.password)
      .pause(1000)
      .setValue('input[name=confirmPassword]', newUser.password)
      .pause(1000)
      .click('.signup-btn button[type="button"]')
      .pause(1000)            
      .assert.containsText('.toast-message',
      'Username or email exists')
      .pause(1000)      
  },
  'New user signup with correct details': function (browser) {
    browser
      .url(config.url)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('.intro', config.waitFor)
      .assert.containsText('div.intro h2', 'Docster')
      .pause(1000)
      .click('.form-tabs button[type=button]')
      .pause(1000)
      .setValue('input[name=fullName]', newUser.fullName)
      .pause(1000)
      .setValue('input[name=userName]', newUser.userName)
      .pause(1000)
      .setValue('input[name=email]', newUser.email)
      .pause(1000)
      .setValue('input[name=password]', newUser.password)
      .pause(1000)
      .setValue('input[name=confirmPassword]', newUser.password)
      .pause(1000)
      .click('.signup-btn button[type="button"]')
      .pause(1000)
      .waitForElementVisible('#user-page', config.waitFor)
      .pause(1000)
      .assert.urlEquals(`${config.url}my-documents`)
      .pause(1000)
      .click('.header-items button[type=button]')
      .pause(1000)
      .click('.signout')     
  },
  'User signin with empty fields': function (browser) {
    browser
      .url(config.url)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('.intro', config.waitFor)
      .assert.containsText('div.intro h2', 'Docster')
      .pause(1000)
      .setValue('div#username-or-email input[name=user]', '')
      .pause(1000)
      .setValue('div#password-field input', '')
      .pause(1000)
      .click('.signin-btn button[type="button"]')
      .pause(1000)
      .assert.containsText('div#username-or-email p',
      'Username or email is required')
      .assert.containsText('div#password-field p',
      'password is required')            
      .assert.urlEquals(config.url)    
  },
  'User signin with wrong details': function (browser) {
    browser
      .url(config.url)
      .waitForElementVisible('body',config.waitFor)
      .waitForElementVisible('.intro', config.waitFor)
      .assert.containsText('div.intro h2', 'Docster')
      .pause(1000)
      .setValue('div#username-or-email input[name=user]', 'admin@docster.com')
      .pause(1000)
      .setValue('div#password-field input', 'wrongpassword')
      .pause(1000)
      .click('.signin-btn button[type="button"]')
      .pause(1000)
      .assert.containsText('div#username-or-email p',
      'Invalid credentials')
      .assert.containsText('div#password-field p',
      'Invalid credentials')            
      .assert.urlEquals(config.url)    
  },
  'User signin with correct details': function (browser) {
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