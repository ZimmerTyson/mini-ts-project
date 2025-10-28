// someone fills in the form input fields for to use as template literals later on

const firstName = document.querySelector('#firstName') as HTMLInputElement;
const lastName = document.querySelector('#lastName') as HTMLInputElement;
const likesDogs = document.querySelector('#likesDogs') as HTMLInputElement;
const favoriteColor = document.querySelector('#favoriteColor') as HTMLSelectElement;
const contactMethodSelector = document.querySelector('#contactMethod') as HTMLSelectElement;
const submitBtn = document.querySelector('.submitButton') as HTMLButtonElement;
let supriseMessage = document.querySelector('#supriseMessage') as HTMLDivElement;

// we then need to grab the values entered into the input fields (the values need to grabbed at the time of the event when they click the button)
// the values were moved to the event listener so the current values are brought in at button click vs page load.



//when someone clicks the button, see if they checked the checkbox for liking dogs.

// in this interface we are essentially creating the contract we want other functions to use to keep the data we are working with organized.

type ContactMethods = 'email' | 'phone' | 'text';

interface ContactFormData {
  firstName: string,
  lastName?: string,
  likesDogs: boolean,
  favoriteColor: string,
  contactMethod: ContactMethods
}

// in this function, we are returning an object that follows the organizational interface above for the data we want to work with moving forward
function getFormData(): ContactFormData {
  return {
  firstName: firstName.value,
  lastName: lastName.value,
  likesDogs: likesDogs.checked,
  favoriteColor: favoriteColor.value,
  contactMethod: contactMethodSelector.value as ContactMethods,
  }
}


submitBtn.addEventListener('click',  (event: MouseEvent) => {
  event.preventDefault();

  // now instead of having the variables all added to just this function, they are moved outside into a function that returns the structured data
  // in a way that was formatted in the interface above.
  const formData = getFormData();
  const validForm = isFormValid(formData);

  if(!validForm) {
    return alert('please enter your name!');
  }

  if(formData.likesDogs) {
    displayMessage(likesDogsMessage(formData));

  } else {
    displayMessage(hatesDogsMessage(formData));
  }
});


//create message functions that can be re-used elsewhere and edited in this one location
function likesDogsMessage(data: ContactFormData):string {
  return `
     <h2 class="surpriseHeading green">${data.firstName} likes dogs!</h2>
      <p id="surpriseParagraph">It seems that you love ${data.favoriteColor} dogs.. that is very interesting!</p>
  `;
}

function hatesDogsMessage(data: ContactFormData): string  {
  return `
      <h2 class="surpriseHeading red"> Sorry to hear you hate dogs!</h2>
      <p>I hope you rethink your decision! :-( </p>
    `;
}


//function to validate if the name fields have been filled in
function isFormValid(data: ContactFormData): boolean {
  return data.firstName.length > 0;
}


//functions to inject message into the page

function displayMessage(message: string): void {
  supriseMessage.innerHTML = message
}


// fucntion to display input field based on selected value in dropdown 

contactMethodSelector.addEventListener('change', (): void => {
  let contactInput = document.createElement('input');

  if (contactMethodSelector.value === 'email') {
    contactInput.type = 'email';
    
    

  } else if (contactMethodSelector.value === 'phone') {
    contactInput.type = 'tel';

  } else {
    contactInput.type = 'tel';

  }
}

);

// if they did check the box, lets display a message saying they are awesome with their name and something fun about dogs



// if they do not check the box, let's dispaly a messge saying sorry to hear they don't like dogs