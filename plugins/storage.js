class Storage {
    setFavourites(favourites) {
        localStorage.setItem(
            "favourites",
            JSON.stringify(favourites)
        );
    }
    getFavourites() {
        if (
            localStorage.getItem("favourites") &&
            localStorage.getItem("favourites") !== "undefined"
        ) {
            return JSON.parse(localStorage.getItem("favourites"));
        } else {
            return []
        }
    }
}

export default Storage;