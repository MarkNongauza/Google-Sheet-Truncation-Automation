//toggle function here

const SHEET_NAME = null; // e.g. "Sheet1" or null for all sheets
const START_ROW = 1; // set to 2 to skip header row 1, etc.
const TARGET_COLUMNS = null; // e.g. [2,3] to restrict to columns B and C, or null for all

function onEdit(e) {
try {
if (!e || !e.range) return;
const sheet = e.range.getSheet();
if (SHEET_NAME && sheet.getName() !== SHEET_NAME) return;

const editedRange = e.range;
const numRows = editedRange.getNumRows();
const numCols = editedRange.getNumColumns();

// read values and formulas to decide what to do
const values = editedRange.getValues();
const formulas = editedRange.getFormulas();

const out = [];
let anyChange = false;

for (let r = 0; r < numRows; r++) {
out[r] = [];
for (let c = 0; c < numCols; c++) {
const rowIndex = editedRange.getRow() + r;
const colIndex = editedRange.getColumn() + c;

// skip if before START_ROW or column not in TARGET_COLUMNS (if configured)
if (rowIndex < START_ROW || (TARGET_COLUMNS && TARGET_COLUMNS.indexOf(colIndex) === -1)) {
out[r][c] = values[r][c];
continue;
}

// skip formulas
if (formulas[r][c]) {
out[r][c] = values[r][c];
continue;
}

const v = values[r][c];

// treat only real numbers (not empty, not text)
if (typeof v !== 'number') {
out[r][c] = v;
continue;
}

// compute truncated value: always chop after 2 dp (toward zero)
let truncated;
if (v >= 0) {
truncated = Math.floor(v * 100) / 100;
} else {
truncated = Math.ceil(v * 100) / 100; // -1.367 -> -1.36
}

// If already equal (including same numeric), skip writing
if (truncated === v) {
out[r][c] = v;
continue;
}

out[r][c] = truncated;
anyChange = true;
}
}

// If any changes, write them back and set formatting for the edited range subset.
if (anyChange) {
// Write values back
editedRange.setValues(out);

// Ensure format shows two decimals. We'll apply the format to the entire edited range,
// but if you want a narrower area you can adjust.
editedRange.setNumberFormat("0.00");
}
} catch (err) {
// Fail silently but log for debugging
console.error("onEdit ROUNDDOWN2 error:", err);
}
}