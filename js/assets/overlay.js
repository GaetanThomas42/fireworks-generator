function createOverlay() {
  div = createDiv();
  div.id("overlay");
  div.size(width / 5, height - height / 2.5);
  div.position(-div.width * 0.9, height / 3);
  div.mouseOver(function() {
    div.position(0, height / 3);
  });
  div.mouseOut(function() {
    div.position(-div.width * 0.9, height / 3);

  });

  createForm();
  createBtns();

  
  function createForm(){
    const inpId = ['Cadence', 'Particles', 'RadiusPMax', 'NumberFireworks'];
    const inpLabel = ['Cadence (ms)', 'Particules', 'Radius max', 'Fireworks'];
    const inputValue = [25, 100, 6, 50];

    for (var i = 0.; i < inpId.length; i++) {
    createElement('br', '').parent(div);
    label = createElement('label', inpLabel[i]);
    label.parent(div);

    inp = createInput(inputValue[i],"number");
    
    inp.size(div.width / 4);
    inp.id(inpId[i]);
    inp.parent(div);
    createElement('br', '').parent(div);
  }
  createElement('br', '').parent(div);

  label = createElement('label', 'Add Color');
  label.parent(div);
  inp = createColorPicker("red");
  inp.id('Color');
  inp.parent(div);

  createElement('br', '').parent(div);
  createElement('br', '').parent(div);
  }
  function createBtns() {

    run = createButton("Run");
    run.parent(div);
    run.mouseClicked(function() {
      if (!start) {
        start = !start;
      }
    });
    
    reset = createButton("Reset");
    reset.parent(div);
    reset.mouseClicked(function() {
      if (start) {
        start = !start;
      }
    });

    createElement('br', '').parent(div);
    createElement('br', '').parent(div);
    randomButton = createButton("Random color");
    randomButton.parent(div);
    randomButton.mouseClicked(function() {
      if (randomColor) {
        randomColor = !randomColor;
        this.style('border', '0');
      } else {
        randomColor = !randomColor
        this.style('border', '1px solid #666');
      }
    });
  }
}

function testInput(input, defaultVal) {

  let val = input.value();
  if (!isNaN(val) && val != '') {
    input.style("background-color", "white");
    return parseInt(val);
  } else {
    input.style("background-color", "rgba(200,0,0,0.5)");
    return defaultVal;
  }
}