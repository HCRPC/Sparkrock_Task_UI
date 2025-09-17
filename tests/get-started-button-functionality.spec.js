const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

test.describe('Get Started Button Functionality Tests', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
    });

    test('should verify Get Started button visibility and accessibility', async ({ page }) => {
        // Test Case: Verify "Get Started" button is visible and accessible
        // Expected: Button should be prominently displayed and clickable
        
        // Verify page loads correctly
        const pageLoaded = await homePage.verifyPageLoaded();
        expect(pageLoaded).toBe(true);
        
        // Verify "Get Started" button is visible
        const getStartedVisible = await homePage.isGetStartedButtonVisible();
        expect(getStartedVisible).toBe(true);

        // Verify button is clickable (has proper href attribute)
        const buttonHref = await page.getAttribute(homePage.selectors.getStartedButton, 'href');
        expect(buttonHref).toBeTruthy();
        expect(buttonHref).toContain('/docs');
        
        // Verify button is not disabled
        const buttonDisabled = await page.getAttribute(homePage.selectors.getStartedButton, 'disabled');
        expect(buttonDisabled).toBeNull();
    });

    test('should navigate to correct installation page when clicked', async ({ page }) => {
        // Test Case: Verify "Get Started" button navigates to the correct page
        // Expected: Button should navigate to the installation/getting started documentation
        
        // Click the "Get Started" button
        await homePage.clickGetStartedButton();
        
        // Verify navigation to docs page
        const currentURL = homePage.getCurrentURL();
        expect(currentURL).toContain('/docs');

    });


    test('should provide consistent experience across browser back navigation', async ({ page }) => {
        // Test Case: Verify button functionality after browser back navigation
        // Expected: Button should work correctly when users navigate back and forward
        
        // Click "Get Started" button
        await homePage.clickGetStartedButton();
        
        // Verify we're on the docs page
        const docsURL = homePage.getCurrentURL();
        expect(docsURL).toContain('/docs');
        
        // Navigate back to home page using browser back button
        await page.goBack();
        await page.waitForLoadState('networkidle');
        
        // Verify we're back on home page
        const homeURL = homePage.getCurrentURL();
        expect(homeURL).toBe(homePage.baseURL + '/');
        
        // Verify "Get Started" button is still functional
        const getStartedVisibleAfterBack = await homePage.isGetStartedButtonVisible();
        expect(getStartedVisibleAfterBack).toBe(true);
        
        // Click "Get Started" button again
        await homePage.clickGetStartedButton();
        
        // Verify navigation works correctly after back navigation
        const docsURLAgain = homePage.getCurrentURL();
        expect(docsURLAgain).toContain('/docs');

    });

});

