import React from 'react';
import './main.css';
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, CardColumns,Button } from 'react-bootstrap';


class Main extends React.Component {
	state = {
		amount: 500,
		months: 6,
		interestRate: 0,
		monthlyPayment: 0,
		values: []
	};
	componentWillMount() {
		localStorage.getItem('numPayments') && this.setState({
			numPayments: JSON.parse(localStorage.getItem('numPayments'))

		});
		localStorage.getItem('interestRate') && this.setState({
			interestRate: JSON.parse(localStorage.getItem('interestRate'))

		}); localStorage.getItem('monthlyPayment') && this.setState({
			monthlyPayment: JSON.parse(localStorage.getItem('monthlyPayment'))

		})
	}

	componentDidMount() {
		axios
			.get(
				`https://ftl-frontend-test.herokuapp.com/interest?amount=${
				this.state.amount
				}&numMonths=${this.state.months}`
			)
			.then(res => {
				this.setState({
					interestRate: res.data.interestRate,
					monthlyPayment: res.data.monthlyPayment.amount
				});
			})
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('numPayments', JSON.stringify(nextState.numPayments));
		localStorage.setItem('interestRate', JSON.stringify(nextState.interestRate));
		localStorage.setItem('monthlyPayment', JSON.stringify(nextState.monthlyPayment));

	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.amount !== prevState.amount ||
			this.state.months !== prevState.months
		) {
			axios
				.get(
					`https://ftl-frontend-test.herokuapp.com/interest?amount=${
					this.state.amount
					}&numMonths=${this.state.months}`
				)
				.then(res => {
					if (res.data.status && res.data.status === "error") {
						console.log("There is error");
					} else {
						this.setState({
							interestRate: res.data.interestRate,
							monthlyPayment: res.data.monthlyPayment.amount
						});
					}
				})
		}
	}

	handleFormSubmit = () => {
		const { amount, months, numPayments, interestRate, monthlyPayment } = this.state;
		localStorage.setItem('months', months);
		localStorage.setItem('amount', months ? amount : '');
		this.state.values.push(amount, months, numPayments, interestRate, monthlyPayment);
		
	};
	render() {
		return (
			<React.Fragment>
				<Container className="container">
					<form onSubmit={this.handleFormSubmit}>
						<Card>
							<Card.Header as="h5" style={{ width: '18rem' }}>Loan Amount (in $)</Card.Header>
							<InputRange
								maxValue={5000}
								minValue={500}
								value={this.state.amount}
								onChange={amount => this.setState({ amount })}
							/>
						</Card>
						<Card>
							<Card.Header as="h5" style={{ width: '18rem' }}>Loan Duration (in months)</Card.Header>
							<InputRange
								maxValue={24}
								minValue={6}
								value={this.state.months}
								onChange={months => this.setState({ months })}
							/>
						</Card>
						<Button type="submit" >Remember</Button>

					</form>
					<h2>Interest Details: </h2>

					<Card>
						<CardColumns>
							<Card >

								<Card.Header as="h5" style={{ width: '10rem' }}>Interest Rate:</Card.Header>
								<span>
									${this.state.interestRate}
								</span>
							</Card>
							<Card >
								<Card.Header as="h5" style={{ width: '10rem' }}>Monthly Payment:</Card.Header>
								<span>
									${this.state.monthlyPayment}
								</span>
							</Card>
							<Card>
								<Card.Header as="h5">History:</Card.Header>
								<span>
									Amount:{this.state.values[0]}
								</span><br />
								<span>
									Months:{this.state.values[1]}
								</span><br />
								<span>
									NoOfPay:{this.state.values[2]}
								</span><br />
								<span>
									interestRate:{this.state.values[3]}
								</span><br />
								<span>
									MonthlyPay:${this.state.values[4]}
								</span><br />
							</Card>
						</CardColumns>
					</Card>
				</Container>
			</React.Fragment>
		);
	}
}
export default Main;