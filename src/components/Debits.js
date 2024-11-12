/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
==================================================*/
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Debits = (props) => {

  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h2>Account Balance = {props.accountBalance ? props.accountBalance.toFixed(2) : "0.00"}</h2>
      <h3>Total Credits = {props.creditsTotal ? props.creditsTotal.toFixed(2) : "0.00"}</h3>
      <h3>Total Debits = {props.debitsTotal ? props.debitsTotal.toFixed(2) : "0.00"}</h3>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={props.addDebit}>
        <label><strong>Description:</strong></label>
        <input type="text" name="description" required />
        <label><strong>Amount:</strong></label>
        <input type="number" name="amount" min="0" step="0.01" required />
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

Debits.propTypes = {
  debits: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  addDebit: PropTypes.func.isRequired,
  accountBalance: PropTypes.number,
  creditsTotal: PropTypes.number,
  debitsTotal: PropTypes.number,
};

export default Debits;