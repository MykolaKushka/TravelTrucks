import styles from './BookingForm.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const bookingDate = formData.get('bookingDate');
    const comment = formData.get('comment');

    const message = `You sent form:<br>
    Name: ${name}<br>
    Email: ${email}<br>
    Booking Date: ${bookingDate}<br>
    Comment: ${comment}<br><br>
    Thank you for your booking! We will contact you soon.`;


    toast.success(<div dangerouslySetInnerHTML={{ __html: message }} />);

    e.target.reset();
  };

  return (
    <div className={styles.bookingForm}>
      <h3>Book your campervan now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <form onSubmit={handleBookingSubmit}>
        <input name="name" type="text" placeholder="Name*" required />
        <input name="email" type="email" placeholder="Email*" required />
        <input name="bookingDate" type="date" required />
        <textarea name="comment" placeholder="Comment" />
        <div>
            <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
