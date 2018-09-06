// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hidden results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';
  // Show Calculate text
  document.getElementById('calculate').style.display = 'block';

  // Set time
  setTimeout(calculateResults, 2000);

  e.preventDefault(); // because form, can have a Action = " Redirect . php " exm.
});

// UI values

function calculateResults(){

const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');


const principal = parseFloat(amount.value);                       // VALUE OF AMMOUNT - Kolicina najma
const calculatedInterest = parseFloat(interest.value) / 100 / 12; // NUM OF INTEREST / NUM OF PERCENTE / MONTH  - kamata
const calculatedPayments = parseFloat(years.value) * 12;          // NUM OF YEARS * NUM OF MONTH - broj meseci 

// Compute monthly payment

const x = Math.pow(1 + calculatedInterest, calculatedPayments); // kamata + 1 ^ br meseci = ?
const monthly = (principal * x * calculatedInterest) / (x - 1);


if(isFinite(monthly)){
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  document.getElementById('calculate').style.display = 'none';


}else{
  showError('Please Check Your Number');
}

}

function showError(error){
  // Hidden results
  document.getElementById('results').style.display = 'none';
  // Hidden Calculate text
  document.getElementById('calculate').style.display = 'none';
  // Show loader
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');

  errorDiv.className = 'alert alert-danger';

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

 

  setTimeout(clearError, 2000);
}

function clearError(){
  document.querySelector('.alert').remove();
}