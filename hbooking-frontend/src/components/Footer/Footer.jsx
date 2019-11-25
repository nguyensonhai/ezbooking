import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className=' mt-5 page-footer font-small blue-grey lighten-5'>
      {/* Footer Links */}
      <div className='container text-center text-md-left'>
        {/* Grid row */}
        <div className='row mt-3 dark-grey-text'>
          {/* Grid column */}
          <div className='col-md-4 col-lg-4 col-xl-4 mb-4'>
            {/* Content */}
            <h6 className='text-uppercase font-weight-bold'>H-Booking</h6>
            <hr
              className='teal accent-3 mb-4 mt-0 d-inline-block mx-auto'
              style={{ width: "60px" }}
            />
            <p>
              H-Booking hiện là nền tảng đặt phòng trực tuyến #1 Việt Nam. Đồng
              hành cùng chúng tôi, bạn có những chuyến đi mang đầy trải nghiệm.
              <br />
              Với H-Booking, việc đặt chỗ ở, biệt thự nghỉ dưỡng, khách sạn, nhà
              riêng, chung cư... trở nên nhanh chóng, thuận tiện và dễ dàng.
            </p>
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className='col-md-1 col-lg-1 col-xl-1 mx-auto mb-4'></div>
          {/* Grid column */}
          {/* Grid column */}
          <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
            {/* Links */}
            <h6 className='text-uppercase font-weight-bold'>Về chúng tôi</h6>
            <hr
              className='teal accent-3 mb-4 mt-0 d-inline-block mx-auto'
              style={{ width: "60px" }}
            />
            <p>
              <a className='dark-grey-text' href='#!'>
                Giới thiệu
              </a>
            </p>
            <p>
              <a className='dark-grey-text' href='#!'>
                Chính sách và điều khoản sử dụng
              </a>
            </p>
            <p>
              <a className='dark-grey-text' href='#!'>
                Bảo mật
              </a>
            </p>
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
            {/* Links */}
            <h6 className='text-uppercase font-weight-bold'>
              Liên hệ chúng tôi
            </h6>
            <hr
              className='teal accent-3 mb-4 mt-0 d-inline-block mx-auto'
              style={{ width: "60px" }}
            />
            <p>
              <i className='fas fa-home mr-3' /> Ho Chi Minh City
            </p>
            <p>
              <i className='fas fa-envelope mr-3' /> admin@hbooking.com.vn
            </p>
            <p>
              <i className='fas fa-phone mr-3' /> 076 670 1009
            </p>
            <p>
              <i className='fas fa-print mr-3' /> 033 377 4697
            </p>
          </div>
          {/* Grid column */}
        </div>
        {/* Grid row */}
      </div>
      {/* Footer Links */}
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #f2f2f2",
          fontSize: "14px"
        }}
      >
        <div className='container'>
          {/* Grid row*/}
          <div className='row py-4 d-flex align-items-center'>
            {/* Grid column */}
            <div className='col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0'>
              <h6 className='mb-0'>Tìm kiếm trên mạng xã hội!</h6>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className='col-md-6 col-lg-7 text-center text-md-right'>
              {/* Facebook */}
              <a className='fb-ic'>
                <i className='fab fa-facebook-f white-text mr-4'> </i>
              </a>
              {/* Twitter */}
              <a className='tw-ic'>
                <i className='fab fa-twitter white-text mr-4'> </i>
              </a>
              {/* Google +*/}
              <a className='gplus-ic'>
                <i className='fab fa-google-plus-g white-text mr-4'> </i>
              </a>
              {/*Linkedin */}
              <a className='li-ic'>
                <i className='fab fa-linkedin-in white-text mr-4'> </i>
              </a>
              {/*Instagram*/}
              <a className='ins-ic'>
                <i className='fab fa-instagram white-text'> </i>
              </a>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row*/}
        </div>
      </div>
      {/* Copyright */}
      <div
        style={{ backgroundColor: "#8080801a" }}
        className='footer-copyright text-center text-black-50 py-3'
      >
        © 2019 Copyright:
        <a
          style={{ color: "rgb(240, 70, 119)" }}
          className='dark-grey-text'
          href='https://mdbootstrap.com/education/bootstrap/'
        >
          {" "}
          HBooking.com.vn
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
