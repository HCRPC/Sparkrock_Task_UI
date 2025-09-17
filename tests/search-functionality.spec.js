const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

test.describe('Search Functionality Tests', ()=>{
    let homePage;

    test.beforeEach(async ({page})=>{
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
    });

    test('should open and close search modal correctly', async ({page})=>{
        //test case: verify search modal functionality
        // expected: search modal should open when search button is clicked and close when Escape is pressed

        // verify search button is visible
        const  searchAvailable = await homePage.isSearchAvailable();
        expect(searchAvailable).toBe(true);

        // open search modal
        await homePage.openSearchModal();

        // verify search modal is visible
        const searchModalVisible = await homePage.isElementVisible(homePage.selectors.searchModal);
        expect(searchModalVisible).toBe(true);

        // verify search input is visible and focused
        const searchInputVisible = await homePage.isElementVisible(homePage.selectors.searchInput);
        expect(searchInputVisible).toBe(true);

        //close search modal
        await homePage.closeSearchModal();

        // verify search modal is closed
        await page.waitForTimeout(1000);
        const searchModalClosed = await homePage.isElementVisible(homePage.selectors.searchModal);
        expect(searchModalClosed).toBe(false);
    });

    test('should accept search input and return relevant results', async ({page})=>{
        //test case: verify search input functionality and results
        //expected: search should accept input and return relevant results for valid search terms

        const searchTerm = 'test';

        //perform search
        await homePage.performSearch(searchTerm);

        // verify search input contains the search term
        const searchInputValue = await  page.inputValue(homePage.selectors.searchInput);
        expect(searchInputValue).toBe(searchTerm);

        //wait for results to load
        await page.waitForTimeout(2000);

        // get search results
        const searchResults = await homePage.getSearchResults();

        // verify search results are returned
        expect(searchResults.length).toBeGreaterThan(0);

        //verify search results contain relevant content
        const relevantResults = searchResults.some(result =>
        result.toLowerCase().includes('test') ||
        result.toLowerCase().includes('testing'));

        expect(relevantResults).toBe(true);

        //close search modal
        await homePage.closeSearchModal();

    })
})