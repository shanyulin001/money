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
            let form1 = document.querySelector('.usezhuce');
            let form2 = document.querySelector('.emailzhuce');
            //用户注册区域
            let tellock = true; //电话
            let codelock = true; //验证码
            let passlock = true; //密码
            let dagou = true; //打钩
            //邮箱注册区域
            let tellock2 = true; //电话
            let emaillock2 = true; //邮箱
            let uselock2 = true; //用户名
            let codelock2 = true; //验证码
            let passlock2 = true; //密码
            let dagou2 = true; //打钩
            // let repeatlock = true; //用户表验证
            // let repeatlock2 = true; //邮箱表验证

            //用户注册区域手机号码验证
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
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '手机号码不能为空';
                        tellock = false;
                    }

                    // 用户注册表单验证，验证手机号是否注册过
                    if (tellock) {
                        let ajax = new XMLHttpRequest();
                        ajax.open('post', 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/zhuce.php', true);
                        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                        ajax.send('phonenum=' + input[0].value);
                        ajax.onreadystatechange = function() {
                            if (ajax.readyState === 4) {
                                // console.log(ajax.responseText); //1
                                if (!ajax.responseText) { //不存在
                                    input[0].style.border = 'rgb(238,238,238) 2px solid';
                                    tellock = true;
                                } else { //存在
                                    // span.innerHTML = '该用户名已存在';
                                    input[0].style.border = 'blue 1px solid';
                                    input[0].title = '该手机号名已存在';
                                    input[0].style.color = 'red';
                                    tellock = false;
                                }
                            }
                        }
                    }

                }
                //用户注册区域密码验证
            input[1].oninput = function() {
                    if (this.value.length >= 6 && this.value.length <= 12) {
                        let regnum = /[0-9]+/g; //数字
                        let reguppercase = /[A-Z]+/g; //大写字母
                        let reglowercase = /[a-z]+/g; //小写字母
                        let other = /[\W\_]+/g; //其他字符
                        let count = 0; //计算种类
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
                                this.title = '6-20位字符，由不含空格的数字、字母、符号两个以上组合!';
                                passlock = false;
                                break;
                            case 2:
                            case 3:
                            case 4:
                                this.style.border = 'rgb(238,238,238) 2px solid';
                                passlock = true;
                                break;
                        }
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '6-20位字符，由不含空格的数字、字母、符号两个以上组合!';
                        passlock = false;
                    }
                }
                // 密码框失去焦点
            input[1].onblur = function() {
                if (this.value !== '') {
                    if (passlock) {
                        this.style.border = 'rgb(238,238,238) 2px solid';
                        passlock = true;
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '6-20位字符，由不含空格的数字、字母、符号两个以上组合!';
                        passlock = false;
                    }

                } else {
                    this.style.border = 'red 1px solid';
                    this.title = '密码不能为空';
                    passlock = false;
                }
            };
            //用户注册区域再次输入密码验证
            input[2].onblur = function() {
                    if (this.value == input[1].value && this.value !== '') {
                        this.style.border = 'rgb(238,238,238) 2px solid';
                        passlock = true;
                    } else if (this.value == '') {
                        this.style.border = 'red 1px solid';
                        this.title = '密码不能为空';
                        passlock = false;
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '前后密码不一致';
                        passlock = false;
                    }
                }
                // 用户注册区域验证码验证
            input[3].onblur = function() {
                    if (this.value == 1234) {
                        this.style.border = 'rgb(238,238,238) 2px solid';
                        codelock = true;
                    } else if (this.value == '') {
                        this.style.border = 'red 1px solid';
                        this.title = '验证码不能为空';
                        codelock = false;
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '验证码错误';
                        codelock = false;
                    }
                }
                // 打钩，同意协议
                // 用户注册区域打钩同意协议验证
            input[4].onsubmit = function() {
                    if (this.checked) {
                        dagou = true;
                    } else {
                        dagou = false;
                    }
                }
                //用户注册区域提交表单--onsubmit+form
            input[5].onclick = function() {

                if (input[0].value === '') {
                    input[0].style.border = 'green 1px solid';
                    input[0].title = '手机号码不能为空';
                    tellock = false;
                }
                if (input[1].value === '') {
                    input[1].style.border = 'green 1px solid';
                    input[1].title = '密码不能为空';
                    console.log(123);
                    passlock = false;
                }
                if (input[2].value === '') {
                    input[2].style.border = 'green 1px solid';
                    input[2].title = '再次输入密码不能为空';
                    console.log(1234);
                    passlock = false;
                }
                if (input[3].value === '') {
                    input[3].style.border = 'green 1px solid';
                    input[3].title = '验证码不能为空';
                    codelock = false;
                }
                if (input[4].value === '') {
                    input[4].style.border = 'green 1px solid';
                    input[4].title = '请同意协议';
                    dagou = false;
                }
                if (!tellock || !passlock || !dagou || !codelock) { //阻止跳转
                    return false;
                }

            }


            //邮箱注册区域
            // 邮箱注册区域用户名验证
            input[6].onblur = function() {
                    if (this.value !== '') {
                        if (this.value.length < 30) {
                            this.style.border = 'rgb(238,238,238) 2px solid';
                            uselock2 = true;

                        } else if (this.value.length > 30) {
                            this.style.border = 'red 1px solid';
                            this.title = '最多30位字符，由不含空格的数字、字母、符号、汉字组成!';
                            uselock2 = false;
                        }

                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '用户名不能为空';
                        uselock2 = false;
                    }

                    //验证用户名是否注册过
                    if (uselock2) {
                        let ajax = new XMLHttpRequest();
                        ajax.open('post', 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/emailzhuce.php', true);
                        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                        ajax.send('xingming=' + input[6].value);
                        ajax.onreadystatechange = function() {
                            if (ajax.readyState === 4) {
                                // console.log(ajax.responseText); //1
                                if (!ajax.responseText) { //不存在
                                    input[6].style.border = 'rgb(238,238,238) 2px solid';
                                    uselock2 = true;
                                } else { //存在
                                    // span.innerHTML = '该用户名已存在';
                                    input[6].style.border = 'blue 1px solid';
                                    input[6].title = '该用户名已存在';
                                    input[6].style.color = 'red';
                                    uselock2 = false;
                                }
                            }
                        }
                    }
                }
                // 邮箱注册区域邮箱验证
            input[7].onblur = function() {
                    var reg = /^(\w[\w\-\+]*\w)\@(\w[\w\-\+]*\w)\.(\w[\w\-\+]*\w)$/; //电子邮箱验证规则
                    if (this.value !== '') { //验证邮箱号码不能为空
                        if (reg.test(this.value)) { //检测邮箱号码是否合法
                            this.style.border = 'rgb(238,238,238) 2px solid';
                            emaillock2 = true;
                        } else {
                            this.style.border = 'red 1px solid';
                            this.title = '电子邮箱格式不正确';
                            emaillock2 = false;
                        }
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '电子邮箱不能为空';
                        emaillock = false;
                    }
                }
                //邮箱注册区域手机号码验证
            input[8].onblur = function() { //手机号码验证
                let reg = /^1[3578]\d{9}$/; //手机号码验证规则
                if (this.value !== '') { //验证手机号码不能为空
                    if (reg.test(this.value)) { //检测手机号码是否合法
                        tellock2 = true;
                        this.style.border = 'rgb(238,238,238) 2px solid';
                    } else {
                        this.style.border = 'red 1px solid';
                        tellock2 = false;
                        this.title = '请输入正确的手机号码';
                    }
                } else {
                    this.style.border = 'red 1px solid';
                    this.title = '手机号码不能为空';
                    tellock2 = false;
                }
            }

            // 邮箱注册区域密码验证
            input[9].oninput = function() {
                if (this.value.length >= 6 && this.value.length <= 12) {
                    let regnum = /[0-9]+/g; //数字
                    let reguppercase = /[A-Z]+/g; //大写字母
                    let reglowercase = /[a-z]+/g; //小写字母
                    let other = /[\W\_]+/g; //其他字符
                    let count = 0; //计算种类
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
                            this.title = '6-20位字符，由不含空格的数字、字母、符号两个以上组合!';
                            passlock2 = false;
                            break;
                        case 2:
                        case 3:
                        case 4:
                            this.style.border = 'rgb(238,238,238) 2px solid';
                            passlock2 = true;
                            break;
                    }
                } else {
                    this.style.border = 'red 1px solid';
                    this.title = '6-20位字符，由不含空格的数字、字母、符号两个以上组合!';
                    passlock2 = false;
                }
            }

            input[9].onblur = function() {
                if (this.value !== '') {
                    if (passlock) {
                        this.style.border = 'rgb(238,238,238) 2px solid';
                        passlock2 = true;
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '6-20位字符，由不含空格的数字、字母、符号两个以上组合!';
                        passlock2 = false;
                    }

                } else {
                    this.style.border = 'red 1px solid';
                    this.title = '密码不能为空';
                    passlock2 = false;
                }
            };
            //邮箱注册区域再次输入密码验证
            input[10].onblur = function() {
                    if (this.value == input[9].value && this.value !== '') {
                        this.style.border = 'rgb(238,238,238) 2px solid';
                        passlock2 = true;
                    } else if (this.value == '') {
                        this.style.border = 'red 1px solid';
                        this.title = '密码不能为空';
                        passlock2 = false;
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '前后密码不一致';
                        passlock2 = false;
                    }
                }
                // 邮箱注册区域验证码验证
            input[11].onblur = function() {
                    if (this.value == 1234) {
                        this.style.border = 'rgb(238,238,238) 2px solid';
                        codelock = true;
                    } else if (this.value == '') {
                        this.style.border = 'red 1px solid';
                        this.title = '验证码不能为空';
                        codelock = false;
                    } else {
                        this.style.border = 'red 1px solid';
                        this.title = '验证码错误';
                        codelock = false;
                    }
                }
                // 邮箱注册区域打钩同意协议验证
            input[11].onblur = function() {
                if (this.checked) {
                    dagou2 = true;
                } else {
                    dagou2 = false;
                }
            }

            //邮箱注册区域提交表单--onsubmit+form
            input[12].onclick = function() {
                if (input[6].value === '') {
                    input[6].style.border = 'red 1px solid';
                    input[6].title = '用户名不能为空';
                    uselock2 = false;
                }
                if (input[7].value === '') {
                    input[7].style.border = 'red 1px solid';
                    input[7].title = '电子邮箱不能为空';
                    emaillock2 = false;
                }
                if (input[8].value === '') {
                    input[8].style.border = 'red 1px solid';
                    input[8].title = '手机号码不能为空';
                    tellock2 = false;
                }
                if (input[9].value === '') {
                    input[9].style.border = 'red 1px solid';
                    input[9].title = '密码不能为空';
                    passlock2 = false;
                }
                if (input[10].value === '') {
                    input[10].style.border = 'red 1px solid';
                    input[10].title = '再次输入密码不能为空';
                    passlock2 = false;
                }
                if (input[11].value === '') {
                    input[11].style.border = 'red 1px solid';
                    input[11].title = '验证码不能为空';
                    codelock2 = false;
                }
                if (input[12].value === '') {
                    input[12].style.border = 'red 1px solid';
                    input[12].title = '请同意协议';
                    dagou2 = false;

                }
                if (!uselock2 || !emaillock2 || !tellock2 || !passlock2 || !codelock2) { //阻止跳转
                    return false;
                }
            }
        }
        //ajax数据传输后端
        // ajax(i) {
        //     //1.将前端的表单数据给后端--form+submit+name实现。

    //     //2.失去焦点，将用户名传给后端进行是否存在的匹配。后端返回匹配的结果。
    //     let oinput = document.querySelectorAll('input');
    //     let repeatlock = true;
    //     oinput[i].onblur = function() {
    //         let ajax = new XMLHttpRequest();
    //         ajax.open('post', 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/emailzhece.php', true);
    //         ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    //         ajax.send('xingming=' + oinput[i].value);
    //         ajax.onreadystatechange = function() {
    //             if (ajax.readyState === 4) {
    //                 // console.log(ajax.responseText); //1
    //                 if (!ajax.responseText) { //不存在
    //                     oinput[i].style.border = 'yellow 1px solid';
    //                     repeatlock = true;
    //                 } else { //存在
    //                     // span.innerHTML = '该用户名已存在';
    //                     oinput[i].style.border = 'blue 1px solid';
    //                     oinput[i].title = '该用户名已存在';
    //                     oinput[i].style.color = 'red';
    //                     repeatlock = false;
    //                 }
    //             }
    //         }
    //     };
    // form1.onsubmit = function() {
    //     if (!repeatlock) {
    //         return false;
    //     }
    // }
    // form2.onsubmit = function() {
    //     if (!repeatlock2) {
    //         return false;
    //     }
    // }
}

}
new zhuce().tab(); //tab切换
new zhuce().regular(); //表单正则
// new zhuce().ajax();