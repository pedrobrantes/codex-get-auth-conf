#!/usr/bin/env node

import { signInFlow } from './auth';
import chalk from 'chalk';

// Constants required for the authentication flow
const ISSUER = "https://auth.openai.com";
const CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann"; // Public Client ID for the Codex CLI

async function main() {
  console.log(chalk.blue("Initiating manual login flow..."));
  try {
    // Calls the main function from the auth.tsx file
    const apiKey = await signInFlow(ISSUER, CLIENT_ID);

    console.log(chalk.green.bold("\n--- SUCCESS! ---"));
    console.log(chalk.green("OpenAI API Key obtained:"));
    console.log(chalk.yellow(apiKey));

    console.log(chalk.dim("\nThe 'auth.json' file has been saved to your ~/.codex/ directory"));

  } catch (error) {
    console.error(chalk.red.bold("\nAn error occurred during the process:"));
    console.error(error);
  }
}

main();
