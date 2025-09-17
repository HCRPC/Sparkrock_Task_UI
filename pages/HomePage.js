const BasePage = require('./BasePage');

/**
 * HomePage class represents the main page of playwright.dev
 * Contains all elements and methods specific to the home page
 */
class HomePage extends BasePage {
    constructor(page) {
        super(page);
        
        // Page elements selectors
        this.selectors = {
            // Navigation elements
            playwrightLogo: 'a[href="/"]',
            docsLink: 'a[href="/docs/intro"]',
            
            // Main content elements
            heroTitle: 'h1',
            getStartedButton: 'a:has-text("GET STARTED")',
            
            // Search functionality
            searchButton: 'button:has-text("Search")',
            searchModal: '.DocSearch-Modal',
            searchInput: 'input[placeholder="Search docs"]',
            searchResults: '[data-testid="search-results"]',

        };
    }

    /**
     * Navigate to the home page
     */
    async navigateToHomePage() {
        await this.navigateTo(this.baseURL);
        await this.waitForPageLoad();
    }

    /**
     * Click on the Get Started button
     */
    async clickGetStartedButton() {
        await this.clickElement(this.selectors.getStartedButton);
        await this.waitForPageLoad();
    }

    /**
     * Open search modal
     */
    async openSearchModal() {
        await this.clickElement(this.selectors.searchButton);
        // Wait for search input to be visible instead of modal container
        await this.waitForElement(this.selectors.searchInput);
    }

    /**
     * Perform a search
     * @param {string} searchTerm - The term to search for
     */
    async performSearch(searchTerm) {
        await this.openSearchModal();
        await this.typeText(this.selectors.searchInput, searchTerm);
        // Wait for search results to appear
        await this.page.waitForTimeout(1000);
    }

    /**
     * Close search modal
     */
    async closeSearchModal() {
        await this.pressKey('Escape');
        // Wait for modal to close
        await this.page.waitForTimeout(500);
    }

    /**
     * Get search results
     * @returns {Promise<Array>} Array of search result texts
     */
    async getSearchResults() {
        const results = await this.page.locator('[role="option"]').allTextContents();
        return results;
    }


    /**
     * Check if Get Started button is visible
     * @returns {Promise<boolean>} True if visible, false otherwise
     */
    async isGetStartedButtonVisible() {
        return await this.isElementVisible(this.selectors.getStartedButton);
    }

    /**
     * Check if search functionality is available
     * @returns {Promise<boolean>} True if available, false otherwise
     */
    async isSearchAvailable() {
        return await this.isElementVisible(this.selectors.searchButton);
    }


    /**
     * Verify page loaded correctly
     * @returns {Promise<boolean>} True if page loaded correctly
     */
    async verifyPageLoaded() {
        const title = await this.getPageTitle();
        const heroVisible = await this.isElementVisible(this.selectors.heroTitle);
        const getStartedVisible = await this.isGetStartedButtonVisible();
        
        return title.includes('Playwright') && heroVisible && getStartedVisible;
    }
}

module.exports = HomePage;

