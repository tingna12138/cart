//1.设置定时器，是搜索栏里的占位符每隔5s换一次
//1.1定时器
//数据从哪里来
//search
search = document.querySelector('.search input');
var arr = ['usb分线器', '互联网电视', '奥克斯空调', '联想一体机', '鼠标键盘套装', '好奇帕金装纸尿裤']
var index = 1;
//定时函数
function change(arr) {
    if (index >= arr.length) {
        index = 0;
    }
    search.placeholder = arr[index]
    index++;
}
var timer = setInterval(change.bind(window, arr), 4000)
//1.2当鼠标锁定搜索框时，停止定时
$(search).on('focus', function () {
    clearInterval(timer);
})
//1.3当失去焦点，有开始定时
$(search).on('blur', function () {
    timer = setInterval(change.bind(window, arr), 4000)
})

//2.设置定时，搜索栏下面的第一个banner文字
var hot=$('.hotwords .style-red')
var index1=1;
function changeTitle(arr) {
    if (index1 >= arr.length) {
        index1 = 0;
    }
    hot[0].innerText = arr[index1]
    index1++;
}
var arr1=['百图大牌日','分千万金豆','金六福喜酒']
var timer1 = setInterval(changeTitle.bind(window,arr1), 3000);