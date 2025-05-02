let capture;
let graphics;

function setup() {
  createCanvas(400, 400);
  let capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}

function draw() {
  background(220);
  image(capture, 0, 0);
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
