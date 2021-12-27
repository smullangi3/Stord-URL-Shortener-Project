import React from "react"
import styles from "./styles.module.css"

function URLOutput(props) {
    return (
        <div className={styles.item}>
            <p>Your Minified URL: </p>
            <p className={styles.urlout}>{ props.newurl }</p>
        </div>
    )
}

export default URLOutput