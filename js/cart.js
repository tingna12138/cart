//定义单项总价的计算
function compute() {
  $(this).parents('.item').find('.computed').text($(this).parents('.item').find('.price').text() * $(this).parents('.choose-amount').find('input').val());

  //7.将变化的商品数值保存到内存中
  var zindex;
  var arr = utils.getStorage('selectGoods');
  arr.some(function (item, index) {
    if (item.id == $(this).parents('.item').data('id')) {
      zindex = index;
      return true;
    }
  }.bind(this))
  arr[zindex].counts = $(this).parents('.choose-amount').find('input').val();
  utils.setStorage('selectGoods', arr);

  sum();
}

//6.定义计算选中商品的总数量和总价格的函数
function sum() {
  var counts = 0,
    sum = 0;
  $('.item .item-ck:checked').each(function (index, item) {
    counts = $(item).parents('.item').find('.choose-amount input').val() - 0 + counts;
    sum = $(item).parents('.item').find('.computed').text() - 0 + sum;
  })
  $('.total-of .selected').text(counts);
  $('.total-of .total-money').text(sum);
}




//1.进行判断，看内存中有没有数据
if (utils.getStorage('selectGoods').length>0) {
  //2.显示隐藏盒子
  $('.empty-tip').addClass('hidden');
  $('.cart-header').removeClass('hidden');
  $('.item-list').removeClass('hidden');
  $('.total-of').removeClass('hidden');

  //3.读取内存，渲染页面
  utils.getStorage('selectGoods').forEach(function (item, index) {
    var obj = utils.getSpelStorage('Goods', item.pID);
    $('.item-list').append(`<div class="item" data-id=${item.id}>
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck">
        </div>
        <div class="cell col-4">
          <img src=${obj.imgSrc} id="prod-img" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name" id="prod-name">${obj.name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${obj.price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count choose-amount">
          <a href="javascript:void(0);" class="reduce fl">-</a>
          <input autocomplete="off" type="text" class="choose-number number fl" value=${item.counts}>
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${item.counts*obj.price}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`)
  })
  //4.修改文本框商品数量
  utils.changeNum(compute);
  sum();

  //5.复选框关联
  //在点击复选框的同时，它的选中状态也会改变（默认行为）：顺序是先执行改变复选框的状态，再执行事件处理函数
  //5.1点击全选是
  $('.pick-all').on('click', function () {
    $('.item .item-ck').prop('checked', $('.pick-all').prop('checked'))
    sum();
  })
  //5.2点击单项商品复选框时，进行判断
  $('.item .item-ck').on('click', function () {
    if ($('.item .item-ck:checked').length == $('.item .item-ck').length) {
      $('.pick-all').prop('checked', true)
    } else {
      $('.pick-all').prop('checked', false)
    }
    sum();
  })

  //8.删除商品
  $('.item .item-del').on('click', function () {
    var zindex;
    var arr = utils.getStorage('selectGoods');
    arr.some(function (item, index) {
      if (item.id == $(this).parents('.item').data('id')) {
        zindex = index;
        return true;
      }
    }.bind(this))
    arr.splice(zindex, 1);
    utils.setStorage('selectGoods', arr);

    if (arr.length == 0) {
      $('.empty-tip').removeClass('hidden');
      $('.cart-header').addClass('hidden');
      $('.item-list').addClass('hidden');
      $('.total-of').addClass('hidden');
    }

  })


}
//总结：1.动态创建部分的元素不能有id名
//2.问题：在cart.js页面在调用detail.js封装好的加减商品数量的函数时出现的问题：a.类名不对应，添加的事件不起效果；b.改变当前商品项的数量，改变的应该是本项商品价格;b,jQuery的属性方法设置值的情况总是搞错
//判断是否等于时，总是写成：=