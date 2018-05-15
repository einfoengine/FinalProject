import React, { Component } from 'react';
import './App.css';
import Customers from './components/customers/customers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', output:''};
        this.handleChange = this.handleChange.bind(this);
        this.check = this.check.bind(this);
    }
    check(){
        console.log(this.state.value);

        fetch('http://localhost:4000/api/check?data='+this.state.value, {
            mode: 'no-cors',
            header: {
                'Access-Control-Allow-Origin':'*',
            }
        })
        .then(function(response) {
            console.log(response);
            this.setState({output: response});
        })
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    render(){
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Topic Extraction</h1>
            </header>
              <section id="sm-engine" className="sm-engine sm-section">
                  <div className="container">
                      <div className="col-md-12">
                          <div className="sm-module">
                              <div className="tab-content">
                                  <div id="url-crawl" className="tab-pane fade url-crawl">
                                      <input type="text" value={this.state.value} onChange={this.handleChange} />
                                      <a href="#" onClick={this.check}>Check</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>{/*<end sec>*/}
              <code id="output">{this.state.output}</code>

            {/*<Customers />*/}
          </div>
    );
  }
}

export default App;
