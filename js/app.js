const bmiForm = document.forms['calculator'];
const radioBtns = bmiForm.elements.measurement;
const metricInputs = [
  metricHeight, 
  metricWeight
  ];
const imperialInputs = [
  imperialHeightFeet, 
  imperialHeightInch, 
  imperialWeightStone, 
  imperialWeightPound
  ];
const bmi = bmiForm.elements.bmi;
const bmiWeightClass = document.querySelector('[data-js="classification"]');
const bmiWeightRange = document.querySelector('[data-js="range"]');
const bmiValueBlock = document.querySelector('[data-js="bmi-value"]');
const bmiCaptionBlock = document.querySelector('[data-js="bmi-caption"]'); 
const ariaForBMI = document.querySelector('[data-js="aria-bmi-output"]');
const instructions = document.querySelector('[data-js="instructions"]');
const lowBMI = 18.5;
const highBMI = 24.9;
let height = 0;
let weight = 0;

function toggleMeasurment(value) {
  const imperialBlocks = document.querySelectorAll('.imperial-units');
  const metricBlocks = document.querySelectorAll('.metric-group, .metric-units');

  if ( value === 'imperial' ) {
    // Hide metric units
    metricBlocks.forEach(block => block.classList.add('hidden'));
    //Show both divs with imperial units
    imperialBlocks.forEach(block => block.classList.remove('hidden'));
  } else {
    // Hide imperial units
    imperialBlocks.forEach(block => block.classList.add('hidden'));
    // Show metric units
    metricBlocks.forEach(block => block.classList.remove('hidden'));
  }
}

// CDC - How is BMI calculated: 
// https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html#Interpreted
function calculateMetricBMI(height, weight) {
  // Calculate metric bmi value
  const metricScore = ( weight / Math.pow( (height / 100), 2) ).toFixed(1);

  // Calculate metric weight range values
  const metricLow = ( [lowBMI * Math.pow(height, 2)] / 10000 ).toFixed(1);
  const metricHigh = ( [highBMI * Math.pow(height, 2)] / 10000 ).toFixed(1);

  // Create text for metric range
  const metricRange = `${metricLow}kgs - ${metricHigh}kgs`;

  return [ metricScore, metricRange ];
}

function calculateImperialBMI(height, weight) {
  const imperialScore = ( (weight / Math.pow(height, 2)) * 703 ).toFixed(1);

  // Calculate imperial weight range values; 1 stone = 14 pounds
  const imperialLow = (( [lowBMI * Math.pow(height, 2)] / 703) / 14).toFixed(2);
  const imperialHigh = (( [highBMI * Math.pow(height, 2)] / 703) / 14).toFixed(2);

  // Format stone values for text string
  const stones = (stonesTotal) => {
    // Display whole number stone values
    return stonesTotal.split('.')[0];
  };
  // Convert remainder stone values to pounds
  const stonesToPounds = (stonesTotal) => {
    return Math.floor((stonesTotal.split('.')[1] * 14) / 100);
  };

  // Create text for imperial range
  const imperialRange = 
    `${stones(imperialLow)}st ${stonesToPounds(imperialLow)}lbs - ${stones(imperialHigh)}st ${stonesToPounds(imperialHigh)}lbs`;

  return [ imperialScore, imperialRange ];
}

function displayWeightClassification(bmiValue) {
  if ( bmiValue > 0 && bmiValue < 18.5 ) {
    return 'underweight';
  } else if ( bmiValue >= 18.5 && bmiValue <= 24.9 ) {
    return 'a healthy weight';
  } else if ( bmiValue >= 25 && bmiValue <= 29.9 ) {
    return 'overweight';
  } else {
    return 'obese';
  }
}

function showCalculatorResults(bmiOutputs) {
  // Display bmi score
  bmi.value = `${bmiOutputs[0]}`;

  // Display weight range and weight classification
  bmiWeightClass.innerText = `${displayWeightClassification(bmiOutputs[0])}`;
  bmiWeightRange.innerText = `${bmiOutputs[1]}`;

  // Hide welcome instructions and show bmi results  
  instructions.classList.add('hidden');
  bmiValueBlock.classList.remove('hidden');
  bmiCaptionBlock.classList.remove('hidden');
}

function updateAriaForBMI() {
  let message = 
    `Your BMI is ${bmi.value}. Your BMI suggests you're ${bmiWeightClass.innerText}. Your ideal weight is between ${bmiWeightRange.innerText}.`;

  return ariaForBMI.innerText = `${message}`;
}

function hideCalculatorResults() {
  // Remove message from aria
  ariaForBMI.innerText = '';

  // Hide bmi results and show instructions
  instructions.classList.remove('hidden');
  bmiValueBlock.classList.add('hidden');
  bmiCaptionBlock.classList.add('hidden');
}

function validateImperialInputs() {
  imperialInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      validateInput(e);
    });
  });
  // Catch total height or weight error if pattern matches but both values = 0
  validateImperialHeightTotal();
  validateImperialWeightTotal();
}

function handleFormInput(e) {
  const measurement = document.querySelector('input[name="measurement"]:checked').value;
  const metric = document.getElementById('metric').checked === true;
  const validMetricHeight = metricInputs[0].checkValidity();
  const validMetricWeight = metricInputs[1].checkValidity();
  const validImperialHeightFeet = imperialInputs[0].checkValidity();
  const validImperialHeightInch = imperialInputs[1].checkValidity();
  const validImperialWeightStone = imperialInputs[2].checkValidity();
  const validImperialWeightPound = imperialInputs[3].checkValidity();

  if ( measurement === 'metric' ) {
    metricInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        validateInput(e);
      });
    });
  } else {
    validateImperialInputs();
  }

  // If valid, return metric bmi values
  if ( metric && validMetricHeight && validMetricWeight ) {
    height = Number(metricInputs[0].value);
    weight = Number(metricInputs[1].value);

    // Calculate BMI and display results
    let bmiOutputs = calculateMetricBMI(height, weight);
    showCalculatorResults(bmiOutputs);
    // Add slight delay for assistive technologies
    setTimeout(updateAriaForBMI, 2000);
  } else {
    hideCalculatorResults();
  }

  // If valid, return imperial bmi values
  if ( !metric && validImperialHeightFeet && validImperialHeightInch && 
    validImperialWeightStone && validImperialWeightPound ) {
    // Adjust input values to get total height and weight
    let heightInFeet = Number(imperialInputs[0].value) * 12;
    let heightInInches = Number(imperialInputs[1].value);
    let weightInStones = Number(imperialInputs[2].value) * 14;
    let weightInPounds = Number(imperialInputs[3].value);

    // Display nothing without all imperial values
    if ( (heightInFeet + heightInInches) > 0 && (weightInStones + weightInPounds) > 0 ) {
      height = heightInFeet + heightInInches;
      weight = weightInStones + weightInPounds;

      // Calculate BMI and display results
      let bmiOutputs = calculateImperialBMI(height, weight);
      showCalculatorResults(bmiOutputs);
      // Add slight delay for assistive technologies
      setTimeout(updateAriaForBMI, 2000);
    } else {
      hideCalculatorResults();
    }
  }
}

radioBtns.forEach(radio => {
  radio.addEventListener('change', (e) => {
    let unitValue = e.target.value;

    toggleMeasurment(unitValue);
  });
});

bmiForm.addEventListener('click', handleFormInput);
bmiForm.addEventListener('keyup', handleFormInput);
