const { test } = require('@playwright/test');
require('dotenv').config();
const LoginPage = require('../pages/loginPage.js');
const { LoginPageLabels } = require('../ui-labels/homePageLabels.js');
const { loginTestData } = require('../test-data/sampleTestData.js');



test.describe('Validate Login', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLogInPage(process.env.LOGIN);
    });

    test('TC003 [LoginPage] Login without Completing reCAPTCHA', async () => {
        await loginPage.login(loginTestData.email, loginTestData.password);
        await loginPage.verifyLogInResult(LoginPageLabels.loginErrorMsg);
    });
});