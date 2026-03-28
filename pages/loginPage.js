const { expect } = require('@playwright/test');
const { LoginPageLocators } = require('../locators/loginPageLocators');

class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToLogInPage(URL) {
        await this.page.goto(URL);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login(email, password) {
        await this.page.fill(LoginPageLocators.emailInput, email);
        await this.page.fill(LoginPageLocators.passwordInput, password);
        await this.page.locator(LoginPageLocators.loginBtn).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyLogInResult(result) {
        const errorMsg = this.page.locator(LoginPageLocators.errorMsg);
        await errorMsg.waitFor({ state: 'visible' });
        await expect(errorMsg).toContainText(result);
    }

}
module.exports = LoginPage;