const { execSync } = require("child_process");
const fs = require("fs");

const logFile = "cypress-log.txt";
const errorFile = "cypress-errors.txt";
const runCount = 100;
let failureCount = 0;

// Clear log files if they exist
fs.writeFileSync(logFile, "");
fs.writeFileSync(errorFile, "");

process.stdout.write(`Error:   cypress-errors.txt`);
process.stdout.write(`\nLog:     cypress-log.txt`);
process.stdout.write(`\nReports: cypress/results/\n`);

for (let i = 1; i <= runCount; i++) {
  process.stdout.write(
    `\nRunning Cypress test iteration ${i} at ${new Date().toLocaleString()}`
  );

  try {
    const output = execSync("npm run cy:smoke", { stdio: "pipe" });
    fs.appendFileSync(
      logFile,
      `Output of iteration ${i}:\n${output.toString()}\n`
    );
    process.stdout.write(`. PASSED`);
  } catch (error) {
    failureCount++;
    fs.appendFileSync(
      errorFile,
      `Error during iteration ${i}:\n${error.stderr.toString()}\n`
    );
    process.stdout.write(`. FAILED`);
  }
}

console.log(`Total failures: ${failureCount} out of ${runCount}`);
fs.appendFileSync(
  logFile,
  `Total failures: ${failureCount} out of ${runCount}\n`
);
