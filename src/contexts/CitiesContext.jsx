import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const CitiesContext = createContext();


const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error,
};

function reducer(state, action) {

    switch (action.type){
        case "loading":
            return { ...state, isLoading: true };
            
    case "cities/loaded":
        return {
            ...state,
            isLoading: false,
            cities: action.payload,     
        };

    case "city/loaded":
        return {
            ...state, 
            isLoading: false, 
            currentCity: action.payload 
        };    
        
    case "cities/created":
            return {
               ...state,
               isLoading: false,
               cities: [...state.cities, action.payload] 
            };

    case "cities/deleted":
            return {
              ...state,
              isLoading: false,
              cities: state.cities.filter((city) => city.id !== action.payload), 
           }
    case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

            default:
                throw new Error("Unknown action type");
                
    }    
}



function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});


    const BASE_URL = 'http://localhost:9000';

    useReducer( reducer, initialState );

    useEffect(() => {
       async function FetchCities() {
         dispatchEvent({ type: "loading" });

        try {
            //setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`);
            const data = await res.json();
            dispatch({ type: "cities/loaded", payload: data });
            //setCities(data);
        }  catch{
            dipatch({ type: "rejected", payload: "There was an error loading cities...", })
            alert("There was an error loading data...");
        }finally {
            setIsLoading(false);
        }
       }

       FetchCities();
    }, []);

    async function getCity(id) { 
        try{
            setIsLoading(true);
            const res = await fetch (`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        }catch{
            alert("There was an error loading data...");
        }finally {
            setIsLoading(false);
        }
   }

   async function createCity(newCity) {
     try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        setCities((cities) => [...cities, data]);

        console.log(data);
     } catch {
          alert("There was an error loading data...");
     } finally {
         setIsLoading(false);
     }

   }

   async function deleteCity(id) {
    try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`, {
           method: "DELETE", 
        });
 
        const data = res.json();
        setCities((cities) => cities.filter(city => city.id !== id));

        
    }catch{
        alert("There was an error deleting city.");
    }finally {
        setIsLoading(false);
    }
   };


    return (
        <CitiesContext.Provider
          value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity
          }}
        >
           {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined){
        throw new Error("CitiesContext was used outside the CitiesProvider");
    }
    return context;
}


export { CitiesProvider, useCities };