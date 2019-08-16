//1.从地址栏获取唯一标识，然后在从内存中找到相应的数据，来渲染页面
//1.1从地址兰获取数据
var obj=utils.getSearch();
//1.2循环遍历内存，找想要的数据
var zindex;
utils.getStorage("Goods").some(function(item,index){
  if(item.pID==obj.pID){
    zindex=index;
    return true;
  }
})
var select=utils.getStorage("Goods")[zindex];
//1.3渲染页面
//1.3.1放大镜图片模块
$('.preview-wrap .preview-img img').attr('src',select.imgSrc);
//1.3.2头部的标题 
$('.itemInfo-wrap .sku-name').text(select.name);
//1.3.3价格部分
$('.summary-price .dd em').text('￥'+select.price)

//2.产品型号选择部分增加动态效果
$('.choose-item .dd a').on('click',function(){
  $(this).addClass('current').siblings().removeClass('current');
})

//3.加减商品数量部分

//4.点击购物车触发跳转事件