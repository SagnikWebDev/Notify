import {
  Notes,
  Categories,
  Tags,
  profile,
  Data,
  toastMessage,
} from "./models.js";
import { editor } from "./editor.js";
import {
  toggleNoGroupSection,
  toggleMainSection,
  toggleNoNotesSection,
  toggleProfileSettingsSection,
  toggleLeftSection,
  toggleNoteSection,
  ChangeSearchCross,
} from "./togglers.js";
import { getTimeInfo } from "./stringUtilities.js";
// functions....
function setDateAndTimeOnTheComponents() {
  const { time, greetingsText, dateText } = getTimeInfo();

  const timeElement = document.querySelector("#timeText");
  timeElement.innerHTML = time;

  const greetingsTextElements = document.querySelectorAll(".greetingsText");
  const dateTextElements = document.querySelectorAll(".dateText");
  for (let index = 0; index < 2; index++) {
    greetingsTextElements[index].innerHTML = greetingsText;
    dateTextElements[index].innerHTML = ` (${dateText})`;
  }
}
function renderCategorieComponent() {
  if (!categorieContainerElement.children.length) {
    const categorieElement = categories.CreateCategorieComponent();
    const categorieInputElement =
      categorieElement.firstElementChild.firstElementChild.firstElementChild
        .firstElementChild;
    categorieContainerElement.appendChild(categorieElement);
    categorieInputElement.focus();
  } else {
    if (
      categorieContainerElement.lastElementChild.firstElementChild.dataset
        .complete != "false"
    ) {
      const categorieElement = categories.CreateCategorieComponent();
      const categorieInputElement =
        categorieElement.firstElementChild.firstElementChild.firstElementChild
          .firstElementChild;
      categorieContainerElement.appendChild(categorieElement);
      categorieInputElement.focus();
      tags.createNew();
    }
  }
}

// time and Date sections......
setDateAndTimeOnTheComponents();
// categorie section......
const categories = new Categories();
const tags = new Tags();
const Profile = new profile();
function updateAriaSelectedOnCategorie(categorieName) {
  const categorieElements = document.querySelectorAll(".categories-container");
  if (categorieElements) {
    for (let index in Object.values(categorieElements)) {
      const categorieElement = categorieElements[index];
      if (categorieElement.dataset.categorie_Name == categorieName) {
        categorieElement.setAttribute("aria-selected", "true");
      } else {
        categorieElement.setAttribute("aria-selected", "false");
      }
    }
  }
}
const categorieContainerElement = document.querySelector(
  ".categories-container-wrapper"
).firstElementChild;
const addCategorieBtn = document.querySelector(".add-categorie-btn");
addCategorieBtn.addEventListener("click", (event) => {
  renderCategorieComponent();
});
const addCircularBtn = document.querySelector(".add-circular-btn");
addCircularBtn.addEventListener("click", (event) => {
  toggleLeftSection();
  renderCategorieComponent();
});
categorieContainerElement.addEventListener("click", (event) => {
  event.stopPropagation();
  let targetElement = event.target;
  if (targetElement.className.includes("fa-trash"))
    targetElement = targetElement.parentElement;
  if (targetElement.className.includes("remove-categorie")) {
    // deleting categorie by clicking..............
    const categorieElement = targetElement.parentElement.parentElement;
    const categorieName = categorieElement.dataset.categorie_Name;
    const categorieId = categorieElement.id;
    const categorieWrapperElement = categorieElement.parentElement;
    if (!categorieId) {
      categorieWrapperElement.remove();
    } else {
      const switchElement =
        categories.deleteCategorieComponent(categorieElement);
      const switchCategorie = switchElement.switchElement;
      categories.deleteCategorie(categorieName);
      if (switchCategorie) {
        const { Notes } = switchCategorie;
        notes.setNotes = Notes;
        notes.resetSearchComponent();
      }
      if (notes.Notes[0]) {
        if (switchCategorie) categories.renderNotes(switchCategorie.Name);
        toggleNoNotesSection(true);
      }
      // data Update......
      const { Name, emall, imageSrc } = Profile;
      const ProfileDataPassword = Profile.getPassword;
      data.StoreAllInData(
        { categories: categories.categories },
        {
          Name: Name,
          emall: emall,
          imageSrc: imageSrc,
          Password: ProfileDataPassword,
        }
      );
      data.storeInLocalStorage();
    }

    // aria part....
    if (categories.categories.length) {
      const { value: categorie } = categories.findCategorieByName(
        document.querySelector(".header-text").innerText
      );
      // const categorieElementId = categorie.getId;
      updateAriaSelectedOnCategorie(categorie.Name);
      resetAriaSelectedOnFilterBtn();
    }
  } else {
    // load all thing of clicking categorie.......
    let categorieElement = undefined;
    if (
      targetElement.className.includes("categorie-input") ||
      targetElement.className.includes("categorie-note-length")
    ) {
      categorieElement =
        targetElement.parentElement.parentElement.parentElement;
      const categorieName = categorieElement.dataset.categorie_Name;
      categories.switchToCategorieByCilckbtn(categorieName);
    }
    if (targetElement.className.includes("categorie-container")) {
      categorieElement = targetElement.parentElement;
      const categorieName = categorieElement.dataset.categorie_Name;
      categories.switchToCategorieByCilckbtn(categorieName);
    }
    if (targetElement.className.includes("categorie-text-wrapper")) {
      categorieElement = targetElement.parentElement.parentElement;
      const categorieName = categorieElement.dataset.categorie_Name;
      categories.switchToCategorieByCilckbtn(categorieName);
    }
    if (targetElement.className.includes("categorieListTag")) {
      categorieElement = targetElement.firstElementChild;
      const categorieName = categorieElement.dataset.categorie_Name;
      categories.switchToCategorieByCilckbtn(categorieName);
    }
    const categorieId = categorieElement.id;
    const { value: categorie } = categories.findCategorieById(categorieId);
    const { Notes } = categorie;
    notes.setNotes = Notes;
    notes.resetSearchComponent();
    updateAriaSelectedOnCategorie(categorie.Name);
    resetAriaSelectedOnFilterBtn();
  }
});
categorieContainerElement.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    const targetElement = event.target;
    if (targetElement.className.includes("categorie-input")) {
      if (event.key == "Enter") {
        const categorieInputElement = event.target;
        const categorieInputElementValue = categorieInputElement.value;
        const categorieElement =
          categorieInputElement.parentElement.parentElement.parentElement;
        const dblClick = categorieElement.dataset.dblClick;
        if (categorieInputElementValue.trim()) {
          if (
            !categories.checkCategorieNameExists(categorieInputElementValue)
          ) {
            if (Boolean(dblClick)) {
              const categorieId = categorieElement.id;
              categories.updateCategorieName(
                categorieId,
                categorieInputElementValue
              );
              categories.updateNoteNumberComponent(
                categorieId,
                categorieElement
              );
              categorieElement.dataset.dblClick = "";
              categorieElement.dataset.categorie_Name =
                categorieInputElementValue;
              document.querySelector(".header-text").innerText =
                categorieInputElementValue;
              categorieInputElement.readOnly = true;
            } else {
              const categorie = categories.addCategorie(
                categorieInputElementValue,
                []
              );
              categorieElement.dataset.categorie_Name = categorie.Name;
              categorieElement.dataset.complete = "true";
              // categorieElement.setAttribute("aria-selected", "true");
              categorieElement.setAttribute("id", categorie.getId);
              categorieInputElement.readOnly = true;
              categories.updateCategorieInfoOnMain(categorie.Name);
              toggleNoGroupSection(true);
              toggleNoteSection(true);
              toggleNoNotesSection(false);
              toggleMainSection(false);
              notes.createNew();
              notes.resetSearchComponent();
              // reset for rerender sortTagBtncomponent
              if (!notes.getFlagForSortBtn) {
                notes.setFlagForSortBtn = !notes.getFlagForSortBtn;
                notes.addSortTagOptionElements();
              }
              // reset the note container ui
              document.querySelector(".note-wrapper-container").innerHTML = "";
              updateAriaSelectedOnCategorie(categorie.Name);
              resetAriaSelectedOnFilterBtn();
            }
            // data Update......
            const { Name, emall, imageSrc } = Profile;
            const ProfileDataPassword = Profile.getPassword;
            data.StoreAllInData(
              { categories: categories.categories },
              {
                Name: Name,
                emall: emall,
                imageSrc: imageSrc,
                Password: ProfileDataPassword,
              }
            );
            data.storeInLocalStorage();
          } else {
            new toastMessage().appendtoastMessageElement(
              new toastMessage().createElement({
                type: "failed",
                text: `${categorieInputElementValue} already Exists!`,
              })
            );
            throw new Error("already Exists!!!");
          }
        } else {
          categories.deleteCategorieComponent(categorieElement);
        }
      }
    }
    if (window.innerWidth < 533) {
      toggleLeftSection(false);
    }
  }
});
categorieContainerElement.addEventListener("dblclick", (event) => {
  const targetElement = event.target;
  if (targetElement.className.includes("categorie-input")) {
    const categorieInputElement = targetElement;
    const categorieInputElementValue = targetElement.value;
    const categorieElement =
      targetElement.parentElement.parentElement.parentElement;
    categorieElement.dataset.dblClick = "true";
    categorieInputElement.readOnly = false;
    categorieInputElement.setSelectionRange(
      categorieInputElementValue.length,
      categorieInputElementValue.length
    );
  }
});

// note section.........
const notes = new Notes();
const addNoteBtn = document.querySelector(".add-Note-btn");
addNoteBtn.addEventListener("click", (event) => {
  notes.resetImportentElements();
  notes.noteEditorOpen();
  document.querySelector(".ce-paragraph").setAttribute("role", "textbox");
  document
    .querySelector(".ce-paragraph")
    .setAttribute("aria-label", "edit note content");
});
const noteBackBtn = document.querySelector(".note-back-btn");
noteBackBtn.addEventListener("click", (event) => {
  notes.noteEditorClose();
});
const noteSaveBtn = document.querySelector(".note-save-btn");
noteSaveBtn.addEventListener("click", async (event) => {
  try {
    const { time, blocks } = await editor.save();
    let {
      Header,
      content: Notecontent,
      exists,
      noteId,
      categorieName: NoteCategorieName,
      importantLevelData,
    } = await notes.getNoteEditorValues();
    const Notetags = tags.Tags;
    if (exists != "false") {
      const noteElement = document.getElementById(noteId);
      const noteWrapperElement = noteElement.parentElement;
      noteWrapperElement.remove();
    }
    if (Header) {
      const { value: categorie } =
        categories.findCategorieByName(NoteCategorieName);
      const note = notes.addNote([
        NoteCategorieName,
        Header,
        Notecontent,
        importantLevelData,
        Notetags,
        time,
      ]);
      if (blocks[0]) {
        note.setId = blocks[0].id;
        document.querySelector("#right-aside-section").dataset.Id = note.getId;
      }
      note.exists = true;
      const { title, content, categorieName, date, importantLevel } = note;
      const noteElement = notes.CreateNoteComponent(
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
      if (exists == "true") {
        notes.deleteNote(noteId);
      }
      toggleNoNotesSection(true);
      toggleNoteSection(false);

      // update categories......
      categories.updateCategorieNotes(notes.Notes, categorie.Name);
      const categorieId = categorie.getId;
      const categorieElement = document.querySelector(`#${categorieId}`);
      categories.updateNoteNumberComponent(categorieId, categorieElement);

      // data Update......
      const { Name, emall, imageSrc } = Profile;
      const ProfileDataPassword = Profile.getPassword;
      data.StoreAllInData(
        { categories: categories.categories },
        {
          Name: Name,
          emall: emall,
          imageSrc: imageSrc,
          Password: ProfileDataPassword,
        }
      );
      data.storeInLocalStorage();
    }
    tags.createNew();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  notes.noteEditorClose();
});
const noteDeleteBtn = document.querySelector(".note-del-btn");
noteDeleteBtn.addEventListener("click", async (event) => {
  try {
    const { exists, noteId, categorieName } = await notes.getNoteEditorValues();
    if (exists != "false") {
      notes.deleteNoteComponent(categories);
      notes.deleteNote(noteId);
      const { value: categorie } =
        categories.findCategorieByName(categorieName);
      const categorieId = categorie.getId;
      const categorieElement = document.querySelector(`#${categorieId}`);
      categories.updateCategorieNotes(notes.Notes, categorieName);
      categories.updateNoteNumberComponent(categorieId, categorieElement);
      if (!notes.Notes.length) {
        toggleNoNotesSection(false);
      }
    }
    notes.noteEditorClose();
    // data Update......
    const { Name, emall, imageSrc } = Profile;
    const ProfileDataPassword = Profile.getPassword;
    data.StoreAllInData(
      { categories: categories.categories },
      {
        Name: Name,
        emall: emall,
        imageSrc: imageSrc,
        Password: ProfileDataPassword,
      }
    );
    data.storeInLocalStorage();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
const noteContainerElement = document.querySelector(".note-wrapper-container");
noteContainerElement.addEventListener("click", (event) => {
  const targetElement = event.target;
  let noteElement = undefined;
  if (
    targetElement.className.includes("circle") ||
    targetElement.className.includes("inportent-level-text")
  ) {
    noteElement = targetElement.parentElement.parentElement.parentElement;
  }
  if (
    targetElement.className.includes("importent-level") ||
    targetElement.className.includes("date-text")
  ) {
    noteElement = targetElement.parentElement.parentElement;
  }
  if (
    targetElement.className.includes("note-upper-section") ||
    targetElement.className.includes("note-content") ||
    targetElement.className.includes("title")
  ) {
    noteElement = targetElement.parentElement;
  }
  if (targetElement.className.includes("note-wrapper")) {
    noteElement = targetElement.firstElementChild;
  }
  if (targetElement.className.includes("note")) {
    noteElement = targetElement;
  }
  // setNoteEditorValuesArguments = { Header, content, exists, tags, noteId }
  const noteId = noteElement.id;
  const { value } = notes.findNoteById(noteId);
  const { title, content, exists, tags: noteTags, importantLevel } = value;
  const data = {
    Header: title,
    content: content,
    exists: exists,
    tags: noteTags,
    noteId: noteId,
    importantLevelColor: importantLevel.color,
  };
  notes.setNoteEditorValues(data);
  notes.noteEditorOpen(true);
  tags.setTags = noteTags;
});

//  Data section........
const data = new Data();
const loginToken = data.getExpireLoginToken();
const localData = data.getDataFromLocalStorage();
if (!loginToken) {
  if (localData) {
    data.deleteFromLocalStorage();
  }
  Profile.createRandomProfileData();
  Profile.updateUserCurrentProfileData();
  Profile.updateProfileInputComponents();
  const { Name, emall, imageSrc } = Profile;
  const ProfileDataPassword = Profile.getPassword;
  data.StoreAllInData(
    { categories: categories.categories },
    {
      Name: Name,
      emall: emall,
      imageSrc: imageSrc,
      Password: ProfileDataPassword,
    }
  );
  data.storeInLocalStorage();
  data.setExpireLoginToken();
} else {
  if (localData) {
    const { profile: localProfile, categories: localCategories } = localData;
    const { Name, emall, imageSrc, Password } = localProfile;
    data.StoreAllInData(
      { categories: localCategories, type: true },
      {
        Name: Name,
        emall: emall,
        imageSrc: imageSrc,
        Password: Password,
      }
    );
    data.modifyAll(notes, categories, Profile);
    Profile.updateUserCurrentProfileData();
    Profile.updateProfileInputComponents();
    data.renderAll();
    if (categories.categories.length) {
      toggleNoGroupSection(true);
      toggleMainSection(false);
    }
    if (notes.Notes.length) {
      toggleNoNotesSection(true);
      toggleNoteSection(false);
    }
  }
}

// Tags section...
const addTagBtn = document.querySelector(".add-tags-btn");
const tagElementContainer = document.querySelector(".tags-container");
addTagBtn.addEventListener("click", (event) => {
  // add and focus TagComponent
  if (!tagElementContainer.children.length) {
    const tagElement = tags.createTagComponent();
    const tagInputElement = tagElement.firstElementChild.nextElementSibling;
    tagElementContainer.appendChild(tagElement);
    tagInputElement.focus();
  } else {
    if (tagElementContainer.lastElementChild.dataset.complete != "false") {
      const tagElement = tags.createTagComponent();
      const tagInputElement = tagElement.firstElementChild.nextElementSibling;
      tagElementContainer.appendChild(tagElement);
      tagInputElement.focus();
    }
  }
});
tagElementContainer.addEventListener("click", (event) => {
  const targetElement = event.target;
  if (targetElement.className.includes("tag-del-btn")) {
    const tagElement = targetElement.parentElement;
    const tagNameElement = tagElement.firstElementChild.nextElementSibling;
    const tagId = tagNameElement.id;
    tagElement.remove();
    if (tagId) {
      tags.removeTag(tagId);
    }
  }
});
tagElementContainer.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    const tagNameElement = event.target;
    const tagNameElementValue = tagNameElement.textContent;
    const tagElement = tagNameElement.parentElement;
    if (tagNameElementValue) {
      if (tagNameElement.dataset.dblClick == "true") {
        const tagId = tagNameElement.id;
        tags.updateTagName(tagId, tagNameElementValue);
        tagNameElement.setAttribute("contenteditable", "false");
        tagElement.setAttribute("aria-label", `tagname ${tagNameElementValue}`);
      } else {
        tagNameElement.setAttribute("contenteditable", "false");
        tagElement.dataset.complete = "true";
        const tag = tags.addTagByName(tagNameElementValue);
        const tagId = tag.getId;
        tagNameElement.setAttribute("id", tagId);
        tagElement.setAttribute("aria-label", `tagname ${tagNameElementValue}`);
      }
    } else {
      tagElement.remove();
    }
  }
});
tagElementContainer.addEventListener("dblclick", (event) => {
  const targetElement = event.target;
  if (targetElement.className.includes("tagName")) {
    const tagNameElement = targetElement;
    tagNameElement.setAttribute("contenteditable", "true");
    tagNameElement.dataset.dblClick = "true";
  }
});

// importentlevel
document
  .querySelector(".select-level-container")
  .addEventListener("click", notes.collectImportantLevelData());

//sorting and searching.....
const toggleSearchCross = ChangeSearchCross();
function applyDebouncing(func, limit) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, limit);
  };
}
document.querySelector(".search-input").addEventListener("keyup", (event) => {
  const targetElement = event.target;
  const targetElementValue = targetElement.value;
  if (targetElementValue) {
    const debouncingRenderSearchDataComponent = applyDebouncing(
      notes.renderSearchDataComponent,
      500
    );
    debouncingRenderSearchDataComponent.call(
      notes,
      notes.search(targetElementValue)
    );
  }
});
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", (event) => {
  const searchInput = document.querySelector(".search-input");
  const searchInputValue = searchInput.value;
  if (searchInputValue) {
    if (searchBtn.dataset.searchable == "true") {
      if (searchBtn.firstElementChild.className.includes("search-btn-pic")) {
        notes.renderNotesBySearchData();
      } else {
        notes.renderNotesFromNotes();
      }
    } else {
      throw new Error("Notes doesn't Exists!!!");
    }
    toggleSearchCross();
  }
});

function resetAriaSelectedOnFilterBtn() {
  const filterOptions = document.querySelectorAll(".filter-options");
  for (let index in Object.values(filterOptions)) {
    const filterOption = filterOptions[index];
    if (filterOption.dataset.value != "default")
      filterOption.setAttribute("aria-selected", "false");
    else filterOption.setAttribute("aria-selected", "true");
  }
}
// sorting....
const filterBtn = document.querySelector("#User-Sort");
const sortTagsBtn = document.querySelector("#User-tags");
filterBtn.addEventListener("click", (event) => {
  const targetElement = event.target;
  if (targetElement.className.includes("filter-options")) {
    const importantLevel = targetElement.dataset.value;
    if (importantLevel == "default") {
      notes.renderNotesByImportentLevelOptionValue([]);
      if (targetElement.getAttribute("aria-selected") == "false") {
        resetAriaSelectedOnFilterBtn();
      }
    } else {
      notes.renderNotesByImportentLevelOptionValue(importantLevel);
      targetElement.setAttribute("aria-selected", "true");
      document
        .getElementById("filter-options-lastchild")
        .setAttribute("aria-selected", "false");
    }
    if (filterBtn.open) filterBtn.removeAttribute("open");
  }
  if (sortTagsBtn.open) sortTagsBtn.removeAttribute("open");
});
function getTagNamesFromSortTagBtn() {
  const tagNameStrings = [];
  return function (event) {
    const targetElement = event.target;
    if (!sortTagsBtn.open) {
      const tagNames = notes.getAllTags();
      console.log(tagNames);
      notes.addSortTagOptionElements(tagNames);
      if (filterBtn.open) filterBtn.removeAttribute("open");
    }
    if (targetElement.className.includes("filterTags-options-value-input")) {
      const TagOptionElement = targetElement;
      const UserSelectedTagName = TagOptionElement.id;
      const targetSummaryElement = targetElement.parentElement.parentElement;
      if (TagOptionElement.checked) {
        tagNameStrings.push(UserSelectedTagName);
        targetSummaryElement.setAttribute("aria-selected", "true");
      } else {
        const deleteTagNameStringIndex =
          tagNameStrings.indexOf(UserSelectedTagName);
        deleteTagNameStringIndex
          ? tagNameStrings.splice(
              deleteTagNameStringIndex,
              deleteTagNameStringIndex
            )
          : tagNameStrings.pop();
        targetSummaryElement.setAttribute("aria-selected", "false");
      }
      notes.renderNotesBySortTagOptionValue(tagNameStrings);
    }
  };
}
sortTagsBtn.addEventListener("click", getTagNamesFromSortTagBtn());
// Profile Section....
const menuBtn = document.querySelectorAll(".toggle");
menuBtn.forEach((menuBtnElement) => {
  menuBtnElement.addEventListener("click", (event) => {
    toggleLeftSection();
  });
});
const leftAsideSectionWrapper = document.querySelector(
  ".left-aside-section-wrapper"
);
leftAsideSectionWrapper.addEventListener("click", (event) => {
  const targetElement = event.target;
  if (targetElement.className.includes("left-aside-section-wrapper")) {
    toggleLeftSection(false);
    const categoriesContainerElement = document.querySelector(
      ".categories-container-wrapper"
    ).firstElementChild;
    if (categoriesContainerElement) {
      const LastCategorieElement =
        categoriesContainerElement.lastElementChild.firstElementChild;
      if (LastCategorieElement.dataset.complete == "false") {
        LastCategorieElement.parentElement.remove();
      }
    }
  }
});
const settingsBtn = document.querySelector("#settings");
settingsBtn.addEventListener("click", (event) => {
  toggleProfileSettingsSection();
});
const settingsBackBtn = document.querySelector(".back-btn");
settingsBackBtn.addEventListener("mousedown", (e) => {
  Profile.updateProfileInputComponents();
  toggleProfileSettingsSection(false);
});
const UserProfileDataSaveBtn = document.querySelector(".Save-btn");
UserProfileDataSaveBtn.addEventListener("click", (e) => {
  const conformMsgValue = window.confirm("Are you want to save the changes?");
  if (conformMsgValue) {
    const UserData = Profile.getDataFromUserProfileInputComponents();
    if (UserData.status == undefined) {
      Profile.updateProfileData(UserData);
      Profile.updateUserCurrentProfileData();
      Profile.updateProfileInputComponents();
      toggleProfileSettingsSection(false);
      // data update......
      const { Name, emall, imageSrc } = Profile;
      const ProfileDataPassword = Profile.getPassword;
      data.StoreAllInData(
        { categories: categories.categories },
        {
          Name: Name,
          emall: emall,
          imageSrc: imageSrc,
          Password: ProfileDataPassword,
        }
      );
      data.storeInLocalStorage();
      new toastMessage().appendtoastMessageElement(
        new toastMessage().createElement({
          type: "success",
          text: "your profile successfully changed!",
        })
      );
    } else {
      new toastMessage().appendtoastMessageElement(
        new toastMessage().createElement({
          type: "warning",
          text: `${UserData.name} doesn't match conditions!`,
        })
      );
      setTimeout(() => {
        new toastMessage().appendtoastMessageElement(
          new toastMessage().createElement({
            type: "failed",
            text: "failed to update profile!",
          })
        );
      }, 500);
    }
  }
});
// change the UserPic img with change the #UserPic input value changes ( it needs because before after clicking and changes by the userpic input we get the value but UserPic img never changes )..
const UserProfileImgChangeBtn = document.querySelector("#UserPic");
UserProfileImgChangeBtn.addEventListener("change", (event) => {
  // first we have to get the target element by clicking it so,....
  let UserImgComponent = event.target;
  // then we have to check the type of imgvalue of the target element.....
  if (Profile.CheckProfileUserInputsValues(UserImgComponent).testValue) {
    // then we have to check if it have the value not....
    if (
      UserImgComponent.value &&
      UserImgComponent.files &&
      UserImgComponent.files[0]
    ) {
      let reader = new FileReader();
      reader.onload = function (e) {
        document
          .querySelector("#UserPic-img")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(UserImgComponent.files[0]);
    }
  } else {
    throw new Error("Img Type Doesn't Match!!!!!");
  }
});

// functions for change the mode.......
function addPropertiesOnRootForMode(modeValue) {
  const Root = document.querySelector(":root");
  const variables = [
    "--bg-color1",
    "--bg-color2",
    "--categorie-hover-color",
    "--addnotebtn-hover-color",
    "--note-length-bg-color",
    "--note-hover-color",
    "--sortbtnvalues-hover-color",
    "--tag-bg-color",
    "--editor-toolbar-hover-color",
    "--border-color",
    "--color2",
    "--mode-color",
  ];
  const lightValues = [
    "rgb(93, 93, 244)",
    "rgb(245, 245, 245)",
    "rgb(62, 62, 197)",
    "rgb(70, 70, 226)",
    "rgb(70, 70, 226)",
    "rgb(232, 232, 232)",
    "rgb(232, 232, 232)",
    "rgb(230, 224, 224)",
    "#eff2f5",
    "black",
    "black",
    "white",
  ];
  const darkValues = [
    "orangered",
    "black",
    "rgb(210 3 3 / 47%)",
    "red",
    "red",
    "#262323",
    "rgb(30, 30, 30)",
    "#413b3b",
    "rgb(28, 27, 27)",
    "white",
    "white",
    "black",
  ];
  for (let index in variables) {
    if (modeValue == "light") {
      Root.style.setProperty(variables[index], lightValues[index]);
    } else {
      Root.style.setProperty(variables[index], darkValues[index]);
    }
  }
}
function changeModes() {
  // changemodes function made for change modes by query the mode.dataset by itself
  const mode = document.querySelector("#mode");
  const modeIconWrapper = document.querySelector(".mode-icon-wrapper");
  mode.dataset.mode == "light"
    ? (mode.dataset.mode = "dark")
    : (mode.dataset.mode = "light");
  let modeValue = mode.dataset.mode;
  if (modeValue == "light") {
    modeIconWrapper.style = "transform: translateX(0px);";
    modeIconWrapper.firstElementChild.style =
      "animation: rotate 740ms ease-in-out;";
    modeIconWrapper.firstElementChild.className = "fa-regular fa-sun";
    addPropertiesOnRootForMode("light");
    mode.setAttribute("aria-label", "Toggle dark mode");
  } else {
    modeIconWrapper.style = "transform: translateX(15px);";
    modeIconWrapper.firstElementChild.className = "fa-solid fa-moon";
    modeIconWrapper.firstElementChild.style =
      "animation: rotate 740ms ease-in-out;";
    addPropertiesOnRootForMode("dark");
    mode.setAttribute("aria-label", "Toggle light mode");
  }
  setTimeout(() => {
    modeIconWrapper.firstElementChild.style = "animation: none;";
  }, 750);
}
function changeModesByMatches(matches) {
  // if matches true its means the device has darkmode so, we have to change mode.dataset to "light" before the changemode function execute so, we get the darkmode changes.
  matches ? (mode.dataset.mode = "light") : (mode.dataset.mode = "dark");
  changeModes();
}
// change mode by clicking mode btn.....
const mode = document.querySelector("#mode");
mode.addEventListener("click", (event) => {
  changeModes();
});
// we have to change mode of website before page loads......
const matches = window.matchMedia("(prefers-color-scheme: dark)").matches;
changeModesByMatches(matches);
// we have to change mode of website with user device's darkmode changes.....
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    const matches = event.matches;
    changeModesByMatches(matches);
  });
// loader section.....
const loaderSection = document.querySelector(".loader-section");
const loader = document.querySelector(".loader");
setTimeout(() => {
  loaderSection.style = "display:none;";
  loader.style = "animation:none;";
}, 1500);
