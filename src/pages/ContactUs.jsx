import Footer from '../components/Footer';
import '../styles/Contact.css';

function Contact() {
  return (
    <>
      <div className="contact-page">
        <h2>Get in Touch with RecoMeal</h2>

        <div className="contact-info">
          <p>📍 <strong>Location:</strong> Amman, Jordan</p>
          <p>📧 <strong>Email:</strong> <a href="mailto:support@recomeal.com">support@recomeal.com</a></p>
          <p>📞 <strong>Phone:</strong> +962-7X-XXX-XXXX</p>
          <p>⏰ <strong>Working Hours:</strong> Sun – Thu | 9:00 AM – 5:00 PM</p>
        </div>

        <div className="map-container">
          <iframe
            title="RecoMeal Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.345338522089!2d35.901073315237586!3d31.953948481223315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca0f9b7202797%3A0x8f9e16f4c23c4205!2sAmman!5e0!3m2!1sen!2sjo!4v1700000000000"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
