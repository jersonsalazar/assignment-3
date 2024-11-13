/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
==================================================*/
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Credits = (props) => {
  // Create the list of Credit items
  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }

  // Render the list of Credit items and a form to input new Credit item
  return (
    
    <div>
      <h2>Account Balance = {props.accountBalance ? props.accountBalance.toFixed(2) : "0.00"}</h2>
      <h3>Total Credits = {props.creditsTotal ? props.creditsTotal.toFixed(2) : "0.00"}</h3>
      <h3>Total Debits = {props.debitsTotal ? props.debitsTotal.toFixed(2) : "0.00"}</h3>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit={props.addCredit}>
        <label><strong>Description:</strong></label>
        <input type="text" name="description" required />
        <label><strong>Amount:</strong></label>
        <input type="number" name="amount" min="0" step="0.01" required />
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

Credits.propTypes = {
  credits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  addCredit: PropTypes.func.isRequired,
  accountBalance: PropTypes.number,
  creditsTotal: PropTypes.number,
  debitsTotal: PropTypes.number,
};

export default Credits;