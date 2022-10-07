const numberOfFloors = document.getElementById("floors");
const numberOfLifts = document.getElementById("lifts");
const submitButton = document.getElementById("submit");
const result = document.getElementById("output");

submitButton.addEventListener("click", function () {
  if (numberOfFloors.value >= 1 && numberOfLifts.value >= 1) {
    result.innerHTML = addFloor(numberOfFloors.value);
  }
  numberOfFloors.value = "";
  numberOfLifts.value = "";
});

function addFloor(numberOfFloors) {
  let addedFloors = ``;
  for (let i = numberOfFloors - 1; i >= 0; i--) {
    addedFloors += `<div class="floor-container" data-floorContainer="${i}">
  <div class="floor">
    <div class="ground-floor-container">
      <div class="button-container">
        <button class="move btn-move" data-floor="${i}">Move</button>
      </div>
      ${i === 0 ? addLift(numberOfLifts.value) : ""}
    </div>
  </div>
   <p class ="">Floor:${i}</p>
</div>
`;
  }
  return addedFloors;
}

function addLift(numberOfLifts) {
  let addedLifts = ``;
  for (let i = 0; i < numberOfLifts; i++) {
    addedLifts += `<div class="lift" data-liftposition="${i}">
        <div class="left-door"></div>
        <div class="right-door"></div>
      </div>`;
  }
  return addedLifts;
}

let currentFloor = 0;

addEventListener("click", (e) => {
  if (e.target.classList.contains("move")) {
    if (e.target.dataset.floor == currentFloor) {
      return;
    } else {
      liftStatus(e.target.dataset.floor);
    }
    currentFloor = e.target.dataset.floor;
  }
});

function liftStatus(targetFloor) {
  const lifts = Array.from(document.getElementsByClassName("lift"));
  for (const lift of lifts) {
    if (!lift.classList.contains("busy")) {
      startLift(targetFloor, lift);
      return;
    }
  }
}

function startLift(targetFloor, freeLift) {
  console.log(targetFloor);
  console.log(-135 * targetFloor);

  const currentPosition = freeLift.dataset.liftposition;
  const time = Math.abs(targetFloor - currentPosition);
  freeLift.style.transition = `transform ${time * 2}s linear`;
  freeLift.style.transform = `translateY(${-100 * targetFloor}px)`;
  freeLift.classList.add("busy");
  freeLift.dataset.liftposition = targetFloor;
  setTimeout(() => {
    freeLift.children[0].classList.add("move-left");
    freeLift.children[1].classList.add("move-right");
  }, time * 2000 + 1000);
  setTimeout(() => {
    freeLift.children[0].classList.remove("move-left");
    freeLift.children[1].classList.remove("move-right");
  }, time * 2000 + 4000);

  setTimeout(() => {
    freeLift.classList.remove("busy");
  }, time * 2000 + 6000);
}
