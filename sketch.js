let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  // 初始化攝影機擷取
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的攝影機畫面

  // 建立與攝影機畫面大小相同的 graphics
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  background(220);

  // 計算 graphics 的置中位置
  let graphicsX = (width - graphics.width) / 2;
  let graphicsY = (height - graphics.height) / 2;

  // 繪製 graphics，置中顯示
  drawGraphics();
  image(graphics, graphicsX, graphicsY); // 將 graphics 繪製在畫布中央
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布和攝影機大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);

  // 重新調整 graphics 大小
  graphics = createGraphics(capture.width, capture.height);
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
