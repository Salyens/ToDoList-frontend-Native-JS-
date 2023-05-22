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
        this.list.sort((a, b) => a.checked > b.checked ? 1 : -1)
        console.log(this.list);

        localStorage.setItem('toDolist', JSON.stringify(this.list));
    }


     addLi(value, id, checked) {
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
        li.setAttribute('data-id', id);
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

        if(checked) input.classList.add('line-through');

        deleteSpan.addEventListener('click', (event) => {
            const index = event.target.parentElement.parentElement.parentElement.getAttribute('data-id');
            console.log(event.target.parentElement.parentElement.parentElement);
            const newList = this.list.filter((item) => item.id != index);
            this.list = newList;
            this.addAndDisplayListItem();
            localStorage.setItem('toDolist', JSON.stringify(this.list));
        });


        doneDiv.addEventListener('click', (event) => {
            const index = event.target.parentElement.parentElement.getAttribute('data-id');
            event.target.parentElement.parentElement.querySelector('input').classList.add('line-through');
            const findToDoItem = this.list.find(item => item.id == index);
            findToDoItem.checked = true;
            this.addAndDisplayListItem();
            localStorage.setItem('toDolist', JSON.stringify(this.list));
        })
    }   

    addAndDisplayListItem() {
        let ul = document.querySelector('ul');
        ul.innerHTML = '';
        this.list.sort((a, b) => a.checked > b.checked ? 1 : -1);
        for (let i = 0; i < this.list.length; i++) {
            let value = this.list[i].text;
            let id = this.list[i].id
            let checked = this.list[i].checked;
            this.addLi(value, id, checked);
        } 
    } 

    start() {
        if(this.list.length) this.addAndDisplayListItem();
        this.addBtn.addEventListener('click', () => {
            const {value} = this.input;
            const toDoItem = {id: new Date().getTime(), text: value, checked: false};   
            const checkValue = (value) => {
                for (const el of this.list) {
                    if(el.text === value) {
                        this.msg.innerText = 'This deal has already added';
                        return;
                    }
                }
                if(!value.length) {
                    this.msg.innerText = 'Enter your deal';
                }
                else {
                    this.msg.innerText = '';
                    this.addToDo(toDoItem);
                    this.addAndDisplayListItem();
                    this.input.value = '';
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

//написать функционал который зачеркивает сделанные дела и перемещает li в конец списка


