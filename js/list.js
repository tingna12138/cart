//1.渲染页面
utils.getStorage("Goods").forEach(ele => {
    $('.goods-list ul').append(`<li class="goods-list-item">
    <a href="detail.html?pID=${ele.pID}">
      <div class="item-img">
        <img src=${ele.imgSrc} alt="">
      </div>
      <div class="item-title">
        ${ele.name}
      </div>
      <div class="item-price">
        <span class="now">¥${ele.price}</span>
        <s>￥6988</s>
      </div>
      <div class="sold">
        <span> 已售 <em>${ele.percent}% </em></span>
        <div class="scroll">
          <div class="per"></div>
        </div>
        <span>剩余<i>${ele.left}</i>件</span>
      </div>
    </a>
    <a href="#" class="buy">
      加入购物车
    </a>
  </li>`)
});
//2.点击产品跳转到商品详情页面。并且把对应产品的id传递过去