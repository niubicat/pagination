/**
 * Created by Sunshine on 2017/3/4.
 */
window.onload = function () {

    page({
        id: "div1",
        nowNum: 1,
        allNum: allPages,
        callBack: function (all, now) {
            showContent(now);
        }
    });
};