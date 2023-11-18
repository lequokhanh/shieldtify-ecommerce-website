export default function removeAllParams() {
    const currentURL = new URL(window.location.href);
    const urlSearchParams = currentURL.searchParams;
    const urlSearch = currentURL.search;
    let categoryParam, keywordParam, sortByParam;

    if (urlSearch.includes("category")) {
        categoryParam = urlSearchParams.get('category');
    }

    if (urlSearch.includes("keyword")) {
        keywordParam = urlSearchParams.get('keyword');
    }
    if (urlSearch.includes("sortBy")) {
        sortByParam = urlSearchParams.get('sortBy');
    }
    // Clear all parameters
    currentURL.search = '';

    // Set back either categoryParam or keywordParam
    if (categoryParam !== undefined) {
        currentURL.searchParams.set('category', categoryParam);
    }

    if (keywordParam !== undefined) {
        currentURL.searchParams.set('keyword', keywordParam);
    }
    if (sortByParam !== undefined) {
        currentURL.searchParams.set('sortBy', sortByParam);
    }

    // Redirect to the updated URL
    window.location.href = currentURL.href;
}
