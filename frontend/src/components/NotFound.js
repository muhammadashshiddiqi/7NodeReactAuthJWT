import { Link } from "react-router-dom";
import React from 'react';
function NotFound() {
    return (
        <div className="container">
            <div className="columns is-centered">
                <img className="is-justify-content-center" src="/assets/images/notfound.png" alt="notfound page" width="500vw" height="500vh"/>
            </div>

            <div className="mt-3 columns is-centered"><h4><strong>Please you direct back this page, thank you</strong></h4></div>
            <div className="mt-3 columns is-centered"><Link to="/" className="button is-primary">Back Page</Link></div>
        </div>
    )
}

export default NotFound
