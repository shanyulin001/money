class shopcar {
    shop() {
        //获取对应的cookie转换成数组。
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            let arrsid = getcookie('cookiesid').split(',');
            let arrnum = getcookie('cookienum').split(',');
            console.log(arrsid.length);
            for (let i = 0; i < arrsid.length; i++) {
                this.function(arrsid[i], arrnum[i]);
            }
        }
    }

    function(sid, num) {
        let this1 = this;
        let shopping = document.querySelector('.shopping');
        $ajax({ //调用$ajax函数
            url: 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/bannar.php',
            dataType: 'json'
        }).then(function(bannar) { //区域循环式渲染
            for (let i = 0; i < bannar.length; i++) {
                if (bannar[i].sid === sid) {
                    let strhtml = '';
                    strhtml += `
                    <ul class="cargo">
                    <li class="information1">
                        <input type="checkbox" name="button1" class="button2">
                    </li>
                    <li class="picture"><img src="${bannar[i].url}" alt=""></li>
                    <li class="shopinfor"><p class="xinxi">${bannar[i].title}</p></li>
                    <li class="piece" class="piece1">￥${bannar[i].piece}</li>
                    <li class="num"><i class="add">+</i><input type="text" class="num1" value="${num}"><i class="sub">-</i></li>
                    <li class="count count1">${bannar[i].piece*num}</li>
                    <li class="do"><p class="delete">删除</p></li>
                </ul>
            `;
                    shopping.innerHTML += strhtml;
                }
            }
            // 获取所有商品的总价，存到数组中
            let numbe = document.querySelectorAll('.count1');
            let shuzi = [];
            for (let i = 0; i < numbe.length; i++) {
                shuzi.push(numbe[i].innerHTML);
            }
            console.log(shuzi);
            //购物车商品数量加减函数
            let addkey = document.querySelectorAll('.add'); //加号
            let subkey = document.querySelectorAll('.sub'); //减号
            let numbers = document.querySelectorAll('.num1'); //数量
            // let piece = document.querySelectorAll('.piece1'); //单价
            let count1 = document.querySelectorAll('.count1'); //单个商品的合计
            let numbb = [];
            for (let i = 0; i < numbers.length; i++) {
                numbb.push(numbers[i].value);
            }
            for (let i = 0; i < numbers.length; i++) {
                this1.addsub(addkey[i], subkey[i], numbb[i], numbers[i], count1[i], bannar[i].piece);
            }
        });

    }
    //购物车商品数量加减函数
    addsub(add, sub, num, numbe, heji, danjia) { //add代表+号 sub代表-号 sum代表初始数值 numbe代表数量显示区域
        add.onclick = function() {
            num++;
            if (num > 99) {
                num = 99;
            }
            numbe.value = num;
            heji.innerHTML = danjia * num;
        }
        sub.onclick = function() {
            num--;
            if (num < 1) {
                num = 1
            }
            numbe.value = num;
            heji.innerHTML = danjia * num;
        }
    }
}
new shopcar().shop();