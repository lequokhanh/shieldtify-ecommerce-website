const removeNameFromURL = (name,filterBy) => {
    const currentURL = new URL(window.location.href);
    const urlSearchParams = currentURL.searchParams;
    const combinedValuesString = urlSearchParams.get(filterBy);

    if (combinedValuesString) {
        const currentValues = combinedValuesString.split(',');
        const decodedName = decodeURIComponent(name);
        const updatedValues = currentValues.filter(value => decodeURIComponent(value) !== decodedName);
        if (updatedValues.length === 0) {
            urlSearchParams.delete(filterBy);
        } else {
            urlSearchParams.set(filterBy, updatedValues.join(','));
        }
        const updatedURL = `${currentURL.pathname}?${urlSearchParams.toString()}`;
        window.location.href = updatedURL;
    }
}

export default removeNameFromURL;