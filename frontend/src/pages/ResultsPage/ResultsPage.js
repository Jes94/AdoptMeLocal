import React from "react";
import ListAnimals from "../../components/ListAnimals/ListAnimals";
import './ResultsPage.css'

const ResultsPage = ({ results }) => {
    return (
        <div className="resultsDisplay"><ListAnimals animals={results}/></div>
    )
}

export default ResultsPage;