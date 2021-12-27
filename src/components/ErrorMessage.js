import React from "react"
import styles from "./styles.module.css"

function ErrorMessage (props) {
    return (
        <p className={styles.error}>{ props.message }</p>
    )
}

export default ErrorMessage