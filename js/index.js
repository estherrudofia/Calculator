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
        display.value = eval(inputValue).toLocaleString();
        label.value = '';
        if (display.value == 'undefined') {
            display.value = '';
        }
    }

    else{
        
        // To prevent operator at the start od display
        if(display.value.length  == 0 && /^[+/*]/.test(btnValue)) return;
        
        const lengths = display.value.length;
        // To stop multiple operators from concatinating
        if(/[+/*-]/.test(display.value[lengths - 1]) && /[+/*-]/.test(btnValue)) {

            display.value = display.value.slice(0, lengths-1) + btnValue;

            if(display.value.length < 2 && /^[+/*]/.test(btnValue)) {
                display.value = '-';
                return;
            };
           
            return;
            
        }

        if ('selectionStart' in display) {
            // check whether some text is selected in display
            if (display.selectionStart != display.selectionEnd) {
                let newText = display.value.substring(0, display.SelectionStart) + 
                "[start]" + display.value.substring(display.selectionStart, display.selectionEnd) + "[end]" + 
                display.value.substring(display.selectionEnd);
                display.value = newText;
            }
        }else {
            let textRange = document.selection.createRange();
            let rangeParent = textRange.parentElement();
            if (rangeParent === display) {
                textRange.text = "[start]" + textRange + "[end]";
            }

        }

        display.value += btnValue;
        label.value = eval(display.value).toLocaleString();
        
            
    }
};


Array.from(buttons).forEach(buttn => {
    buttn.addEventListener('click', operations);
});

