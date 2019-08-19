var utils = {
    //从内存中获取数据
    getStorage: function (name) {
        return JSON.parse(localStorage.getItem(name));
    },
    //从内存中获取特定数据
    getSpelStorage: function (name, data) {
        var arr = utils.getStorage(name);
        var zindex;
        arr.some(function (ele, index) {
            if (ele.pID == data) {
                zindex = index;
                return true;
            }
        });
        return arr[zindex];
    },
    //向内存中储存数据
    setStorage:function(name,data){
        return localStorage.setItem(name,JSON.stringify(data));
    },

    //点击加号按钮文本框数值加1
    //能使用这种方法的前提是：类名分别为：add reduce的盒子和一个input标签都封装在一个choose-amount的盒子里
    changeNum: function (fn) {
        //1点击加号，改变文本框数值
        $('.choose-amount .add').on('click', function () {
            $(this).parents('.choose-amount').find('input').val($(this).parents('.choose-amount').find('input').val() - 0 + 1);
            $(this).parents('.choose-amount').find('.reduce').removeClass('disabled')
            //用于购物车页面添加代码
           if(fn){
            fn.call(this);
           }
        })
        //2点击减号，改变文本框数值
        $('.choose-amount .reduce').on('click', function () {
            if ($(this).parents('.choose-amount').find('input').val() > 1) {
                $(this).parents('.choose-amount').find('input').val($(this).parents('.choose-amount').find('input').val() - 1);
            }
            if ($(this).parents('.choose-amount').find('input').val() <= 1) {
                $(this).parents('.choose-amount').find('.reduce').addClass('disabled')
            }
           //用于购物车页面添加代码
           if(fn){
            fn.call(this);
           }
        })

        //3自己输入数值
        $('.choose-amount .choose-number').on('blur', function () {
            if ($(this).val() < 1) {
                $(this).val(1);
                $(this).parents('.choose-amount').find('.reduce').addClass('disabled')
            } else {
                $(this).parents('.choose-amount').find('.reduce').removeClass('disabled')
            }
            //用于购物车页面添加代码,当没有传入参数时，不执行

            if(fn){
                fn.call(this);
            } 
        })

    },

}