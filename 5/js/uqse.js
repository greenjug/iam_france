function updateQueryStringElements(attributeList = ['data-br-href', 'data-br-src'], queryKey = 'query', prefix = 'data-br-') {
    // Get the query string
    const urlParams = new URLSearchParams(window.location.search);
    const queryValue = urlParams.get(queryKey);

    if ( queryValue) {
        console.log(`Breeze - uQSE - Found ${queryKey}`);
    }

    // Helper function to update attributes
    function updateAttribute(elements, attrName, queryValue) {
        elements.forEach(element => {
            const baseUrl = element.getAttribute(attrName);
            if (baseUrl !== null && baseUrl !== undefined) {
                const [path, hash] = baseUrl.split('#');
                let newUrl;
                
                if (queryValue) {
                    newUrl = hash 
                        ? `${path}?${queryKey}=${encodeURIComponent(queryValue)}#${hash}`
                        : `${path}?${queryKey}=${encodeURIComponent(queryValue)}`;
                } else {
                    newUrl = baseUrl;
                }
                
                element.setAttribute(attrName.replace(prefix, ''), newUrl);
            }
        });
    }
    
    try {
        // Iterate through the provided attribute list
        attributeList.forEach(attrName => {
            const elements = document.querySelectorAll(`[${attrName}]`);
            console.log(`Breeze - uQSE - Number of ${attrName} elements found: ${elements.length}`);
            updateAttribute(elements, attrName, queryValue);
        });
    } catch (error) {
        console.error('Breeze - uQSE - Error updating elements:', error);
    }
}
updateQueryStringElements();