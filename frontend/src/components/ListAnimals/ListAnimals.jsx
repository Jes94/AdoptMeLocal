import React from "react";

const ListAnimals = ({ animals }) => {

    return(
        animals.map((animal) => {
            if (animal.photos[0] !== undefined) {
                return ( 
                    <div key={animal.id}>
                        <img 
                            key={animal.id} 
                            src={animal.photos[0].medium} 
                            alt={animal.name}
                        />
                        <p>{animal.name}</p>
                    </div>
                )
            }
            else{
                return null;
            }
        })
    )
}

export default ListAnimals;