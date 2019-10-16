class detalis {
    data() {
        let sid = location.search.substring(1).split('=')[1].split('&')[0];
        let table = location.search.substring(1).split('=')[2];
        let pic = document.querySelector('.pic'); //图片区域
        let picsrc = document.querySelector('.picimg'); //图片区域的图片
        let h2title = document.querySelector('.title'); //title标题
        let introduce = document.querySelector('.introduce'); //介绍信息
        let piece = document.querySelector('#piece'); //价格区域
        let picli = null;
        let phpurl = 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/';
        //1.将sid传给后端，后端返回对应的数据。
        $ajax({ //调用$ajax函数
            url: phpurl + 'detalis.php',
            data: {
                id: sid
                    // excel: table
            },
            dataType: 'json'
        }).then(function(objdata) { //图片区域渲染
            picsrc.src = objdata.url;
            h2title.innerHTML = objdata.title;
            introduce.innerHTML = objdata.introduce;
            piece.innerHTML = objdata.piece;
        });
        let add = document.querySelector('.add');
        let sub = document.querySelector('.sub');
        let number = document.querySelector('#num');
        var num = number.value;
        let _this = this;
        add.onclick = function() {
            num++;
            if (num > 99) {
                num = 99;
            }
            number.value = num;
            _this.cookie(sid, num);
            return num
        }
        sub.onclick = function() {
            num--;
            if (num < 1) {
                num = 1
            }
            number.value = num;
            _this.cookie(sid, num);
            return num
        }

        // this.cookie(sid, num);
    }

    //存cookie
    cookie(sidnum, shopnum) {
        let cartbtn = document.querySelector('#join');
        let buybtn = document.querySelector('#buy');
        //点击加入购物车按钮，添加购物车
        //思路：利用两个数组存放商品的id和数量
        let sidarr = []; //存放sid 
        let numarr = []; //存放数量
        //提前预定cookie的key值，才能应用判断
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            sidarr = getcookie('cookiesid').split(',');
            numarr = getcookie('cookienum').split(',');
        }
        buybtn.onclick = function() {
                if (sidarr.indexOf(sidnum) !== -1) { //第二次只需要数量累加
                    //获取当前sid对应的数量，取出数量，和当前的新的数量进行累加
                    //sidarr.indexOf(sid)//当前的sid在存入cookie数组的索引位置
                    let index = sidarr.indexOf(sidnum)
                    numarr[index] = parseInt(numarr[index]) + parseInt(shopnum);
                    addcookie('cookienum', numarr.toString(), 10);
                } else { //第一次加入购物车，创建商品列表
                    sidarr.push(sidnum);
                    console.log(sidarr);
                    addcookie('cookiesid', sidarr.toString(), 10);
                    numarr.push(shopnum);

                    addcookie('cookienum', numarr.toString(), 10);
                }
            }
            //第一次加入购物车，创建商品列表，第二次只需要数量累加,提前获取cookie来验证。
            //点击加入购物车按钮，将当前页面商品的sid存放到sidarr数组中，一起存入cookie
        cartbtn.onclick = function() {
            // console.log(132);

            //当前取出的cookie里面存放sid的数组
            if (sidarr.indexOf(sidnum) !== -1) { //第二次只需要数量累加
                //获取当前sid对应的数量，取出数量，和当前的新的数量进行累加
                //sidarr.indexOf(sid)//当前的sid在存入cookie数组的索引位置
                let index = sidarr.indexOf(sidnum)
                numarr[index] = parseInt(numarr[index]) + parseInt(shopnum);
                addcookie('cookienum', numarr.toString(), 10);
            } else { //第一次加入购物车，创建商品列表
                sidarr.push(sidnum);
                console.log(sidarr);
                addcookie('cookiesid', sidarr.toString(), 10);
                numarr.push(shopnum);

                addcookie('cookienum', numarr.toString(), 10);
            }
            alert('商品添加成功');
        }

    }

}
new detalis().data();