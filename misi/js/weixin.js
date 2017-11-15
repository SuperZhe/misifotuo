var wxDefault = {
    title:"梦露化妆前长这样！彩妆鼻祖又是谁？",
    desc :"轻松打造明星妆容，蜜丝佛陀好莱坞经典明星款限量发售。",
    imgUrl:"http://www.tron-m.com/maxfactor/images/share.jpg?v=1007",
    link : location.href,
    success:function(){
        isShare=false;
        $("#shareshadow").hide()
    }
};
var host = "http://www.tron-m.com/tron-api";
$(function(){
    $.post(host+'/jssdk/share.do',{url:window.location.href},function(json){
        if(json.code == '1'){
            var result = json.result;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appId, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.nonceStr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                wxShare();
            })
        }else{
            console.log("getWxConfig has error:"+json.msg);
        }
    },'json');
});
function wxShare(){
    wx.onMenuShareAppMessage({
        title: wxDefault.title, // 分享标题
        desc: wxDefault.desc, // 分享描述
        link: wxDefault.link, // 分享链接
        imgUrl: wxDefault.imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // alert("分享成功");
        },
        cancel: function () {
            // alert("取消分享");
        }
    });
    wx.onMenuShareTimeline({
        title:wxDefault.title,
        imgUrl:wxDefault.imgUrl,
        link:wxDefault.link,
        success: function () {
            // alert("分享成功");
        },
        cancel: function () {
            // alert("取消分享");
        }
    });
}

