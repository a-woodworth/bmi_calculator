const bmiForm = document.forms['calculator'];
const radioBtns = [...bmiForm.elements.measurement];

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

radioBtns.forEach(radio => {
  radio.addEventListener('change', (e) => {
    let unitValue = e.target.value;

    toggleMeasurment(unitValue);
  });
});
