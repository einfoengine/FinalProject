import React, { Component } from 'react';
import './data.css';


class Data extends Component {

    //
    constructor(){
        super();
        this.state = {
            customers:[]
        }
    }

    componentDidMount(){
        fetch('/api/customers')
        .then(res => res.json())
        .then(customers => this.setState({customers}, () => console.log('Customers fetched..', customers)))
    }

    render() {
        return (
            <div>
                {
                    this.state.customers.map(
                        customers => <li key={customers.id}>{ customers.firstName } { customers.lastName }</li>
                    )
                }
            </div>
        )
    }
}

export default Data;
