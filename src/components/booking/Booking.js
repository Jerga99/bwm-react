import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { toast } from 'react-toastify';
import { BookingModal } from './BookingModal';
import { getRangeOfDates } from 'helpers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from '../payment/Payment';

import * as moment from 'moment';
import * as actions from 'actions';

class Booking extends React.Component {

  constructor() {
    super();

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

    this.state = {
      proposedBooking: {
        startAt: '',
        endAt: '',
        guests: '',
        paymentToken: ''
      },
      modal: {
        open: false
      },
      errors: []
    }

    this.checkInvalidDates = this.checkInvalidDates.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
    this.reserveRental = this.reserveRental.bind(this);
    this.setPaymentToken = this.setPaymentToken.bind(this);
  }


  componentWillMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const {bookings} = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  checkInvalidDates(date) {
    return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
  }

  handleApply(event, picker) {
    const startAt = picker.startDate.format('Y/MM/DD');
    const endAt = picker.endDate.format('Y/MM/DD');

    this.dateRef.current.value = startAt + ' to ' + endAt;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
  }

  selectGuests(event) {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10)
      }
    })
  }

  cancelConfirmation() {
    this.setState({
      modal: {
        open: false
      }
    })
  }

  setPaymentToken(paymentToken) {
    const {proposedBooking} = this.state;
    proposedBooking.paymentToken = paymentToken;

    this.setState({proposedBooking});
  }

  addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  resetData() {
    this.dateRef.current.value = '';

    this.setState({proposedBooking: {guests: ''}});
  }

  confirmProposedData() {
    const {startAt, endAt} = this.state.proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      },
      modal: {
        open: true
      }
    });
  }

  reserveRental() {
    actions.createBooking(this.state.proposedBooking).then(
      (booking) => {
        this.addNewBookedOutDates(booking);
        this.cancelConfirmation();
        this.resetData();
        toast.success('Booking has been succesfuly created! Enjoy.');
      },
      (errors) => {
        this.setState({errors});
      })
  }

  render() {
    const { rental, auth: { isAuth } } = this.props;
    const { startAt, endAt, guests, paymentToken } = this.state.proposedBooking;

    return (
      <div className='booking'>
        <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
        <hr></hr>
        { !isAuth &&
          <Link className='btn btn-bwm btn-confirm btn-block' to={{pathname: '/login'}}>
            Login to book place.
          </Link>
        }
        { isAuth &&
          <React.Fragment>
            <div className='form-group'>
            <label htmlFor='dates'>Dates</label>
            <DateRangePicker onApply={this.handleApply}
                             isInvalidDate={this.checkInvalidDates}
                             opens='left'
                             containerStyles={{display: 'block'}}>
              <input ref={this.dateRef} id='dates' type='text' className='form-control'></input>
            </DateRangePicker>
            </div>
            <div className='form-group'>
              <label htmlFor='guests'>Guests</label>
              <input onChange={(event) => { this.selectGuests(event)}}
                     value={guests}
                     type='number'
                     className='form-control'
                     id='guests'
                     aria-describedby='guests'
                     placeholder=''>
              </input>
            </div>
            <button disabled={!startAt || !endAt || !guests} onClick={() => this.confirmProposedData()} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
          </React.Fragment>
        }
        <hr></hr>
        <p className='booking-note-title'>People are interested into this house</p>
        <p className='booking-note-text'>
          More than 500 people checked this rental in last month.
        </p>
        <BookingModal open={this.state.modal.open}
                      closeModal={this.cancelConfirmation}
                      confirmModal={this.reserveRental}
                      booking={this.state.proposedBooking}
                      errors={this.state.errors}
                      rentalPrice={rental.dailyRate}
                      disabled={!paymentToken}
                      acceptPayment={() => <Payment setPaymentToken={this.setPaymentToken}/>}
                      />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Booking)




