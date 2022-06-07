import React from "react";
import FavoriteList from "../../components/FavoriteList/FavoriteList";
import "./FavoritesPage.css"


const FavoritesPage = () => {
    return (
        <div className="container">
            <h4>Favorites</h4>
            <div className="favoritesContainer"><FavoriteList /></div>
        </div>
    )
}

export default FavoritesPage;