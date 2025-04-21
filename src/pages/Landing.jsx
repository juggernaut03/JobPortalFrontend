// src/pages/Landing.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import TranslatedText from '../components/TranslatedText';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Landing = () => {
  const { currentLanguage } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // Services with their corresponding icons
  const services = [
    { id: 1, name: 'Plumbing', icon: 'bi-droplet', color: 'primary' },
    { id: 2, name: 'Electrical', icon: 'bi-lightning-charge', color: 'warning' },
    { id: 3, name: 'Carpentry', icon: 'bi-hammer', color: 'danger' },
    { id: 4, name: 'Painting', icon: 'bi-palette', color: 'success' },
    { id: 5, name: 'Cleaning', icon: 'bi-bucket', color: 'info' },
    { id: 6, name: 'Gardening', icon: 'bi-tree', color: 'secondary' }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Customer',
      content: 'I found a great plumber through this platform. The service was prompt and professional. Will definitely use again!',
      rating: 5
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Electrician',
      content: 'This platform has helped me find consistent work. The booking system is very straightforward and payments are processed quickly.',
      rating: 4.5
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Customer',
      content: 'Finding a good carpenter was so easy with this app. The work was completed on time and within budget. Excellent service!',
      rating: 5
    }
  ];

  // How it works steps
  const steps = [
    {
      id: 1,
      title: 'Search Services',
      description: 'Find the right professional for your needs from our verified workers.',
      icon: 'bi-search'
    },
    {
      id: 2,
      title: 'Book Appointment',
      description: 'Schedule a service at your preferred date and time.',
      icon: 'bi-calendar-check'
    },
    {
      id: 3,
      title: 'Get Service',
      description: 'Receive quality service from skilled professionals.',
      icon: 'bi-tools'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold">
                <TranslatedText text="Find Skilled Workers Near You" />
              </h1>
              <p className="lead mb-4">
                <TranslatedText text="Connect with verified professionals for all your household and business needs. Quality service is just a click away." />
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/register" className="btn btn-light btn-lg">
                  <TranslatedText text="Get Started" />
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">
                  <TranslatedText text="Login" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img 
                src="https://cdni.iconscout.com/illustration/premium/thumb/construction-workers-work-together-to-build-a-building-illustration-download-in-svg-png-gif-file-formats--labour-day-happy-labor-progress-pack-people-illustrations-6647162.png?f=webp" 
                alt="Workers" 
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Language Selector (Prominence for the translation feature) */}
      <section className="py-3 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <TranslatedText text="Choose your language:" Component="p" className="mb-0 fw-bold" />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-2">
            <TranslatedText text="Our Services" />
          </h2>
          <p className="text-center mb-5 text-muted">
            <TranslatedText text="Professional services for all your needs" />
          </p>
          <div className="row g-4">
            {services.map((service) => (
              <div key={service.id} className="col-6 col-md-4 col-lg-2">
                <div className="card h-100 border-0 shadow-sm text-center hover-card">
                  <div className="card-body">
                    <div className={`bg-${service.color} bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center`} 
                        style={{ width: '80px', height: '80px' }}>
                      <i className={`bi ${service.icon} fs-3 text-${service.color}`}></i>
                    </div>
                    <h5 className="card-title">
                      <TranslatedText text={service.name} />
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-2">
            <TranslatedText text="How It Works" />
          </h2>
          <p className="text-center mb-5 text-muted">
            <TranslatedText text="Simple process to get the help you need" />
          </p>
          <div className="row g-4">
            {steps.map((step) => (
              <div key={step.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                        style={{ width: '60px', height: '60px' }}>
                      <i className={`bi ${step.icon}`}></i>
                    </div>
                    <h4><TranslatedText text={step.title} /></h4>
                    <p className="text-muted">
                      <TranslatedText text={step.description} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workers Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-2">
            <TranslatedText text="Featured Professionals" />
          </h2>
          <p className="text-center mb-5 text-muted">
            <TranslatedText text="Meet some of our top-rated service providers" />
          </p>
          <div className="row g-4">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                      <i className="bi bi-droplet fs-4 text-primary"></i>
                    </div>
                    <div>
                      <h5 className="mb-0">Vikram Mehta</h5>
                      <p className="text-muted mb-0">
                        <TranslatedText text="Plumber" />
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-warning text-dark me-1">
                      <i className="bi bi-star-fill"></i> 4.8
                    </span>
                    <span className="badge bg-light text-dark">
                      <TranslatedText text="7 years exp." />
                    </span>
                  </div>
                  <p className="card-text">
                    <TranslatedText text="Specialized in pipe repairs, installation of water heaters, and bathroom renovations. Available for emergency services." />
                  </p>
                  <Link to="/register?type=customer" className="btn btn-outline-primary">
                    <TranslatedText text="Book Now" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                      <i className="bi bi-lightning-charge fs-4 text-warning"></i>
                    </div>
                    <div>
                      <h5 className="mb-0">Priya Joshi</h5>
                      <p className="text-muted mb-0">
                        <TranslatedText text="Electrician" />
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-warning text-dark me-1">
                      <i className="bi bi-star-fill"></i> 4.9
                    </span>
                    <span className="badge bg-light text-dark">
                      <TranslatedText text="5 years exp." />
                    </span>
                  </div>
                  <p className="card-text">
                    <TranslatedText text="Expert in electrical wiring, lighting installation, and troubleshooting electrical issues. Licensed and insured professional." />
                  </p>
                  <Link to="/register?type=customer" className="btn btn-outline-primary">
                    <TranslatedText text="Book Now" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                      <i className="bi bi-hammer fs-4 text-danger"></i>
                    </div>
                    <div>
                      <h5 className="mb-0">Sandeep Patel</h5>
                      <p className="text-muted mb-0">
                        <TranslatedText text="Carpenter" />
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="badge bg-warning text-dark me-1">
                      <i className="bi bi-star-fill"></i> 4.7
                    </span>
                    <span className="badge bg-light text-dark">
                      <TranslatedText text="10 years exp." />
                    </span>
                  </div>
                  <p className="card-text">
                    <TranslatedText text="Specializing in custom furniture, kitchen cabinets, and wooden repairs. Quality craftsmanship guaranteed." />
                  </p>
                  <Link to="/register?type=customer" className="btn btn-outline-primary">
                    <TranslatedText text="Book Now" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-2">
            <TranslatedText text="What Our Users Say" />
          </h2>
          <p className="text-center mb-5 text-muted">
            <TranslatedText text="Hear from our satisfied customers and service providers" />
          </p>
          <div className="row g-4">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="mb-3">
                      {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning"></i>
                      ))}
                      {testimonial.rating % 1 !== 0 && (
                        <i className="bi bi-star-half text-warning"></i>
                      )}
                    </div>
                    <p className="card-text">
                      <TranslatedText text={testimonial.content} />
                    </p>
                    <div className="d-flex align-items-center mt-3">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" 
                           style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-person"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">{testimonial.name}</h6>
                        <small className="text-muted">
                          <TranslatedText text={testimonial.role} />
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 text-center">
              <h2 className="mb-3">
                <TranslatedText text="Ready to Get Started?" />
              </h2>
              <p className="lead mb-4">
                <TranslatedText text="Join thousands of satisfied customers and skilled professionals on our platform. Quality service is just a click away." />
              </p>
              <div className="d-flex justify-content-center flex-wrap gap-3">
                <Link to="/register?type=customer" className="btn btn-primary btn-lg">
                  <i className="bi bi-search me-2"></i>
                  <TranslatedText text="Hire a Professional" />
                </Link>
                <Link to="/register?type=worker" className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-tools me-2"></i>
                  <TranslatedText text="Join as Worker" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with language selector */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <h5>
                <i className="bi bi-tools me-2"></i>
                <TranslatedText text="Job Portal for Blue-Collar Workers" />
              </h5>
              <p className="mb-0">
                <TranslatedText text="Connecting skilled professionals with customers since 2023" />
              </p>
            </div>
            <div className="col-md-3">
              <h5><TranslatedText text="Quick Links" /></h5>
              <ul className="list-unstyled">
                <li><Link to="/register" className="text-white"><TranslatedText text="Sign Up" /></Link></li>
                <li><Link to="/login" className="text-white"><TranslatedText text="Login" /></Link></li>
                <li><a href="#" className="text-white"><TranslatedText text="About Us" /></a></li>
                <li><a href="#" className="text-white"><TranslatedText text="Contact" /></a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5><TranslatedText text="Language" /></h5>
              <LanguageSwitcher />
              <div className="mt-3">
                <a href="#" className="text-white me-2"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white me-2"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white me-2"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p className="small mb-0">
              <TranslatedText text="© 2025 Job Portal for Blue-Collar Workers. All rights reserved." />
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default Landing;