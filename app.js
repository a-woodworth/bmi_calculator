const bmiForm = document.forms['calculator'];
const radioBtns = bmiForm.elements.measurement;
const metricHeight = bmiForm.elements.metricHeight;
const metricWeight = bmiForm.elements.metricWeight;
const imperialFeet = bmiForm.elements.imperialHeightFt;
const imperialInches = bmiForm.elements.imperialHeightInch;
const imperialStones = bmiForm.elements.imperialWeightStone;
const imperialPounds = bmiForm.elements.imperialWeightPound;
const bmi = bmiForm.elements.bmi;
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
  } else if (value === 'metric') {
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

  return [metricScore, metricRange];
}

function calculateImperialBMI(height, weight) {
  return ( (weight / Math.pow(height, 2)) * 703 ).toFixed(1);
}

radioBtns.forEach(radio => {
  radio.addEventListener('change', (e) => {
    let unitValue = e.target.value;

    toggleMeasurment(unitValue);
  });
});

// Note: 1 stone = 14 pounds

// Note: Need to add to text output
// aria-live="polite" aria-atomic="true" 
