import React from 'react';
import bgImage from '../../images/img/banner.webp'

const SubHeader = ({title, subtitle}) => {
    const sectionStyle = {
        background: `url(${bgImage}) no-repeat 50% 50%`,
        backgroundSize: 'cover',
        position: 'relative',
        marginTop: '67px',
        padding: '120px 0px 30px 0px',
    };

    const overlayStyle = {
        content: '""',
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '100%',
        opacity: '0.7',
        background: 'var(--textColor)',
    };

    return (
      <section style={sectionStyle} className="about-us">
        <div style={overlayStyle} className="overlay"></div>
        <div className="container position-relative">
          <div className="row">
            <div className="col-md-12">
              <div
                className="section-title text-center"
                style={{ marginTop: "8rem" }}
              >
                <h2 className="text-white text-uppercase">{title}</h2>
                <p className="text-white m-0">{subtitle && subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default SubHeader;
