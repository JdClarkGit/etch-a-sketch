document.addEventListener("DOMContentLoaded", (event) => {
  const grid = document.querySelector(".grid");
  const clear = document.querySelector(".clear");
  let drawing = false;
  let intervalId;

  // Create grid cells
  for (let i = 0; i < 60 * 45; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
  }

  // Initialize starting position to the center of the grid
  let currentX = 30;
  let currentY = 22;

  const cells = document.querySelectorAll(".grid div");

  const clearGrid = () => {
    cells.forEach((cell) => {
      cell.style.backgroundColor = "#d3d3d3"; // Reset to white or initial color
    });
    currentX = 30; // Reset starting position
    currentY = 22;
  };

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

  const startDrawing = (dx, dy) => {
    if (drawing) {
      clearInterval(intervalId);
    }
    drawing = true;
    intervalId = setInterval(() => updatePosition(dx, dy), 100);
  };

  const stopDrawing = () => {
    drawing = false;
    clearInterval(intervalId);
  };

  // Clear button event listener
  clear.addEventListener("click", () => {
    drawing = false;
    clearInterval(intervalId);
    clearGrid(); // Reset the grid to initial state
  });

  document.querySelector(".left-knob").addEventListener("mouseover", () => {
    showGrid();
    startDrawing(-1, 0);
  });

  document.querySelector(".left-knob").addEventListener("mousedown", () => {
    showGrid();
    startDrawing(1, 0);
  });

  document.querySelector(".right-knob").addEventListener("mouseover", () => {
    showGrid();
    startDrawing(0, -1);
  });

  document.querySelector(".right-knob").addEventListener("mousedown", () => {
    showGrid();
    startDrawing(0, 1);
  });

  document.addEventListener("mouseup", stopDrawing);
  document.addEventListener("mouseleave", stopDrawing);
});
