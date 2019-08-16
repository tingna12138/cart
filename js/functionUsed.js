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
    }
}