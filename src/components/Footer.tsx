import React from 'react'
import {ChangeEvent, useState} from 'react'

const Footer =()=>{
  const [email, setEmail] = useState<string>('');


    return(
<footer className="text-center text-lg-start  text-muted">
  <section className=" text-center justify-content-center p-4 ">
    
      <a href="" className="me-4 text-reset">
        <i className="bi-facebook"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="bi-twitter"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="bi-google"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="bi-instagram"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="bi-linkedin"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="bi-github"></i>
      </a>
  </section>
  <section className="text-center justify-content-center p-10 border-bottom">
  <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email)
  }
    }>
        <div className="row d-flex justify-content-center">
          <div className="col-auto">
            <p className="pt-2">
              <strong>Sign up member</strong>
            </p>
          </div>
          <div className="col-md-5 col-6">
            <div className="form-outline form-white mb-4">
              <input type="email" id="email" onChange={(event)=>{ setEmail(event.target.value)}}
        name="email" 
         className="form-control" placeholder='Email Address'/>
            </div>
            
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-outline-dark mb-4">
              Subscribe
            </button>
          </div>
        </div>
      </form>
  </section>
  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>Novi's Store
          </h6>
          
        </div>
        
        
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-6">
          <h6 className="text-uppercase fw-bold mb-6">
          Operating Hours 
          </h6>
          <p>Monday-Friday 08.00 - 15.30 WIB
          </p>
          <p>Saturday 08.00 - 18.30 WIB
          </p>
          <p>Sunday Closed
          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="bi-map"></i> Jakarta, Indonesia</p>
          <p>
            <i className="bi-envelope"></i>
           novis_bookstore@example.com
          </p>
          <p><i className="bi-telephone-forward"></i> + 01 234 567 88</p>
        </div>
      </div>
    </div>
  </section>
 
  <div className="text-center p-4">
    © 2022 Copyright
  </div>
</footer>
    )
}

export default Footer