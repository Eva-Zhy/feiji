var diachi = document.getElementById("diachi");
var lengdong = document.getElementById("lengdong");
var quankai = document.getElementById("quankai");
var bg = document.getElementById("bg");
var zj = document.getElementById("zj");

window.allowCopy = false;
document.addEventListener('touchmove', function (e) {
    if (!window.allowCopy) {
        e.preventDefault();
    }
}, {
    passive: false
});

var ces = true;

// token
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getClientHeight()
{
    var clientHeight=0;
    if(document.body.clientHeight&&document.documentElement.clientHeight)
    {
        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    else
    {
        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
    }
    return clientHeight;
}
console.log("height",getClientHeight());
if (ces) {
    loading();
} else {

    window.token = GetQueryString("token");
    if (token == "" || token == null || token == undefined) {
        $(".loading_num").html("非法用户！请确认你的登录信息");
    } else {
        $.ajax({
            url: "https://vivo201907.angwei.net/api/reduceHp.json",
            type: "post",
            data: {
                token: token
            },
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded',
            success: function (res) {
                console.log(res);
                if (res.metaInfo.code == 0) {
                    loading();
                } else {
                    $(".loading_num").html("你没有生命数了");
                }
            },
            error: function (e) {
                // 抛弃异常
                $(".loading_num").html("非法用户！请确认你的登录信息");
            }
        });
    }
}
var post_once = false;
var btn_once = false;

function loading() {
// loading
    var loading_num = 0;
    $('.car1').animate({"left": '26.8rem'}, 4900, function () {
    });
    $('.bar-v').animate({"width": '100%'}, 4900, function () {
    });
    var loading_time = setInterval(function () {
        loading_num++;
        $(".loading_num").html(loading_num + "%");
        if (loading_num == 99) {
            $(".loading_num").html("100%");
            clearInterval(loading_time);

            // begin();
            // bg.play();
            // audioAutoPlay();
            setTimeout(function () {

                $("#loading").css("display","none");
                $(".start_game").css("display","block");
                startGo()
                // $(".loading_num").css("display","none");
                // $("#num1").css("display","block");
                // $(".djs").css("display","block");
                // setTimeout(function(){
                //     $("#num1").css("display","none");
                //     $("#num2").css("display","block");
                //     setTimeout(function () {
                //         $("#num2").css("display","none");
                //         $("#num3").css("display","block");
                //         setTimeout(function () {

                //         },1000);
                //     },1000);
                // },1000);
            }, 500);
        }
    // }, 50);
    }, 10);
}

function startGo() {
    $('.bar-v2').animate({"width": '100%'}, 3000, function () {
        $('.bar-v2').animate({"opacity": '0'}, 1000, function () {
            $(".loading_bar2").css("display","none");
            $(".gogo").css("display","block");

            $('.gogo').animate({"opacity": '1'}, 1000, function () {
                $('.guang').animate({"opacity": '1'}, 1000, function () {
                });
                $('.car3').animate({"opacity": '1'}, 1000, function () {
                });

                $('.gogo').click(function () {
                    $(".start_game").css("display","none");
                    begin();
                });
            })
        })
    })
}

//function audioAutoPlay() {
//    document.addEventListener("WeixinJSBridgeReady", function () {
//        bg.play();
//    });
//    document.addEventListener('YixinJSBridgeReady', function () {
//        bg.play();
//    });
//}
//获得主界面
var mainDiv = document.getElementById("maindiv");
//获得开始界面
var startdiv = document.getElementById("startdiv");
//获得游戏中分数显示界面
var scorediv = document.getElementById("scorediv");
var smdiv = document.getElementById("smdiv");
window.myhp = 99;
window.zhuang = false;
//获得分数界面
var scorelabel = document.getElementById("label");
//获得暂停界面
var suspenddiv = document.getElementById("suspenddiv");
//获得游戏结束界面
var enddiv = document.getElementById("enddiv");
//获得游戏结束后分数统计界面
var planscore = document.getElementById("planscore");
//初始化分数
var scores = 0;

var xs = false;

/*
 创建飞机类
 */

var jianshu = 0;
var xueliang = 0;

function plan(hp, X, Y, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc) {
    this.planX = X;
    this.planY = Y;
    this.imagenode = null;
    this.planhp = hp;
    this.planscore = score;
    this.plansizeX = sizeX;
    this.plansizeY = sizeY;
    this.planboomimage = boomimage;
    this.planisdie = false;
    this.plandietimes = 0;
    this.plandietime = dietime;
    this.plansudu = sudu;
//行为
    /*
    移动行为
         */
    this.planmove = function () {
        if (scores > 20) {
            var sudu_value = this.imagenode.offsetTop + this.plansudu - jianshu;
        } else {
            var sudu_value = this.imagenode.offsetTop + this.plansudu;
        }
        this.imagenode.style.top = sudu_value + "px";
        //
        // if (scores <= 20) {
        //     this.imagenode.style.top = sudu_value + "px";
        // } else if (scores > 20 && scores <= 30) {
        //     this.imagenode.style.top = sudu_value + 1 + "px";
        // } else if (scores > 30 && scores <= 40) {
        //     this.imagenode.style.top = sudu_value + 2 + "px";
        // } else if (scores > 40 && scores <= 50) {
        //     this.imagenode.style.top = sudu_value + 3 + "px";
        // } else if (scores > 50 && scores <= 200) {
        //     this.imagenode.style.top = sudu_value + 4 + "px";
        // } else if (scores > 200 && scores <= 400) {
        //     this.imagenode.style.top = sudu_value + 5 + "px";
        //     xueliang = 1;
        // } else if (scores > 400 && scores <= 600) {
        //     this.imagenode.style.top = sudu_value + 6 + "px";
        //     xueliang = 2;
        // } else if (scores > 600 && scores <= 800) {
        //     this.imagenode.style.top = sudu_value + 7 + "px";
        //     xueliang = 3;
        // } else if (scores > 800 && scores <= 1000) {
        //     this.imagenode.style.top = sudu_value + 8 + "px";
        //     xueliang = 4;
        // } else {
        //     this.imagenode.style.top = sudu_value + 10 + "px";
        //     xueliang = 5;
        // }
    };
    this.init = function () {
        this.imagenode = document.createElement("img");
        this.imagenode.style.left = this.planX + "px";
        this.imagenode.style.top = this.planY + "px";
        this.imagenode.src = imagesrc;
        mainDiv.appendChild(this.imagenode);
    }
    this.init();
}

/*
创建子弹类
 */
function bullet(X, Y, sizeX, sizeY, imagesrc) {
    this.bulletX = X;
    this.bulletY = Y;
    this.bulletimage = null;
    this.bulletattach = 1;
    this.bulletsizeX = sizeX;
    this.bulletsizeY = sizeY;
//行为
    /*
     移动行为
     */
    this.bulletmove = function () {
        this.bulletimage.style.top = this.bulletimage.offsetTop - bullet_sudu + "px";
    }
    this.init = function () {
        this.bulletimage = document.createElement("img");
        this.bulletimage.style.left = this.bulletX + "px";
        this.bulletimage.style.top = this.bulletY + "px";
        this.bulletimage.src = imagesrc;
        mainDiv.appendChild(this.bulletimage);
    }
    this.init();
}

/*
 创建单行子弹类
 */
var bullet_status = 0;
var bullet_left = 54;
var bullet_sizeX = 15;
var bullet_sizeY = 90;
var bullet_src = "img/zidan.png";

function oddbullet(X, Y) {
    bullet.call(this, X, Y, bullet_sizeX, bullet_sizeY, bullet_src);
    //bullet.call(this,X,Y,6,14,"image/bullet1.png");
}

/*
创建敌机类
 */
function enemy(hp, a, b, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc) {
    plan.call(this, hp, random(a, b), -100, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc);
}

/*
创建道具
 */
function prop(hp, a, b, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc) {
    plan.call(this, hp, random(a, b), -100, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc);
}

//产生min到max之间的随机数
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

/*
创建本方飞机类
 */

function ourplan(X, Y) {
    var imagesrc = "img/myfeiji.png";
    // hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc
    plan.call(this, 1, X, Y, 127, 147, 0, 660, 0, "img/myfeiji.png", imagesrc);
    this.imagenode.setAttribute('id', 'ourplan');
}

/*
 创建本方飞机
 */

var dW = $('body').width();
var dH = $('body').height();
var selfplan = new ourplan(dW / 2 - 62, dH * 0.75 +10);
//移动事件
var ourPlan = document.getElementById('ourplan');

var yidong = function () {
    if (!xs) {
        xs = true;
        // $("#j1").animate({opacity: 0}, 1000);
        // $("#j2").animate({opacity: 0}, 1000);
        // $("#j3").animate({opacity: 0}, 1000);
        // $("#j4").animate({opacity: 0}, 1000);
    }

    // var oevent=window.event||arguments[0];
    // var chufa=oevent.srcElement||oevent.target;
    // var selfplanX=oevent.clientX;
    // var selfplanY=oevent.clientY;
    // ourPlan.style.left=selfplanX-selfplan.plansizeX/2+"px";
    // ourPlan.style.top=selfplanY-selfplan.plansizeY/2+"px";
//    document.getElementsByTagName('img')[0].style.left=selfplanX-selfplan.plansizeX/2+"px";
//    document.getElementsByTagName('img')[0]..style.top=selfplanY-selfplan.plansizeY/2+"px";
    var endTouchY = 0;
    var endTouchX = 0;
    $('#ourPlan').bind('contextmenu', function (e) {
        e.preventDefault();
    })
    ourPlan.addEventListener('touchstart', function (ev) {
        ev.preventDefault();
        this.addEventListener('touchmove', function (ev) {
            ev.preventDefault();
            var ev = ev.touches[0];
            if (ev.pageY - 41 > (getClientHeight()-206)) {
                ourPlan.style.top = (ev.pageY - 41) + 'px';
            }
            ourPlan.style.left = (ev.pageX - 33) + 'px';
            endTouchX = ev.pageX;
            endTouchY = ev.pageY;
        }, false);

        this.addEventListener('touchend', function (ev) {
            this.ontouchmove = null;
            this.ontouchend = null;
            var x;
            var y;
            x = (x > (dW - 66)) ? (dW - 66) : x;
            y = (y > (dH - 82)) ? (dH - 82) : y;
            ourPlan.style.left = x + 'px';
            ourPlan.style.top = y + 'px';
        }, false);
    }, false);
}
/*
暂停事件
 */
var number = 0;

//var zanting=function(){
function zanting() {
    if (number == 0) {
        //suspenddiv.style.display="block";
        if (document.removeEventListener) {
            mainDiv.removeEventListener("touchstart", yidong, true);
            bodyobj.removeEventListener("touchstart", bianjie, true);
        } else if (document.detachEvent) {
            mainDiv.detachEvent("ontouchstart", yidong);
            bodyobj.detachEvent("ontouchstart", bianjie);
        }
        clearInterval(set);
        clearInterval(dj);
        number = 1;
    } else {
        //suspenddiv.style.display="none";
        if (document.addEventListener) {
            mainDiv.addEventListener("touchstart", yidong, true);
            bodyobj.addEventListener("touchstart", bianjie, true);
        } else if (document.attachEvent) {
            mainDiv.attachEvent("ontouchstart", yidong);
            bodyobj.attachEvent("ontouchstart", bianjie);
        }
        set = setInterval(start, 20);
        // dj = setInterval(adddj, adddj_time);
        number = 0;
    }
}

//判断本方飞机是否移出边界,如果移出边界,则取消mousemove事件,反之加上mousemove事件
var bianjie = function () {
    var oevent = window.event || arguments[0];
    var bodyobjX = oevent.clientX;
    var bodyobjY = oevent.clientY;
    if (bodyobjX < 0 || bodyobjX > dW || bodyobjY < 0 || bodyobjY > dH) {
        if (document.removeEventListener) {
            mainDiv.removeEventListener("touchstart", yidong, true);
        } else if (document.detachEvent) {
            mainDiv.detachEvent("ontouchstart", yidong);
        }
    } else {
        if (document.addEventListener) {
            mainDiv.addEventListener("touchstart", yidong, true);
        } else if (document.attachEvent) {
            mainDiv.attachEvent("notouchstart", yidong);
        }
    }
}

//暂停界面重新开始事件
function chongxinkaishi() {
    //location.reload(true);
    //startdiv.style.display="none";
    //maindiv.style.display="block";
}

var bodyobj = document.getElementsByTagName("body")[0];
if (document.addEventListener) {
    //为本方飞机添加移动和暂停
    mainDiv.addEventListener("click", yidong, true);
    //为本方飞机添加暂停事件
    //selfplan.imagenode.addEventListener("click",zanting,true);
    //为body添加判断本方飞机移出边界事件
    bodyobj.addEventListener("touchstart", bianjie, true);
    //为暂停界面的继续按钮添加暂停事件
    //suspenddiv.getElementsByTagName("button")[0].addEventListener("click",zanting,true);
//    suspenddiv.getElementsByTagName("button")[1].addEventListener("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    //suspenddiv.getElementsByTagName("button")[2].addEventListener("click",jixu,true);
} else if (document.attachEvent) {
    //为本方飞机添加移动
    mainDiv.attachEvent("ontouchstart", yidong);
    //为本方飞机添加暂停事件
    //selfplan.imagenode.attachEvent("onclick",zanting);
    //为body添加判断本方飞机移出边界事件
    bodyobj.attachEvent("onclick", bianjie);
    //为暂停界面的继续按钮添加暂停事件
    //suspenddiv.getElementsByTagName("button")[0].attachEvent("onclick",zanting);
//    suspenddiv.getElementsByTagName("button")[1].attachEvent("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    //suspenddiv.getElementsByTagName("button")[2].attachEvent("click",jixu,true);
}

//初始化隐藏本方飞机
selfplan.imagenode.style.display = "none";

/*
敌机对象数组
 */
var enemys = [];
var props = [];

/*
子弹对象数组
 */
var bullet_sudu = 15;
var bullets = [];
var mark = 0;
var mark1 = 0;
var backgroundPositionY = 0;
/*
开始函数
 */
var adddj_num = 0;

// function adddj() {
//     adddj_num++;
//     if (adddj_num == 3) {
//         adddj_time = 6000;
//     }
//     console.log(adddj_time);
//     var add_prop = random(1, 4);
//     console.log("add_prop", add_prop);
//     if (add_prop == 1) {
//         // hp,X,Y,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc
//         props.push(new prop(6, 23, 274, 35, 35, 5000, 360, random(1, 3), "image/daoju1.png", "image/daoju1.png"));
//     } else if (add_prop == 2) {
//         props.push(new prop(6, 23, 274, 35, 35, 5000, 540, 1, "image/daoju2.png", "image/daoju2.png"));
//     } else if (add_prop == 3) {
//         props.push(new prop(1, 19, 260, 40, 43, 1000, 360, random(1, 4), "image/daoju3.png", "image/daoju3.png"));
//     }
// }

function start() {
    // mainDiv.style.backgroundPositionY=backgroundPositionY+"px";
    // backgroundPositionY+=0.5;
    if (backgroundPositionY == 568) {
        backgroundPositionY = 0;
    }
    mark++;
    /*
    创建敌方飞机
     */

    if (mark == 20) {
        mark1++;
        //中飞机
        if (mark1 % 5 == 0) {
            // hp, a, b, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc
            enemys.push(new enemy(1 + xueliang, 25, 274, 80, 80, 1, 360, random(1, 3) + 3, "image/小飞机爆炸.gif", "img/guai2.gif"));
        }
        //大飞机
        if (mark1 == 20) {
            // enemys.push(new enemy(12 + xueliang, 57, 210, 70, 51, 1, 540, 1, "image/小飞机爆炸.gif", "img/guai2.gif"));
            mark1 = 0;
        }
        //小飞机
        else {
            enemys.push(new enemy(1 + xueliang, 19, 286, 75, 77, 1, 360, random(1, 4)  + 3, "image/小飞机爆炸.gif", "img/guai1.gif"));
        }

        //var add_prop = random(1,70);
        //if (add_prop == 10) {
        //    // hp,X,Y,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc
        //    props.push(new prop(6,23,274,35,35,5000,360,random(1,3),"image/daoju1.png","image/daoju1.png"));
        //} else if (add_prop == 11) {
        //    props.push(new prop(6,23,274,35,35,5000,540,1,"image/daoju2.png","image/daoju2.png"));
        //} else if (add_prop == 12){
        //    props.push(new prop(1,19,260,40,43,1000,360,random(1,4),"image/daoju3.png","image/daoju3.png"));
        //}
        mark = 0;
    }

    /*
    移动敌方飞机
     */
    var enemyslen = enemys.length;
    for (var i = 0; i < enemyslen; i++) {
        if (enemys[i].planisdie != true) {
            enemys[i].planmove();
        }
        /*
         如果敌机超出边界,删除敌机
         */
        if (enemys[i].imagenode.offsetTop > dH) {
            mainDiv.removeChild(enemys[i].imagenode);
            enemys.splice(i, 1);
            enemyslen--;
        }
        //当敌机死亡标记为true时，经过一段时间后清除敌机
        if (enemys[i].planisdie == true) {
            enemys[i].plandietimes += 20;
            if (enemys[i].plandietimes == enemys[i].plandietime) {
                mainDiv.removeChild(enemys[i].imagenode);
                enemys.splice(i, 1);
                enemyslen--;
            }
        }
    }

    var propslen = props.length;
    for (var i = 0; i < propslen; i++) {
        if (props[i].planisdie != true) {
            props[i].planmove();
        }
        /*
         如果敌机超出边界,删除敌机
         */
        if (props[i].imagenode.offsetTop > dH) {
            mainDiv.removeChild(props[i].imagenode);
            props.splice(i, 1);
            propslen--;
        }
        //当敌机死亡标记为true时，经过一段时间后清除敌机
        if (props[i].planisdie == true) {
            props[i].plandietimes += 20;
            if (props[i].plandietimes == props[i].plandietime) {
                mainDiv.removeChild(props[i].imagenode);
                props.splice(i, 1);
                propslen--;
            }
        }
    }

    /*
    创建子弹
    */
    if (mark % 10 == 0) {
        bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left) + bullet_left, parseInt(selfplan.imagenode.style.top) - 40));
    }

    /*
    移动子弹
    */
    var bulletslen = bullets.length;
    for (var i = 0; i < bulletslen; i++) {
        bullets[i].bulletmove();
        /*
        如果子弹超出边界,删除子弹
        */
        if (bullets[i].bulletimage.offsetTop < 0) {
            mainDiv.removeChild(bullets[i].bulletimage);
            bullets.splice(i, 1);
            bulletslen--;
        }
    }

    /*
    碰撞判断
    */
    for (var k = 0; k < bulletslen; k++) {
        for (var j = 0; j < enemyslen; j++) {
            //判断碰撞本方飞机
            if (enemys[j].planisdie == false) {
                if (enemys[j].imagenode.offsetLeft + enemys[j].plansizeX >= selfplan.imagenode.offsetLeft && enemys[j].imagenode.offsetLeft <= selfplan.imagenode.offsetLeft + selfplan.plansizeX) {
                    if (enemys[j].imagenode.offsetTop + enemys[j].plansizeY >= selfplan.imagenode.offsetTop + 40 && enemys[j].imagenode.offsetTop <= selfplan.imagenode.offsetTop - 20 + selfplan.plansizeY) {
                        //碰撞本方飞机，游戏结束，统计分数
                        if (!zhuang) {
                            zhuang = true;
                            myhp--;
                            if (myhp <= 0) {
                                $("#label2").html("0");
                            } else {
                                $("#label2").html(myhp);
                            }
                            // zj.play();
                            console.log("asdasd");
                            if (myhp <= 0) {
                                // 我的飞机爆炸了
                                // selfplan.imagenode.src = "image/myfeiji_boom.png";
                                selfplan.imagenode.src = "img/myfeiji.png";
                                enddiv.style.display = "block";
                                planscore.innerHTML = "你干掉了" + scores + "个小怪兽";
                                if (document.removeEventListener) {
                                    mainDiv.removeEventListener("touchstart", yidong, true);
                                    bodyobj.removeEventListener("touchstart", bianjie, true);
                                } else if (document.detachEvent) {
                                    mainDiv.detachEvent("ontouchstart", yidong);
                                    bodyobj.removeEventListener("touchstart", bianjie, true);
                                }
                                clearInterval(set);
                                clearInterval(dj);
                                gemeover();
                            } else {
                                enemys[j].planisdie = true;
                                mainDiv.removeChild(enemys[j].imagenode);
                                enemys.splice(j, 1);
                                enemyslen--;
                            }
                            zhuang = false;
                        }
                    }
                }
                //判断子弹与敌机碰撞
                if ((bullets[k].bulletimage.offsetLeft + bullets[k].bulletsizeX > enemys[j].imagenode.offsetLeft) && (bullets[k].bulletimage.offsetLeft < enemys[j].imagenode.offsetLeft + enemys[j].plansizeX)) {
                    if (bullets[k].bulletimage.offsetTop <= enemys[j].imagenode.offsetTop + enemys[j].plansizeY && bullets[k].bulletimage.offsetTop + bullets[k].bulletsizeY >= enemys[j].imagenode.offsetTop) {
                        //敌机血量减子弹攻击力
                        enemys[j].planhp = enemys[j].planhp - bullets[k].bulletattach;
                        //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
                        if (enemys[j].planhp == 0) {
                            scores = scores + enemys[j].planscore;
                            scorelabel.innerHTML = scores;
                            enemys[j].imagenode.src = enemys[j].planboomimage;
                            enemys[j].planisdie = true;
                        }
                        //删除子弹
                        mainDiv.removeChild(bullets[k].bulletimage);
                        bullets.splice(k, 1);
                        bulletslen--;
                        break;
                    }
                }
            }
        }
        // 道具
        // for (var j = 0; j < propslen; j++) {
        //     //判断碰撞道具
        //     if (props[j].planisdie == false) {
        //         if (props[j].imagenode.offsetLeft + props[j].plansizeX >= selfplan.imagenode.offsetLeft && props[j].imagenode.offsetLeft <= selfplan.imagenode.offsetLeft + selfplan.plansizeX) {
        //             if (props[j].imagenode.offsetTop + props[j].plansizeY >= selfplan.imagenode.offsetTop + 40 && props[j].imagenode.offsetTop <= selfplan.imagenode.offsetTop - 20 + selfplan.plansizeY) {
        //                 console.log(props[j]);
        //                 mainDiv.removeChild(props[j].imagenode);
        //                 zanting();
        //                 //setTimeout(function () {
        //
        //                 //},4000)
        //                 if (props[j].planboomimage == "image/daoju1.png") {
        //
        //                     if (bullet_status == 0) {
        //                         bullet_sizeX = 29;
        //                         bullet_sizeY = 15;
        //                         bullet_left = 28;
        //                         bullet_src = "image/zidan2.png";
        //                         bullet_status = 1;
        //                     } else if (bullet_status == 1) {
        //                         bullet_sizeX = 45;
        //                         bullet_sizeY = 15;
        //                         bullet_left = 18;
        //                         bullet_src = "image/zidan3.png";
        //                         bullet_status = 2;
        //                     }
        //                     $("#daoju3_3").css("display", "block");
        //                     $("#daoju1_1").css("display", "none");
        //                     $("#daoju2_2").css("display", "none");
        //                     quankai.play();
        //                     $("#daoju3_3").animate({"opacity": 1}, 500, function () {
        //                         setTimeout(function () {
        //                             $("#daoju3_3").animate({"opacity": 0}, 500, function () {
        //                                 $("#daoju3_3").css("display", "none");
        //                                 zanting();
        //                                 biansheng();
        //                             })
        //                         }, 1000);
        //                     });
        //                 } else if (props[j].planboomimage == "image/daoju2.png") {
        //                     $("#daoju2_2").css("display", "block");
        //                     $("#daoju1_1").css("display", "none");
        //                     $("#daoju3_3").css("display", "none");
        //                     lengdong.play();
        //                     $("#daoju2_2").animate({"opacity": 1}, 500, function () {
        //                         setTimeout(function () {
        //                             $("#daoju2_2").animate({"opacity": 0}, 500, function () {
        //                                 $("#daoju2_2").css("display", "none");
        //                                 zanting();
        //                                 biansheng();
        //                             })
        //                         }, 1000);
        //                     });
        //                     jianshu = 2;
        //                     setTimeout(function () {
        //                         jianshu = 0
        //                     }, 5000);
        //                 } else if (props[j].planboomimage == "image/daoju3.png") {
        //                     $("#daoju1_1").css("display", "block");
        //                     $("#daoju2_2").css("display", "none");
        //                     $("#daoju3_3").css("display", "none");
        //                     diachi.play();
        //                     $("#daoju1_1").animate({"opacity": 1}, 500, function () {
        //                         setTimeout(function () {
        //                             $("#daoju1_1").animate({"opacity": 0}, 500, function () {
        //                                 $("#daoju1_1").css("display", "none");
        //                                 zanting();
        //                                 biansheng();
        //                             })
        //                         }, 1000);
        //                     });
        //                     addhp()
        //                 }
        //
        //             }
        //         }
        //     }
        // }
    }
}

function biansheng() {
    selfplan.imagenode.src = "image/myfeiji2.png";
    setTimeout(function () {
        selfplan.imagenode.src = "image/myfeiji1.png";
    }, 5000)
}

/*
开始游戏按钮点击事件
 */
var set;
var dj;
var adddj_time = 10000;

function addhp() {
    myhp++;
    $("#label2").html(myhp);
}

// 隐藏
// document.addEventListener('visibilitychange', function () {
//     // 用户离开了当前页面
//     if (document.visibilityState === 'hidden') {
//         bg.pause();//暂停
//     }
//
//     // 用户打开或回到页面
//     if (document.visibilityState === 'visible') {
//         bg.play();//播放
//     }
// });

function gemeover() {
    if (!post_once) {
        post_once = true;
        $.ajax({
            url: "https://vivo201907.angwei.net/api/joinGame.json",
            type: "post",
            data: {
                token: token,
                score: scores
            },
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded',
            success: function (res) {
                console.log(res);
            },
            error: function (e) {
                // 抛弃异常
            }
        });
    }
}

function begin() {

    startdiv.style.display = "none";
    mainDiv.style.display = "block";
    selfplan.imagenode.style.display = "block";
    scorediv.style.display = "block";
    smdiv.style.display = "block";
    $("#label2").html(myhp);

    Rain({
        speed: [0,0], // 风速范围
        hasBounce: false, // 是否有回弹效果
        wind_direction: 250, // 风向
        gravity: 7.0, // 重力
        maxNum: 300, // 雨滴最大数量
        numLevel: 5, // 每次生成雨滴数量
        drop_chance: 0.4 // 下雨的概率
    });

    /*
     调用开始函数
     */
    set = setInterval(start, 20);
    // dj = setInterval(adddj, adddj_time);
    $("#phb").click(function () {
        if (!btn_once) {
            btn_once = true;
            wx.miniProgram.redirectTo({url: '/pages/weixin/weixin?type=1'})
        }
    });
    $("#fx").click(function () {
        if (!btn_once) {
            btn_once = true;
            wx.miniProgram.redirectTo({url: '/pages/weixin/weixin?type=0'})
        }
    });
    $("#ty").click(function () {
        if (!btn_once) {
            btn_once = true;
            wx.miniProgram.redirectTo({url: '/pages/weixin/weixin?type=2'})
        }
        //wx.miniProgram.navigateToMiniProgram({
        //        appId: 'wx6217df343d4c569c',
        //        path: "pages/product/product?wareId=100006386682"
        //})
        //}
    });
}

//游戏结束后点击继续按钮事件
function jixu() {
    location.reload(true);
}

/*
    完成界面的初始化
    敌方小飞机一个
    我方飞机一个
 */
