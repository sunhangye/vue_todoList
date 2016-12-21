/**
 * Created by xfzhang on 2016/10/14.
 */
(function () {

    var filter = {
        all(todos) {
            return todos
        },
        active(todos) {
            return todos.filter(function (todo) {
                return !todo.completed
            })
        },
        completed(todos) {
            return todos.filter(function (todo) {
                return todo.completed
            })
        }
    }

    new Vue({
        el : '.todoapp',
        data : {
            todos : todoStorage.getTodos(),
            inputTodo : '',
            visibility : 'all',  //'active'  | 'completed'
            editTodo : null,
            oldTitle : null
        },
        methods : {
            //添加todo
            addTodo() {
                //检查
                var inputTodo = this.inputTodo&&this.inputTodo.trim();
                if(!inputTodo) {
                    this.inputTodo = ''
                    return
                }
                //创建todo对象
                var todo = {
                    title : inputTodo,
                    completed : false
                }
                //添加到todos
                this.todos.unshift(todo)
                //清除输入的数据
                this.inputTodo = ''

            },
            //删除一个todo
            deleteTodo(todo) {
                this.todos.$remove(todo)
            },

            //设置可见
            setVisibility(visibility) {
              this.visibility = visibility
            },

            //删除所有完成的
            deleteCompleted() {
                this.todos = filter.active(this.todos);
            },

            //进入编辑模式
            toEdit(todo) {
                this.editTodo = todo;
                this.oldTitle = todo.title
            },
            //确认更新
            confirmUpdate(todo) {
                this.editTodo = null
                this.oldTitle = null

                var title = todo.title&&todo.title.trim()
                if(!title) {
                    this.deleteTodo(todo)
                } else {
                    todo.title = title
                }
            },
            //取消更新
            cancelUpdate(todo) {
                todo.title = this.oldTitle
                this.editTodo = null
                this.oldTitle = null
            }

        },
        
        computed : {
            filterTodos() {
                return filter[this.visibility](this.todos)
            },

            //未完成的数量
            activeCount () {
                return filter.active(this.todos).length
            },

            //全选/全不选
            allDone : {
                get () {
                    return this.activeCount==0&&this.todos.length>0
                },
                set (value) {
                    this.todos.forEach(function (todo) {
                        todo.completed = value
                    })
                }
            }

        },

        watch : {
            todos : { //只要todos中发生变化就立即保存
                deep : true,
                handler : todoStorage.addTodos
            }
        },

        directives : {
            'auto-focus' : function (value) {
                if(value) {
                   this.el.focus()
                }
            }
        }
    });
})()