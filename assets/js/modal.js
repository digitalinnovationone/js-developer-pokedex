let name;
let number;
let type;
let clas;
let img;

var liElements = document.querySelectorAll('#pokemonList li');

function loadListener(){



let intr = setInterval(function () {
    
    if (liElements.length) {
        clearInterval(intr);
        liElements = document.querySelectorAll('#pokemonList li');
        // console.log('list', liElements)
        liElements.forEach(function (li) {
            li.addEventListener('click', function () {
                // Grab the content of the div and the href attribute of the a element

                name = this.querySelector('.name').textContent;
                number = this.querySelector('.number').textContent;
                clas = this.className;
                type = this.querySelector('.types').innerHTML;
                img = this.querySelector('img').getAttribute('src');
                //remove common class
                var wordToRemove = "pokemon ";

                clas = removeWordFromString(clas, wordToRemove);

                let parser = new DOMParser();
                let doc = parser.parseFromString(type, 'text/html');

                // Extract the list items from the parsed document
                let listItems = Array.from(doc.body.querySelectorAll('li')).map(item => item.textContent.trim());

                

                // Log the content and href to the console (you can do any further processing with these variables)
                let modal = document.querySelector('#customModal');
                modal.querySelector('.detail').innerText = number;
                modal.querySelector('.name').innerText = name;
                modal.querySelector('.modal-header').className = 'modal-header';
                modal.querySelector('.modal-header').classList.add(clas)
                modal.querySelector('.types').innerHTML = type;
                modal.querySelector('img').setAttribute('src', img);

                //update modal details
                let details = document.querySelector('#customModal .modal-content');
                details.querySelector('.number').innerText = number;
                details.querySelector('.name').innerText = name;
                details.querySelector('.typ').innerHTML = type;
                details.querySelector('.length').innerHTML = listItems.length;
                openModal()
            });
        });
    } else {
        liElements = document.querySelectorAll('#pokemonList li');
    }
}, 1000)

}



// Add an event listener to each li element



function openModal() {
    document.getElementById('customModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

}

function closeModal() {
    document.getElementById('customModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


function removeWordFromString(inputString, wordToRemove) {
    // Create a regular expression to match the word with word boundaries
    var regex = new RegExp('\\b' + wordToRemove + '\\b', 'g');

    // Use the replace method to remove the word from the string
    var resultString = inputString.replace(regex, '');

    return resultString;
}

loadListener();