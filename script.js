let fields = [
    null,
    null, 
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

const winningCombinations = [
  [0, 1, 2], // Zeile 1
  [3, 4, 5], // Zeile 2
  [6, 7, 8], // Zeile 3
  [0, 3, 6], // Spalte 1
  [1, 4, 7], // Spalte 2
  [2, 5, 8], // Spalte 3
  [0, 4, 8], // Diagonale \
  [2, 4, 6]  // Diagonale /
];

function init() {
    render();
}

let currentShape = 'circle';

function init() {
  render();
}

function render() {
  const contentDiv = document.getElementById('content');
  let tableHTML = '<table>';

  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = '';

      if (fields[index] === 'circle') {
        symbol = generateCircleSVG();
      } else if (fields[index] === 'cross') {
        symbol = generateCrossSVG();
      }

      tableHTML += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
    }
    tableHTML += '</tr>';
  }

  tableHTML += '</table>';
  contentDiv.innerHTML = tableHTML;
}

function handleClick(cell, index) {
  if (fields[index] !== null) return;

  if (currentShape === 'circle') {
    fields[index] = 'circle';
    cell.innerHTML = generateCircleSVG();
    currentShape = 'cross';
  } else {
    fields[index] = 'cross';
    cell.innerHTML = generateCrossSVG();
    currentShape = 'circle';
  }

  cell.removeAttribute('onclick');
  checkWin(); // 👈 prüfen, ob jemand gewonnen hat
}
function checkWin() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinningLine(combo);
      disableAllClicks();
      return true;
    }
  }
  return false;
}
function drawWinningLine(combo) {
  const table = document.querySelector('table');
  const rect = table.getBoundingClientRect();

  const cells = document.querySelectorAll('td');
  const startCell = cells[combo[0]];
  const endCell = cells[combo[2]];

  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const startX = startRect.left + startRect.width / 2 - rect.left;
  const startY = startRect.top + startRect.height / 2 - rect.top;
  const endX = endRect.left + endRect.width / 2 - rect.left;
  const endY = endRect.top + endRect.height / 2 - rect.top;

  const svgLine = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgLine.setAttribute("style", "position: absolute; top: 0; left: 0; pointer-events: none;");
  svgLine.setAttribute("width", table.offsetWidth);
  svgLine.setAttribute("height", table.offsetHeight);

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", endX);
  line.setAttribute("y2", endY);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-width", "5");
  line.setAttribute("stroke-linecap", "round");

  svgLine.appendChild(line);
  table.style.position = 'relative';
  table.appendChild(svgLine);
}
function disableAllClicks() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => cell.removeAttribute('onclick'));
}


function generateCircleSVG() {
    return `
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="35"
          cy="35"
          r="30"
          fill="none"
          stroke="#00B0EF"
          stroke-width="5"
          stroke-dasharray="188.5"
          stroke-dashoffset="188.5"
        >
          <animate 
            attributeName="stroke-dashoffset" 
            from="188.5" 
            to="0" 
            dur="125ms" 
            fill="freeze" />
        </circle>
      </svg>
    `;
  }
  function generateCrossSVG() {
    return `
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <line
          x1="15" y1="15"
          x2="55" y2="55"
          stroke="#FFC000"
          stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray="56.6"
          stroke-dashoffset="56.6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="56.6"
            to="0"
            dur="0.125s"
            fill="freeze"
          />
        </line>
        <line
          x1="55" y1="15"
          x2="15" y2="55"
          stroke="#FFC000"
          stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray="56.6"
          stroke-dashoffset="56.6"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="56.6"
            to="0"
            dur="0.125s"
            fill="freeze"
            begin="0.125s"
          />
        </line>
      </svg>
    `;
  }
  
  function restartGame(){
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    render();
}