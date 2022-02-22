let buttons = document.querySelectorAll('.btn');
let display = document.getElementById('display');
let label = document.getElementById('label');


const operations = (e) => {
    e.preventDefault();
    let btnValue = e.target.innerText; 
    let inputValue = display.value;
    console.log(btnValue);
    console.log(inputValue);


    
    
    if (btnValue == 'DEL') {
        display.value = inputValue.slice(0, inputValue.length-1);
        label.value = '';

        document.getElementById('del').addEventListener('dblclick', () => {
            display.value = '';
        });
    }
    else if(btnValue == '=') {
        
        display.value = evaluate();
        label.value = '';
        
        if (display.value == 'undefined') {
            display.value = '';
        }

        
    }

    else{
        
        

        // To prevent operator at the start of display
        if(display.value.length  == 0 && /^[+/*÷x]/.test(btnValue)) return;
        
        const lengths = display.value.length;
        // To stop multiple operators from concatinating
        if(/[+/*÷x-]/.test(display.value[lengths - 1]) && /[+/*÷x-]/.test(btnValue)) {

            display.value = display.value.slice(0, lengths-1) + btnValue;

            if(display.value.length < 2 && /^[+/*÷x]/.test(btnValue)) {
                display.value = '-';
                return;
            };
           
            return;
            
        }


        display.value += btnValue;
        label.value = evaluate();
        
            
    }
};


Array.from(buttons).forEach(buttn => {
    buttn.addEventListener('click', operations);
});

const evaluate = () => {
    let input = display.value;
    if (input.includes('x') || input.includes('÷')) {
        input = input.replace('x', '*');
        input = input.replace('÷', '/');
    }
    return eval(input).toLocaleString();
}