import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return <div><h1>404 Error </h1>
  <p class="zoom-area">The page you are looking for does not exist. </p>
  <section class="error-container">
    <span class="four"><span class="screen-reader-text">4</span></span>
    <span class="zero"><span class="screen-reader-text">0</span></span>
    <span class="four"><span class="screen-reader-text">4</span></span>
  </section>
  <div className="row">
      <div className="col-12 text-center">
          <Link to="/"> <span className="btn btn-danger">Return Home</span> </Link>
         
      </div>
  </div>
  </div>
  ;
}

export default NotFoundPage;