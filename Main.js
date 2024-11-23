const The_Icon = document.querySelector(".The_Icon");

const The_input = document.querySelector(".The_input");

const The_Button = document.querySelector(".The_Button");

const Div_Of_Plans = document.querySelector(".Div_Of_Plans");

const Restart = document.querySelector(".Restart");

let Test_Local_storage = window.localStorage.getItem("Tasks");

let Test_Local_storage_parse = JSON.parse(Test_Local_storage);

// Div_Of_Plans.style.display = "none";

let Array_Of_Taskes = [];

if (Test_Local_storage_parse !== null) {
  Array_Of_Taskes = Test_Local_storage_parse;
}

Array_Of_Taskes.forEach((element) => {
  let Div_Of_Task_And_Button = document.createElement("div");

  Div_Of_Task_And_Button.classList.add("Div_Of_Task_And_Button");

  Div_Of_Plans.appendChild(Div_Of_Task_And_Button);

  let Task = document.createElement("div");

  Task.textContent = element.title;

  Task.classList.add("Task");
  Task.id = "Task_Id";
  if (element.completed == true) {
    Task.classList.add("done");
  }
  Task.setAttribute("data-id", element.id);

  let Delet_Buton = document.createElement("button");

  Delet_Buton.textContent = "Delete";

  Delet_Buton.classList.add("The_Button_Of_Delete");

  Div_Of_Task_And_Button.appendChild(Task);
  Div_Of_Task_And_Button.appendChild(Delet_Buton);
});

 The_Icon.addEventListener("click", () => {
   if (Div_Of_Plans.style.opacity !== "0") {
     Div_Of_Plans.style.opacity = "0";  
   } else {
     Div_Of_Plans.style.opacity = "100";
   }
 });
Restart.addEventListener("click", () => {
  Div_Of_Plans.textContent = "";

  localStorage.clear();

  Array_Of_Taskes = [];
});

The_Button.addEventListener("click", () => {
  if (The_input.value !== "") {
    addTaskToArray(The_input.value);

    The_input.value = "";
  }
});

function addTaskToArray(The_input_value) {
  const Task = {
    id: Date.now(),

    title: The_input_value,

    completed: false,
  };

  Array_Of_Taskes.push(Task);

  AddElementsToPageFrom(Array_Of_Taskes);

  AddDataToLocalStorageFrom(Array_Of_Taskes);

  // console.log(typeof Array_Of_Taskes)
  // console.log(typeof JSON.stringify(Array_Of_Taskes))
}

function AddElementsToPageFrom(Array_Of_Taskes) {
  Div_Of_Plans.innerHTML = "";

  Array_Of_Taskes.forEach((element) => {
    let Div_Of_Task_And_Button = document.createElement("div");

    Div_Of_Task_And_Button.classList.add("Div_Of_Task_And_Button");

    Div_Of_Plans.appendChild(Div_Of_Task_And_Button);

    let Task = document.createElement("div");

    Task.textContent = element.title;
    Task.id = "Task_Id";
    Task.classList.add("Task");
    if (element.completed == true) {
      Task.classList.add("done");
    }
    Task.setAttribute("data-id", element.id);

    const dataId = Task.getAttribute("data-id");

    let Delet_Buton = document.createElement("button");

    Delet_Buton.textContent = "Delete";

    Delet_Buton.classList.add("The_Button_Of_Delete");

    Div_Of_Task_And_Button.appendChild(Task);
    Div_Of_Task_And_Button.appendChild(Delet_Buton);
  });
}

function AddDataToLocalStorageFrom(Array_Of_Taskes) {
  window.localStorage.setItem("Tasks", JSON.stringify(Array_Of_Taskes));
}

Div_Of_Plans.addEventListener("click", (Element) => {
  if (Element.target.textContent === "Delete") {
    let Test_Local_storage_Delet = window.localStorage.getItem("Tasks");

    let Test_Local_storage_parse_Delet = JSON.parse(Test_Local_storage_Delet);

    let Test_Filter_local = Test_Local_storage_parse_Delet.filter((object) => {
      return (
        Element.target.previousElementSibling.getAttribute("data-id") !=
        object.id
      );
    });

    Element.target.parentElement.remove();
    window.localStorage.setItem("Tasks", JSON.stringify(Test_Filter_local));

    Array_Of_Taskes = Test_Filter_local;
  }

  if (Element.target.id === "Task_Id") {
    if (Element.target.classList.contains("done")) {
      Element.target.classList.remove("done");

      Array_Of_Taskes.forEach((element) => {
        if (element.id == Element.target.getAttribute("data-id")) {
          //  Element.completed = true;
          element.completed = false;
        }
      });
    } else {
      Element.target.classList.add("done");

      Array_Of_Taskes.forEach((element) => {
        if (element.id == Element.target.getAttribute("data-id")) {
          //  Element.completed = true;
          element.completed = true;
        }
      });
    }

    window.localStorage.setItem("Tasks", JSON.stringify(Array_Of_Taskes));
  }
});

// function GetDataFromLocalStorage(){

// let Data = window.localStorage.getItem("Tasks");

// if(Data){

// let Tasks = JSON.parse(Data);
// console.log(Tasks)
// }

// }

// GetDataFromLocalStorage()

// localStorage.clear()
