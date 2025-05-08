import React, { useState, useEffect } from "react";
import { Modal, Skeleton } from "antd";
import styles from "../styles/CountryModal.module.css";
import Image from "next/image";

export default function CountryModal({ country, onClose }) {
    const [loading, setLoading] = useState(true);

useEffect(() => {
    if (country) {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer); 
    }
}, [country]);

if (!country) {
    return null;
}

return (
    <Modal
        title={`Detalhes de ${country.translations.por.common}`}
        open={!!country}
        onCancel={onClose}
        footer={null}
    >
        {loading ? (
        <div className={styles.skeletonContainer}>
            <Skeleton active paragraph={{ rows: 4 }} />
        </div>
    ) : (
        <div className={styles.modalContent}>
            <h2>{country.translations.por.common}</h2>
            <Image
            src={country.flags.png}
            alt={`Bandeira de ${country.translations.por.common}`}
            width={150}
            height={100}
            />
            <p>Nome Oficial: {country.translations.por.official}</p>
            <p>Capital: {country.capital || "Não tem"}</p>
            <p>Continente: {country.region}</p>
            <p>Sub-região: {country.subregion || "Não tem"}</p>
            <p>População: {country.population.toLocaleString()}</p>
            <p>Fuso Horário: {country.timezones[0]}</p>
        </div>
    )}
    </Modal>
    );
}