//1.拿到内存中的数据渲染页面
//获取搜索栏的参数，匹配内存中的数据
var item = utils.getSpelStorage('Goods', location.search.slice(1).split('=')[1]);
//渲染页面
$('.preview-wrap .preview-img img').attr('src', item.imgSrc);
$('.preview-wrap .preview-big-img img').attr('src', item.imgSrc);
$('.itemInfo-wrap .sku-name').text(item.name);
$('.summary-price .dd em').text('￥' + item.price);

//2.款式选择部分实现
$('.choose-item .choose-color,.choose-item .choose-style').on('click', function () {
  $(this).addClass('current').siblings().removeClass('current');
})

//3.点击加减号部分,同时还可实现了手动在文本框中添加数据的功能
utils.changeNum();

//4.点击加入购物车，实现页面跳转
$('.choose-btns .addshopcar').on('click', function () {
  var arr = utils.getStorage('selectGoods') || []
  //将商品数据封装成对象
  var obj = {
    id: arr.length + 1,
    pID: item.pID,
    counts: $('.choose-amount input').val()
  }
  //将对象追加到内存中
  arr.push(obj);
  utils.setStorage('selectGoods', arr);

  //页面跳转
  location.assign('./cart.html');
})

//功能补充
//5.添加放大镜效果
$('.preview-img').hover(function () {
  //5.1鼠标移入时显示盒子
  $('.preview-big-img,.preview-img .mask').removeClass('hidden');
}, function () {
  //5.2鼠标移出时隐藏盒子
  $('.preview-big-img,.preview-img .mask').addClass('hidden');
})
//5.3当鼠标在盒子里移动时，大盒子里的图片跟随移动
//5.3.1遮罩盒子的坐标跟随鼠标改变
$('.preview-img').on('mousemove', function (event) {
  // console.dir(event)
  var left, top;

  //鼠标相对于preview-img盒子的坐标,再减去盒子宽高的一半
  left = event.pageX - $(this).offset().left - $('.preview-img .mask').width() / 2;
  top = event.pageY - $(this).offset().top - $('.preview-img .mask').height() / 2;

  //设置遮罩盒子的水平定位
  if (left < 0) {
    $('.preview-img .mask').css('left', 0)
  } else if (left > ($(this).width() - $('.preview-img .mask').width())) {
    $('.preview-img .mask').css('left', ($(this).width() - $('.preview-img .mask').width()))
  } else {
    $('.preview-img .mask').css('left', left)
  }
  //设置遮罩盒子的竖直定位
  if (top < 0) {
    $('.preview-img .mask').css('top', 0)
  } else if (top > ($(this).height() - $('.preview-img .mask').height())) {
    $('.preview-img .mask').css('top', ($(this).height() - $('.preview-img .mask').height()))
  } else {
    $('.preview-img .mask').css('top', top)
  }
  //大盒子图片位置与遮罩盒子对应
  $('.preview-big-img img').css({
    left:-parseFloat($('.preview-img .mask').css('left'))*300/100,
    top:-parseFloat($('.preview-img .mask').css('top'))*300/100,
  })
})