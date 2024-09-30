import { useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect } from "react";


export function convertToEmoji(countryCode) {
    const codePoints = countryCode.toUpperCase().split("").map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};

function Form() {
    
    const [lat, lng] = useUrlPosition();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                console.log(data);
            }catch(err) {
            }finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="cityName">
                 City name
              </label>
              <input id="cityName" 
              onChange={(e) => setCityName(e.target.value)} 
               value={cityName}
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="notes">
                Notes about your trip to {cityName}
              </label>
              <textarea id="notes" 
              onChange={(e) => setNotes(e.target.value)} 
               value={notes} 
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <Button type="back" onClick={() => navigate(-1)}>
                    &larr; Back
                    </Button>
            </div>
        </form>
    );
};


export default Form;