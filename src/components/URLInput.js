import React from "react"
import axios from "axios"
import URLOutput from "./URLOutput"
import ErrorMessage from "./ErrorMessage"
import styles from "./styles.module.css"

class URLInput extends React.Component {
    state = {
        longURL:"",
        newURL:"",
        errorMsg:""
    }

    handleGeneration(e) {
        e.preventDefault();
        const URLToShorten = { url: this.state.longURL };

        axios.post('http://localhost:8080/submit', {URLToShorten})
            .then(res => { this.setState({newURL: res.data.newurl, errorMsg: res.data.error}) })
            .catch(error => {
                console.log(error)
                this.setState({newURL: "", errorMsg: "Server Connection Error"}) 
            })
    }
    render() {
        return (
            <div>
                <div className={styles.flexContainer}>
                    <form className={styles.item}>  
                        <p>Enter a Long URL and Generate a Minified Version</p>
                        <input type="text" placeholder="Enter Long URL Here..." name="longURL" 
                            onChange={e => this.setState({longURL: e.target.value})}
                            className={styles.textIn}
                        />
                        <input type="submit" value="Generate" onClick={e => this.handleGeneration(e)}
                        className={styles.submitBtn}/>
                    </form>

                    
                    <URLOutput newurl = { this.state.newURL }/>
                </div>
                <ErrorMessage message = { this.state.errorMsg }/>
            </div>
        )
    }
}

export default URLInput