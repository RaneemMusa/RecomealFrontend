
// import '../styles/Footer.css';


// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-line"></div>
//       <div className="footer-content">
//         <div className="footer-logo">
//           <img src="/images/reco-logo.png" alt="RecoMeal Logo" />
//           <span>RecoMeal</span>
//         </div>
//         <div className="footer-text">© 2025 RecoMeal</div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;


import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <hr className="footer-line" />
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/images/reco-logo.png" alt="RecoMeal Logo" />
          </div>
          <div className="footer-email">
            <img src="/images/I.png" alt="Email Icon" />
            <span>Recomeal@support.com</span>
          </div>
          <p className="footer-copy">© 2025 RecoMeal</p>
        </div>

        <div className="footer-right">
          <p className="footer-follow-label">Follow us:</p>
          <div className="footer-social">
            <img src="/images/INS.jpg" alt="Instagram" />
            <span>Recomeal</span>
          </div>
          <div className="footer-social">
            <img src="/images/FACE.png" alt="Facebook" />
            <span>Recomeal_food</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
