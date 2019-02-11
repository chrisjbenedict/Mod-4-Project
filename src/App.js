import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/SearchForm'
import ContentContainer from './components/ContentContainer'
import BookingsContainer from './components/BookingsContainer'
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom"

const endPoint = "http://localhost:3001/api/v1/"

class App extends Component {

  state = {
    chefs: [],
    chefsToReturn: [],
    location: null,
    cuisine: null,
    guests: 0,
    hidden: false
  }

  componentDidMount() {
    fetch(`${endPoint}chefs`)
    .then( resp => resp.json())
    .then(chefs => {
      this.setState({
        chefs
      }, () => console.log(this.state.chefs))
    })
  }

 sortedChefs = () => {
    return this.state.chefs.sort( (a, b) => {
      return b.rating - a.rating
    }).slice(1, 3)
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    }, () => console.log("in form change", this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.location && this.state.cuisine && this.state.guests) {
      this.setState({
        hidden: !this.state.hidden,
        chefsToReturn: this.chefsToDisplay()
      }, () => console.log(this.state))
    }
  }

  chefsToDisplay = () => {
    console.log("display chefs");
    if (this.state.cuisine === "any") {
      return this.state.chefs
    } else {
      return this.state.chefs.filter( chef => {
        return chef.specialty === this.state.cuisine
      })
    }
  }

  selectedChef = (selectedChef) => {
    const selected = this.state.chefs.find(chef => chef.id === selectedChef.id)
    console.log(selected);
    return selected
  }

  handleBookChef = () => {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  searchForm = () => (
    <div className="middle-left">
      <div className="middle-left" hidden={this.state.hidden}>
        <SearchForm
          handleSubmit={this.handleSubmit}
          handleFormChange={this.handleFormChange}
          hidden={this.state.hidden}
        />
      </div>
      <div className="wrapper" hidden={!this.state.hidden}>
        <ContentContainer
          chefData={this.state.chefsToReturn}
          selectedChef={this.selectedChef}
          handleBookChef={this.handleBookChef}
          guests={this.state.guests}
        />
      </div>

    </div>
  )

  renderSearch =  () => (
    <div className="wrapper" >
      <ContentContainer
        chefData={this.state.chefsToReturn}
        selectedChef={this.selectedChef}
        handleBookChef={this.handleBookChef}
        guests={this.state.guests}
      />
    </div>)

  renderBookings = () => (
    <BookingsContainer
      chefs={this.state.chefs}
    />
  )

  render() {
    return (
      <Router>
      <div>

        <div className="App">
          <div className="hero-full-screen">

            <div className="top-content-section">
              <div className="top-bar">
                <div className="top-bar-left">
                  <ul className="menu">
                    <li className="menu-text"><img src="https://i.imgur.com/9En3spK.png" href="#" alt="logo"/></li>
                    <li><NavLink to="/" >
                    Home
                    </NavLink></li>

                    <li><NavLink exact to="/search" >
                    Search
                    </NavLink></li>

                    <li><NavLink exact to="/bookings" >
                    Bookings
                    </NavLink></li>
                  </ul>
                  <a href="/">toque</a>
                </div>
              </div>
            </div>

            <Route exact path="/" component={this.searchForm} />
            <Route exact path="/search" component={this.renderSearch} />
            <Route exact path="/bookings" component={this.renderBookings} />

          </div>
        </div>
        </div>
      </Router>
    );
  }
}

export default App;
