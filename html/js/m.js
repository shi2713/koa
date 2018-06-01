/**
 * Silence
 */
;
$(function() {
    var KoaCommon = function() {
        this.init();
    };

    KoaCommon.prototype = {
        //初始化
        init: function() {
            this.grid();
            this.sortActive();
            this.sortClick();
            this.dialog();
            this.detilsOpen();
            this.detilsWH();
            this.detilsBack();
            // var height=$(window).height();
            $(window).scroll(function(){
                if ($(window).scrollTop()>300){  
                    $(".backtop").fadeIn(500);  
                }else{  
                    $(".backtop").fadeOut(500);  
                    }  
            });
        },
        //瀑布流排序
        grid: function(){
            var imgdefereds = [];
            $('.grid img').each(function() {
                var dfd = $.Deferred();
                $(this).bind('load', function() {
                    dfd.resolve();
                }).bind('error', function() {
                    //图片加载错误，加入错误处理
                    dfd.resolve();
                })
                if (this.complete) setTimeout(function() {
                    dfd.resolve();
                }, 1000);
                imgdefereds.push(dfd);
            })
            $.when.apply(null, imgdefereds).done(function() {
                $('.grid').masonry({
                    itemSelector: '.item',
                    percentPosition: true
                });
            });
        },
        //排序切换
        sortActive: function(){
            $('.sort li').each(function(i){
                if($(this).hasClass('active')){
                    $('.sort').removeClass('sort_hot sort_up sort_time');
                    $('.sort').addClass($(this).data('class'));
                    $('.sort i').removeClass('active');
                    $(this).find('i').addClass('active');
                }
            });
        },
        //排序点击
        sortClick: function(){
            var self = this;
            $('.sort').on('click','li',function(){
                $('.sort li').removeClass('active');
                $(this).addClass('active');
                self.sortActive();
            });
        },
        //弹窗
        dialog: function(){
            var self = this;
            function open(name){
                $('#'+name).show();
                $('.dialog_bg').show();
            }
            //open
            $('.footer').on('click','li',function(){
                if($(this).data('id')){
                    open($(this).data('id'));
                }
            });
            //close
            $('.dialog h2').on('click','span',function(){
                $('.dialog,.dialog_bg').hide();
            });
        },
        //detils
        detilsOpen: function(){
            $('.item').on('click','img',function(){
                $('.detils').show();
            });
        },
        detilsWH: function(){
            var w = $('body').width() - 2;
            var h = $(window).height() - 2;
            $('.detils').css({
                width:w,
                height:h
            });
        },
        detilsBack: function(){
            $('.detils_back').on('click',function(){
                $(this).parent().hide();
            });
        }

    };
    new KoaCommon();
});

// backtop
(function(global) {
    $.fn.scrollTo = function(options) {
        var defaults = {
            toT: 0, //滚动目标位置  
            durTime: 500, //过渡动画时间  
            delay: 30, //定时器时间  
            callback: null //回调函数  
        };
        var opts = $.extend(defaults, options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(), //滚动条当前的位置  
            subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值  
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t) {
                index++;
                var per = Math.round(subTop / dur);
                if (index >= dur) {
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if (opts.callback && typeof opts.callback == 'function') {
                        opts.callback();
                    }
                    return;
                } else {
                    _this.scrollTop(curTop + index * per);
                }
            };
        timer = window.setInterval(function() {
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };
    $(".backtop").on('click', function() {
        $("body").scrollTo();
        // $("body").scrollTop(0);
    })
}(window));