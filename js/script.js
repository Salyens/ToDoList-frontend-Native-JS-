"use strict";
class ToDo {
  list = JSON.parse(localStorage.getItem("toDolist")) || [];
  editId = null;
  constructor(buttons) {
    const { input, addBtn, msg } = buttons;
    this.input = document.querySelector(input);
    this.addBtn = document.querySelector(addBtn);
    this.msg = document.querySelector(msg);
  }

  addToDo(toDoItem) {
    this.list.push(toDoItem);
    localStorage.setItem("toDolist", JSON.stringify(this.list));
  }

  addLi(value, id, checked) {
    let deleteSpan;
    let editSpan;
    let doneDiv;

    const createLiHTML = () => {
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const editDeleteDiv = document.createElement("div");
      editSpan = document.createElement("span");
      deleteSpan = document.createElement("span");
      const input = document.createElement("input");
      doneDiv = document.createElement("div");
      editDeleteDiv.className = "edit-delete";
      editSpan.className = "edit-icon";
      deleteSpan.className = "delete-icon";
      li.setAttribute("data-id", id);
      editSpan.innerHTML = '<i class="fa fa-edit"></i>';
      deleteSpan.innerHTML = '<i class="fa fa-trash-o"></i>';
      editDeleteDiv.append(editSpan);
      editDeleteDiv.append(deleteSpan);
      li.append(editDeleteDiv);
      ul.append(li);
      input.className = "to-do-text";
      input.value = value;
      li.append(input);
      doneDiv.className = "done";
      doneDiv.innerHTML = '<i class="fa fa-check-circle"></i>';
      li.append(doneDiv);

      if (checked) input.classList.add("line-through");
      input.disabled = true;
    };
    createLiHTML();

    deleteSpan.addEventListener("click", (event) => {
      if (this.editId) this.msg.innerText = "Complete changing your task";
      else {
        const index =
          event.target.parentElement.parentElement.parentElement.getAttribute(
            "data-id"
          );
        const newList = this.list.filter((item) => item.id != index);
        this.list = newList;
        this.addAndDisplayListItem();
        localStorage.setItem("toDolist", JSON.stringify(this.list));
        this.msg.innerText = "";
      }
    });

    doneDiv.addEventListener("click", (event) => {
      if (this.editId) this.msg.innerText = "Complete changing your task";
      else {
        const index =
          event.target.parentElement.parentElement.getAttribute("data-id");
        const findToDoItem = this.list.find((item) => item.id == index);
        findToDoItem.checked = !findToDoItem.checked;
        localStorage.setItem("toDolist", JSON.stringify(this.list));
        this.addAndDisplayListItem();
        this.msg.innerText = "";
      }
    });

    editSpan.addEventListener("click", (event) => {
      const idLi =
        event.target.parentElement.parentElement.parentElement.getAttribute(
          "data-id"
        );
      const input =
        event.target.parentElement.parentElement.parentElement.querySelector(
          "input"
        );
      let checkDoneTaskValue = false;

      const clickEdit = () => {
        editSpan.innerHTML = '<i class="fa fa-save"></i>';
        this.editId = id;
        input.disabled = false;
      };

      const clickSave = () => {
        this.msg.innerText = "";
        editSpan.innerHTML = '<i class="fa fa-edit"></i>';
        this.editId = null;
        input.disabled = true;
      };

      const checkDoneTask = () => {
        for (const el of this.list) {
          if (el.id == idLi && el.checked) {
            this.msg.innerText = "This task has been already DONE";
            checkDoneTaskValue = true;
            return;
          }
        }
      };
      checkDoneTask();
      if (checkDoneTaskValue) return;

      if (!this.editId) clickEdit();
      else if (this.editId == idLi) {
        clickSave();
        const checkAndChangeInputText = () => {
          for (const el of this.list) {
            if (el.text === input.value && el.id != idLi) {
              this.msg.innerText = "This task has been already ADDED";
              clickEdit();
              this.listenInput(input);
              return;
            } else if (el.text !== input.value && el.id == idLi) {
              this.msg.innerText = "";
              el.text = input.value;
              localStorage.setItem("toDolist", JSON.stringify(this.list));
            }
          }
        };
        checkAndChangeInputText();
      } else this.msg.innerText = "Complete changing your task";
    });
  }

  addAndDisplayListItem() {
    const ul = document.querySelector("ul");
    ul.innerHTML = "";

    this.list.sort((a, b) => a.id - b.id);
    this.list.sort((a, b) => a.checked - b.checked);
    for (let i = 0; i < this.list.length; i++) {
      const value = this.list[i].text;
      const id = this.list[i].id;
      const checked = this.list[i].checked;
      this.addLi(value, id, checked);
    }
  }

  listenInput(input) {
    input.addEventListener("input", () => {
      this.msg.innerText = "";
    });
  }

  start() {
    if (this.list.length) this.addAndDisplayListItem();
    this.addBtn.addEventListener("click", () => {
      if (this.editId) this.msg.innerText = "Complete changing your task";
      else {
        const { value } = this.input;
        const toDoItem = {
          id: new Date().getTime(),
          text: value,
          checked: false,
        };
        const checkValue = (value) => {
          for (const el of this.list) {
            if (el.text === value) {
              this.msg.innerText = "This task has been already ADDED";
              this.listenInput(this.input);
              return;
            }
          }
          if (!value.length) this.msg.innerText = "Enter your task";
          else {
            this.msg.innerText = "";
            this.addToDo(toDoItem);
            this.addAndDisplayListItem();
            this.input.value = "";
          }
        };
        checkValue(value);
      }
    });
  }
}
const buttons = {
  input: "#to-do-input",
  addBtn: "#to-do-add",
  msg: "#msg",
};
const toDo = new ToDo(buttons);
toDo.start();
