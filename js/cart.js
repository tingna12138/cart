// 业务逻辑
//1.打开页面时进行判断，内存中selectGoods是否为空，如果不是的话就进行显示隐藏操作，同时动态添加数据
var arr = utils.getStorage('selectGoods') || []
if (arr.length !== 0) {

  //3.获取内存中的数据
  //utils.getStorage('selectGoods')
  //   utils.getStorage('Goods')
  var itemObj;
  $('.empty-tip').addClass('hidden').siblings().removeClass('hidden');
  //3.2.3通过内存中的数据渲染页面
  //3.2.3.1提取数据并且便利
  utils.getStorage('selectGoods').forEach(function (item1) {
    //通过item里的pID属性获取 GOods数据库中的数据
    utils.getStorage('Goods').forEach(function (item) {
      //==是不严格的等于判断；===是严格的等于判断
      if (item.pID == item1.pID) {
        itemObj = item;
      }
    })

    $('.item-list .item').append(
      `<div class="row theItem" data-id=${item1.id}>
            <div class="cell col-1 row">
              <div class="cell col-1">
                <input type="checkbox" class="item-ck">
              </div>
              <div class="cell col-4">
                <img src=${itemObj.imgSrc}  id="prod-img" alt="">
              </div>
            </div>
            <div class="cell col-4 row">
              <div class="item-name" id="prod-name">${itemObj.name}</div>
            </div>
            <div class="cell col-1 tc lh70">
              <span>￥</span>
              <em class="price" id="prod-price">${itemObj.price}</em>
            </div>
            <div class="cell col-1 tc lh70">
              <div class="item-count">
                <a href="javascript:void(0);" class="reduce fl">-</a>
                <input autocomplete="off" type="text" class="number fl" value=${item1.count}>
                <a href="javascript:void(0);" class="add fl">+</a>
              </div>
            </div>
            <div class="cell col-1 tc lh70">
              <span>￥</span>
              <em class="computed">${item1.count*itemObj.price+''}</em>
            </div>
            <div class="cell col-1">
              <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
            </div>
          </div>`
    )
  })


  //4.界面动态效果编写
  // 4.1点击加减符号时，文本框中的数值增加或者减少
  var number = $('.item-count .number');
  //4.1.1进行判断，当商品参数等于1的时候，- 显示禁用状态
  if (number.val() == 1) {
    $('.item-count .reduce').addClass('disabled');
  }
  //4.1.2添加点击增加事件
  $('.item-count .add').on('click', function () {
    number = $(this).parents('.item-count').find('.number');
    number.val(number.val() - 0 + 1 + '')
    number.prev().removeClass('disabled');
    // console.log(number.val())
    //4.2修改商品总价的计算方式
    $(this).parents('.theItem').find('.computed').text(number.val() * $(this).parents('.theItem').find('.price').text());

    //6.1 点击 + 下面的商品下面的数据改变
    computeSum();
    //7.1加完保存数据库
    theCounts($(this))
  })
  //4.1.3添加点击减少事件
  $('.item-count .reduce').on('click', function () {
    number = $(this).parents('.item-count').find('.number');
    if (number.val() > 1) {
      number.val(number.val() - 1 + '')
      if (number.val() == 1) {
        number.prev().addClass('disabled');
      }
      //4.2修改商品总价的计算方式
      $(this).parents('.theItem').find('.computed').text(number.val() * $(this).parents('.theItem').find('.price').text());
    }
    //6.2 点击 - 下面的数据改变
    computeSum();
    //7.2减完保存数据库
    theCounts($(this))
  })


  //5.选中状态关联
  //5.1点击全选复选框，各个商品列表的选项框跟随同步
  $('.pick-all').on('click', function () {
    $('.item-ck').prop('checked', $('.pick-all').prop('checked'));

    //6.3点击全选时，下面的数据改变
    computeSum();
  })
  //5.2点击商品列表的复选框，关联全选复选框
  $('.item-ck').on('click', function () {
    //size()也可以获取jQuery伪数组的长度，但很多浏览器已经不支持了
    // console.log($('.item-ck:checked'))
    if ($('.item-ck').length > $('.item-ck:checked').length) {
      $('.pick-all').prop('checked', false)
    } else {
      $('.pick-all').prop('checked', true)
    }
    //6.4 改变复选框的选中状态，下面的数据改变
    computeSum();
  })

  //6.将选中的商品数据的数量和价格加起来传递到最下面的结算栏目
  var computeSum = function () {
    var sum = 0;
    var counts = 0;
    $('.item-ck:checked').each(function (index, item) {
      counts = $(this).parents('.theItem').find('.number').val() - 0 + counts;
      sum = $(this).parents('.theItem').find('.computed').text() - 0 + sum;
    })
    //将sum和counts的值给下面的全选
    $('.total-of .selected').text(counts);
    $('.total-of .total-money').text(sum);
  }

  //7.每次 + - 完之后将新的商品数量保存到数据库

  //7.2减完保存数据库

  function theCounts(that) {
    var zindex;
    // console.log( utils.getStorage('selectGoods'))
    //必须用一个变量来装从浏览器内存中获取的数据，因为从浏览器内存中获取的数据方法的返回值跟实际储存在浏览器内存中的数据不一样
    var arr = utils.getStorage('selectGoods');
    arr.some(function (item, index) {
      //**************some方法中的this指向的是window对象*******
      if (item.id == that.parents('.theItem').data('id')) {
        zindex = index;
        console.log(zindex);
        return true;
      }
    })
    arr[zindex].count = number.val();
    //向浏览器储存数据
    utils.setStorage('selectGoods', arr)
  }

  //8.删除数据：动态添加的数据集合的索引与内存中数据的索引存在关联，不熟
  //点击‘从购物车移除，删除该项数据，同时删除它在内存中的数据’
  $(".item-del").on('click', function () {
    //删除它的父元素盒子
    $(this).parents('.theItem').remove();
    //删除数据库中的数据
    var arr = utils.getStorage('selectGoods');
    var that=$(this);
    arr.some(function (item, index) {
      //**************some方法中的this指向的是window对象*******
      if (item.id == that.parents('.theItem').data('id')) {
        zindex = index;
        console.log(zindex);
        return true;
      }
    })
    arr.splice(zindex,1);
    //向浏览器储存数据
    utils.setStorage('selectGoods', arr)
  })


  //总结：定义的全局函数，即使把函数放在某对象的事件中，函数中的this始终指向window对象

}