/**
 * Created by xfzhang on 2016/10/14.
 */
(function (window) {
    const KEY = 'todo_key';
    window.todoStorage = {

        //保存
        addTodos(todos) {
            sessionStorage.setItem(KEY, JSON.stringify(todos))
        },

        //读取
        getTodos() {
            return JSON.parse(sessionStorage.getItem(KEY)||'[]')
        }
    }
})(window)