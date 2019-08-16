// 定义一个对象封装所有的常用功能封装的方法
var utils = {
    //获取内存中数据的方法
    getStorage: function (name) {
        var str = localStorage.getItem(name);
        return JSON.parse(str);
    },
    //向内存中存储数据
    setStorage: function (name, value) {
        var str = JSON.stringify(value);
        localStorage.setItem(name, str);
    },
    //从地址兰获取参数，并使得以键值对的形式显示
    getSearch: function () {
        //这种方法只适合有一个参数
        var str = location.search.slice(1);
        var arr = str.split('=');
        var obj = {
            pID: arr[1]
        }
        return obj;
    },
    //点击加号，是文本框中的商品数值增加1
    add: function (fn) {
        $('.choose-amount .add').on('click', function () {
            $(this).siblings('input').val($(this).siblings('input').val() - 0 + 1);
            $(this).next().removeClass('disabled');
             //传入一个形参函数，方便添加代码
            fn();
        })
    },
    //点击减号，是文本框中的商品数值减少1
    remove: function (fn) {
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
            //传入一个形参函数，方便添加代码
            fn();
        })
    },
    //文本框自身设置
    inputNumder: function (fn) {
        $('.choose-amount .choose-number').on('blur', function () {
            if ($(this).val() <= 1) {
                $(this).val('1');
            } else {
                $(this).siblings('.reduce').removeClass('disabled');
            }
            //传入一个形参函数，方便添加代码
            fn();
        })
    },
}