var ua = navigator.userAgent.toLowerCase(); 
var swiperMain = null;
// 是否安卓
function isAndroid(){
    if(ua.indexOf("android")>-1){
        return true
    }
    return false
}
// 展示第一组淘口令
function showTkl()
{
    $(".tkl_pop,.page3-bg .tkl_close").show();
}
$(function() {
    // main swiper
    swiperMain = new Swiper('.swiper-main', {
        direction: 'vertical',
        scrollbar: '.swiper-scrollbar',
        onInit : function(swiper){

        },
        onTouchStart:function(swiper,even){
            if(swiper.activeIndex == 2){
                return;
            }
            // document.getElementById("play").play(); 
            // document.getElementById("play").pause();
        },
        onSlideChangeEnd: function(swiper) {
            $('.mark').eq(0).hide();
            var idx = swiper.activeIndex;
            switch (idx) {
                case 0:
                    videoPlayOrPause(0);
                    document.getElementById("play").pause()
                    break;
                case 1:
                    page1Ani()
                    $("#music").show()
                    if(!aObj.manualPaused){
                        aObj.play()
                    }
                    document.getElementById("play").pause()
                    break;
                case 2:
                    // 安卓点击播放 ios可以自动播放
                    if(!isAndroid() || hasTouched){
                        isRealPlay = true
                        document.getElementById("play").play();
                    }
                    break;
                case 3:
                    $("#music").show()
                    if(!aObj.manualPaused){
                        aObj.play()
                    }
                    document.getElementById("play").pause()
                    // videoPlayOrPause(2);
                    // if (netease.ua.android && netease.ua.weixin) {
                    //     swiperMain.lockSwipes();
                    // }
                    break;
                default:
                    // videoPlayOrPause(3);
                    break;
            }

        }
    });

    function androidVideo(num,classname){
        $('.mark').eq(num).click(function() {
            $('#'+classname)[0].play();
            $(this).hide();
            swiperMain.lockSwipes();
            $('#'+classname).on('pause', function() {
                swiperMain.unlockSwipes();
            });
            $('#'+classname).on('play', function() {
                swiperMain.lockSwipes();
            })
        });
    }

    function videoPlayOrPause(nth) {
        var arr = ['#play'];
        if (nth < 3) {
            $(arr[nth])[0].play();
            arr.splice(nth, 1);
        }
        $(arr).each(function(i) {
            $(arr[i])[0].pause();
        });
    }

   /* var w = document.body.offsetWidth;
    var h = document.body.offsetHeight;
    var wh =
        $('#video').css({});
    $('#video').css({
            'transform': 'scaleY()'
        })*/
        // 阻止
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });

});
