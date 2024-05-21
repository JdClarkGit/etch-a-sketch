document.addEventListener("DOMContentLoaded", (event) => {
  const grid = document.querySelector(".grid");
  let drawing = false;
  let intervalIdMouseover;
  let intervalIdMousedown;

  // Create grid cells
  for (let i = 0; i < 60 * 45; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
  }

  // Initialize starting position to the center of the grid
  let currentX = 30;
  let currentY = 22;

  const cells = document.querySelectorAll(".grid div");

  // Update position and color the cell
  const updatePosition = (dx, dy) => {
    currentX = Math.max(0, Math.min(59, currentX + dx));
    currentY = Math.max(0, Math.min(44, currentY + dy));
    const index = currentY * 60 + currentX;
    cells[index].style.backgroundColor = "black";
  };

  const showGrid = () => {
    grid.style.visibility = "visible";
  };

  const startDrawing = () => {
    drawing = true;
  };

  const stopDrawing = () => {
    drawing = false;
    clearInterval(intervalIdMouseover);
    clearInterval(intervalIdMousedown);
  };

  const handleMouseMove = (movement, knob) => {
    if (knob === "left-knob") {
      updatePosition(movement.movementX, 0);
    }
    if (knob === "right-knob") {
      updatePosition(0, movement.movementY);
    }
  };

  document.querySelector(".left-knob").addEventListener("mouseover", () => {
    showGrid();
    startDrawing();
    intervalIdMouseover = setInterval(
      () => handleMouseMove({ movementX: -1 }, "left-knob"),
      100
    );
  });

  document.querySelector(".left-knob").addEventListener("mousedown", () => {
    showGrid();
    startDrawing();
    intervalIdMousedown = setInterval(
      () => handleMouseMove({ movementX: 1 }, "left-knob"),
      100
    );
  });

  document.querySelector(".right-knob").addEventListener("mouseover", () => {
    showGrid();
    startDrawing();
    intervalIdMouseover = setInterval(
      () => handleMouseMove({ movementY: -1 }, "right-knob"),
      100
    );
  });

  document.querySelector(".right-knob").addEventListener("mousedown", () => {
    showGrid();
    startDrawing();
    intervalIdMousedown = setInterval(
      () => handleMouseMove({ movementY: 1 }, "right-knob"),
      100
    );
  });

  document.addEventListener("mouseup", stopDrawing);
  document.addEventListener("mouseleave", stopDrawing);
});
