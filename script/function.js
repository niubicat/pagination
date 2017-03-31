/**
 * Created by Sunshine on 2017/3/3.
 */
var allPages = Math.ceil(theContent.user.length/3);
var everyPageNum = 3;

function page(opt) {
    if (!opt.id){
        return false;
    }
    var obj = document.getElementById(opt.id);
    var nowNum = opt.nowNum || 1;
    var allNum = opt.allNum || 5;
    var callBack = opt.callBack || function () {};

    if (nowNum >= 4 && allNum >= 6){
        var oA = document.createElement("a");
        oA.href = "#1";
        oA.innerHTML = "首页";
        obj.appendChild(oA);
    }
    if ( nowNum >= 2){
        var oA = document.createElement("a");
        oA.href = "#" + (nowNum - 1);
        oA.innerHTML = "上一页";
        obj.appendChild(oA);
    }

    if (allNum <= 5){ // allNum <= 5
        for(var i = 1;i<=allNum;i++){
            var createA = document.createElement("a");
            createA.href = "#" + i;
            if (nowNum == i){
                createA.innerHTML = i;
            }else {
                createA.innerHTML = "[" + i + "]";
            }
            obj.appendChild(createA);
        }
    }else { // allNum > 5
        for(var j = 1;j<=5;j++){
            var cA = document.createElement("a");
            if (nowNum == 1 || nowNum == 2) {
                cA.href = "#" + j;
                if (nowNum == j) {
                    cA.innerHTML = nowNum;
                } else {
                    cA.innerHTML = "[" + j + "]";
                }
            }else if ((allNum - nowNum) == 1 || nowNum == allNum){ // 最后两个
                cA.href = "#" + (allNum - 5 + j); // x-4 -3 -2 -1 -0

                if ((allNum - nowNum) == 0 && j == 5){
                    cA.innerHTML = (allNum - 5 + j);
                }else if((allNum - nowNum) == 1 && j == 4){
                    cA.innerHTML = (allNum - 5 + j);
                }else{
                    cA.innerHTML = "[" + (allNum - 5 + j) + "]";
                }
            }else{
                cA.href = "#" + (nowNum -3 +j);
                if (j == 3){
                    cA.innerHTML = nowNum -3 +j;
                }else {
                    cA.innerHTML = "[" + (nowNum -3 +j) + "]";
                }
            }

            obj.appendChild(cA);
        }
    }

    if ((allNum - nowNum) >= 1){
        var oA = document.createElement("a");
        oA.href = "#" + (nowNum + 1);
        oA.innerHTML = "下一页";
        obj.appendChild(oA);
    }
    if ((allNum - nowNum) >= 3 && allNum >= 6 ){
        var oA = document.createElement("a");
        oA.href = "#" + allNum;
        oA.innerHTML = "尾页";
        obj.appendChild(oA);
    }

    callBack(allNum ,nowNum);

    var allA = obj.getElementsByTagName("a");

    for(var k = 0; k<allA.length; k++){
        allA[k].onclick = function () {
            var nowNum = parseInt(this.getAttribute("href").substring(1));

            obj.innerHTML = "";
            page({
                id: obj.id,
                nowNum: nowNum,
                allNum: allNum,
                callBack: callBack
            });
        }
    }
}

function showContent(now) {

    console.log("showContent");
    var main = document.getElementById("main");
    var userName = document.getElementById("userName");
    var nowContentNum;
    // 初始化以及优化插入dom，防止最后页面不是3条数据时报错
    if (now*3 < theContent.user.length){
        nowContentNum = 3;
    }
    else {
        nowContentNum = theContent.user.length - (now-1)*everyPageNum;
    }


    if (main.innerHTML == ""){
        for(var i =0;i<nowContentNum;i++){
            var content = document.createElement("div");
            content.id = "content";
            var theUser = document.createElement("h1");
            var theMessage = document.createElement("p");

            theUser.id = "userName";
            theMessage.id = "message";

            main.appendChild(content);
            content.appendChild(theUser);
            content.appendChild(theMessage);

            theUser.innerHTML = theContent.user[(now-1)*everyPageNum + i].userName;
            theMessage.innerHTML = theContent.user[(now-1)*everyPageNum + i].message;
        }
    }else {
        for(var k =0;k<everyPageNum;k++){
            console.log(nowContentNum);
            var clearUser = document.getElementById("main").getElementsByTagName("h1");
            var clearMessage = document.getElementById("main").getElementsByTagName("p");

            clearUser[k].innerHTML = "";
            clearMessage[k].innerHTML = "";
        }
        for(var j =0;j<nowContentNum;j++){
            console.log(nowContentNum);
            var user = document.getElementById("main").getElementsByTagName("h1");
            var message = document.getElementById("main").getElementsByTagName("p");

            user[j].innerHTML = theContent.user[(now-1)*everyPageNum + j].userName;
            message[j].innerHTML = theContent.user[(now-1)*everyPageNum + j].message;
        }
    }
}
