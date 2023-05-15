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
        let ul = document.querySelector('ul');
        ul.innerHTML = '';

        for (let i = 0; i < this.list.length; i++) {
            let value = this.list[i].text;
            addLi(value);
        }            
  
        function addLi(value) {
            const ul = document.querySelector('ul');
            const li = document.createElement('li');
            const editDeleteDiv = document.createElement('div');
            const editSpan = document.createElement('span');
            const deleteSpan = document.createElement('span');
            const input = document.createElement('input');
            const doneDiv = document.createElement('div');
            editDeleteDiv.className = 'edit-delete';
            editSpan.className = 'edit-icon';
            deleteSpan.className = 'delete-icon';
            editSpan.innerHTML = '<i class="fa fa-edit">';
            deleteSpan.innerHTML = '<i class="fa fa-trash-o"></i>';
            editDeleteDiv.append(editSpan);
            editDeleteDiv.append(deleteSpan);
            li.append(editDeleteDiv);
            ul.append(li);
            input.className = 'to-do-text';
            input.value = value;
            li.append(input);
            doneDiv.className = 'done';
            doneDiv.innerHTML = '<i class="fa fa-check-circle"></i>';
            li.append(doneDiv);
        }     
    } 

    start() {
        if(this.list.length) this.addListItem();
        this.addBtn.addEventListener('click', () => {
            const {value} = this.input;
            let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
            const toDoItem = {id: this.list.length + 1, text: value, checked: false};   
            const checkValue = (value) => {
                if(!value.length) {
                    msg.innerText = 'Enter your deal';
                }
                else if(savedItems.includes(value)) {
                    msg.innerText = 'This deal has already added';
                }
                else {
                    msg.innerText = '';
                    this.addToDo(toDoItem);
                    this.addListItem();
                    this.input.value = '';
                    savedItems.push(value);
                    localStorage.setItem('savedItems', JSON.stringify(savedItems));
                }
            }
            checkValue(value)
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