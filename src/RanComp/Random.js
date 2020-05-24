import React, { Component } from 'react';
//import Random from './Random';
import './App.css';
import { FaQuoteLeft,FaTwitter,FaTumblr } from "react-icons/fa";

const Api = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

var colors = ['#16a085', '#27ae60', '#FF3031','#2c3e50', '#f39c12','#4BCFFA','#7CEC9F','#FFF222','#DAE0E2','#00CCCD', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       quotes: null,
       ranQuotes: null,
       color: null
    }
    this.quoteHandler = this.quoteHandler.bind(this);
  }

  componentDidMount(){
    fetch(Api)
    .then(res => res.json())
    .then(data => {
      this.setState({
        quotes: data.quotes
      })
    });
    this.applyColor();
    
  }

  /* Color Generation */
  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

 applyColor() {
    const color = this.state.color;
    document.body.style.background = color;
    document.body.style.color = color;
    document.getElementById('twi-quote').style.backgroundColor = color;
    document.getElementById('tum-quote').style.backgroundColor = color;
    document.getElementById('new-quote').style.backgroundColor = color;
    
  }

  /* Color Generation */
  
  
quoteHandler(){
  const ran = Math.floor(Math.random() * this.state.quotes.length);
  const rand = Math.floor(Math.random() * colors.length);
  
  const ranQuotes = this.state.quotes[ran];
  const ranColor = colors[rand];
  this.setState({
    ranQuotes: ranQuotes,
    color: ranColor
  })
}



  render() {
    return (
      <div>
      <div className="card col-12 col-md-6" id="card">
        <div className="quote-text">
          <FaQuoteLeft value={{id: 'quote-icon'}}/>
          {'  '}
          { this.state.ranQuotes !== null &&  this.state.ranQuotes.quote}
        </div>
        <div className="quote-author">
           - {this.state.ranQuotes !== null && this.state.ranQuotes.author}
        </div>
        <div className="buttons" id="buttons">
          <a href="twitter.com/intent/tweet"><button className="button" id="twi-quote"><FaTwitter /></button></a>
          <a href=""><button className="button" id="tum-quote"><FaTumblr /></button></a>
          <button className="button" id="new-quote" onClick={this.quoteHandler}>new quote</button>
        </div>
      </div>
      
      <div class="footer"> by <a href="https://codepen.io/shaw12-the-sans/">Shaw</a></div>
      </div>
    )
  }
}

export default App;
