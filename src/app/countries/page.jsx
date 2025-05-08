"use client";

import React, { cache, useEffect, useState } from "react";
import axios from "axios";

import CountryCard from "../../components/CountryCard";
import CountryModal from "../../components/CountryModal";
import Loading from "../../components/Loading";
import styles from "./Countries.module.css";
import { Pagination} from 'antd';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const regions = ["africa", "americas", "antarctic", "asia", "europe", "oceania"];
const countriesPerPage = 32;

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  const fetchCountries = async (region = "") => {
    setIsLoading(true);
    try {
      const url = region
        ? `https://restcountries.com/v3.1/region/${region}`
        : "https://restcountries.com/v3.1/all";
      const response = await axios.get(url);
      setCountries(response.data);
      sessionStorage.setItem("countries", JSON.stringify(response.data));
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

  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const paginatedCountries = countries.slice(startIndex, endIndex);

  const countryClick = (message) => {
    toast.info(`Você clicou em: ${message}`, {
      position: "bottom-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1>Lista de Países do Mundo</h1>

      <div>
        {regions.map((region) => (
          <button
            key={region}
            className={styles.button}
            onClick={() => {
              fetchCountries(region)
              countryClick("Você clicou na região: " + region.charAt(0).toUpperCase() + region.slice(1))
            }
            }
          >
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </button>
        ))}
        <button className={styles.buttonReset} onClick={resetFilter}>
          Mostrar Todos
        </button>
      </div>

      <Pagination
        current={currentPage}
        total={countries.length}
        pageSize={countriesPerPage}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
        className={styles.pagination}
      />

      <div className={styles.cardContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          paginatedCountries.map((country, index) => (
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