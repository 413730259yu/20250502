let capture;
let graphics;

function setup() {
  // 設定全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  background('#e7c6ff');

  // 初始化攝影機擷取
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的攝影機畫面

  // 建立與視訊畫面大小相同的圖形
  graphics = createGraphics(capture.width, capture.height);
  drawGraphics();
}

function draw() {
  background('#e7c6ff'); // 確保背景顏色一致

  // 計算影像顯示位置，讓影像置中
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 翻轉畫布以水平翻轉影像
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height);
  pop();

  // 在視訊畫面上方顯示圖形
  image(graphics, x, y - graphics.height - 10); // 調整位置讓圖形顯示在視訊畫面上方
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);

  // 重新調整圖形大小並重繪
  graphics = createGraphics(capture.width, capture.height);
  drawGraphics();
}

function drawGraphics() {
  // 設定 graphics 背景為黑色
  graphics.background(0);

  // 每隔 20 單位繪製圓
  for (let y = 0; y < graphics.height; y += 20) {
    for (let x = 0; x < graphics.width; x += 20) {
      // 從 capture 擷取相對應位置的顏色
      let col = capture.get(x, y);

      // 繪製圓，大小為 15，顏色為擷取的顏色
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(x + 10, y + 10, 15, 15); // 圓心偏移 10 以置中
    }
  }
}
