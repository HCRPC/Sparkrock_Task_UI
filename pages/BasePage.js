/**
 * BasePage class contains common functionality shared across all page objects
 * This follows the Page Object Model design pattern
 */
class BasePage {
    constructor(page) {
        this.page = page;
        this.baseURL = 'https://playwright.dev';
    }

    /**
     * Navigate to a specific URL
     * @param {string} url - The URL to navigate to
     */
    async navigateTo(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Wait for an element to be visible
     * @param {string} selector - The selector of the element
     * @param {number} timeout - Timeout in milliseconds (default: 30000)
     */
    async waitForElement(selector, timeout = 30000) {
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    /**
     * Click on an element
     * @param {string} selector - The selector of the element to click
     */
    async clickElement(selector) {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    /**
     * Type text into an input field
     * @param {string} selector - The selector of the input field
     * @param {string} text - The text to type
     */
    async typeText(selector, text) {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    /**
     * Get text content of an element
     * @param {string} selector - The selector of the element
     * @returns {Promise<string>} The text content
     */
    async getElementText(selector) {
        await this.waitForElement(selector);
        return await this.page.textContent(selector);
    }

    /**
     * Check if an element is visible
     * @param {string} selector - The selector of the element
     * @returns {Promise<boolean>} True if visible, false otherwise
     */
    async isElementVisible(selector) {
        try {
            await this.page.waitForSelector(selector, { state: 'visible', timeout: 5000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get the current page title
     * @returns {Promise<string>} The page title
     */
    async getPageTitle() {
        return await this.page.title();
    }

    /**
     * Get the current page URL
     * @returns {string} The current URL
     */
    getCurrentURL() {
        return this.page.url();
    }

    /**
     * Take a screenshot
     * @param {string} name - The name of the screenshot file
     */
    async takeScreenshot(name) {
        await this.page.screenshot({ path: `reports/screenshots/${name}.png`, fullPage: true });
    }

    /**
     * Wait for page to load completely
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Scroll to an element
     * @param {string} selector - The selector of the element to scroll to
     */
    async scrollToElement(selector) {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    /**
     * Press a key
     * @param {string} key - The key to press
     */
    async pressKey(key) {
        await this.page.keyboard.press(key);
    }
}

module.exports = BasePage;

