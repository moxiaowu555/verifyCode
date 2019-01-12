$(function() {
  // 定义个空数组
  var showNum = [];
  draw(showNum);
  // 刷新验证码
  $('#canvas').on('click', function() {
    draw(showNum);
  });

  // 验证提交的验证码
  $('.btn').on('click', function() {
    var val = $('.input-val').val().toLowerCase();
    var num = showNum.join('');
    console.log(num);
    if(val == '') {
      alert('请输入验证码');
    } else if(val == num) {
      alert('提交成功');
      $('.input-val').val('');
      draw(showNum);
    } else {
      alert('验证码错误！请重新输入~');
      $('.input-val').val('');
      draw(showNum);
    }
  })

});


function draw(showNum) {
  var canvasWidth = $('#canvas').width();
  var canvasHeight = $('#canvas').height();
  // 获取canvas的对象
  var canvas = document.getElementById('canvas');
 
  // canvas每当高度或宽度被重设时，画布内容就会被清空
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // 获取canvas画图对象
  var context = canvas.getContext("2d");
  var sCode = 'A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0';
  var aCode = sCode.split(',');
  // 获取数组长度
  var aLength = aCode.length;

  for(var i = 0; i <= 3; i++) {
    // 获取数组的随机索引
    var j = Math.floor(Math.random() * aLength);
    // 生成 0~30 随机弧度
    var deg = Math.random() * 30 * Math.Pi / 180;
    // 随机的一个数字或字母
    var txt = aCode[j];
    showNum[i] = txt.toLowerCase();  // 转换为小写
    var x = 10 + i * 20; // 文字在canvas上的x坐标
    var y = 20 + Math.random() * 8; // 文字在canvas上的y坐标
    context.font = "bold 23px 微软雅黑";

    context.translate(x, y);
    context.rotate(deg);

    context.fillStyle = randomColor();
    context.fillText(txt, 0, 0);

    context.rotate(-deg);
    context.translate(-x, -y);
  } 

  // 验证码上显示线条
  for(var i = 0; i <= 5; i++) {
    context.strokeStyle = randomColor();
    context.beginPath();
    context.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
    context.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
    context.stroke();
  }

  // 验证码上显示小点
  for(var i = 0; i <= 30; i++) {
    context.strokeStyle = randomColor();
    context.beginPath();
    var x = Math.random() * canvasWidth;
    var y = Math.random() * canvasHeight;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }
}

// 获取随机颜色
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}