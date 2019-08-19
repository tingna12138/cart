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
    id :arr.length+1,
    pID:item.pID,
    counts:$('.choose-amount input').val()
  }
  //将对象追加到内存中
  arr.push(obj);
  utils.setStorage('selectGoods',arr);

  //页面跳转
  location.assign('./cart.html');
})