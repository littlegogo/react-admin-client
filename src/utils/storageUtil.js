// 进行local数据存储管理的工具模块
//import store from 'store';

var store = require('store');
const USER_KEY = 'USER_KEY';
const USER_TOKEN = 'USER_TOKEN';

export default{

    //---user相关
    saveUser(user){
        store.set(USER_KEY, user);
    },

    getUser() {
        return store.get(USER_KEY) || {};
    },

    removeUser(){
        store.remove(USER_KEY);
    },

    //---token相关
    saveToken(token){
        store.set(USER_TOKEN, token);
    },

    getToken() {
        return store.get(USER_TOKEN, {});
    },
    
    removeToken(){
        store.remove(USER_TOKEN);
    },

    //---- 查看所有存储
    listAll() {
        store.each(function(value, key) {
            console.log(key, '==', value)
        })
    },
}