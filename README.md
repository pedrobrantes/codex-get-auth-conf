# Codex Get Auth Conf (auth.json)

A standalone Node.js script to programmatically obtain an OpenAI API key by replicating the authentiation flow of the `codex` CLI. This project is the result of a deep dive into reverse-engineering a real-world OAuth 2.0 PKCE authentication flow.

## 🚀 Features

-   **Automated Browser Login**: Initiates the OpenAI login flow directly in your default browser.
-   **Secure OAuth 2.0 PKCE Flow**: Correctly implements the Proof Key for Code Exchange (PKCE) for secure authorization.
-   **Local Callback Server**: Runs a temporary local server to handle the OAuth redirect and capture the authorization code.
-   **Automatic Token Exchange**: Exchanges the temporary code for a final, long-lived API key.
-   **Credential Storage**: Saves the obtained tokens and API key to `~/.codex/auth.json`, mimicking the official CLI's behavior.

## 🤔 Why This Project Exists

This project began as an exploration to understand how modern CLI tools handle secure user authentication without asking the user to manually paste API keys. By reverse-engineering the `codex` CLI's login process, we can observe a complete, production-grade implementation of the OAuth 2.0 Authorization Code Grant with PKCE. It serves as a practical learning tool for anyone interested in API security and application authentication.

## 📋 Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/)

## ⚙️ Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pedrobrantes/codex-get-auth-conf.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd codex-get-auth-conf
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Run the script:**
    ```bash
    npm start
    ```

The script will open a new tab in your browser. Log in with your OpenAI account. Upon success, the script will capture the credentials, save them, and print the new API key to the console.

## 🛠️ How It Works

The script follows the standard OAuth 2.0 PKCE flow:

1.  A local `express` server is started on `localhost:1455` to listen for the callback.
2.  A cryptographic `code_verifier` and `code_challenge` are generated.
3.  The user's browser is opened to the OpenAI authorization endpoint, passing the `client_id` and `code_challenge`.
4.  After the user authenticates, OpenAI redirects them back to `http://localhost:1455/auth/callback` with a temporary `authorization_code`.
5.  The local server receives this request, captures the code, and securely exchanges it (along with the original `code_verifier`) for the final API key by making a `POST` request to OpenAI's token endpoint.
6.  The final API key and associated tokens are saved to `~/.codex/auth.json`.c
