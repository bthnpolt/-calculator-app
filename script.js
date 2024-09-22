const displayİnput = document.querySelector(".calculator-input");

const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firtValue = null;
let operator = null;
let waitingForSecondValue = false; 

class UI{
    static displayUpdate(){
        displayİnput.value = displayValue;
    }
    static keysClick(){
        keys.addEventListener("click",(e)=>{
            let element = e.target;

            if (!element.matches("button")) return;
            
            if (element.classList.contains("operator")) {
                this.handleOperator(element.value);
                this.displayUpdate();
                return;
            }


            if (element.classList.contains("decimal")) {
                this.decimalInput();
                this.displayUpdate();
                return;
            }

            if (element.classList.contains("clear")) {
                this.clear();
                this.displayUpdate();
                return;
            }

            this.changeInput(element.value);
            this.displayUpdate();
            
        });
    }
    static changeInput(num){
        if (waitingForSecondValue) {
            displayValue = num;
            waitingForSecondValue = false;
            
        }else{
            displayValue = displayValue === '0'? num : displayValue + num;
        }
        console.log(displayValue, firtValue, operator, waitingForSecondValue);
        
        
    }
    static decimalInput(){
        if (!displayValue.includes(".")) {
            displayValue += '.';
        }
    }
    static clear(){
        displayValue = '0';
    }
    static handleOperator(nextOperator){
        let value =  parseFloat(displayValue);

        if (operator && waitingForSecondValue) {
            operator = nextOperator;
            return;
        }

        if (firtValue === null) {
            firtValue = value;
          
        } else if(operator){
            const result = Calculate.calculator(firtValue,value,operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firtValue = displayValue;
        }
        waitingForSecondValue = true;
        operator = nextOperator;
        console.log(displayValue, firtValue, operator, waitingForSecondValue);
    }
    
}
class Calculate{
    static calculator(firtValue,second,operator){
        if (operator === '+') {
            return firtValue + second;
        } else if(operator === '-'){
            return  firtValue - second;
        } else if(operator === '*'){
            return  firtValue * second;
        } else if(operator === '/'){
            return firtValue / second;
        }
        return second ;
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    UI.displayUpdate();
    UI.keysClick();
});