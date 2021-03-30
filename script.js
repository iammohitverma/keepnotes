let takeNoteBtn = document.querySelector(".takeNote");
let main = document.querySelector("main");

const noteAddFun = (text = "") => {
  let note = document.createElement("div");
  note.classList.add("note");
  let noteHtml = `<div class="operations">
                <button class="edit" data-tooltip="Edit"><i class="far fa-edit"></i></button>
                <button class="delete" data-tooltip="Delete"><i class="far fa-trash-alt"></i></button>
            </div>
            <div class="savedBx ${text ? "" : "hidden"}"></div>
            <textarea name="" class=" ${text ? "hidden" : ""}"></textarea>`;

  note.insertAdjacentHTML("beforeend", noteHtml);
  main.appendChild(note);
  let editBtn = note.querySelector(".edit");
  let delBtn = note.querySelector(".delete");
  let saveBx = note.querySelector(".savedBx");
  let textarea = note.querySelector("textarea");
  saveBx.innerHTML = text;
  textarea.value = text;
  editBtn.addEventListener("click", () => {
    saveBx.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });
  delBtn.addEventListener("click", () => {
    note.remove();
    updateLsVal();
  });

  updateLsVal = () => {
    let lsNotes = [];
    let allTextarea = main.querySelectorAll("textarea");

    allTextarea.forEach((currVal) => {
      console.log(currVal.value);
      lsNotes.push(currVal.value);
    });

    localStorage.setItem("keepNotes", JSON.stringify(lsNotes));
  };

  textarea.addEventListener("change", () => {
    saveBx.innerHTML = event.target.value;
    saveBx.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
    updateLsVal();
  });
};

const getValfromLs = JSON.parse(localStorage.getItem("keepNotes"));
if (getValfromLs) {
  getValfromLs.forEach((lsStoredVal) => {
    noteAddFun(lsStoredVal);
  });
}

takeNoteBtn.addEventListener("click", () => noteAddFun());
