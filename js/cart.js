if (utils.getStorage("selectGoods")) {
    // 1.判断内存中是否有选中的数据，然后进行盒子的隐藏和显现
    $('.empty-tip').addClass('hidden');
    $('.item-list').removeClass('hidden');
    var zindex;
    //2.获取数据，渲染页面
    utils.getStorage('selectGoods').forEach(function (item) {
        utils.getStorage('Goods').some(function (item1, index) {
            if (item.pID == item1.pID) {
                //console.log(item.pID)   pID 是字符串
                //console.log(item1.pID)  pID是数值
                zindex = index;
                return true;
            }
        })
        var obj = utils.getStorage('Goods')[zindex];
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
                <input autocomplete="off" type="text" class="number fl choose-number" value=${item.counts}>
                <a href="javascript:void(0);" class="add fl">+</a>
              </div>
            </div>
            <div class="cell col-1 tc lh70">
              <span>￥</span>
              <em class="computed">${obj.price*item.counts}</em>
            </div>
            <div class="cell col-1">
              <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
            </div>
          </div>
        </div>`)
    })
    //3.点击加减号，文本框数据加减1，计算单项总价。并把改变结果重新保存到内存
    //3.1点击加号，文本框中的数值加1
    utils.add(utils.computed);
    //3.2点击减号，文本框中的数值减1
    utils.remove(utils.computed);
    //3.3在文本框手动输入数值
    utils.inputNumder(utils.computed);


    //4.计算所有选中商品的总数量和总价格
    //5.选中关联
    //6.删除数据




}








//总结：定义的全局函数，即使把函数放在某对象的事件中，函数中的this始终指向window对象