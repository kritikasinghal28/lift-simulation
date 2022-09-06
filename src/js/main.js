const noOfFloors = document.getElementById("noOfFloors");
const noOfLifts = document.getElementById("noOfLifts");
const submitButton = document.getElementById("generate");
const output = document.querySelector(".output-container");

submitButton.addEventListener("click", () => {
  if (noOfFloors.value >= 1 && noOfLifts.value >= 1) {
    addFloors(noOfFloors.value, noOfLifts.value);
  }
  noOfFloors.value = "";
  noOfLifts.value = "";
});

const addFloors = (floors, lifts) => {
  output.innerHTML = "";
  for (let i = floors; i > 0; i--) {
    output.innerHTML += `<div class="floor-container">
      <div class="up-down-btn">
        <div class="up-down ${i}" id="up-btn" data-floor="${i}">Up</div>
        <div class="up-down ${i}" id="down-btn" data-floor="${i}">Down</div>
      </div>
      <div class="lift-section">
        <div class="lift-box">
          ${i === 1 ? addLifts(lifts) : ``}
        </div>
        <div class="ground-box"></div>
      </div>
      <div class="floor-details">Floor-${i - 1}</div>
    </div>`;
  }
};

const addLifts = (noOfLifts) => {
  let liftContainer = document.createElement("div");
  liftContainer.classList.add("lifts");

  let lifts = "";
  for (let j = 0; j < noOfLifts; j++) {
    lifts += `<div class="lift" data-currentPos = "0">
    <div id="lift-left" class="lift-door"></div>
    <div id="lift-right" class="lift-door"></div>
  </div>`;
  }
  liftContainer.innerHTML = lifts;
  return liftContainer.innerHTML;
};

let x = 0;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("up-down")) {
    if (e.target.dataset.floor === x) {
      return;
    } else {
      liftStatus(e.target.classList.item(1));
    }
    x = e.target.dataset.floor;
  }
});

const liftStatus = (floorClicked) => {
  const lifts = Array.from(document.getElementsByClassName("lift"));
  for (let index = 0; index < lifts.length; index++) {
    if (!lifts[index].classList.contains("busy")) {
      startLift(floorClicked, lifts[index]);
      return;
    }
  }
};

function startLift(floorClicked, notUsedLift) {
  let currentlocations = notUsedLift.dataset.currentPos;
  let time = Math.abs(floorClicked - currentlocations) * 2;
  let move = (floorClicked - 1) * -232;
  notUsedLift.style.transition = `transform ${time}s linear`;
  notUsedLift.style.transform = "translateY(" + move + "px)";
  notUsedLift.classList.add("busy");
  notUsedLift.dataset.currentPos = floorClicked;
  // open the Doors
  setTimeout(() => {
    notUsedLift.children[0].classList.add("lift-left-open");
    notUsedLift.children[1].classList.add("lift-right-open");
  }, time * 1000 + 1000);

  setTimeout(() => {
    notUsedLift.children[0].classList.remove("lift-left-open");
    notUsedLift.children[1].classList.remove("lift-right-open");
  }, time * 1000 + 4000);

  setTimeout(() => {
    notUsedLift.classList.remove("busy");
  }, time * 1000 + 7000);
}
