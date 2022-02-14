let buttons = document.querySelectorAll('.btn');
let display = document.getElementById('display');
let label = document.getElementById('label');
let operators = document.getElementsByClassName('operators');




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
        display.value = eval(inputValue);
        label.value = '';
        if (display.value == 'undefined') {
            display.value = '';
        }
    }
    // else if (display.value.length == 1) {
    //     operators.value = '';
    // }
    else{
        display.value += btnValue;
        label.value = eval(display.value);
        console.log(label.value);
    }
};


Array.from(buttons).forEach(buttn => {
    buttn.addEventListener('click', operations);
});

