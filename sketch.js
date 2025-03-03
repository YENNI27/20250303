let slider;
let bounceButton;
let bouncing = false;
let bounceOffsetX = 0;
let bounceOffsetY = 0;
let dropdown;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.value('💋');
  input.attribute('placeholder', 'Type here...');
  input.elt.focus(); // 確保輸入框獲得焦點

  // 檢查輸入框的屬性
  console.log('Input disabled:', input.elt.disabled);
  console.log('Input readOnly:', input.elt.readOnly);

  // 添加用戶交互事件來啟動 AudioContext
  let button = createButton('Start Audio');
  button.position(10, 40);
  button.style('font-size', '16px'); // 縮小字體大小
  button.style('padding', '5px 10px'); // 縮小內邊距
  button.mousePressed(() => {
    userStartAudio();
    button.remove(); // 啟動後移除按鈕
  });

  // 創建滑桿
  slider = createSlider(28, 50, 32);
  slider.position(10, 80);

  // 創建跳動按鈕
  bounceButton = createButton('跳動文字');
  bounceButton.position(10, 120);
  bounceButton.style('font-size', '16px'); // 縮小字體大小
  bounceButton.style('padding', '5px 10px'); // 縮小內邊距
  bounceButton.mousePressed(() => {
    bouncing = !bouncing;
  });

  // 創建下拉式選單
  dropdown = createSelect();
  dropdown.position(10, 160);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('第三周作品');
  dropdown.option('第三周講義');
  dropdown.style('font-size', '16px'); // 縮小字體大小
  dropdown.style('padding', '5px 10px'); // 縮小內邊距
  dropdown.changed(() => {
    const selectedValue = dropdown.value();
    if (selectedValue === '淡江大學') {
      window.open('https://www.tku.edu.tw/', '_blank');
    } else if (selectedValue === '教育科技學系') {
      window.open('https://www.et.tku.edu.tw/', '_blank');
    } else if (selectedValue === '第三周作品') {
      window.open('http://127.0.0.1:5500/index.html', '_blank');
    } else if (selectedValue === '第三周講義') {
      window.open('https://hackmd.io/@Q0Ml4RVpSFC-KaLHx8H5Pw/H10q7tMi1g', '_blank');
    }
  });
}

function draw() {
  background(220);
  let textValue = input.value();
  let textSizeValue = slider.value();
  let spacing = 10; // 設置文字之間的間隔
  textSize(textSizeValue);
  textAlign(LEFT, TOP);

  if (bouncing) {
    bounceOffsetX = sin(frameCount * 0.1) * 10; // 設置跳動的偏移量
    bounceOffsetY = cos(frameCount * 0.1) * 10; // 設置跳動的偏移量
  } else {
    bounceOffsetX = 0;
    bounceOffsetY = 0;
  }

  let y = 0;
  while (y < height) {
    let x = 0;
    while (x < width) {
      text(textValue, x + bounceOffsetX, y + bounceOffsetY);
      x += textWidth(textValue) + spacing; // 添加間隔
    }
    y += textSizeValue + spacing; // 添加間隔
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}