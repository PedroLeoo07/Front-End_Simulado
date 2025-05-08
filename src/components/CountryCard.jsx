import React from "react";
import styles from "../styles/CountryCard.module.css";
import Image from "next/image";

export default function CountryCard({ country, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(country)}>
      <Image
        src={country.flags.png}
        alt={`Bandeira de ${country.translations.por.common}`}
        className={styles.flag}
        width={200}
        height={120}
        priority={true}
      />
      <h3 className={styles.name}>{country.translations.por.common}</h3>
    </div>
  );
}