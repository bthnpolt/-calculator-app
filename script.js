const displayİnput = document.querySelector(".calculator-input");

const keys = document.querySelector(".calculator-keys");

let displayValue = "0";


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

            if (element.classList.contains("equals-sign")) {
                console.log(element.value);
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
        displayValue = displayValue === '0'? num : displayValue + num;
    }
    static decimalInput(){
        if (!displayValue.includes(".")) {
            displayValue += '.';
        }
    }
    static clear(){
        displayValue = '0';
    }
    
}

document.addEventListener("DOMContentLoaded",()=>{
    UI.displayUpdate();
    UI.keysClick();
});