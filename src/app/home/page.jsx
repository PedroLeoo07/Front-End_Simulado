import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className={styles.container}>
            <Image className={styles.image} src="/images/maiko.png" alt="Maiko Xikixiki" width={300} height={300}/>
            <h1 className={styles.title}> Maiko Xikixiki Bahia</h1>
            <div className={styles.description}>
                <p>Tá perdido no código? Relaxa e vem de Maiko, que vamos te mostrar a usar:</p>
                <ul className={styles.list}>
                    <li>Next.js (App Router)</li>
                    <li>CSS Modules</li>
                    <li>React Components</li>
                    <li>React Hooks</li>
                    <li>PreLoad</li>
                    <li>PreFetch</li>
                    <li>Fetch Axios</li>
                    <li>LocalStorage</li>
                    <li>React Toastify</li>
                    <li>AntD</li>
                    <li>Skeleton</li>
                </ul>
            </div>
            <Link href="/countries">
            <button className={styles.button}>Acessar Países</button>
            </Link>
        </div>
    );
}