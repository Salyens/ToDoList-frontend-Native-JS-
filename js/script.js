'use strict';
class ToDo {
    list = JSON.parse(localStorage.getItem('toDolist')) || [];
    constructor(buttons) {
        const {input, addBtn, editBtn, deleteBtn, checkBtn, msg} = buttons;
        this.input = document.querySelector(input);
        this.addBtn = document.querySelector(addBtn);
        this.editBtn = document.querySelectorAll(editBtn);
        this.deleteBtn = document.querySelectorAll(deleteBtn);
        this.checkBtn = document.querySelectorAll(checkBtn);
        this.msg = document.querySelector(msg);
    }

    addToDo(toDoItem) {
        this.list.push(toDoItem);
        localStorage.setItem('toDolist', JSON.stringify(this.list));
    }

    addListItem() {
        if(!document.querySelector('ul')) {
            addUl ();
        }
        else {
            let ul = document.querySelector('ul');
            ul.innerHTML = '';
        }
        for (let i = 0; i < this.list.length; i++) {
            let value = this.list[i].text;
            addLi(value);
        }            
  
        function addUl () {
            const ul = document.createElement('ul');
            const divToDoList = document.querySelector('#to-do-list');
            divToDoList.append(ul);
        }

        function addLi(value) {
            let ul = document.querySelector('ul');
            let li = `<li><div class="edit-delete"><span class="edit-icon"><i class="fa fa-edit"></i></span><span class="delete-icon"><i class="fa fa-trash-o"></i></span></div><input class="to-do-text" value="${value}"><div class="done"><i class="fa fa-check-circle"></i></div></li></ul>`
            ul.insertAdjacentHTML('beforeend', li);      
        }
    } 

    start() {
        if(this.list.length) this.addListItem();
        this.addBtn.addEventListener('click', () => {
            const {value} = this.input;
            let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
            const toDoItem = {id: this.list.length + 1, text: value, checked: false};   

            function checkValue(value) {
                if(!value.length) {
                    msg.innerText = 'Enter your deal';
                }
                else if(savedItems.includes(value)) {
                    msg.innerText = 'This deal has already added';
                }
                else toDoItem.checked = true;
            }
            checkValue(value)

            if(toDoItem.checked === true) {
                this.addToDo(toDoItem);
                this.addListItem();
                this.input.value = '';
                savedItems.push(value);
                localStorage.setItem('savedItems', JSON.stringify(savedItems));
            }
        })
    } 
}
const buttons = {
    input: '#to-do-input',
    addBtn: '#to-do-add', 
    editBtn: '.edit-icon', 
    deleteBtn: '.delete-icon', 
    checkBtn: '.done',
    msg: '#msg'
};
const toDo = new ToDo(buttons);
toDo.start();

//Отобразить список введенных дел, проверка на пустое и повтор и вывод ошибки в отдельном диве, оформить pull request 