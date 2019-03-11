const queryToSortOptions = (queryString) => {
    if (!queryString) return {};

    const sortOptions = {};
    queryString.split(",").forEach((v => {                  
        let [veld, richting] = v.split(":");

        if (!richting || !["asc", "desc"].includes(richting))
            richting = "asc";
        
        sortOptions[veld] = richting || "asc";
    }));

    return sortOptions; 
};

module.exports = {
    queryToSortOptions
}