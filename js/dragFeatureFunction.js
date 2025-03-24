const leftBarWrapper = document.querySelector(".bar-left-wrapper");
const rightBarWrapper = document.querySelector(".bar-right-wrapper");
const main = document.querySelector("main");
const rightAsideSection = document.querySelector("#right-aside-section");
const wrappers = [leftBarWrapper, rightBarWrapper];
let token = true;
let preDargValue = undefined;
let curDargEnterElementClassName = undefined;
function barfucntion(event) {
  let mainWidth = main.clientWidth;
  let rightAsideSectionWidth = rightAsideSection.clientWidth;
  let number = event.clientX;
  if (preDargValue == undefined || number != preDargValue) {
    if (number) {
      if (token) {
        leftBarWrapper.style = `display:flex;`;
        rightBarWrapper.style = `display:flex;`;
        token = false;
      }
      preDargValue = number;
      let leftBarWrapperTrueWidthValue = preDargValue - 270;
      if (leftBarWrapperTrueWidthValue > 500) {
        main.style = `width:${leftBarWrapperTrueWidthValue}px;`;
        if (curDargEnterElementClassName == "bar-left-wrapper") {
          rightAsideSection.style = `width:${
            mainWidth - leftBarWrapperTrueWidthValue + rightAsideSectionWidth
          }px;display:flex;`;
        }
        if (curDargEnterElementClassName == "bar-right-wrapper") {
          rightAsideSection.style = `width:${
            rightAsideSectionWidth - (leftBarWrapperTrueWidthValue - mainWidth)
          }px;display:flex;`;
        }
      }
    }
  }
}
const throtling = (Function, limit) => {
  let flag = true;
  return function () {
    let context = this;
    let args = arguments;
    if (flag) {
      Function.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};
const throtlingBarFunction = throtling(barfucntion, 300);
document.querySelector(".bar").addEventListener("dragstart", function (event) {
  const img = document.createElement("img");
  event.dataTransfer.setDragImage(img, 0, 0);
  this.style = "width:8px !important;display:block !important;";
});
document.querySelector(".bar").addEventListener("drag", throtlingBarFunction);
wrappers.forEach((element) => {
  element.addEventListener("dragenter", (event) => {
    curDargEnterElementClassName = event.target.className;
  });
});
document.querySelector(".bar").addEventListener("dragend", function (e) {
  this.style = "width:2px !important;display:block !important;";
  leftBarWrapper.style = `display:none;`;
  rightBarWrapper.style = `display:none;`;
  token = true;
});
