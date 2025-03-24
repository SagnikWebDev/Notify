export function toggleNoGroupSection(multiple = "toggle") {
  if (multiple == "toggle")
    document.querySelector(".nogroup").classList.toggle("hidden");
  if (multiple) document.querySelector(".nogroup").classList.add("hidden");
  else document.querySelector(".nogroup").classList.remove("hidden");
}
export function toggleMainSection(multiple = "toggle", data = "") {
  if (multiple == "toggle")
    document.querySelector("main").classList.toggle("hidden");
  if (multiple) document.querySelector("main").classList.add("hidden");
  else document.querySelector("main").classList.remove("hidden");
}
export function toggleNoNotesSection(multiple = "toggle") {
  if (multiple == "toggle")
    document
      .querySelector(".empty-img-section-wrapper")
      .classList.toggle("hidden");
  if (multiple)
    document
      .querySelector(".empty-img-section-wrapper")
      .classList.add("hidden");
  else
    document
      .querySelector(".empty-img-section-wrapper")
      .classList.remove("hidden");
}
export function toggleRightSection(multiple = "toggle") {
  if (multiple == "toggle")
    document.querySelector("#right-aside-section").classList.toggle("hidden");
  if (multiple)
    document.querySelector("#right-aside-section").classList.add("hidden");
  else
    document.querySelector("#right-aside-section").classList.remove("hidden");
}
export function toggleProfileSettingsSection(Options = true) {
  if (Options) {
    document
      .querySelector(".profile-settings-section")
      .classList.add("profile-settings-section-visible");
    document.querySelector("#settings").setAttribute("aria-expanded", "true");
    document
      .querySelector(".profile-settings-section")
      .setAttribute("aria-hidden", "false");
  } else {
    document
      .querySelector(".profile-settings-section")
      .classList.remove("profile-settings-section-visible");
    document.querySelector("#settings").setAttribute("aria-expanded", "false");
    document
      .querySelector(".profile-settings-section")
      .setAttribute("aria-hidden", "true");
  }
}
export function toggleLeftSection(Options = true) {
  if (Options) {
    document
      .querySelector(".left-aside-section-wrapper")
      .classList.add("left-aside-section-wrapper-open");
  } else {
    document
      .querySelector(".left-aside-section-wrapper")
      .classList.remove("left-aside-section-wrapper-open");
  }
}
export function toggleNoteSection(multiple = "toggle") {
  if (multiple == "toggle")
    document
      .querySelector(".note-wrapper-container")
      .classList.toggle("hidden");
  if (multiple)
    document.querySelector(".note-wrapper-container").classList.add("hidden");
  else
    document
      .querySelector(".note-wrapper-container")
      .classList.remove("hidden");
}
const searchBtn = document.querySelector(".search-btn");
const firstElementChild = searchBtn.firstElementChild;
export function toggleSearch() {
  firstElementChild.remove();
  searchBtn.innerHTML = "<span id='search-cross'>X</span>";
  searchBtn.setAttribute("class", "search-btn cross-btn");
}
export function toggleCross() {
  firstElementChild.remove();
  searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
  searchBtn.setAttribute("class", "search-btn");
}
export function ChangeSearchCross() {
  let flag = true;
  return function () {
    flag ? toggleSearch() : toggleCross();
    flag = !flag;
  };
}
