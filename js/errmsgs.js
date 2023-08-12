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

  if ( input.id === 'imperialHeightInch' ) {
    const imperialHeightFeetInput = document.getElementById('imperialHeightFeet');
    // Check to make sure both values aren't zero
    if ( Number(input.value) === 0 && Number(imperialHeightFeetInput.value) === 0 ) {
      input.setCustomValidity(`${errorMessages.zeroValueError}`); 
    } else {
      input.setCustomValidity('');
    }
  }

  if ( input.id === 'imperialWeightPound' ) {
    const imperialWeightStoneInput = document.getElementById('imperialWeightStone');
    // Check to make sure both values aren't zero
    if ( Number(input.value) === 0 && Number(imperialWeightStoneInput.value) === 0 ) {
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
