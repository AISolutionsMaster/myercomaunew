const { execSync } = require("child_process");
const fs = require("fs");

const logFile = "cypress-log.txt";
const errorFile = "cypress-errors.txt";
const runCount = 100;
let failureCount = 0;

// Clear log files if they exist
fs.writeFileSync(logFile, "");
fs.writeFileSync(errorFile, "");

for (let i = 1; i <= runCount; i++) {
  console.log(`Running Cypress test iteration ${i}`);
  try {
    const output = execSync("npm run cy:smoke", { stdio: "pipe" });
    fs.appendFileSync(
      logFile,
      `Output of iteration ${i}:\n${output.toString()}\n`
    );
  } catch (error) {
    failureCount++;
    fs.appendFileSync(
      errorFile,
      `Error during iteration ${i}:\n${error.stderr.toString()}\n${output.toString()}\n`
    );
  }
}

console.log(`Total failures: ${failureCount} out of ${runCount}`);
fs.appendFileSync(
  logFile,
  `Total failures: ${failureCount} out of ${runCount}\n`
);
