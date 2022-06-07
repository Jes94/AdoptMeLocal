import React from "react";
import ListAnimals from "../../components/ListAnimals/ListAnimals";
import './ResultsPage.css'

const ResultsPage = (props) => {
    return (
        <div className="container">
        <h2>Results</h2>
        <div className="resultsContainer"><ListAnimals animals={props.results} getDetails={props.getDetails}/></div>
        </div>
    )
}

export default ResultsPage;