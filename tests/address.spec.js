const { test } = require('@playwright/test');
require('dotenv').config();
const HomePage = require('../pages/homePage.js');
const { HomePageLabels } = require('../ui-labels/homePageLabels.js');
const { testData } = require('../test-data/sampleTestData.js');



test.describe('Validate Address or City Search', () => {

  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage(process.env.ATMB);
  });

  test('TC001 [Homepage] Search For Existing Address', async () => {
    await homePage.searchForAddress(testData.existingAddress);
    await homePage.verifyAddressResult(testData.existingAddress);
  });

  test('TC002 [Homepage] Search For Non-Existing Address', async () => {
    await homePage.searchForAddress(testData.nonExistingAddress);
    await homePage.verifyAddressResult(HomePageLabels.noAddressResult);
  });
});