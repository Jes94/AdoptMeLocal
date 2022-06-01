import React from "react";
import ListAnimals from "../../components/ListAnimals/ListAnimals";
import './ResultsPage.css'

const ResultsPage = ({ results }) => {
    return (
        <div className="container">
        <h2>Results</h2>
        <div className="resultsContainer"><ListAnimals animals={results}/></div>
        </div>
    )
}

export default ResultsPage;