console.log('abc');
var sessionService = {};
            var userInfo = null;
            sessionService.getUserInfo = function () {
                if (!userInfo) {
                    userInfo = JSON.parse(localStorage.getItem("user"));
                }
                return userInfo;
            };

            sessionService.getUserInfoWithKey = function (key) {
                var info = sessionService.getUserInfo();
                if (info[key]) {
                    return info[key];
                }
            };

            sessionService.saveUserInfo = function (data) {
                localStorage.setItem("user", JSON.stringify(data));
            };

            sessionService.deleteSession = function () {
                userInfo = null;
                localStorage.clear();
            };

            sessionService.getSessionId = function () {
                return localStorage.getItem("sessionId");
            };

            sessionService.setSessionId = function (sessionId) {
                localStorage.setItem("sessionId", sessionId);
            };

            sessionService.checkUserSession = function () {
                var info = sessionService.getUserInfo();
                var url = '';
                var endUrl = url.substring(url.lastIndexOf('/') + 1, url.lenght);
                if (!info) {
                    if (endUrl !== "signin" && endUrl !== "signup" && endUrl !== "forgotpassword") {
                        StateChanger.goTo('signin', { q: 'LogoutA' });
                    }
                    return false;
                } else {
                    if (endUrl === "signin" || endUrl === "signup" || endUrl === "forgotpassword") {
                        var role = sessionService.getUserInfoWithKey('role');
                        if (role.toLowerCase() === "admin") {
                           
                        } else {
                            
                        }
                    }
                    return true;
                }
            };