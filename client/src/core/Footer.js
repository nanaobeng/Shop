import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';

import logo from '../user/logo.png'
const Footer = () => (
<div>
<footer id="footer">

<div class="footer-top">
  <div class="container">
    <div class="row">

      <div class="col-4 footer-contact">
        <img className="img-fluid" src={logo} style={{width:'60%'}}/>
        <br/>
        <br/>
        <p>
        

4th Floor, Special House, <br/>
14 Senchi Street,<br/>
Airport Residential, Accra, GHANA  <br/><br/>
          <strong>Phone:</strong> + 233 302 789 011<br/>
          <strong>Email:</strong> info@cnergyglobalholdings.com<br/>
        </p>
      </div>

      <div class="col-4 footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Services</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
        </ul>
      </div>

      <div class="col-4 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Corporate Finance</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
          <li><i class="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
        </ul>
      </div>

   

    </div>
  </div>
</div>
<br/>
<div className="row p-4">
    <div className="col-12 p-4 text-center">
    © Ewemocha 2020
    </div>
</div>

</footer>
</div>
)
export default Footer

