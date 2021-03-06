import React from 'react'

const BookChefForm = (props) => {
  const showHideClassName = props.show ? "modal display-block": "modal display-none"

  return(
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
        <form className="contact-us-form" onChange={props.onBookChefFormChange}><br/>
          <h4 className="modal-chef-name">Book This Chef!</h4>
          <div className="modal-content">
            <span className="book-chef-datetime-guests">
              <input className="book-chef-datetime" type="datetime-local" id="datetime"/>
              <input className="book-chef-guests" type="number" id="guests" placeholder="Guests" min="1" max="6"/>
            </span>
            <textarea name="message" id="message" rows="12" placeholder="Type your message here"></textarea>

            <div className="contact-us-form-actions">
              <input type="submit" className="button" onClick={props.handleClose} value="Close" />
              <input type="submit" className="button" value="Book Chef" onClick={props.bookChefAppointment}/>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default BookChefForm
