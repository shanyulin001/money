class zhuce {
    constructor() {
        // const usephone = document.querySelector('#phone');
        // const usepassword = document.querySelector('#password');
        // const usepassword0 = document.querySelector('#password0');
        // const usecode = document.querySelector('#code');
        // const usephone = document.querySelector('#phone');
        const input = document.querySelectorAll('input');
        const tellock = true;
    }
    tab() { //tab切换
        let user = document.querySelector('#tabuse'); //用户注册按钮
        let email = document.querySelector('#tabemails'); //邮箱注册按键
        let usezhuce = document.querySelector('.usezhuce'); //用户注册表页面
        let emailzhuce = document.querySelector('.emailzhuce'); //邮箱注册表页面
        user.onclick = function() { //点击用户注册按钮
            user.className = 'qiehuan';
            email.className = '';
            usezhuce.style.display = 'block'; //显示
            emailzhuce.style.display = 'none';
        }
        email.onclick = function() { //点击邮箱注册按键
            user.className = '';
            email.className = 'qiehuan';
            usezhuce.style.display = 'none'; //隐藏
            emailzhuce.style.display = 'block';
        }
    }
    regular() { //表单正则
        let input = document.querySelectorAll('input');
        let tellock = true;
        let emaillock = true;
        let chinalock = true;
        let cartidlock = true;
        let passlock = true;

        //手机号码验证
        input[0].onblur = function() { //手机号码验证
                let reg = /^1[3578]\d{9}$/; //手机号码验证规则
                if (this.value !== '') { //验证手机号码不能为空
                    if (reg.test(this.value)) { //检测手机号码是否合法
                        tellock = true;
                        this.style.border = 'rgb(238,238,238) 2px solid';
                    } else {
                        this.style.border = 'red 1px solid';
                        tellock = false;
                        this.title = '请输入正确的手机号码';
                    }
                } else if (this.value == '') {
                    this.style.border = 'red 1px solid';
                    this.title = '手机号码不能为空';
                    tellock = false;
                } else {
                    this.style.border = 'red 1px solid';
                    this.title = '请输入正确的手机号码';
                    tellock = false;
                }
            }
            //密码验证
        input[1].oninput = function() {
            if (this.value.length >= 6 && this.value.length <= 12) {
                var regnum = /[0-9]+/g; //数字
                var reguppercase = /[A-Z]+/g; //大写字母
                var reglowercase = /[a-z]+/g; //小写字母
                var other = /[\W\_]+/g; //其他字符
                var count = 0; //计算种类
                if (regnum.test(this.value)) {
                    count++;
                }
                if (reguppercase.test(this.value)) {
                    count++;
                }
                if (reglowercase.test(this.value)) {
                    count++;
                }
                if (other.test(this.value)) {
                    count++;
                }
                switch (count) {
                    case 1:
                        this.style.border = 'red 1px solid';
                        this.title = '请输入6-12位密码';
                        passlock = false;
                        break;
                    case 2:
                    case 3:
                        aSpan[4].innerHTML = '中';
                        aSpan[4].style.color = 'orange';
                        passlock = true;
                        break;
                    case 4:
                        aSpan[4].innerHTML = '强';
                        aSpan[4].style.color = 'green';
                        passlock = true;
                        break;
                }
            } else {
                aSpan[4].innerHTML = '密码长度有误';
                aSpan[4].style.color = 'red';
                passlock = false;
            }
        }

        aInput[4].onblur = function() {
            if (this.value !== '') {
                if (passlock) {
                    aSpan[4].innerHTML = '√';
                    aSpan[4].style.color = 'green';
                } else {
                    aSpan[4].innerHTML = '密码格式有误';
                    aSpan[4].style.color = 'red';
                    passlock = false;
                }

            } else {
                aSpan[4].innerHTML = '密码不能为空';
                aSpan[4].style.color = 'red';
                passlock = false;
            }
        };


    }
}
new zhuce().tab(); //tab切换
new zhuce().regular(); //表单正则