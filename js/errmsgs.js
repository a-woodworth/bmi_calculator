// Custom error messages and functions
const errorMessages = {
  badInputError: `Enter a number`,
  zeroValueError: `Can't be zero`,
};

function getErrorMessage(input) {
  const validity = input.validity;

  if ( validity.valueMissing || validity.patternMismatch ) {
    return `${errorMessages.badInputError}`;
  }

  if ( input.id === 'metricHeight' || input.id === 'metricWeight' ) {
    if ( Number(input.value) === 0 ) {
      input.setCustomValidity(`${errorMessages.zeroValueError}`);
    } else {
      input.setCustomValidity('');
    }
  }
}

function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();
  const message = getErrorMessage(input);
  const errorID = `${input.id}-error`;
  const messageBlock = document.getElementById(errorID);
  const validInput = input.checkValidity();

  if ( !validInput ) {
    // Set aria attribute on input field
    input.setAttribute('aria-invalid', true);
    input.setAttribute('aria-live', 'polite');

    // Add custom error message or use default message
    messageBlock.classList.add('error', 'visible');
    messageBlock.classList.remove('not-visible');
    messageBlock.innerText = message || input.validationMessage;
  } else {
    // Remove aria attribute on input field
    input.setAttribute('aria-invalid', false);
    input.removeAttribute('aria-live', 'polite');

    // Remove custom error message
    messageBlock.classList.remove('error', 'visible');
    messageBlock.classList.add('not-visible');
    messageBlock.innerText = '';
  }
}

function validateImperialHeightTotal() {
  const totalHeightError = document.querySelector('[data-js="total-height-error"]');
  const inputFeet = bmiForm.elements.imperialHeightFeet;
  const inputInch = bmiForm.elements.imperialHeightInch;

  if (inputFeet.value === '0' && inputInch.value === '0') {
    totalHeightError.classList.remove('not-visible');
    totalHeightError.classList.add('visible', 'error');
    totalHeightError.setAttribute('aria-live', 'assertive');
  } else {
    totalHeightError.classList.remove('visible', 'error');
    totalHeightError.classList.add('not-visible');
    totalHeightError.removeAttribute('aria-live', 'assertive');
  }
}

function validateImperialWeightTotal() {
  const totalWeightError = document.querySelector('[data-js="total-weight-error"]');
  const inputStone = bmiForm.elements.imperialWeightStone;
  const inputPound = bmiForm.elements.imperialWeightPound;

  if (inputStone.value === '0' && inputPound.value === '0') {
    totalWeightError.classList.remove('not-visible');
    totalWeightError.classList.add('visible', 'error');
    totalWeightError.setAttribute('aria-live', 'assertive');
  } else {
    totalWeightError.classList.remove('visible', 'error');
    totalWeightError.classList.add('not-visible');
    totalWeightError.removeAttribute('aria-live', 'assertive');
  }
}
