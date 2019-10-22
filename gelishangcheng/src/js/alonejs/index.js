class everyday {
    // 渲染区域
    // 轮播图获取数据渲染的js
    bannarpic() {
            let _this = this;
            let bannararea = document.querySelector('.pic');
            $ajax({ //调用$ajax函数
                url: 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/bannar.php',
                dataType: 'json'
            }).then(function(bannar) { //轮播图区域循环式渲染
                let strhtml = '';
                for (let value of bannar) { //bannar：数据库表名称
                    strhtml += `
                <li>
                <a href="detalis.html?sid=${value.sid}&table=bannar" target="_blank" >
                    <div class="bgbox" style="background: url('${value.picurl}') no-repeat center"></div>
                </a>
                </li> 
                `;
                }
                // 内容输出
                bannararea.innerHTML = strhtml;
                let list = document.querySelectorAll('.pic li');
                let bbb = list.length; //轮播li的长度
                _this.bannar(bbb); //轮播图效果
                // console.log(bbb);
            });

        }
        // 热销推荐内容渲染
    host() {
        let hotsale = document.querySelector('.hotsale ul');
        $ajax({
            url: 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/index1.php',
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

    // 效果区域
    // 轮播图面向对象函数
    //轮播图效果在轮播图渲染区引用
    bannar(ppp) { //ppp代表轮播图片的个数
            //获取最外面的div
            let box = document.querySelector('.bannar');
            //获取相框
            let screen = box.children[0];
            //获取相框的宽度
            let imgWidth = screen.offsetWidth;
            //获取ul
            let ulObj = screen.children[0];
            //获取ul中的所有的li
            let list = ulObj.children;
            //获取ol
            let olObj = screen.children[1];
            let pic = 0; //全局变量
            //创建小按钮----根据ul中的li个数
            for (let i = 0; i < ppp; i++) {
                //创建li标签,加入到ol中
                let liObj = document.createElement("li");
                olObj.appendChild(liObj);
                liObj.innerHTML = (i + 1);
                //在每个ol中的li标签上添加一个自定义属性,存储索引值
                liObj.setAttribute("index", i);
                //注册鼠标进入事件
                liObj.onmouseover = function() {
                    //先干掉所有的ol中的li的背景颜色
                    for (let j = 0; j < olObj.children.length; j++) {
                        olObj.children[j].removeAttribute("class");
                    }
                    //设置当前鼠标进来的li的背景颜色
                    this.className = "active";
                    //获取鼠标进入的li的当前索引值
                    pic = this.getAttribute("index");
                    //移动ul
                    animate(ulObj, -pic * imgWidth);
                };
            }
            //设置ol中第一个li有背景颜色
            olObj.children[0].className = "active";

            //自动播放
            let timeId = setInterval(clickHandle, 3000);

            //鼠标进入到box
            box.onmouseover = function() {
                //鼠标进入废掉之前的定时器
                clearInterval(timeId);
            };
            //鼠标离开box
            box.onmouseout = function() {
                //鼠标离开自动播放
                timeId = setInterval(clickHandle, 3000);
            };

            function clickHandle() {
                //如果pic的值是5,恰巧是ul中li的个数-1的值,此时页面显示第六个图片,而用户会认为这是第一个图,
                //所以,如果用户再次点击按钮,用户应该看到第二个图片
                if (pic == ppp - 1) {
                    //如何从第6个图,跳转到第一个图
                    pic = 0; //先设置pic=0
                    ulObj.style.left = 0 + "px"; //把ul的位置还原成开始的默认位置
                }
                pic++; //立刻设置pic加1,那么此时用户就会看到第二个图片了
                animate(ulObj, -pic * imgWidth); //pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
                //如果pic==5说明,此时显示第6个图(内容是第一张图片),第一个小按钮有颜色,
                if (pic == ppp - 1) {
                    //第五个按钮颜色干掉
                    olObj.children[olObj.children.length - 1].className = "";
                    //第一个按钮颜色设置上
                    olObj.children[0].className = "active";
                } else {
                    //干掉所有的小按钮的背景颜色
                    for (let i = 0; i < olObj.children.length; i++) {
                        olObj.children[i].removeAttribute("class");
                    }
                    olObj.children[pic].className = "active";
                }

            };

            //设置任意的一个元素,移动到指定的目标位置
            function animate(element, target) {
                clearInterval(element.timeId);
                //定时器的id值存储到对象的一个属性中
                element.timeId = setInterval(function() {
                    //获取元素的当前的位置,数字类型
                    let current = element.offsetLeft;
                    //每次移动的距离
                    let step = 10;
                    step = current < target ? step : -step;
                    //当前移动到位置
                    current += step;
                    if (Math.abs(current - target) > Math.abs(step)) {
                        element.style.left = current + "px";
                    } else {
                        //清理定时器
                        clearInterval(element.timeId);
                        //直接到达目标
                        element.style.left = target + "px";
                    }
                }, 3);
            }
        }
        // 楼梯效果区域
    stairs() {
        this.loutinav = $('.fixfloor');
        this.loutili = $('.fixfloor li').not('.last');
        this.louceng = $('.louceng');
        this.last = $('.last');


        let _this = this;
        let $top = $(window).scrollTop(); //获取当前的scrollTop值
        if ($top >= 871) {
            this.loutinav.show();
        } else {
            this.loutinav.hide();
        }
        //1.拖动滚动显示隐藏楼梯
        $(window).on('scroll', function() {
            let $top = $(this).scrollTop();
            if ($top >= 870) {
                _this.loutinav.show();
            } else {
                _this.loutinav.hide();
            }

            //4.拖动滚轮，楼梯和楼层对应
            //利用楼层的top值进行判断。
            _this.louceng.each(function(index, element) {
                //每一个楼层的top值，固定的值。
                let $loucengtop = _this.louceng.eq(index).offset().top + $(element).height() / 2;
                if ($loucengtop > $top) {
                    _this.loutili.removeClass('activefloor');
                    _this.loutili.eq(index).addClass('activefloor');
                    return false;
                }
            });

        });

        //2.点击左侧的楼梯，显示右侧对应的图层
        this.loutili.on('click', function() {
            $(this).addClass('activefloor').siblings('li').removeClass('activefloor');
            //获取每一个楼层的top值
            let $loucengtop = _this.louceng.eq($(this).index()).offset().top + 100;
            //document.documentElement.scrollTop=100
            $('html,body').animate({
                scrollTop: $loucengtop
            });
        });

        //3.回到顶部
        this.last.on('click', function() {
            $('html,body').animate({
                scrollTop: 0
            });
        });
    }




    show() { //渲染
        this.host(); //热销推荐
        this.bannarpic(); //轮播图
        this.daychoiceness(); //每日精选
        this.one(); //1楼
        this.two(); //2楼
        this.three(); //3楼
        this.four(); //4楼


    }
    effect() { //效果
        this.stairs(); //楼梯效果
    }
}
new everyday().show();
new everyday().effect();