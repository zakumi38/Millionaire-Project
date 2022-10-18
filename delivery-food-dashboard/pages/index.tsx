// Utils
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
// Component and Styles
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import DataTable from "components/data-table"
// Types
import type { Rider } from "types/data.types"
import type { HomePageProps } from "types/home-page-props.types"

const Home: NextPage<HomePageProps> = ({ riders }) => {
    console.log(riders)
    return (
        <div className={styles.container}>
            <DataTable
                headerData={riders!.length ? Object.keys(riders![0]) : []}
                bodyData={{ riders }}
            />
        </div>
    )
}
export async function getStaticProps() {
    const response: AxiosResponse = await axios.get(
        "http://localhost:3001/riders"
    )
    const data: Rider[] = Object.values(response.data)
    return {
        props: { riders: [...data] },
    }
}
export default Home
