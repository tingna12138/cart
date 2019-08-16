//1.从地址栏获取唯一标识，然后在从内存中找到相应的数据，来渲染页面
//1.1从地址兰获取数据
var obj = utils.getSearch();
//1.2循环遍历内存，找想要的数据
var zindex;
utils.getStorage("Goods").some(function (item, index) {
  if (item.pID == obj.pID) {
    zindex = index;
    return true;
  }
})
var select = utils.getStorage("Goods")[zindex];
//1.3渲染页面
//1.3.1放大镜图片模块
$('.preview-wrap .preview-img img').attr('src', select.imgSrc);
//1.3.2头部的标题 
$('.itemInfo-wrap .sku-name').text(select.name);
//1.3.3价格部分
$('.summary-price .dd em').text('￥' + select.price)

//2.产品型号选择部分增加动态效果
$('.choose-item .dd a').on('click', function () {
  $(this).addClass('current').siblings().removeClass('current');
})

//3.加减商品数量部分
//3.1点击加号，文本框中的数值加1
$('.choose-amount .add').on('click', function () {
  $(this).prev().val($(this).prev().val() - 0 + 1);
  $(this).next().removeClass('disabled');
})
//3.2点击减号，文本框中的数值减1
$('.choose-amount .reduce').on('click', function () {
  //3.2.1当点击减号后，文本框中的数值为1时的情况：不能点，且鼠标样式为禁用状态
  //3.2.2当没有进行任何操作，，文本框中的数值为1时的情况----这种情况只能在打开页面时有
  if ($(this).siblings('input').val() > 1) {
    $(this).siblings('input').val($(this).siblings('input').val() - 1);
  }
  if ($(this).siblings('input').val() <= 1) {
    $(this).siblings('input').val('1');
    $(this).addClass('disabled');
  }
})
//3.3在文本框手动输入数值
$('.choose-amount .choose-number').on('blur', function () {
  if ($(this).val() <= 1) {
    $(this).val('1');
  } else {
    $(this).siblings('.reduce').removeClass('disabled');
  }
})


//4.点击购物车触发跳转事件
//4.1点击购物车，将页面的一些商品参数储存到内存中*********可修改
$('.choose-btns .addshopcar').on('click', function () {
  //4.1.1将商品参数封装到数组中
  //找到或者在内存中创建一块储存区域
  var selectGoods = utils.getStorage('selectGoods') || [];
  var itemObj = {
    id: selectGoods.length + 1,
    pID: obj.pID,
    counts:$('.choose-amount .choose-number').val()
  }
  selectGoods.push(itemObj);
  utils.setStorage('selectGoods', selectGoods);
  //4.2跳转页面
  location.assign('./cart.html');
})






// 总结：1.javascript:;与javascript:void(0);的区别
//2.数量加减部分的禁用样式仅仅只是改变了鼠标的样式而已，并不能真正禁用a标签
//3在js里面写链接时，无论它嵌入在那个文件夹，基础参照点都是以引入该js文件的html文件为准。这与css不同，css是以当前css文件所在路径为准