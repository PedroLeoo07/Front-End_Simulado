"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import CountryCard from "../../components/CountryCard";
import CountryModal from "../../components/CountryModal";
import Loading from "../../components/Loading";
import styles from "./Countries.module.css";

const regions = ["africa", "americas", "antarctic", "asia", "europe", "oceania"];

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountries = async (region = "") => {
    setIsLoading(true);
    try {
      const url = region
        ? `https://restcountries.com/v3.1/region/${region}`
        : "https://restcountries.com/v3.1/all";
      const response = await axios.get(url);
      setCountries(response.data);
      if (!region) {
        setAllCountries(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar países:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const resetFilter = () => fetchCountries();

  return (
    <div className={styles.container}>
      <h1>Lista de Países do Mundo</h1>
      <div>
        {regions.map((region) => (
          <button
            key={region}
            className={styles.button}
            onClick={() => fetchCountries(region)}
          >
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </button>
        ))}
        <button className={styles.buttonReset} onClick={resetFilter}>
          Mostrar Todos
        </button>
      </div>

      <div className={styles.cardContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          countries.map((country, index) => (
            <CountryCard
              key={index}
              country={country}
              onClick={() => setSelectedCountry(country)}
            />
          ))
        )}
      </div>

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
}
