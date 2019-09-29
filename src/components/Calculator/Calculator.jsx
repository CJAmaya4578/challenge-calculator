import React, { Component } from 'react';
import './Calculator.css';
import CalculatorHelper from '../../helpers/Calculator.helper';
import Button from '../Button/Button';

class Calculator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            equation: "",
            inputValue: ""
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onCalcButtonClick = this.onCalcButtonClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange({ currentTarget }) {
        this.setState({            
            inputValue: currentTarget.value
        });
    }

    onCalcButtonClick({ currentTarget }) {
        const {inputValue} = this.state;
        this.setState({
            inputValue: inputValue + currentTarget.value
        });        
    }

    onSubmit(event) {
        try {
            event.preventDefault();
            const { inputValue } = this.state;
            const delimiters = ["\\\\n", ","];
            const valuesEntered = CalculatorHelper.parse(inputValue, delimiters.join("|"));
            let sum = 0; 
            let equation = "";
            let negativeNumbersFound = [];
            valuesEntered.forEach((value, index) => {
                value = CalculatorHelper.isValidNumber(value);
                const negativeFound =  CalculatorHelper.getNegativeNumbers(value, negativeNumbersFound, 
                    index, valuesEntered);
                if (!negativeFound) {
                    sum += value;
                    equation = CalculatorHelper.getEquation(value, equation, valuesEntered, index);
                } 
            });
            this.setState({            
                sum: sum,
                equation: `${equation} = ${sum}`
            });
        } catch(e) {
            alert(e.message);
        }
    }

    render() {
        const {
            sum,
            equation,
            inputValue
        } = this.state;
        return (
            <div id="calculator">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input type="text" value={inputValue} onChange={this.onInputChange} />                                            
                    <div className="row">
                        <Button value="7" onClick={this.onCalcButtonClick} />
                        <Button value="8" onClick={this.onCalcButtonClick} />
                        <Button value="9" onClick={this.onCalcButtonClick} />
                    </div> 
                    <div className="row">
                        <Button value="4" onClick={this.onCalcButtonClick} />
                        <Button value="5" onClick={this.onCalcButtonClick} />
                        <Button value="6" onClick={this.onCalcButtonClick} />
                    </div> 
                    <div className="row">
                        <Button value="1" onClick={this.onCalcButtonClick} />
                        <Button value="2" onClick={this.onCalcButtonClick} />
                        <Button value="3" onClick={this.onCalcButtonClick} />
                    </div>                                                                                                      
                    <div className="row">
                        <Button value="0" onClick={this.onCalcButtonClick} />
                        <Button value="," text="+" onClick={this.onCalcButtonClick} />
                        <Button value="=" type="submit" />                
                    </div>                                     
                </form>                 
                <p id="sum">{sum}</p>
                <p id="equation">{equation}</p>
            </div>
        );
    }
}    

export default Calculator;
