'use strict';
class ToDo {
    list = JSON.parse(localStorage.getItem('toDolist')) || [];
    constructor(buttons) {
        const {input, addBtn, editBtn, deleteBtn, checkBtn} = buttons;
        this.input = document.querySelector(input);
        this.addBtn = document.querySelector(addBtn);
        this.editBtn = document.querySelectorAll(editBtn);
        this.deleteBtn = document.querySelectorAll(deleteBtn);
        this.checkBtn = document.querySelectorAll(checkBtn);
    }

    addToDo(toDoItem) {
        this.list.push(toDoItem);
        localStorage.setItem('toDolist', JSON.stringify(this.list));
    }

    start() {
        this.addBtn.addEventListener('click', () => {
           const {value} = this.input;
           const toDoItem = {id: this.list.length + 1, text: value, checked: false};           
           this.addToDo(toDoItem);
        })
    }
}
const buttons = {
    input: '#to-do-input',
    addBtn: '#to-do-add', 
    editBtn: '.edit-icon', 
    deleteBtn: '.delete-icon', 
    checkBtn: '.done'
};
const toDo = new ToDo(buttons);
toDo.start();