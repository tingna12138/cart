// 1.将商品数据保存到浏览器内存中
    //这里跟购物车页面动态保存不太一样
//2.获取内存数据，动态生成页面的商品列表
//定义一个空数组来装创建的页面
var arr=[]
utils.getStorage("Goods").forEach(function(ele) {
  var li=` <li class="goods-list-item">
            <a href="detail.html?pID=${ele.pID}">
              <div class="item-img">
                <img src=${ele.imgSrc} alt="">
              </div>
              <div class="item-title">
               ${ele.name}
              </div>
              <div class="item-price">
                <span class="now">¥6${ele.price}</span>
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
          </li>`
    arr.push(li);
});
console.log(arr.join(''))
$('.goods-list ul').html(arr.join(''));

//3.点击某一产品时，实现跳转到detail.html页面，并且显示对应的商品数据
//通过传递内存中数据的唯一标识 id 来找到相应的数据项目



// 总结：1.不能把html元素放在数组中进行传递。只能把html的内容以字符串的形式储存在数组中