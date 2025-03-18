import { editor } from "./editor.js";
// categories ,Notes
let categories = [];
let notes = [];
let profileData = undefined;
//  function section

//focus
function MoverCursorToEnd(element) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.setStart(element, element.childNodes.length);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

// others
function toggleImportentLevelElements(data) {
  const importantLevelElement = document.querySelectorAll(
    ".select-level-options"
  );
  // console.log(importantLevelElement);
  for (let indexNumber in Object.keys(importantLevelElement)) {
    // console.log(importantLevelElement[indexNumber]);
    if (indexNumber == 0) {
      importantLevelElement[indexNumber].firstElementChild.setAttribute(
        "class",
        `circle ${data[indexNumber].color}`
      );
      importantLevelElement[indexNumber].firstElementChild.setAttribute(
        "id",
        `${data[indexNumber].color}`
      );
      importantLevelElement[indexNumber].lastElementChild.innerText =
        data[indexNumber].Text;
    } else if (indexNumber == 1) {
      importantLevelElement[indexNumber].firstElementChild.setAttribute(
        "class",
        `circle ${data[indexNumber].color}`
      );
      importantLevelElement[indexNumber].firstElementChild.setAttribute(
        "id",
        `${data[indexNumber].color}`
      );
      importantLevelElement[indexNumber].lastElementChild.innerText =
        data[indexNumber].Text;
    } else {
      importantLevelElement[indexNumber].firstElementChild.setAttribute(
        "class",
        `circle ${data[indexNumber].color}`
      );
      importantLevelElement[indexNumber].firstElementChild.setAttribute(
        "id",
        `${data[indexNumber].color}`
      );
      importantLevelElement[indexNumber].lastElementChild.innerText =
        data[indexNumber].Text;
    }
  }
}
function changingOrderChoosenElement(orderChoosenElement, value) {
  for (let index in orderChoosenElement) {
    if (index == 0) {
      if (value == "yellow") {
        orderChoosenElement[index].Text = "Medium";
        orderChoosenElement[index].color = value;
      } else if (value == "green") {
        orderChoosenElement[index].Text = "Low";
        orderChoosenElement[index].color = value;
      } else {
        orderChoosenElement[index].Text = "General";
        orderChoosenElement[index].color = value;
      }
    } else if (index == 1) {
      if (value == "yellow") {
        orderChoosenElement[index].Text = "General";
        orderChoosenElement[index].color = "red";
      } else if (value == "green") {
        orderChoosenElement[index].Text = "General";
        orderChoosenElement[index].color = "red";
      } else {
        orderChoosenElement[index].Text = "Medium";
        orderChoosenElement[index].color = "yellow";
      }
    } else {
      if (value == "yellow") {
        orderChoosenElement[index].Text = "Low";
        orderChoosenElement[index].color = "green";
      } else if (value == "green") {
        orderChoosenElement[index].Text = "Medium";
        orderChoosenElement[index].color = "yellow";
      } else {
        orderChoosenElement[index].Text = "Low";
        orderChoosenElement[index].color = "green";
      }
    }
  }
}
function collectImportantLevelData() {
  let flag = false;
  return function () {
    function execute(e) {
      const importantLevelElement = document.querySelector(
        ".select-level-options"
      );
      const targetElement = e.target;
      const choosenElement = { Text: undefined, color: undefined };
      const orderChoosenElement = [
        { Text: "General", color: "red" },
        { Text: "Medium", color: "yellow" },
        { Text: "Low", color: "green" },
      ];
      if (targetElement.className.includes("circle")) {
        choosenElement.Text = targetElement.nextElementSibling.innerText;
        choosenElement.color = targetElement.id;
        if (
          !targetElement.parentElement.id.includes(
            "select-level-options-first-element"
          )
        ) {
          document
            .querySelector(".select-level-container")
            .removeAttribute("open");
        }
      }
      if (targetElement.className.includes("inportent-level-text")) {
        choosenElement.Text = targetElement.innerText;
        choosenElement.color = targetElement.parentElement.firstElementChild.id;
        if (
          !targetElement.parentElement.id.includes(
            "select-level-options-first-element"
          )
        ) {
          document
            .querySelector(".select-level-container")
            .removeAttribute("open");
        }
      }
      if (targetElement.className.includes("select-level-options")) {
        choosenElement.Text = targetElement.lastElementChild.innerText;
        choosenElement.color = targetElement.firstElementChild.id;
        if (!targetElement.id.includes("select-level-options-first-element")) {
          document
            .querySelector(".select-level-container")
            .removeAttribute("open");
        }
      }
      document.querySelector(".select-level-container").dataset.color =
        choosenElement.color;
      document.querySelector(".select-level-container").dataset.text =
        choosenElement.Text;
      if (choosenElement.color != "red" && choosenElement.color != "green") {
        changingOrderChoosenElement.call(this, orderChoosenElement, "yellow");
        toggleImportentLevelElements(orderChoosenElement);

        // document
        //   .querySelector(".select-level-container")
        //   .removeAttribute("open");
      } else if (
        choosenElement.color != "red" &&
        choosenElement.color != "yellow"
      ) {
        changingOrderChoosenElement.call(this, orderChoosenElement, "green");
        toggleImportentLevelElements(orderChoosenElement);
        // document
        //   .querySelector(".select-level-container")
        //   .removeAttribute("open");
      } else {
        changingOrderChoosenElement.call(this, orderChoosenElement, "red");
        toggleImportentLevelElements(orderChoosenElement);
        // document
        //   .querySelector(".select-level-container")
        //   .removeAttribute("open");
      }
    }
    if (flag) {
      execute.apply(this, arguments);
    }
    flag = !flag;
  };
}
function getTrueContent(blocks) {
  // &&
  //   blocks[0].data.text != "No Content Added Yet."
  let text = "";
  if (blocks[0].data.text.trim() != "") {
    blocks.forEach((value) => {
      if (blocks.indexOf(value) == 0) {
        text += value.data.text;
      } else {
        text += `\n${value.data.text}`;
      }
    });
    return text;
  }
}

// switch
function switchToCategorieByDeleteBtn(length, value) {
  if (value) {
    if (length == 2) {
      if (value.index == 0) {
        const { Name, NotesNumber } = categories[value.index + 1];
        toggleMainSection("", {
          Name: Name,
          value: checkNoteNumber(NotesNumber),
        });
      } else {
        const { Name, NotesNumber } = categories[value.index - 1];
        toggleMainSection("", {
          Name: Name,
          value: checkNoteNumber(NotesNumber),
        });
      }
    }
    if (length >= 3) {
      if (value.index == categories.length - 1) {
        const { Name, NotesNumber } = categories[value.index - 1];
        toggleMainSection("", {
          Name: Name,
          value: checkNoteNumber(NotesNumber),
        });
      } else {
        const { Name, NotesNumber } = categories[value.index + 1];
        toggleMainSection("", {
          Name: Name,
          value: checkNoteNumber(NotesNumber),
        });
      }
    }
  }
}
function switchToCategorieByCilckbtn(value) {
  const { Name, NotesNumber } = value;
  if (value) {
    toggleMainSection("", {
      Name: Name,
      value: checkNoteNumber(NotesNumber),
    });
  }
}

// toggles
function toggleNoGroupSection(multiple = "toggle") {
  if (multiple == "toggle")
    document.querySelector(".nogroup").classList.toggle("hidden");
  if (multiple == "add")
    document.querySelector(".nogroup").classList.add("hidden");
  if (multiple == "remove")
    document.querySelector(".nogroup").classList.remove("hidden");
}
function toggleMainSection(multiple = "toggle", data = "") {
  if (multiple == "toggle")
    document.querySelector("main").classList.toggle("hidden");
  if (multiple == "add") document.querySelector("main").classList.add("hidden");
  if (multiple == "remove")
    document.querySelector("main").classList.remove("hidden");
  if (data) {
    document.querySelector(".header-text").innerHTML = data.Name;
    document.querySelector("#note-number").innerHTML = data.value;
  }
}
function toggleNoNotesSection(multiple = "toggle") {
  if (multiple == "toggle")
    document
      .querySelector(".empty-img-section-wrapper")
      .classList.toggle("hidden");
  if (multiple == "add")
    document
      .querySelector(".empty-img-section-wrapper")
      .classList.add("hidden");
  if (multiple == "remove")
    document
      .querySelector(".empty-img-section-wrapper")
      .classList.remove("hidden");
}
function toggleRightSection(multiple = "toggle") {
  if (multiple == "toggle")
    document.querySelector("#right-aside-section").classList.toggle("hidden");
  if (multiple == "add")
    document.querySelector("#right-aside-section").classList.add("hidden");
  if (multiple == "remove")
    document.querySelector("#right-aside-section").classList.remove("hidden");
}
function toggleProfileSettingsSection(Options) {
  if (Options == "add") {
    document
      .querySelector(".profile-settings-section")
      .classList.add("profile-settings-section-visible");
  } else {
    document
      .querySelector(".profile-settings-section")
      .classList.remove("profile-settings-section-visible");
  }
}
function toggleLeftSection(Options) {
  if (Options == "add") {
    document
      .querySelector(".left-aside-section-wrapper")
      .classList.add("left-aside-section-wrapper-open");
  } else {
    document
      .querySelector(".left-aside-section-wrapper")
      .classList.remove("left-aside-section-wrapper-open");
  }
}
// checkers
function checkCategorieById(id) {
  let indexNumber = undefined;
  const value = categories.filter((obj) => {
    if (obj.getId == id) {
      indexNumber = categories.indexOf(obj);
      return obj;
    }
  });
  if (value[0] != undefined) {
    return { index: indexNumber, value: value[0] };
  } else false;
}
function checkCategorieByName(Name) {
  let indexNumber = undefined;
  const value = categories.filter((obj) => {
    if (obj.Name == Name) {
      indexNumber = categories.indexOf(obj);
      return obj;
    }
  });
  if (value[0] != undefined) {
    return { index: indexNumber, value: value[0] };
  } else false;
}
function checkNoteNumber(noteNumber) {
  if (noteNumber) {
    return `${noteNumber} Notes`;
  } else {
    return `Notes`;
  }
}
function checkNoteById(id, categorieName) {
  const { index, value } = checkCategorieByName(categorieName);
  let data = {
    categorieIndex: index,
    Note: { noteIndex: undefined, value: undefined },
  };
  let startIndex = 0;
  if (value.NotesNumber) {
    value.Notes.forEach((obj) => {
      if (obj.getId == id) {
        data.Note.noteIndex = startIndex;
        data.Note.value = obj;
      }
      startIndex++;
    });
  }
  return data;
}
// id generates
function getThreeDigitNumber(arr) {
  const string1 = "aAbBcCdDeE";
  const string2 = "fFgGhHiIjJ";
  const string3 = "kKlLmMnNoO";
  let mainstring = "";
  const indexs = [
    Math.abs(Math.floor(Math.random() * 10)),
    Math.abs(Math.floor(Math.random() * 10)),
    Math.abs(Math.floor(Math.random() * 10)),
  ];
  indexs.forEach((e) => {
    mainstring = `${string1[e]}${string2[e]}${string3[e]}`;
  });
  return mainstring;
}
function generatetempoID(value = "") {
  let id = value;
  for (let i = 0; i < 3; i++) {
    id += getThreeDigitNumber();
  }
  return id;
}
function generateUserName() {
  return generatetempoID("Guest_");
}
function generateUserPassword() {
  return generatetempoID(`password_`);
}
function changeProfileinfo() {
  const UserProfileData = new profile(
    generateUserName(),
    generateUserPassword(),
    "",
    "./src/Profile.png"
  );
  profileData = UserProfileData;
  const { Name, emall, imageSrc } = UserProfileData;
  document.querySelector("#profile-img").setAttribute("src", imageSrc);
  document.querySelector("#profile-Name").innerText = Name;
  document.querySelector("#UserPic-img").setAttribute("src", imageSrc);
  document.querySelector("#user-name-input").value = Name;
  document.querySelector("#user-name-password").value =
    UserProfileData.getPassword;
  document.querySelector("#user-name-email").value = emall;
  document.querySelector("#user-name-input").setAttribute("value", Name);
  document
    .querySelector("#user-name-password")
    .setAttribute("value", profileData.getPassword);
  document.querySelector("#user-name-email").setAttribute("value", emall);
}
function updateProfileInfo() {
  if (profileData) {
    const { Name, emall, imageSrc } = profileData;
    document.querySelector("#profile-img").setAttribute("src", imageSrc);
    document.querySelector("#profile-Name").innerText = Name;
    document.querySelector("#UserPic-img").setAttribute("src", imageSrc);
    document.querySelector("#user-name-input").value = Name;
    document.querySelector("#user-name-password").value =
      profileData.getPassword;
    document.querySelector("#user-name-email").value = emall;
    document.querySelector("#user-name-input").setAttribute("value", Name);
    document
      .querySelector("#user-name-password")
      .setAttribute("value", profileData.getPassword);
    document.querySelector("#user-name-email").setAttribute("value", emall);
  }
}
// element generations
function CreateCategorie() {
  const li = document.createElement("li");
  li.setAttribute("className", "categorieListTag");
  const categoriesContainer = document.createElement("div");
  categoriesContainer.setAttribute("class", "categories-container");
  categoriesContainer.setAttribute("id", ``);
  categoriesContainer.dataset.categorie_Name = "";
  categoriesContainer.dataset.dbl = "false";
  const categorieContainer = document.createElement("div");
  categorieContainer.setAttribute("class", "categorie-container");
  const categorieTextWrapper = document.createElement("div");
  categorieTextWrapper.setAttribute("class", "categorie-text-wrapper");
  const categorieInput = document.createElement("input");
  categorieInput.setAttribute("type", "text");
  categorieInput.setAttribute("placeholder", "Enter Group Name");
  categorieInput.setAttribute("value", "");
  categorieInput.setAttribute("class", "categorie-input");
  categorieInput.setAttribute("aria-label", "categorie name");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "del";
  deleteBtn.setAttribute("class", "remove-categorie");
  deleteBtn.setAttribute("title", "delete");
  deleteBtn.setAttribute("aria-label", "delete categorie");
  categorieTextWrapper.appendChild(categorieInput);
  categorieContainer.appendChild(categorieTextWrapper);
  categorieContainer.appendChild(deleteBtn);
  categoriesContainer.appendChild(categorieContainer);
  li.appendChild(categoriesContainer);
  li.addEventListener("click", (e) => {
    const targetElement = e.target;
    let categorieElement = undefined;
    if (!targetElement.className.includes("remove-categorie")) {
      if (
        targetElement.className.includes("categorie-input") ||
        targetElement.className.includes("categorie-note-length")
      ) {
        categorieElement =
          targetElement.parentElement.parentElement.parentElement;
        switchToCategorieByCilckbtn(
          checkCategorieById(categorieElement.id).value
        );
        // console.log("categorieElement", categorieElement);
      }
      if (targetElement.className.includes("categorie-container")) {
        categorieElement = targetElement.parentElement;
        switchToCategorieByCilckbtn(
          checkCategorieById(categorieElement.id).value
        );
        // console.log("categorieElement", categorieElement);
      }
      if (targetElement.className.includes("categorie-text-wrapper")) {
        categorieElement = targetElement.parentElement.parentElement;
        switchToCategorieByCilckbtn(
          checkCategorieById(categorieElement.id).value
        );
        // console.log("categorieElement", categorieElement);
      }
      if (targetElement.className.includes("categorieListTag")) {
        categorieElement = targetElement.firstElementChild;
        switchToCategorieByCilckbtn(
          checkCategorieById(categorieElement.id).value
        );
        // console.log("categorieElement", categorieElement);
      }
      // rendering Part....
      Object.values(
        document.querySelector(".note-wrapper-container").children
      ).forEach((e) => {
        e.remove();
      });
      const { value } = checkCategorieById(categorieElement.id);
      if (value.NotesNumber) {
        value.Notes.forEach((e) => {
          const { title, content, date, categorieName, importantLevel } = e;
          const noteId = e.getId;
          document
            .querySelector(".note-wrapper-container")
            .appendChild(
              CreateNote(
                title,
                content,
                categorieName,
                date,
                importantLevel,
                noteId
              )
            );
        });
        if (
          !document
            .querySelector(".empty-img-section-wrapper")
            .className.includes("hidden")
        ) {
          toggleNoNotesSection("add");
        }
        if (
          document
            .querySelector(".note-wrapper-container")
            .className.includes("hidden")
        ) {
          document
            .querySelector(".note-wrapper-container")
            .classList.remove("hidden");
        }
      } else {
        toggleNoNotesSection("remove");
        document
          .querySelector(".note-wrapper-container")
          .classList.add("hidden");
      }
      console.log("hello", e.target);
    }
  });
  categorieInput.addEventListener("dblclick", (e) => {
    const targetValue = e.target.value;
    const targetid = e.target.parentElement.parentElement.parentElement.id;
    e.target.parentElement.parentElement.parentElement.dataset.dbl = true;
    e.target.readOnly = false;
    e.target.setSelectionRange(
      categorieInput.value.length,
      categorieInput.value.length
    );
    // if (
    //   targetValue != "" &&
    //   checkCategorieById(targetid).value &&
    //   checkCategorieById(targetid).value.Name != targetValue
    // ) {
    //   categories[checkCategorieById(targetid).index].Name = targetValue;
    // }
  });
  categorieInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      const inputElement = e.target;
      const inputValue = inputElement.value;
      if (inputValue.trim() != "") {
        const token = checkCategorieByName(inputValue);
        if (!token) {
          if (
            inputElement.parentElement.parentElement.parentElement.dataset
              .dbl == "true"
          ) {
            const inputId =
              inputElement.parentElement.parentElement.parentElement.id;
            categories[checkCategorieById(inputId).index].Name = inputValue;
            console.log(categories);
            inputElement.parentElement.parentElement.parentElement.dataset.dbl =
              "false";
            document.querySelector(".header-text").innerHTML =
              categories[checkCategorieById(inputId).index].Name;
            inputElement.readOnly = true;
          } else {
            inputElement.readOnly = true;
            const Categorie = new categorie(inputValue);
            inputElement.parentElement.parentElement.parentElement.dataset.Name =
              inputValue;
            inputElement.parentElement.parentElement.parentElement.id =
              Categorie.getId;
            categories.push(Categorie);

            console.log(categories);
            if (
              !document.querySelector(".nogroup").className.includes("hidden")
            ) {
              toggleNoGroupSection("add");
              toggleMainSection();
            }
            if (
              !document
                .querySelector(".note-wrapper-container")
                .className.includes("hidden")
            ) {
              document
                .querySelector(".note-wrapper-container")
                .classList.add("hidden");
              toggleNoNotesSection("remove");
            }
            if (window.innerWidth <= 532) {
              toggleLeftSection("remove");
            }
            toggleMainSection("", {
              Name: Categorie.Name,
              value: checkNoteNumber(Categorie.NotesNumber),
            });
            Object.values(
              document.querySelector(".note-wrapper-container").children
            ).forEach((e) => {
              e.remove();
            });
            notes = [];
          }
        } else {
          console.log(token);
          window.alert("all group already existed!");
          console.error("all group already existed!");
        }
        // document
        //   .querySelector(`#${Categorie.getId}`)
        //   .addEventListener("click", () => {
        //     Categorie.open();
        //   });
        // Categorie.open();
        // // console.log(categoriehhh);
      } else {
        inputElement.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.remove();
      }
    }
  });
  deleteBtn.addEventListener("click", (e) => {
    const targetElement = e.target;
    const inputElement =
      targetElement.parentElement.firstElementChild.firstElementChild;
    const categorieElement =
      targetElement.parentElement.parentElement.parentElement;
    const inputValue = inputElement.value;
    if (inputValue.trim()) {
      if (categories.length >= 2) {
        const data = checkCategorieByName(inputValue);
        switchToCategorieByDeleteBtn(categories.length, data);
        categories.splice(data.index, data.index);
        categorieElement.remove();
        console.log(categories);
      } else {
        categories.pop();
        categorieElement.remove();
        toggleNoGroupSection();
        toggleMainSection("add");
        toggleRightSection("add");
        toggleNoNotesSection("add");
      }
    } else {
      inputElement.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.remove();
    }
  });
  return li;
}
function spanTag(value) {
  const span = document.createElement("span");
  span.setAttribute("class", "tag-name");
  if (value) {
    span.innerHTML = value;
    span.setAttribute("contenteditable", "false");
  } else {
    span.setAttribute("contenteditable", "true");
  }
  span.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      span.setAttribute("contenteditable", "false");
      span.innerHTML == "" || span.innerHTML == "<br>" || span.innerHTML == "#"
        ? span.remove()
        : "";
    }
  });
  span.addEventListener("dblclick", (e) => {
    // console.log("hello");
    e.target.setAttribute("contenteditable", "true");
    e.target.focus();
  });
  span.focus();
  return span;
}
function AddNotesNumberTag(id, length) {
  // <span id="cid" class="categorie-note-length" aria-hidden="true">28</span>
  document.querySelector("#note-number").innerHTML = checkNoteNumber(length);
  const element = document.querySelector(`#${id}`).firstElementChild
    .firstElementChild.lastElementChild;
  if (!element.className.includes("categorie-note-length")) {
    const span = document.createElement("span");
    span.setAttribute("id", "categorie-note-length");
    span.setAttribute("class", "categorie-note-length");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = length;
    document
      .querySelector(`#${id}`)
      .firstElementChild.firstElementChild.appendChild(span);
  } else {
    element.innerText = length;
  }
}
function CreateNote(
  title = "",
  content = "",
  categorieName = "",
  Date = "",
  importantLevel = "",
  noteId = ""
) {
  const noteWrapper = document.createElement("li");
  noteWrapper.setAttribute("class", "note-wrapper");
  noteWrapper.setAttribute("tabindex", "0");
  const note = document.createElement("div");
  note.setAttribute("class", "note");
  note.setAttribute("id", `${noteId}`);
  note.setAttribute("data-header", `${title}`);
  note.setAttribute("data-paragraph", `${content}`);
  const noteUppeSsection = document.createElement("div");
  noteUppeSsection.setAttribute("class", "note-upper-section");
  const importentLevel = document.createElement("div");
  importentLevel.setAttribute("class", "importent-level");
  const circle = document.createElement("span");
  circle.setAttribute("class", `circle ${importantLevel.color}`);
  const inportentLevelText = document.createElement("p");
  inportentLevelText.setAttribute("class", "inportent-level-text");
  inportentLevelText.innerText = importantLevel.Name;
  const dateText = document.createElement("p");
  dateText.setAttribute("class", "date-text");
  dateText.innerText = Date;
  const titleElement = document.createElement("h2");
  titleElement.setAttribute("class", "title");
  titleElement.innerText = title;
  const contentElement = document.createElement("p");
  contentElement.setAttribute("class", "note-content");
  contentElement.innerText = content;
  importentLevel.appendChild(circle);
  importentLevel.appendChild(inportentLevelText);
  noteUppeSsection.appendChild(importentLevel);
  noteUppeSsection.appendChild(dateText);
  note.appendChild(noteUppeSsection);
  note.appendChild(titleElement);
  note.appendChild(contentElement);
  noteWrapper.appendChild(note);
  noteWrapper.addEventListener("click", (e) => {
    console.log("hello world!", e.target);
    const targetElement = e.target;
    let noteElement = undefined;
    if (
      targetElement.className.includes("circle") ||
      targetElement.className.includes("inportent-level-text")
    ) {
      noteElement = targetElement.parentElement.parentElement.parentElement;
      console.log(noteElement, e.target);
    }
    if (
      targetElement.className.includes("importent-level") ||
      targetElement.className.includes("date-text")
    ) {
      noteElement = targetElement.parentElement.parentElement;
      console.log(noteElement, e.target);
    }
    if (
      targetElement.className.includes("note-upper-section") ||
      targetElement.className.includes("note-content") ||
      targetElement.className.includes("title")
    ) {
      noteElement = targetElement.parentElement;
      console.log(noteElement, e.target);
    }
    if (targetElement.className.includes("note-wrapper")) {
      noteElement = targetElement.firstElementChild;
      console.log(noteElement, e.target);
    }
    if (targetElement.className.includes("note")) {
      noteElement = targetElement;
      console.log(noteElement, e.target);
    }
    document.querySelector("#right-aside-section").dataset.exists = true;
    document.querySelector("#right-aside-section").dataset.Id = noteElement.id;
    const { Note } = checkNoteById(
      noteElement.id,
      document.querySelector(".header-text").innerText
    );
    // const {value } = checkCategorieById(noteElement.id);
    const orderChoosenElement = [
      { Text: "General", color: "red" },
      { Text: "Medium", color: "yellow" },
      { Text: "Low", color: "green" },
    ];
    changingOrderChoosenElement.call(
      this,
      orderChoosenElement,
      Note.value.importantLevel.color
    );
    toggleImportentLevelElements(orderChoosenElement);
    console.log(
      noteElement.id,
      document.querySelector(".header-text").innerText
    );
    console.log(
      checkNoteById(
        noteElement.id,
        document.querySelector(".header-text").innerText
      )
    );
    document.querySelector(".content-heeder-section-header").value =
      Note.value.title;
    document
      .querySelector(".content-heeder-section-header")
      .setAttribute("value", Note.value.title);
    console.log(Note);
    if (Note.value.tags[0]) {
      Note.value.tags.forEach((e) => {
        document.querySelector(".tags-container").appendChild(spanTag(e));
      });
    }
    document.querySelector(".ce-paragraph").innerHTML = Note.value.content;
    if (window.innerWidth >= 1440) {
      document.querySelector("main").style = "flex-grow:0";
      document.querySelector(".bar").style = "display:block !important;";
    } else {
      document.querySelector("main").style = "display:none";
      document.querySelector(".add-circular-btn").style =
        "display:none !important;";
      document.querySelector(".bar").style = "display:none !important;";
    }
    toggleRightSection();
  });
  return noteWrapper;
}
function summaryTags(value) {
  const summary = document.createElement("summary");
  summary.setAttribute("value", value);
  summary.innerHTML = value;
  return summary;
}
function hola(tags) {
  if (tags[0]) {
    console.log(
      "hello",
      document.querySelector("#filterTags").firstElementChild
    );
    document.querySelector("#filterTags").firstElementChild.remove();
    tags.forEach((e) => {
      document.querySelector("#filterTags").appendChild(summaryTags(e));
    });
  }
}
function suggestions(value) {
  console.log(value.text == true, value);
  const li = document.createElement("li");
  li.setAttribute("class", "suggestions");
  const container = document.createElement("div");
  container.setAttribute("class", "suggestions-inner-container");
  const circle = document.createElement("div");
  if (value.text) {
    circle.setAttribute("class", `circle ${value.color}`);
  } else {
    circle.setAttribute("class", `circle`);
  }
  const text = document.createElement("span");
  text.setAttribute("class", `suggestions-inner-container-text`);
  if (value.text) {
    text.appendChild(document.createTextNode(value.text));
  } else {
    text.appendChild(document.createTextNode("No Match Found"));
  }
  container.appendChild(circle);
  container.appendChild(text);
  li.appendChild(container);
  return li;
}
// categorie object constructer
class categorie {
  #Id = undefined;
  constructor(Name = "", notes = []) {
    this.Name = Name;
    this.Notes = notes;
    this.NotesNumber = notes.length;
    this.#Id = generatetempoID(Name);
  }
  get getId() {
    return this.#Id;
  }
  set setId(value) {
    this.#Id = value;
  }
}
class note {
  #noteId = undefined;
  constructor(
    title = "",
    content = "No Content Added Yet.",
    date = new Date().toLocaleDateString(),
    tags = [],
    importantLevel = { Name: "General", color: "red" },
    timestamp,
    categorieName,
    noteId = generatetempoID()
  ) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.tags = tags;
    this.importantLevel = importantLevel;
    this.timestamp = timestamp;
    this.categorieName = categorieName;
    this.#noteId = noteId;
    this.exists = false;
  }
  get getId() {
    return this.#noteId;
  }
  set setId(value) {
    this.#noteId = value;
  }
}
class profile {
  #Password = undefined;
  constructor(Name, Password, emall, src) {
    this.Name = Name;
    this.#Password = Password;
    this.emall = emall;
    this.imageSrc = src;
  }
  get getPassword() {
    return this.#Password;
  }
  set setPassword(value) {
    this.#Password = value;
  }
}
// Independent addeventlisteners
changeProfileinfo();
document.querySelector(".add-categorie-btn").addEventListener("click", (e) => {
  const element = CreateCategorie();
  document
    .querySelector(".categories-container-wrapper")
    .firstElementChild.appendChild(element);
  // focusing on current input element
  element.firstElementChild.firstElementChild.firstElementChild.firstElementChild.focus();
  if (
    document
      .querySelector(".empty-img-section-wrapper")
      .className.includes("hidden")
  ) {
    toggleNoNotesSection("remove");
  }
});

document.querySelector(".add-Note-btn").addEventListener("click", (e) => {
  console.log(document.querySelector(".content-heeder-section-header"));
  document.querySelector(".content-heeder-section-header").value = "";
  document.querySelector(".ce-paragraph").innerHTML = "";
  document.querySelector("#right-aside-section").dataset.exists = false;
  document.querySelector(".tags-container").innerHTML = "";
  document.querySelector("#right-aside-section").dataset.Id = "";
  if (window.innerWidth >= 1440) {
    document.querySelector("main").style = "flex-grow:0";
    document.querySelector(".bar").style = "display:block !important;";
  } else {
    document.querySelector("main").style = "display:none";
    document.querySelector(".add-circular-btn").style =
      "display:none !important;";
    document.querySelector(".bar").style = "display:none !important;";
  }
  toggleRightSection();
});
document
  .querySelector(".note-save-btn")
  .addEventListener("click", async function (e) {
    try {
      const { time, blocks } = await editor.save();
      console.log(time, blocks);
      if (
        document.querySelector("#right-aside-section").dataset.exists == "true"
      ) {
        console.warn("data Needs to update !!!");
        const targetElementId = document.querySelector("#right-aside-section")
          .dataset.Id;
        const { categorieIndex, Note } = checkNoteById(
          targetElementId,
          document.querySelector(".header-text").innerText
        );
        document.querySelector(`#${Note.value.getId}`).parentElement.remove();
        console.log("before", categories);
        if (categories[categorieIndex].NotesNumber > 1) {
          categories[categorieIndex].Notes.splice(
            Note.noteIndex,
            Note.noteIndex
          );
          categories[categorieIndex].NotesNumber =
            categories[categorieIndex].Notes.length;
        } else {
          categories[categorieIndex].Notes.pop();
          categories[categorieIndex].NotesNumber =
            categories[categorieIndex].Notes.length;
        }
        console.log("after", categories);
      }
      const headerInput =
        e.target.parentElement.parentElement.nextElementSibling
          .firstElementChild;
      let tagsSet = [];
      const tagsSection = headerInput.nextElementSibling.lastElementChild;
      if (tagsSection.children.length) {
        Object.values(tagsSection.children).forEach((e) => {
          tagsSet.push(e.innerText);
        });
      }
      const importantLevelElement = document.querySelector(
        ".select-level-container"
      );
      const importantLevelData = {
        Name: importantLevelElement.dataset.text,
        color: importantLevelElement.dataset.color,
      };
      console.log(importantLevelData);
      console.log(tagsSet);
      if (headerInput.value.trim()) {
        const Note = new note(headerInput.value);
        Note.categorieName = document.querySelector(".header-text").innerText;
        Note.exists = true;
        if (importantLevelData.Name && importantLevelData.color) {
          Note.importantLevel = importantLevelData;
        }
        Note.timestamp = time;
        if (blocks[0] != undefined) {
          Note.content = getTrueContent(blocks);
          Note.setId = blocks[0].id;
        }
        if (tagsSet[0]) {
          Note.tags = tagsSet;
        }
        // notes.push(Note);
        const { title, content, date, categorieName, importantLevel } = Note;
        const noteId = Note.getId;
        if (
          document.querySelector(".note-wrapper-container").firstElementChild
        ) {
          document
            .querySelector(".note-wrapper-container")
            .insertBefore(
              CreateNote(
                title,
                content,
                categorieName,
                date,
                importantLevel,
                noteId
              ),
              document.querySelector(".note-wrapper-container")
                .firstElementChild
            );
        } else {
          document
            .querySelector(".note-wrapper-container")
            .appendChild(
              CreateNote(
                title,
                content,
                categorieName,
                date,
                importantLevel,
                noteId
              )
            );
        }
        toggleNoNotesSection("add");
        document
          .querySelector(".note-wrapper-container")
          .classList.remove("hidden");
        const { index, value } = checkCategorieByName(
          document.querySelector(".header-text").innerText
        );
        categories[index].Notes.push(Note);
        categories[index].NotesNumber = categories[index].Notes.length;
        console.log(notes);
        console.log(Note);
        console.log(categories);
        console.log(
          checkCategorieByName(
            document.querySelector(".header-text").innerText
          ),
          value
        );
        AddNotesNumberTag(value.getId, categories[index].NotesNumber);
      }
      // } else {
      // console.warn("Data needs to update!!!!");
      // const targetElementId = document.querySelector("#right-aside-section")
      //   .dataset.Id;
      // const targetElement = document.querySelector(`#${targetElementId}`);
      // const { categorieIndex, Note } = checkNoteById(
      //   targetElementId,
      //   document.querySelector(".header-text").innerText
      // );
      // const { title, content, Date, categorieName, importantLevel } =
      //   Note.value;
      // console.log(
      //   CreateNote(
      //     title,
      //     content,
      //     categorieName,
      //     Date,
      //     importantLevel,
      //     Note.value.getId
      //   )
      // );
      // console.log("before", categories);
      // if (categories[categorieIndex].NotesNumber > 1) {
      //   categories[categorieIndex].Notes.splice(Note.noteIndex, Note.noteIndex);
      //   categories[categorieIndex].NotesNumber =
      //     categories[categorieIndex].Notes.length;
      // } else {
      //   categories[categorieIndex].Notes.pop();
      //   categories[categorieIndex].NotesNumber =
      //     categories[categorieIndex].Notes.length;
      // }
      // console.log("after", categories);
      // if (
      //   document.querySelector(".note-wrapper-container").firstElementChild
      // ) {
      //   document
      //     .querySelector(".note-wrapper-container")
      //     .insertBefore(
      //       CreateNote(
      //         title,
      //         content,
      //         categorieName,
      //         date,
      //         importantLevel,
      //         noteId
      //       ),
      //       document.querySelector(".note-wrapper-container")
      //         .firstElementChild
      //     );
      // } else {
      //   document
      //     .querySelector(".note-wrapper-container")
      //     .appendChild(
      //       CreateNote(
      //         title,
      //         content,
      //         categorieName,
      //         date,
      //         importantLevel,
      //         noteId
      //       )
      //     );
      // }
      // }

      if (window.innerWidth >= 1440) {
        document.querySelector("main").style = "flex-grow:1";
      } else {
        document.querySelector("main").style = "display:flex;";
        if (document.querySelector(".add-circular-btn")) {
          document.querySelector(".add-circular-btn").style =
            "display:block !importent;";
        }
      }
      document.querySelector(".content-heeder-section-header").value = "";
      document
        .querySelector(".content-heeder-section-header")
        .setAttribute("value", "");
      document.querySelector(".ce-paragraph").innerHTML = "";
      document.querySelector("#right-aside-section").dataset.exists = false;
      document.querySelector(".tags-container").innerHTML = "";
      document.querySelector("#right-aside-section").dataset.Id = "";
      document.querySelector(".bar").style = "display:none;";
      document.querySelector(".select-level-container").dataset.text = "";
      document.querySelector(".select-level-container").dataset.color = "";
      const orderChoosenElement = [
        { Text: "General", color: "red" },
        { Text: "Medium", color: "yellow" },
        { Text: "Low", color: "green" },
      ];
      toggleImportentLevelElements(orderChoosenElement);
      toggleRightSection();
    } catch (error) {
      console.error(error);
    }
  });
document.querySelector(".note-back-btn").addEventListener("click", (e) => {
  document.querySelector(".content-heeder-section-header").value = "";
  document.querySelector(".ce-paragraph").innerHTML = "";
  document.querySelector("#right-aside-section").dataset.exists = false;
  document.querySelector(".tags-container").innerHTML = "";
  document.querySelector("#right-aside-section").dataset.Id = "";
  if (window.innerWidth >= 1440) {
    document.querySelector("main").style = "flex-grow:1";
  } else {
    document.querySelector("main").style = "display:flex;";
    if (document.querySelector(".add-circular-btn")) {
      document.querySelector(".add-circular-btn").style =
        "display:block !importent;";
    }
  }
  document.querySelector(".bar").style = "display:none;";
  toggleRightSection();
});

const tagsContainer = document.querySelector(".tags-container");
document.querySelector(".add-tags-btn").addEventListener("click", (e) => {
  const element = spanTag();
  tagsContainer.appendChild(element);
  element.innerHTML = "#";
  element.focus();
  MoverCursorToEnd(element);
  // console.log(element.children);
});

document.querySelector(".note-del-btn").addEventListener("click", (e) => {
  const rightAsideSection = document.querySelector("#right-aside-section");
  const id = rightAsideSection.dataset.Id;
  const exists = rightAsideSection.dataset.exists;
  const categorie = document.querySelector(".header-text").innerText;
  if (exists == "true") {
    console.log("hello");
    const { categorieIndex, Note } = checkNoteById(id, categorie);
    console.log(categories[categorieIndex].Notes);
    if (Note.noteIndex) {
      console.log("sagnik");
      categories[categorieIndex].Notes.splice(Note.noteIndex, Note.noteIndex);
      categories[categorieIndex].NotesNumber =
        categories[categorieIndex].Notes.length;
    } else {
      console.log("sagnik123");
      categories[categorieIndex].Notes.pop();
      categories[categorieIndex].NotesNumber =
        categories[categorieIndex].Notes.length;
    }
    document.querySelector(`#${id}`).remove();
    console.log(document.querySelector(`#${id}`));
    console.log(categories);
    if (!categories[categorieIndex].NotesNumber) {
      console.log("Enter");
      document.querySelector("#note-number").innerHTML = "Notes";
      const { value } = checkCategorieByName(categorie);
      document
        .querySelector(`#${value.getId}`)
        .firstElementChild.firstElementChild.lastElementChild.remove();
      toggleNoNotesSection();
    } else {
      document.querySelector("#note-number").innerHTML = checkNoteNumber(
        categories[categorieIndex].NotesNumber
      );
      const { value } = checkCategorieByName(categorie);
      document.querySelector(
        `#${value.getId}`
      ).firstElementChild.firstElementChild.lastElementChild.innerHTML =
        categories[categorieIndex].NotesNumber;
    }
  }
  // if (!document.querySelector(".note-wrapper-container").children.length) {
  //   toggleNoNotesSection();
  // }
  document.querySelector(".content-heeder-section-header").value = "";
  document.querySelector(".ce-paragraph").innerHTML = "";
  document.querySelector("#right-aside-section").dataset.exists = false;
  document.querySelector(".tags-container").innerHTML = "";
  document.querySelector("#right-aside-section").dataset.Id = "";
  if (window.innerWidth >= 1440) {
    document.querySelector("main").style = "flex-grow:1";
  } else {
    document.querySelector("main").style = "display:flex;";
    if (document.querySelector(".add-circular-btn")) {
      document.querySelector(".add-circular-btn").style =
        "display:block !importent;";
    }
  }
  document.querySelector(".bar").style = "display:none;";
  toggleRightSection();
});
document.querySelector("#User-tags").addEventListener("click", (e) => {
  if (document.querySelector(".nogroup").className.includes("hidden")) {
    const allTags = [];
    const { value } = checkCategorieByName(
      document.querySelector(".header-text").innerText
    );
    if (value.NotesNumber) {
      value.Notes.forEach((note) => {
        if (note.tags[0]) {
          note.tags.forEach((TagText) => {
            allTags.push(TagText);
          });
        }
      });
    }
    console.log(allTags);
    hola(allTags);
  }
});
const sortElements = document.querySelectorAll(".sort-value-container");
sortElements.forEach((elements) => {
  elements.addEventListener("click", (e) => {
    const targetElement = e.target;
    if (targetElement.className.includes("filter-options")) {
      document.querySelector("#User-Sort").removeAttribute("open");
    }
    if (targetElement.className.includes("filterTags-options")) {
      document.querySelector("#User-tags").removeAttribute("open");
      targetElement.parentElement.innerHTML = "";
      targetElement.parentElement.appendChild(summaryTags("No Tags"));
      console.log(targetElement);
    }
  });
});
document.querySelector(".add-circular-btn").addEventListener("click", (e) => {
  toggleLeftSection("add");
  const element = CreateCategorie();
  document
    .querySelector(".categories-container-wrapper")
    .firstElementChild.appendChild(element);
  // focusing on current input element
  element.firstElementChild.firstElementChild.firstElementChild.firstElementChild.focus();
  if (
    document
      .querySelector(".empty-img-section-wrapper")
      .className.includes("hidden")
  ) {
    toggleNoNotesSection("remove");
  }
});
document.querySelectorAll(".toggle").forEach((e) => {
  e.addEventListener("click", (e) => {
    console.log("hello");
    toggleLeftSection("add");
    // toggleLeftSection();
  });
});
document
  .querySelector(".left-aside-section-wrapper")
  .addEventListener("click", (e) => {
    if (e.target.className.includes("left-aside-section-wrapper")) {
      toggleLeftSection("remove");
    }
  });
document.querySelector("#settings").addEventListener("click", (e) => {
  toggleProfileSettingsSection("add");
});
document.querySelector(".back-btn").addEventListener("mousedown", (e) => {
  // e.preventDefault();
  updateProfileInfo();
  toggleProfileSettingsSection("remove");
});

function CheckProfileInputsValues(ProfileInput) {
  const ProfileInputValue = ProfileInput.value;
  if (ProfileInput.id.includes("UserPic")) {
    const imgRegex = /[\.png\.jpg]$/;
    return {
      testValue: imgRegex.test(ProfileInputValue),
      value: ProfileInputValue,
    };
  } else if (ProfileInput.id.includes("user-name-input")) {
    const nameRegex =
      /^([a-zA-Z]{4,15}([_](?=(?:[a-zA-Z]|[0-9])))?([a-zA-Z0-9]{0,10})?)$/;
    return {
      testValue: nameRegex.test(ProfileInputValue),
      value: ProfileInputValue,
    };
  } else if (ProfileInput.id.includes("user-name-password")) {
    const PasswordRegex = /^[a-zA-Z0-9_\$]{8,20}$/;
    return {
      testValue: PasswordRegex.test(ProfileInputValue),
      value: ProfileInputValue,
    };
  } else if (ProfileInput.id.includes("user-name-email")) {
    if (ProfileInputValue) {
      const emailRegex =
        /^[a-zA-Z0-9]+(?:[\-_%\.\+][a-zA-Z0-9]+)*@[a-zA-Z0-9\-]+\.[a-z]{2,}$/;
      return {
        testValue: emailRegex.test(ProfileInputValue),
        value: ProfileInputValue,
      };
    } else {
      return {
        testValue: false,
        value: ProfileInputValue,
      };
    }
  } else {
    throw new Error(`Argument:(ProfileInput) doesn't matches the cases!!!!`);
  }
}
document.querySelector(".Save-btn").addEventListener("click", (e) => {
  const conformMsgValue = window.confirm("Are you want to save the changes?");
  if (conformMsgValue) {
    const ProfileInputElements = document.querySelectorAll(
      ".profile-settings-section_middle-section_detail-inputs"
    );
    let UserProfileData = new profile();
    UserProfileData.imageSrc = document.querySelector("#UserPic-img").src;
    for (let indexNumber in Object.keys(ProfileInputElements)) {
      if (indexNumber == 0) {
        const { testValue, value } = CheckProfileInputsValues(
          ProfileInputElements[indexNumber]
        );
        if (testValue) {
          UserProfileData.Name = value;
        } else {
          throw new Error("InputNameValue doesn't match!!!!!");
        }
      } else if (indexNumber == 1) {
        const { testValue, value } = CheckProfileInputsValues(
          ProfileInputElements[indexNumber]
        );
        if (testValue) {
          UserProfileData.setPassword = value;
        } else {
          throw new Error("InputPasswordValue doesn't match!!!!!");
        }
      } else {
        const { testValue, value } = CheckProfileInputsValues(
          ProfileInputElements[indexNumber]
        );
        if (testValue || value == "") {
          UserProfileData.emall = value;
        } else {
          throw new Error("InputEmailValue doesn't match!!!!!");
        }
      }
    }
    profileData = UserProfileData;
    updateProfileInfo();
    toggleProfileSettingsSection("remove");
  }
});
document.querySelector("#UserPic").addEventListener("change", (e) => {
  console.log("hello", e.target.files[0]);
  let Img = e.target;
  console.log(CheckProfileInputsValues(Img));
  if (CheckProfileInputsValues(Img).testValue) {
    if (Img.value && Img.files && Img.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        // document
        //   .querySelector("#profile-img")
        //   .setAttribute("src", e.target.result);
        document
          .querySelector("#UserPic-img")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(Img.files[0]);
    }
    // if (!Img.value) {
    //   const ImgSrc = "./src/Profile.png";
    //   document.querySelector("#profile-img").setAttribute("src", ImgSrc);
    //   document.querySelector("#UserPic-img").setAttribute("src", ImgSrc);
    // }
  } else {
    throw new Error("Img Type Doesn't Match!!!!!");
  }
});
document.querySelector("#user-name-input").addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    console.log(e.target.value);
    const re = /^([a-z]{4,15}([_](?=(?:[a-z]|[0-9])))?([a-z0-9]{1,10})?)$/;
    console.log(re.test(e.target.value));
    console.log(re.exec(e.target.value));
  }
});

// search btn
function search(inputValue) {
  let data = [];
  const categorieName = document.querySelector(".header-text").innerText;
  const { value } = checkCategorieByName(categorieName);
  const notes = value.Notes.filter((e) => {
    if (e.title.includes(inputValue)) {
      return e;
    }
  });
  if (notes[0] != undefined) {
    notes.forEach((value) => {
      data.push({ text: value.title, color: value.importantLevel.color });
    });
  } else {
    data = "";
  }
  console.log(data);
  return data;
}
function addToSuggestion(data) {
  if (data[0]) {
    document.querySelector(".suggestions-container").innerHTML = "";
    data.forEach((e) => {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhh", e);
      document
        .querySelector(".suggestions-container")
        .appendChild(suggestions(e));
      setTimeout(() => {
        document.querySelector(".suggestions-container").innerHTML = "";
      }, 1500);
    });
  } else {
    document.querySelector(".suggestions-container").innerHTML = "";
    document
      .querySelector(".suggestions-container")
      .appendChild(suggestions({ text: "", color: "" }));
    setTimeout(() => {
      document.querySelector(".suggestions-container").innerHTML = "";
    }, 1500);
  }
}
function DebouncingSearch(func, limit) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    console.log(args);
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, limit);
  };
}
document.querySelector(".search-input").addEventListener("keyup", (e) => {
  // const better = DebouncingSearch(search, 1000);
  // console.log(better(e.target.value));
  addToSuggestion(search(e.target.value));
});
function renderingBySort({ data: UserValue, option: option }) {
  const noteContainer = document.querySelector(".note-wrapper-container");
  if (option == "search") {
    search(UserValue).forEach((e) => {
      const { title, content, categorieName, Date, importantLevel } = e;
      noteContainer.innerHTML = "";
      noteContainer.appendChild(
        CreateNote(title, content, categorieName, Date, importantLevel, e.getId)
      );
    });
  }
  const categorieName = document.querySelector(".header-text").innerText;
  const { value } = checkCategorieByName(categorieName);
  value.Notes.forEach((notes) => {
    if (option == "filter") {
      if (UserValue == "oldest") {
      } else if (UserValue == "newest") {
      } else if (UserValue == "high") {
        if (notes.importantLevel.Name == "high") {
          const { title, content, categorieName, Date, importantLevel } = e;
          noteContainer.innerHTML = "";
          noteContainer.appendChild(
            CreateNote(
              title,
              content,
              categorieName,
              Date,
              importantLevel,
              e.getId
            )
          );
        }
      } else if (UserValue == "medium") {
        if (notes.importantLevel.Name == "medium") {
          const { title, content, categorieName, Date, importantLevel } = e;
          noteContainer.innerHTML = "";
          noteContainer.appendChild(
            CreateNote(
              title,
              content,
              categorieName,
              Date,
              importantLevel,
              e.getId
            )
          );
        }
      } else {
        if (notes.importantLevel.Name == "low") {
          const { title, content, categorieName, Date, importantLevel } = e;
          noteContainer.innerHTML = "";
          noteContainer.appendChild(
            CreateNote(
              title,
              content,
              categorieName,
              Date,
              importantLevel,
              e.getId
            )
          );
        }
      }
    }
    if (option == "sortByTag") {
    }
  });
  toggleNoNotesSection("add");
  document.querySelector(".note-wrapper-container").classList.remove("hidden");
}

document
  .querySelector(".select-level-container")
  .addEventListener("click", collectImportantLevelData());
