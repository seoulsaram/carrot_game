"use strict";
import * as sound from "./sound.js";
export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});
const CARROT_SIZE = 80;
export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameScore = document.querySelector(".game__score");
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    //this.onClick = this.onClick.bind(this);
    //js에서는 this를 사용해서 함수를 전달해 줄 때, class정보가 없이 보내진다.
    //즉 함수 자체만 전달되는 것. 그래서 클래스정보가 함께 가야 할 경우
    //위와 같이 함수를 this(이 클래스)와 바인딩해줘야 한다.
    //그러나! arrow function은 this가 유지되기 때문에 아래와 같이 작성해도 됨
    //또는 아래쪽 onClick 메소드 부분을 아래와 같이 작성해도 됨
    //onClick = event => { const target = event.target; .....}
    this.field.addEventListener("click", (event) => this.onClick(event));
  }

  init() {
    this.field.innerHTML = "";
    this.gameScore.innerText = this.carrotCount;
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  //_ 를 쓰면 외부에서 부르면 안되는거야! 라고 명시해주는 것.
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick(event) {
    //matches() : 셀렉터가 맞는지 확인해주는 함수
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
