export function checkNoteNumber(noteNumber) {
  if (noteNumber) {
    return `${noteNumber} Notes`;
  } else {
    return `Notes`;
  }
}
export function getThreeDigitNumber(arr) {
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
export function generatetempoID(value = "") {
  let id = value;
  for (let i = 0; i < 3; i++) {
    id += getThreeDigitNumber();
  }
  return id;
}
export function getTrueContent(blocks) {
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
export function generateUserName() {
  return generatetempoID("Guest_");
}
export function generateUserPassword() {
  return generatetempoID(`password_`);
}
export function getTimeInfo() {
  const timeInfo = {
    time: undefined,
    greetingsText: undefined,
    date: undefined,
    dateText: undefined,
  };

  const time = new Date().toLocaleTimeString();

  const regexForDeleteNumberFromTime = /(?:[:][0-9]{2})(?=[ ](?:AM|PM)$)/;
  const DeleteNumberFromTime = regexForDeleteNumberFromTime.exec(time)[0];
  const modifiedTime = time.replace(DeleteNumberFromTime, "");
  timeInfo.time = modifiedTime;

  const regexForMeridiem = /(?:AM|PM)$/;
  const Meridiem = regexForMeridiem.exec(time)[0];
  timeInfo.greetingsText = Meridiem == "AM" ? "Good Morning" : "Good Evening";

  const date = new Date().toLocaleDateString();
  timeInfo.date = date;

  const dateText = new Date().toDateString();
  timeInfo.dateText = dateText;

  return timeInfo;
}
