import React from "react";
import styles from "../styles/CountryModal.module.css";

export default function CountyModel({ country, onClose }) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2>{country.translations.por.common}</h2>
                <img src={country.flags.png} alt={`Bandeira de ${country.translations.por.common}`} className={styles.flag} />
                <p>Nome Oficial: {country.translations.por.official}</p>
                <p>Capital: {country.capital || "Não tem"}</p>
                <p>Continente: {country.region}</p>
                <p>Sub-região: {country.subregion || "Não tem"}</p>
                <p>População: {country.population.toLocaleString()}</p>
                <p>Fuso Horário: {country.timezones[0]}</p>
            </div>
        </div>
    );
}
