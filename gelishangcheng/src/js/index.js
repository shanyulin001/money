class everyday {
    constructor() {
            const phpurl = 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/';
        }
        // 轮播图获取数据渲染的js
    bannarpic() {
            let bannararea = document.querySelector('.pic');
            $ajax({ //调用$ajax函数
                url: 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/bannar.php',
                dataType: 'json'
            }).then(function(bannar) { //轮播图区域循环式渲染
                let strhtml = '';
                for (let value of bannar) { //bannar：数据库表名称
                    strhtml += `
                <a href="detalis.html?sid=${value.sid}" target="_blank">
                <li style="background: url('${value.url}') no-repeat center"> 
                </li></a>
                `;
                }
                // 内容输出
                bannararea.innerHTML = strhtml;
            });

        }
        // 热销推荐内容渲染
    host() {
        let hotsale = document.querySelector('.hotsale ul');
        $ajax({
            url: 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/index.php',
            dataType: 'json'
        }).then(function(information) { //information数据库表
            let strhtml = '<ul>';
            for (let value of information) {
                strhtml += `   
                <li> 
                <a href="detalis.html" target="_blank">
                        <img src="${value.url}">
                        </a>
                </li>
                `;
            }
            strhtml += '</ul>';
            hotsale.innerHTML = strhtml;
        });
    }

    // 每日推荐区域
    daychoiceness() {
            let choiceness = document.querySelector('.shopping');
            let arrevery = [];
            $ajax({ //调用$ajax函数
                url: 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/everyday.php',
                dataType: 'json'
            }).then(function(everyday) { // 每日推荐区域循环式渲染
                let strhtml = '';
                for (let value of everyday) { //bannar：数据库表名称
                    arrevery.push(value.url);
                }
                strhtml += `
            <a href="detalis.html" target="_blank"><li class="picleft"><img src="${arrevery[0]}"></li></a>
            <li class="piccenter">
            <a href="detalis.html" target="_blank"><div class="piccentertop"><img src="${arrevery[1]}"></div></a>
            <a href="detalis.html" target="_blank"><div class="piccenterbl"><img src="${arrevery[2]}"></div></a>
            <a href="detalis.html" target="_blank"><div class="piccenterbr"><img src="${arrevery[3]}"></div></a>
            </li>
            <li class="picright">
            <a href="detalis.html" target="_blank"><div class="picrighttop"><img src="${arrevery[4]}"></div></a>
            <a href="detalis.html" target="_blank"><div class="picrightbot"><img src="${arrevery[5]}"></div></a>
            </li>
            `;

                // 内容输出
                choiceness.innerHTML = strhtml;
            });
        }
        // 楼层区域公共函数
    floor(classname, aaa) { //classname代表取中需要渲染元素document.querySelector('.XXX'),aaa代表楼层数，为了方便选择
        let floornum = classname;
        let arr = [];
        let titlearr = [];
        let introarr = [];
        let piecearr = [];
        $ajax({
            url: 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/floor.php',
            dataType: 'json'
        }).then(function(onefloor) { //onefloor数据库表
            let strhtml = '';
            let ulhtml = '';
            for (let value of onefloor) {
                arr.push(value.url); //取图片链接
                titlearr.push(value.title); //商品标题
                introarr.push(value.introduce); //商品介绍
                piecearr.push(value.piece); //商品价格
            }
            strhtml += `   
            <div class="iceboxleft"><a href="detalis.html" target="_blank" title="${titlearr[0]}"><img src="${arr[0]}"></a></div>
            <div class="iceboxcenter"><a href="detalis.html" target="_blank" title="${titlearr[1]}"><img src="${arr[1]}"></a></div>
            <div class="iceboxright">
                <ul class="iceboxrightul">    
                </ul>
            </div>
                `; //渲染出左中右三部分，左和中渲染结束，右边列表区域需要再次渲染
            floornum.innerHTML = strhtml;
            let floornumul = document.querySelectorAll('.iceboxrightul');
            for (let i = 0; i < 6; i++) {
                ulhtml += `
                <li>
                                <a href="detalis.html" target="_blank" class="floorpic" title="${titlearr[i+2]}"><img src="${arr[i+2]}"></a>
                                <h4>
                                    <a href="detalis.html" target="_blank" title="${titlearr[i+2]}">${titlearr[i+2]}</a>
                                </h4>
                                <p>
                                    <a href="detalis.html" target="_blank" title="${titlearr[i+2]}">${introarr[i+2]}</a>
                                </p>
                                <span>￥${piecearr[i+2]}</span>
                            </li>
                `; //渲染右边列表区域，列表有6个
            }
            floornumul[aaa].innerHTML = ulhtml;
        });
    }
    one() { //第1层
        this.floor(document.querySelector('.iceboxwash'), 0);
    }
    two() { //第2层
        this.floor(document.querySelector('.iceboxwash1'), 1);
    }
    three() { //第3层
        this.floor(document.querySelector('.iceboxwash2'), 2);
    }
    four() { //第4层
        this.floor(document.querySelector('.iceboxwash3'), 3);
    }
    show() {
        this.host();
        this.bannarpic();
        this.daychoiceness();
        this.one();
        this.two();
        this.three();
        this.four();
    }
}
new everyday().show();