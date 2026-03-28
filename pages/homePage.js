const { expect } = require('@playwright/test');
const { HomePageLocators } = require('../locators/homePageLocators');

class HomePage {
    constructor(page) {
        this.page = page;
    }

    async navigateToHomePage(URL) {
        await this.page.goto(URL);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async searchForAddress(address) {
        await this.page.fill(HomePageLocators.searchInput, address);
        await this.page.locator(HomePageLocators.searchBtn).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyAddressResult(addressResult) {
        const locResult = this.page.locator(HomePageLocators.locResult);
        await locResult.waitFor({ state: 'visible' });
        await expect(locResult).toContainText(addressResult);
    }

}
module.exports = HomePage;