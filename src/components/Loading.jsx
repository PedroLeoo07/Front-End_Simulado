import React from "react";
import styles from "../styles/Loading.module.css";
import Image from "next/image";

export default function Loading() {
    return (
        <div className={styles.loading}>
            <Image 
                src="/images/world.gif" 
                alt="Loading" 
                width={400} 
                height={300}
                priority={true}
            />
            <p>Carregando países...</p>
        </div>
    );
}