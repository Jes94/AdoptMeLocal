import React from "react";
import FavoriteList from "../../components/FavoriteList/FavoriteList";
import "./FavoritesPage.css"


const FavoritesPage = ({getShelterInfo}) => {
    return (
        <div className="container1">
            <h4>Favorites</h4>
            <div className="favoritesContainer"><FavoriteList getShelterInfo={getShelterInfo}/></div>
        </div>
    )
}

export default FavoritesPage;