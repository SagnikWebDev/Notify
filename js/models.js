import {
  toggleNoGroupSection,
  toggleMainSection,
  toggleNoNotesSection,
  toggleRightSection,
  toggleNoteSection,
  toggleCross,
} from "./togglers.js";
import { editor } from "./editor.js";
import {
  checkNoteNumber,
  generatetempoID,
  generateUserName,
  generateUserPassword,
  getTrueContent,
} from "./stringUtilities.js";
class categorie {
  #Id = undefined;
  constructor(Name = "", notes = []) {
    this.Name = Name;
    this.Notes = notes;
    this.NotesNumber = this.getNotesNumber();
    this.#Id = generatetempoID(Name);
  }
  get getId() {
    return this.#Id;
  }
  set setId(value) {
    this.#Id = value;
  }
  getNotesNumber() {
    return this.Notes.length;
  }
  updateNotesNumber() {
    this.NotesNumber = this.Notes.length;
  }
}
class note {
  #noteId = undefined;
  constructor(
    title = "",
    content = "No Content Added Yet.",
    tags = [],
    importantLevel = { Name: "General", color: "red" },
    timestamp = undefined,
    categorieName
  ) {
    this.title = title;
    this.content = content;
    this.date = new Date().toLocaleDateString();
    this.tags = tags;
    this.importantLevel = importantLevel;
    this.timestamp = timestamp;
    this.categorieName = categorieName;
    this.#noteId = generatetempoID();
    this.exists = false;
  }
  get getId() {
    return this.#noteId;
  }
  set setId(value) {
    this.#noteId = value;
  }
}
export class profile {
  #Password = undefined;
  #UserCurrentProfileData = undefined;
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
  updateProfileData({ Name, Password, emall, imageSrc }) {
    if (Name) this.Name = Name;
    if (Password) this.#Password = Password;
    if (emall) this.emall = emall;
    if (imageSrc) this.imageSrc = imageSrc;
  }
  createRandomProfileData() {
    this.Name = generateUserName();
    this.#Password = generateUserPassword();
    this.emall = "";
    this.imageSrc = "./src/Profile.png";
    return this;
  }
  updateUserCurrentProfileData() {
    this.#UserCurrentProfileData = this;
  }
  CheckProfileUserInputsValues(ProfileInput) {
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
  getDataFromUserProfileInputComponents() {
    const UserInfo = {
      Name: undefined,
      Password: undefined,
      emall: undefined,
      imageSrc: undefined,
    };
    const ProfileInputElements = document.querySelectorAll(
      ".profile-settings-section_middle-section_detail-inputs"
    );
    UserInfo.imageSrc = document.querySelector("#UserPic-img").src;
    for (let indexNumber in Object.keys(ProfileInputElements)) {
      if (indexNumber == 0) {
        const { testValue, value } = this.CheckProfileUserInputsValues(
          ProfileInputElements[indexNumber]
        );
        if (testValue) {
          UserInfo.Name = value;
        } else {
          throw new Error("InputNameValue doesn't match!!!!!");
        }
      } else if (indexNumber == 1) {
        const { testValue, value } = this.CheckProfileUserInputsValues(
          ProfileInputElements[indexNumber]
        );
        if (testValue) {
          UserInfo.Password = value;
        } else {
          throw new Error("InputPasswordValue doesn't match!!!!!");
        }
      } else {
        const { testValue, value } = this.CheckProfileUserInputsValues(
          ProfileInputElements[indexNumber]
        );
        if (testValue || value == "") {
          UserInfo.emall = value;
        } else {
          throw new Error("InputEmailValue doesn't match!!!!!");
        }
      }
    }
    return UserInfo;
  }
  updateProfileInputComponents() {
    if (this.#UserCurrentProfileData) {
      const { Name, emall, imageSrc } = this.#UserCurrentProfileData;
      document.querySelector("#profile-img").setAttribute("src", imageSrc);
      document.querySelector("#profile-Name").innerText = Name;
      document.querySelector("#UserPic-img").setAttribute("src", imageSrc);
      document.querySelector("#user-name-input").value = Name;
      document.querySelector("#user-name-password").value =
        this.#UserCurrentProfileData.getPassword;
      document.querySelector("#user-name-email").value = emall;
      document.querySelector("#user-name-input").setAttribute("value", Name);
      document
        .querySelector("#user-name-password")
        .setAttribute("value", this.#UserCurrentProfileData.getPassword);
      document.querySelector("#user-name-email").setAttribute("value", emall);
    }
  }
}
export class Notes {
  #searchdata = [];
  constructor() {
    this.Notes = [];
  }
  get getNotes() {
    return this.Notes;
  }
  set setNotes(notes) {
    return (this.Notes = notes);
  }
  set setSearchData(data) {
    this.#searchdata = data;
  }
  //   NoteArguments = [categorieName , title ,content = ,importantLevel ,tags ,timestamp ]
  addNote(NoteArguments = []) {
    const [categorieName, title, content, importantLevel, tags, timestamp] =
      NoteArguments;
    const Note = new note(
      title,
      content,
      tags,
      importantLevel,
      timestamp,
      categorieName
    );
    this.Notes.unshift(Note);
    return Note;
  }
  deleteNote(NoteId) {
    const { index } = this.findNoteById(NoteId);
    if (index) this.Notes.splice(index, index);
    else this.Notes.shift();
  }
  //   NoteUpdateArguments = [{ keyValue, value }]
  updateNote(NoteId, NoteUpdateArguments = [{ keyValue, value }]) {
    const { value: Note } = this.findNoteById(NoteId);
    if (keyValue && value) {
      NoteUpdateArguments.forEach((object) => {
        Note[object.keyValue] = object.value;
      });
    }
    this.deleteNote(NoteId);
    this.Notes.unshift(Note);
  }
  findNoteById(NoteId) {
    let indexNumber = undefined;
    const value = this.Notes.filter((obj) => {
      if (obj.getId == NoteId) {
        indexNumber = this.Notes.indexOf(obj);
        return obj;
      }
    });
    if (value[0] != undefined) {
      return { index: indexNumber, value: value[0] };
    } else
      throw new Error(
        `Note not found!(${{ index: indexNumber, value: value }})`
      );
  }
  createNew() {
    this.Notes = [];
  }
  CreateNoteComponent(
    title = "",
    content = "",
    categorieName = "",
    Date = "",
    importantLevel = "",
    noteId = ""
  ) {
    const noteWrapper = document.createElement("li");
    noteWrapper.setAttribute("class", "note-wrapper");
    const note = document.createElement("div");
    note.setAttribute("class", "note");
    note.setAttribute("aria-label", `note ${title}`);
    note.setAttribute("aria-selected", `false`);
    note.setAttribute("tabindex", "0");
    note.setAttribute("id", `${noteId}`);
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
    contentElement.innerHTML = content;
    importentLevel.appendChild(circle);
    importentLevel.appendChild(inportentLevelText);
    noteUppeSsection.appendChild(importentLevel);
    noteUppeSsection.appendChild(dateText);
    note.appendChild(noteUppeSsection);
    note.appendChild(titleElement);
    note.appendChild(contentElement);
    noteWrapper.appendChild(note);
    return noteWrapper;
  }
  deleteNoteComponent() {
    const rightAsideSection = document.querySelector("#right-aside-section");
    const noteId = rightAsideSection.dataset.Id;
    const exists = rightAsideSection.dataset.exists;
    if (exists == "true") {
      document.querySelector(`#${noteId}`).parentElement.remove();
    }
    if (!document.querySelector(".note-wrapper-container").children.length) {
      toggleNoNotesSection(false);
    }
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
    toggleRightSection(true);
  }
  noteEditorOpen(exists = false) {
    if (!exists) {
      this.resetNoteEditorValues();
    }
    if (window.innerWidth >= 1440) {
      document.querySelector("main").style = "flex-grow:0";
      document.querySelector(".bar").style = "display:block !important;";
    } else {
      document.querySelector("main").style = "display:none";
      document.querySelector(".add-circular-btn").style =
        "display:none !important;";
      document.querySelector(".bar").style = "display:none !important;";
    }
    toggleRightSection(false);
  }
  noteEditorClose() {
    this.resetNoteEditorValues();
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
    toggleRightSection(true);
  }
  resetNoteEditorValues() {
    document.querySelector(".content-heeder-section-header").value = "";
    document.querySelector(".ce-paragraph").innerHTML = "";
    document.querySelector("#right-aside-section").dataset.exists = false;
    document.querySelector(".tags-container").innerHTML = "";
    const noteId = document.querySelector("#right-aside-section").dataset.Id;
    if (noteId) {
      document.getElementById(noteId).setAttribute("aria-selected", "false");
    }
    document.querySelector("#right-aside-section").dataset.Id = "";
  }
  async getNoteEditorValues() {
    try {
      const { blocks } = await editor.save();
      let Content = undefined;
      if (blocks[0]) {
        Content = getTrueContent(blocks);
      }
      const categorie = document.querySelector(".header-text").innerText;
      const noteHeaderValue = document.querySelector(
        ".content-heeder-section-header"
      ).value;
      const noteExistsValue = document.querySelector("#right-aside-section")
        .dataset.exists;
      const noteIdValue = document.querySelector("#right-aside-section").dataset
        .Id;
      const importantLevelDataText = document.querySelector(
        ".select-level-container"
      ).dataset.text;
      const importantLevelDataColor = document.querySelector(
        ".select-level-container"
      ).dataset.color;
      const importantLevelData = {
        Name: importantLevelDataText,
        color: importantLevelDataColor,
      };
      return {
        Header: noteHeaderValue,
        content: Content,
        exists: noteExistsValue,
        noteId: noteIdValue,
        categorieName: categorie,
        importantLevelData: importantLevelData,
      };
    } catch (error) {
      throw new Error(`${error} in getNoteEditorValues `);
    }
  }
  // setNoteEditorValuesArguments = { Header, content, exists, tags, noteId , importantLevelColor}
  setNoteEditorValues(setNoteEditorValuesArguments) {
    const { Header, content, exists, tags, noteId, importantLevelColor } =
      setNoteEditorValuesArguments;
    if (Header)
      document.querySelector(".content-heeder-section-header").value = Header;
    document
      .querySelector(".content-heeder-section-header")
      .setAttribute("value", Header);
    if (content) document.querySelector(".ce-paragraph").innerHTML = content;
    if (exists)
      document.querySelector("#right-aside-section").dataset.exists = exists;
    if (tags.length) {
      const tagElements = [];
      tags.forEach((tag) => {
        tagElements.push(
          new Tags().createTagComponent({ exists: true, tag: tag })
        );
      });
      tagElements.forEach((element) => {
        document.querySelector(".tags-container").appendChild(element);
      });
    }
    if (noteId) {
      document.querySelector("#right-aside-section").dataset.Id = noteId;
      document.getElementById(noteId).setAttribute("aria-selected", "true");
    }

    this.UpdateImportentElements(importantLevelColor);
  }
  search(searchValue) {
    let data = [];
    const notes = this.Notes.filter((note) => {
      if (note.title.includes(searchValue)) {
        return note;
      }
    });
    if (notes[0] != undefined) {
      notes.forEach((value) => {
        data.push({
          text: value.title,
          color: value.importantLevel.color,
          noteId: value.getId,
        });
      });
    } else {
      data = "";
    }
    return data;
  }
  createSearchDataComponent(searchData = {}) {
    const li = document.createElement("li");
    li.setAttribute("class", "suggestions");
    const container = document.createElement("div");
    container.setAttribute("class", "suggestions-inner-container");
    const circle = document.createElement("div");
    if (searchData.text) {
      circle.setAttribute("class", `circle ${searchData.color}`);
    } else {
      circle.setAttribute("class", `circle`);
    }
    const text = document.createElement("span");
    text.setAttribute("class", `suggestions-inner-container-text`);
    if (searchData.text) {
      text.appendChild(document.createTextNode(searchData.text));
    } else {
      text.appendChild(document.createTextNode("No Match Found"));
    }
    container.appendChild(circle);
    container.appendChild(text);
    li.appendChild(container);
    return li;
  }
  renderSearchDataComponent(searchData) {
    const SearchDataComponentContainerElement = document.querySelector(
      ".suggestions-container"
    );
    const searchBtn = document.querySelector(".search-btn");
    if (searchData[0]) {
      SearchDataComponentContainerElement.innerHTML = "";
      searchData.forEach((data) => {
        SearchDataComponentContainerElement.appendChild(
          this.createSearchDataComponent(data)
        );
        setTimeout(() => {
          SearchDataComponentContainerElement.innerHTML = "";
        }, 1500);
      });
      searchBtn.dataset.searchable = "true";
    } else {
      SearchDataComponentContainerElement.innerHTML = "";
      SearchDataComponentContainerElement.appendChild(
        this.createSearchDataComponent({ text: "", color: "" })
      );
      setTimeout(() => {
        SearchDataComponentContainerElement.innerHTML = "";
      }, 1500);
      searchBtn.dataset.searchable = "";
    }
    this.setSearchData = searchData;
  }
  renderNotesBySearchData() {
    const searchData = this.#searchdata;
    if (searchData[0]) {
      const noteContainer = document.querySelector(".note-wrapper-container");
      noteContainer.innerHTML = "";
      searchData.forEach((data) => {
        const { noteId } = data;
        const { value: note } = this.findNoteById(noteId);
        const { title, content, categorieName, date, importantLevel } = note;
        const noteElement = this.CreateNoteComponent(
          title,
          content,
          categorieName,
          date,
          importantLevel,
          note.getId
        );
        const noteContainerElement = document.querySelector(
          ".note-wrapper-container"
        );
        noteContainerElement.appendChild(noteElement);
      });
    }
  }
  renderNotesFromNotes() {
    const Notes = this.Notes;
    if (Notes[0]) {
      const noteContainer = document.querySelector(".note-wrapper-container");
      noteContainer.innerHTML = "";
      Notes.forEach((Note) => {
        const { title, content, categorieName, date, importantLevel } = Note;
        const noteElement = this.CreateNoteComponent(
          title,
          content,
          categorieName,
          date,
          importantLevel,
          note.getId
        );
        const noteContainerElement = document.querySelector(
          ".note-wrapper-container"
        );
        noteContainerElement.appendChild(noteElement);
      });
    }
  }
  resetSearchComponent() {
    document.querySelector(".search-input").value = "";
    document.querySelector(".search-btn").dataset.searchable = "";
    if (
      !document
        .querySelector(".search-btn")
        .firstElementChild.className.includes("search-btn-pic")
    )
      toggleCross();
  }
  toggleImportentLevelElements(data) {
    const importantLevelElement = document.querySelectorAll(
      ".select-level-options"
    );
    for (let indexNumber in Object.keys(importantLevelElement)) {
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
        importantLevelElement[indexNumber].setAttribute(
          "aria-label",
          `inportent level option ${data[indexNumber].Text}`
        );
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
        importantLevelElement[indexNumber].setAttribute(
          "aria-label",
          `inportent level option ${data[indexNumber].Text}`
        );
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
        importantLevelElement[indexNumber].setAttribute(
          "aria-label",
          `inportent level option ${data[indexNumber].Text}`
        );
      }
    }
  }
  collectImportantLevelData() {
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
          choosenElement.color =
            targetElement.parentElement.firstElementChild.id;
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
          if (
            !targetElement.id.includes("select-level-options-first-element")
          ) {
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
          this.changingOrderChoosenElement.call(
            this,
            orderChoosenElement,
            "yellow"
          );
          this.toggleImportentLevelElements(orderChoosenElement);
        } else if (
          choosenElement.color != "red" &&
          choosenElement.color != "yellow"
        ) {
          this.changingOrderChoosenElement.call(
            this,
            orderChoosenElement,
            "green"
          );
          this.toggleImportentLevelElements(orderChoosenElement);
        } else {
          this.changingOrderChoosenElement.call(
            this,
            orderChoosenElement,
            "red"
          );
          this.toggleImportentLevelElements(orderChoosenElement);
        }
      }
      if (flag) {
        execute.apply(new Notes(), arguments);
      }
      flag = !flag;
    };
  }
  changingOrderChoosenElement(orderChoosenElement, value) {
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
  UpdateImportentElements(choosenElementColor) {
    const orderChoosenElement = [
      { Text: "General", color: "red" },
      { Text: "Medium", color: "yellow" },
      { Text: "Low", color: "green" },
    ];
    this.changingOrderChoosenElement(orderChoosenElement, choosenElementColor);
    this.toggleImportentLevelElements(orderChoosenElement);
  }
  resetImportentElements() {
    document.querySelector(".select-level-container").dataset.color = "red";
    document.querySelector(".select-level-container").dataset.text = "General";
    const orderOfImportentElements = [
      { Text: "General", color: "red" },
      { Text: "Medium", color: "yellow" },
      { Text: "Low", color: "green" },
    ];
    const optionsElements = Object.values(
      document.querySelectorAll(".select-level-options")
    );
    for (const index in optionsElements) {
      const circleElement = optionsElements[index].firstElementChild;
      const optionElement = optionsElements[index].lastElementChild;
      const circleElementId = circleElement.id;
      circleElement.setAttribute("id", orderOfImportentElements[index].color);
      circleElement.classList.remove(circleElementId);
      circleElement.classList.add(orderOfImportentElements[index].color);
      optionElement.innerHTML = orderOfImportentElements[index].Text;
      optionsElements[index].setAttribute(
        "aria-label",
        `inportent level option ${orderOfImportentElements[index].Text}`
      );
    }
  }
  getAllTags() {
    const notes = this.Notes;
    const tags = [];
    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        const tagName = tag.Name;
        if (tags[0]) {
          const demiTag = tags.filter(
            (tagNameString) => tagNameString == tagName
          );
          if (!demiTag[0]) {
            tags.push(tagName);
          }
        } else {
          tags.push(tagName);
        }
      });
    });
    return tags;
  }
  createSortTagOptionElement(value = "") {
    const summary = document.createElement("summary");
    summary.setAttribute("tabindex", "0");
    summary.setAttribute("aria-selected", "false");
    if (value) {
      summary.dataset.value = value;
      const checkBoxLabel = document.createElement("label");
      checkBoxLabel.setAttribute("for", value);
      checkBoxLabel.setAttribute("class", "filterTags-options-values");
      const checkBoxInput = document.createElement("input");
      checkBoxInput.setAttribute("type", "checkbox");
      checkBoxInput.setAttribute("id", value);
      checkBoxInput.setAttribute("class", "filterTags-options-value-input");
      const spanElement = document.createElement("span");
      spanElement.innerHTML = `#${value}`;
      checkBoxLabel.appendChild(checkBoxInput);
      checkBoxLabel.appendChild(spanElement);
      summary.appendChild(checkBoxLabel);
      summary.setAttribute("aria-label", `tagname ${value}`);
    } else {
      summary.dataset.value = "";
      summary.innerHTML = "No Tags";
      summary.setAttribute("aria-label", "no tags");
    }
    summary.setAttribute("class", "filterTags-options");
    return summary;
  }
  addSortTagOptionElements(tags = []) {
    if (tags[0]) {
      document.querySelector("#filterTags").firstElementChild.remove();
      tags.forEach((Name) => {
        document
          .querySelector("#filterTags")
          .appendChild(this.createSortTagOptionElement(Name));
      });
    } else {
      document.querySelector("#filterTags").firstElementChild.remove();
      document
        .querySelector("#filterTags")
        .appendChild(this.createSortTagOptionElement());
    }
  }
  findNoteByTagName(TagName, optionalArgument = false) {
    let Notes = undefined;
    if (optionalArgument) {
      Notes = this;
    } else {
      Notes = this.Notes;
    }
    let notes = [];
    Notes.forEach((note) => {
      note.tags.forEach((tag) => {
        if (tag.Name == TagName) notes.unshift(note);
      });
    });
    return notes;
  }
  renderNotesBySortTagOptionValue(tagNameStringData = []) {
    let notes = [];
    if (tagNameStringData[0]) {
      tagNameStringData.forEach((tagNameString) => {
        if (!tagNameStringData.indexOf(tagNameString)) {
          notes = this.findNoteByTagName(tagNameString);
        } else {
          notes = this.findNoteByTagName.call(notes, tagNameString, true);
        }
      });
    } else {
      notes = this.Notes;
    }
    const noteContainer = document.querySelector(".note-wrapper-container");
    noteContainer.innerHTML = "";
    notes.forEach((Note) => {
      const { title, content, categorieName, date, importantLevel } = Note;
      const noteElement = this.CreateNoteComponent(
        title,
        content,
        categorieName,
        date,
        importantLevel,
        Note.getId
      );
      const noteContainerElement = document.querySelector(
        ".note-wrapper-container"
      );
      noteContainerElement.appendChild(noteElement);
    });
  }
  findNoteByImportentLevel(importentLevel) {
    let notes = this.Notes.filter(
      (note) => note.importantLevel.Name == importentLevel
    );
    return notes;
  }
  renderNotesByImportentLevelOptionValue(importentLevel) {
    let notes = this.findNoteByImportentLevel(importentLevel);
    if (!notes[0]) {
      notes = this.Notes;
    }
    const noteContainer = document.querySelector(".note-wrapper-container");
    noteContainer.innerHTML = "";
    notes.forEach((Note) => {
      const { title, content, categorieName, date, importantLevel } = Note;
      const noteElement = this.CreateNoteComponent(
        title,
        content,
        categorieName,
        date,
        importantLevel,
        note.getId
      );
      const noteContainerElement = document.querySelector(
        ".note-wrapper-container"
      );
      noteContainerElement.appendChild(noteElement);
    });
  }
}
function Tag(Name) {
  this.Name = Name;
  this.tagId = generatetempoID(Name);
  Object.defineProperty(this, "getId", {
    get() {
      return this.tagId;
    },
  });
  Object.defineProperty(this, "setId", {
    set(Id) {
      this.tagId = Id;
    },
  });
}
export class Tags {
  constructor() {
    this.Tags = [];
  }
  get getTags() {
    return this.Tags;
  }
  set setTags(tags) {
    this.Tags = tags;
  }
  addTagByName(Name) {
    const tag = new Tag(Name);
    this.Tags.push(tag);
    return tag;
  }
  updateTagName(tagId, tagName) {
    const { index: tagIndex } = this.findTagById(tagId);
    this.Tags[tagIndex].Name = tagName;
  }
  removeTag(tagId) {
    const { index: tagIndex } = this.findTagById(tagId);
    this.Tags.length > 1
      ? this.Tags.splice(tagIndex, tagIndex)
      : this.Tags.pop();
  }
  createNew() {
    this.Tags = [];
  }
  findTagById(Id) {
    let indexNumber = undefined;
    const value = this.Tags.filter((obj) => {
      if (obj.getId == Id) {
        indexNumber = this.Tags.indexOf(obj);
        return obj;
      }
    });
    if (value[0] != undefined) {
      return { index: indexNumber, value: value[0] };
    } else false;
  }
  createTagComponent(TagArguments = { exists: false, tag: [] }) {
    const tagElement = document.createElement("span");
    tagElement.setAttribute("class", "tag");
    const spanElement = document.createElement("span");
    spanElement.innerHTML = "#";
    spanElement.setAttribute("tabindex", "-1");
    const tagNameElement = document.createElement("span");
    tagNameElement.setAttribute("class", "tagName");
    tagNameElement.setAttribute("role", "textbox");
    tagNameElement.setAttribute("aria", "edit tagname");
    if (TagArguments.exists) {
      const { Name } = TagArguments.tag;
      tagNameElement.setAttribute("id", TagArguments.tag.getId);
      tagNameElement.setAttribute("contenteditable", "false");
      tagNameElement.innerHTML = Name;
      tagElement.dataset.complete = "true";
    } else {
      tagNameElement.setAttribute("id", "");
      tagNameElement.setAttribute("contenteditable", "true");
      tagElement.dataset.complete = "false";
    }
    tagNameElement.dataset.dblClick = "false";
    const tagDeleteBtnElement = document.createElement("button");
    tagDeleteBtnElement.setAttribute("class", "tag-del-btn");
    tagDeleteBtnElement.innerHTML = "x";
    tagElement.appendChild(spanElement);
    tagElement.appendChild(tagNameElement);
    tagElement.appendChild(tagDeleteBtnElement);
    return tagElement;
  }
}
export class Categories {
  constructor() {
    this.categories = [];
  }
  get getCategories() {
    return this.categories;
  }
  addCategorie(categorieName, Notes) {
    const Categorie = new categorie(categorieName, Notes);
    this.categories.push(Categorie);
    return Categorie;
  }
  updateCategorieName(categorieId, CategorieName) {
    const { index } = this.findCategorieById(categorieId);
    this.categories[index].Name = CategorieName;
  }
  updateNotesCategorieName(newNotes, CategorieName) {
    const { value: categorie } = this.findCategorieByName(CategorieName);
    const { Notes } = categorie;
    newNotes.setNotes = Notes;
  }
  updateCategorieNotes(newNotes, categorieName) {
    const { index } = this.findCategorieByName(categorieName);
    this.categories[index].Notes = newNotes;
    this.categories[index].updateNotesNumber();
  }
  deleteCategorie(categorieName) {
    const { index } = this.findCategorieByName(categorieName);
    if (index) this.categories.splice(index, index);
    else this.categories.shift();
  }
  findCategorieById(id) {
    let indexNumber = undefined;
    const value = this.categories.filter((obj) => {
      if (obj.getId == id) {
        indexNumber = this.categories.indexOf(obj);
        return obj;
      }
    });
    if (value[0] != undefined) {
      return { index: indexNumber, value: value[0] };
    } else false;
  }
  findCategorieByName(Name) {
    let indexNumber = undefined;
    const value = this.categories.filter((obj) => {
      if (obj.Name == Name) {
        indexNumber = this.categories.indexOf(obj);
        return obj;
      }
    });
    if (value[0] != undefined) {
      return { index: indexNumber, value: value[0] };
    } else false;
  }
  // Data = {Name,id,ariaselected,complete}
  CreateCategorieComponent(data = {}) {
    const { Name, categorieId, ariaSelected, complete, readOnly, NotesNumber } =
      data;
    const li = document.createElement("li");
    li.setAttribute("className", "categorieListTag");
    const categoriesContainer = document.createElement("div");
    categoriesContainer.setAttribute("class", "categories-container");
    if (categorieId) categoriesContainer.setAttribute("id", categorieId);
    else categoriesContainer.setAttribute("id", ``);
    if (ariaSelected) categoriesContainer.setAttribute("aria-selected", `true`);
    else categoriesContainer.setAttribute("aria-selected", `false`);
    if (Name) categoriesContainer.dataset.categorie_Name = Name;
    else categoriesContainer.dataset.categorie_Name = "";
    categoriesContainer.dataset.dblClick = "";
    if (complete) categoriesContainer.dataset.complete = "true";
    else categoriesContainer.dataset.complete = "false";
    const categorieContainer = document.createElement("div");
    categorieContainer.setAttribute("class", "categorie-container");
    const categorieTextWrapper = document.createElement("div");
    categorieTextWrapper.setAttribute("class", "categorie-text-wrapper");
    const categorieInput = document.createElement("input");
    categorieInput.setAttribute("type", "text");
    categorieInput.setAttribute("class", "categorie-input");
    if (readOnly) categorieInput.readOnly = true;
    if (Name) {
      categorieInput.value = Name;
      categorieInput.setAttribute("aria-label", `categorie name ${Name}`);
    } else categorieInput.setAttribute("aria-label", "categorie name");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "del";
    deleteBtn.setAttribute("class", "remove-categorie");
    deleteBtn.setAttribute("title", "delete");
    deleteBtn.setAttribute("aria-label", "delete categorie");
    categorieTextWrapper.appendChild(categorieInput);
    if (NotesNumber) {
      const NoteNumberElement = this.createNoteNumberComponent(NotesNumber);
      categorieTextWrapper.appendChild(NoteNumberElement);
    }
    categorieContainer.appendChild(categorieTextWrapper);
    categorieContainer.appendChild(deleteBtn);
    categoriesContainer.appendChild(categorieContainer);
    li.appendChild(categoriesContainer);
    return li;
  }
  deleteCategorieComponent(element) {
    // element must be categorie element
    const categorieElement = element;
    const categorieinputElement =
      categorieElement.firstElementChild.firstElementChild.firstElementChild;
    const categorieinputElementValue = categorieinputElement.value;
    if (categorieinputElementValue.trim()) {
      let switchElement = undefined;
      if (this.categories.length >= 2) {
        const data = this.findCategorieByName(categorieinputElementValue);
        switchElement = this.switchToCategorieByDeleteBtn(
          this.categories.length,
          data
        );
        toggleNoGroupSection(true);
        toggleMainSection(false);
      } else {
        toggleNoGroupSection(false);
        toggleMainSection(true);
      }
      toggleRightSection(true);
      toggleNoNotesSection(false);
      categorieElement.parentElement.remove();
      return { switchElement: switchElement };
    } else {
      document
        .querySelector(".categories-container-wrapper")
        .firstElementChild.lastElementChild.remove();
    }
  }
  createNoteNumberComponent(categorieNoteslength) {
    const span = document.createElement("span");
    span.setAttribute("id", "categorie-note-length");
    span.setAttribute("class", "categorie-note-length");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = categorieNoteslength;
    return span;
  }
  updateNoteNumberComponent(categorieId, categorieElement) {
    const { value: categorie } = this.findCategorieById(categorieId);
    const { NotesNumber } = categorie;
    const NoteNumberElement = document.querySelector("#note-number");
    if (NotesNumber == 1) {
      if (
        !categorieElement.firstElementChild.firstElementChild.lastElementChild.className.includes(
          "categorie-note-length"
        )
      ) {
        const NoteNumberElement = this.createNoteNumberComponent(NotesNumber);
        categorieElement.firstElementChild.firstElementChild.appendChild(
          NoteNumberElement
        );
      }
      NoteNumberElement.innerText = checkNoteNumber(NotesNumber);
    }
    if (NotesNumber > 1) {
      categorieElement.firstElementChild.firstElementChild.lastElementChild.innerHTML =
        NotesNumber;
      NoteNumberElement.innerText = checkNoteNumber(NotesNumber);
    }
  }
  deleteNoteNumberComponent(categorieId) {
    document
      .querySelector(`#${categorieId}`)
      .firstElementChild.firstElementChild.lastElementChild.remove();
  }
  switchToCategorieByDeleteBtn(length, value) {
    if (value) {
      if (length == 2) {
        if (value.index == 0) {
          const { Name } = this.categories[value.index + 1];
          this.updateCategorieInfoOnMain(Name);
          return this.categories[value.index + 1];
        } else {
          const { Name } = this.categories[value.index - 1];
          this.updateCategorieInfoOnMain(Name);
          return this.categories[value.index - 1];
        }
      }
      if (length >= 3) {
        if (value.index == this.categories.length - 1) {
          const { Name } = this.categories[value.index - 1];
          this.updateCategorieInfoOnMain(Name);
          return this.categories[value.index - 1];
        } else {
          const { Name } = this.categories[value.index + 1];
          this.updateCategorieInfoOnMain(Name);
          return this.categories[value.index + 1];
        }
      }
    }
  }
  updateCategorieInfoOnMain(categorieName) {
    const { value: categorie } = this.findCategorieByName(categorieName);
    const { Name, NotesNumber } = categorie;
    if (categorie) {
      document.querySelector(".header-text").innerText = Name;
      document.querySelector("#note-number").innerText =
        checkNoteNumber(NotesNumber);
    } else {
      throw new Error("Opps:something happens!");
    }
  }
  checkCategorieNameExists(categorieName) {
    if (categorieName) {
      const data = this.findCategorieByName(categorieName);
      return data ? true : false;
    } else {
      return false;
    }
  }
  switchToCategorieByCilckbtn(categorieName) {
    this.updateCategorieInfoOnMain(categorieName);
    this.renderNotes(categorieName);
  }
  renderNotes(categorieName) {
    const noteContainerElement = document.querySelector(
      ".note-wrapper-container"
    );
    noteContainerElement.innerHTML = "";
    const { value: categorie } = this.findCategorieByName(categorieName);
    if (categorie.NotesNumber) {
      categorie.Notes.forEach((note) => {
        const { title, content, date, categorieName, importantLevel } = note;
        const noteId = note.getId;
        document
          .querySelector(".note-wrapper-container")
          .appendChild(
            new Notes().CreateNoteComponent(
              title,
              content,
              categorieName,
              date,
              importantLevel,
              noteId
            )
          );
        toggleNoNotesSection(true);
        toggleNoteSection(false);
      });
    } else {
      toggleNoNotesSection(false);
      toggleNoteSection(true);
    }
  }
}
export class Data {
  constructor(profile = {}, categories = []) {
    this.profile = profile;
    this.categories = categories;
  }
  getFormatedNotesForData(Notes) {
    const newNotes = [];
    Notes.forEach((note) => {
      const noteId = note.getId;
      const newNote = { ...note, Id: noteId };
      newNotes.push(newNote);
    });
    return newNotes;
  }
  getFormatedNotesForNotes(notes) {
    let newNotes = [];
    notes.forEach((getNote) => {
      const {
        title,
        content,
        tags,
        importantLevel,
        timestamp,
        categorieName,
        Id,
        exists,
      } = getNote;
      const modifyNote = new note(
        title,
        content,
        tags,
        importantLevel,
        timestamp,
        categorieName
      );
      modifyNote.setId = Id;
      modifyNote.exists = exists;
      newNotes.push(modifyNote);
    });
    return newNotes;
  }
  getFormatedCategoriesForData(categories) {
    const newCategories = [];
    categories.forEach((categorie) => {
      const { Name, Notes, NotesNumber } = categorie;
      const categorieId = categorie.getId;
      newCategories.push({
        Name: Name,
        Notes: this.getFormatedNotesForData(Notes),
        NotesNumber: NotesNumber,
        Id: categorieId,
      });
    });
    return newCategories;
  }
  storeCategoriesInData(categories, type = false) {
    type
      ? (this.categories = categories)
      : (this.categories = this.getFormatedCategoriesForData(categories));
  }
  storeProfileDataInData({ Name, emall, imageSrc, Password }) {
    this.profile = {
      Name: Name,
      emall: emall,
      imageSrc: imageSrc,
      Password: Password,
    };
  }
  storeInLocalStorage() {
    localStorage.setItem("Data", JSON.stringify(this));
  }
  deleteFromLocalStorage(Data) {
    localStorage.clear();
  }
  getDataFromLocalStorage() {
    if (localStorage.getItem("Data") ?? false) {
      const { profile, categories } = JSON.parse(localStorage.getItem("Data"));
      this.profile = profile;
      this.categories = categories;
      return this;
    } else {
      return false;
    }
  }
  setExpireLoginToken() {
    document.cookie = `loginToken=true; max-age=${60 * 5};secure`;
  }
  getExpireLoginToken() {
    const queryValue = document.cookie
      .split(";")
      .find((token) => token.startsWith("loginToken="));
    return queryValue ? queryValue.split("=")[1] : false;
  }
  modifyNotesByData(notes) {
    const notesOfFirstCategorie = this.categories[0]
      ? this.categories[0].Notes
      : [];
    if (notesOfFirstCategorie[0]) {
      let newNotes = [];
      notesOfFirstCategorie.forEach((getNote) => {
        const {
          title,
          content,
          tags,
          importantLevel,
          timestamp,
          categorieName,
          Id,
          exists,
        } = getNote;
        const modifyNote = new note(
          title,
          content,
          tags,
          importantLevel,
          timestamp,
          categorieName
        );
        modifyNote.setId = Id;
        modifyNote.exists = exists;
        newNotes.push(modifyNote);
      });
      notes.Notes = newNotes;
    } else {
      notes.Notes = notesOfFirstCategorie;
    }
  }
  modifyCategoriesByData(sendCategories) {
    const newCategories = [];
    this.categories.forEach((getCategorie) => {
      const { Name, Notes, NotesNumber, Id } = getCategorie;
      const newCategorie = new categorie(
        Name,
        this.getFormatedNotesForNotes(Notes)
      );
      newCategorie.setId = Id;
      newCategories.push(newCategorie);
    });
    sendCategories.categories = newCategories;
  }
  modifyProfileData(ProfileData) {
    const { Name, emall, imageSrc, Password } = this.profile;
    ProfileData.Name = Name;
    ProfileData.emall = emall;
    ProfileData.imageSrc = imageSrc;
    ProfileData.setPassword = Password;
  }
  renderModifyCategories() {
    const categoriesContainerWrapper = document.querySelector(
      ".categories-container-wrapper"
    ).firstElementChild;
    const categories = this.categories;
    if (categories[0]) {
      for (let index in categories) {
        const categorie = categories[index];
        const categorieName = categorie.Name;
        const categorieId = categorie.Id;
        let categorieElement = undefined;
        if (!index) {
          categorieElement = new Categories().CreateCategorieComponent({
            categorieName: categorieName,
            categorieId: categorieId,
            ariaSelected: true,
            complete: true,
            readOnly: true,
            NotesNumber: categorie.NotesNumber,
          });
          categoriesContainerWrapper.appendChild(categorieElement);
        } else {
          categorieElement = new Categories().CreateCategorieComponent({
            Name: categorieName,
            categorieId: categorieId,
            ariaSelected: false,
            complete: true,
            readOnly: true,
            NotesNumber: categorie.NotesNumber,
          });
          categoriesContainerWrapper.appendChild(categorieElement);
        }
      }
    }
  }
  renderModifyNotes() {
    const noteWrapperContainer = document.querySelector(
      ".note-wrapper-container"
    );
    const notesOfFirstCategorie = this.categories[0]
      ? this.categories[0].Notes
      : [];
    if (notesOfFirstCategorie[0]) {
      notesOfFirstCategorie.forEach((Note) => {
        const { title, content, categorieName, date, importantLevel, Id } =
          Note;
        const noteElement = new Notes().CreateNoteComponent(
          title,
          content,
          categorieName,
          date,
          importantLevel,
          Id
        );
        const noteContainerElement = document.querySelector(
          ".note-wrapper-container"
        );
        noteContainerElement.appendChild(noteElement);
      });
    }
  }
  renderProfileData(ProfileData) {
    ProfileData.updateProfileInputComponents();
  }
  updateCategorieInfoOnMainByData() {
    const firstCategorie = this.categories[0];
    if (firstCategorie) {
      const { Name, NotesNumber } = firstCategorie;
      document.querySelector(".header-text").innerText = Name;
      document.querySelector("#note-number").innerText =
        checkNoteNumber(NotesNumber);
    }
  }

  StoreAllInData({ categories, type }, profile) {
    this.storeCategoriesInData(categories, type);
    this.storeProfileDataInData(profile);
  }
  modifyAll(notes, categories, ProfileData) {
    this.modifyCategoriesByData(categories);
    this.modifyNotesByData(notes);
    this.modifyProfileData(ProfileData);
  }
  renderAll() {
    this.renderModifyCategories();
    this.renderModifyNotes();
    this.updateCategorieInfoOnMainByData();
  }
}
