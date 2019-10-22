class denglu {
    init() {
        let name = document.querySelector('.name');
        let password = document.querySelector('.password');
        let denglu = document.querySelector('.denglu');
        denglu.onclick = function() {
            let ajax = new XMLHttpRequest();
            ajax.open('post', 'http://10.31.155.21/secondJavaScript/gelishangcheng/php/denglu.php', true);
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(`username=${name.value}&password=${password.value}`);
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4) {
                    //    console.log(ajax.responseText);
                    if (ajax.responseText) { //登录成功
                        //存储用户信息
                        localStorage.setItem('xingming', name.value);
                        location.href = 'geli.html';

                    } else {
                        alert('用户名或者密码错误');
                    }
                }
            }
        };
    }
}
new denglu().init();