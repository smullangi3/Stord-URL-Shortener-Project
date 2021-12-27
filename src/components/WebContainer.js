import React from "react"
import Heading from "./Heading"
import URLInput from "./URLInput"
import styles from "./styles.module.css"

class WebContainer extends React.Component {
    //state contains if the error message should be displayed
    render() {
        return (
            <div className={styles.universal}>
                <Heading />
                <URLInput />
            </div>
        )
    }
}
export default WebContainer