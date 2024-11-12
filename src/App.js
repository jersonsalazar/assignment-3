/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      reditsTotal: 0,
      debitsTotal: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  componentDidMount() {
    // Fetch credits and debits data from API endpoints
    axios.get('https://johnnylaicode.github.io/api/credits.json').then(response => {
      this.setState({ creditList: response.data });
      this.calculateAccountBalance();
    });

    axios.get('https://johnnylaicode.github.io/api/debits.json').then(response => {
      this.setState({ debitList: response.data });
      this.calculateAccountBalance();
    });
  }

  calculateAccountBalance = () => {
    const creditsTotal = this.state.creditList.reduce((sum, credit) => sum + credit.amount, 0);
    const debitsTotal = this.state.debitList.reduce((sum, debit) => sum + debit.amount, 0);
    this.setState({ accountBalance: creditsTotal - debitsTotal, creditsTotal, debitsTotal });
  }

  addCredit = (event) => {
    event.preventDefault();
    const newCredit = {
      id: Math.random().toString(36).substring(2, 11),
      description: event.target.description.value,
      amount: parseFloat(event.target.amount.value),
      date: new Date().toISOString(),
    };
    this.setState(prevState => ({
      creditList: [...prevState.creditList, newCredit]
    }), this.calculateAccountBalance);
  }

  addDebit = (event) => {
    event.preventDefault();
    const newDebit = {
      id: Math.random().toString(36).substring(2, 11),
      description: event.target.description.value,
      amount: parseFloat(event.target.amount.value),
      date: new Date().toISOString(),
    };
    this.setState(prevState => ({
      debitList: [...prevState.debitList, newDebit]
    }), this.calculateAccountBalance);
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  }

  render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />);
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} creditsTotal={this.state.creditsTotal} debitsTotal={this.state.debitsTotal} />);
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} creditsTotal={this.state.creditsTotal} debitsTotal={this.state.debitsTotal} />);

    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;