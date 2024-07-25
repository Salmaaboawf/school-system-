import './Contact.css'


function Contact(){
    return(
<div className="main-content">
  <div className="contact-section">
    <div className="hello-container">
      <h2>SAY HELLO!</h2>
      <p>We would love to hear from you!</p>
      <hr className="underline" />
    </div>
    <div className="contact-wrapper ">
    

      <form className="contact-form" action="#">
        <label htmlFor="name">Name *</label>
        <input type="text" id="name" name="name" required="" />
        <label htmlFor="email">Email *</label>
        <input type="email" id="email" name="email" required="" />
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" />
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required=""
          defaultValue={""}
        />
        <button type="submit" className="send-message">
          SEND MESSAGE
        </button>
      </form>
      
      <div className="contact-info">
        <div className="info-box">
          <div className="icon address-icon" />
          <div className="info-text">
            <h3>ADDRESS</h3>
            <p>
              Enfant School,
              <br />
              12-14 Kensington High Street
              <br />
              London, UK
            </p>
          </div>
        </div>
        <div className="info-box">
          <div className="icon phone-email-icon" />
          <div className="info-text">
            <h3>PHONE &amp; EMAIL</h3>
            <p>
              +123 456 7890,
              <br />
              +098 765 4321
              <br />
              contact@zoutula.com
            </p>
          </div>
        </div>
        <div className="info-box">
          <div className="icon business-hours-icon" />
          <div className="info-text">
            <h3>BUSINESS HOURS</h3>
            <p>
              Monday-Friday,
              <br />
              8.00 am – 6.00 pm
              <br />
              Weekend Closed
            </p>
          </div>
        </div>
        <div className="info-box">
          <div className="icon enfant-hours-icon" />
          <div className="info-text">
            <h3>ENFANT HOURS</h3>
            <p>
              Monday-Friday,
              <br />
              8.00 am – 6.00 pm
              <br />
              Weekend Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    )
}
export default Contact