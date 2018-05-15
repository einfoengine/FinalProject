import React, { Component } from 'react';
import './customers.css';


class Customers extends Component {
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

export default Customers;
