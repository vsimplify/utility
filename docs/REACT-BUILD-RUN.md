# React and Quarkus Build/Run Documentation

This document outlines the commands used to build and run the application, categorized by the tool used.

## Maven Commands (`mvn`)

| Command | Who (User/System) | What (Action) | Where (Context) | When (Trigger) | Why (Purpose) | Symptom Addressed |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `mvn clean package -DskipTests` | User/CI | Cleans project and packages the application into a JAR, skipping tests. | Project Root | After code changes, before running. | To verify that the Java/Quarkus application compiles and packages correctly. | "Input is not a valid class file", "ProcessParsingValidationException", "RuleCodegenError" |
| `mvn process-classes` | User (Debug) | Runs the build up to the `process-classes` phase. | Project Root | Debugging build steps. | To isolate and verify specific build phases, such as the `antrun` metadata cleanup. | Verifying if `maven-antrun-plugin` executes and cleans `._*` files. |
| `mvn quarkus:dev` | User | Starts the application in development mode. | Project Root | During development. | To run the app with hot-reload capabilities for testing and iteration. | Need to access the running application and Dev UI. |

## System Commands (Bash/Shell)

| Command | Who (User/System) | What (Action) | Where (Context) | When (Trigger) | Why (Purpose) | Symptom Addressed |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `find src -name '._*' -type f` | User (Debug) | Finds all files starting with `._` in the `src` directory. | Project Root | Debugging file issues. | To identify macOS metadata files that might be polluting the source tree. | "Input is not a valid class file" errors caused by AppleDouble files. |
| `find target/classes -name '._*' -type f` | User (Debug) | Finds all files starting with `._` in the `target/classes` directory. | Project Root | Debugging build output. | To verify if metadata files are persisting in the build output despite cleanup attempts. | "Input is not a valid class file" errors. |
| `rm -rf src/main/resources/gov/ca/dcss/travels` | User | Deletes the `travels` directory. | Project Root | Fixing build errors. | To remove legacy or conflicting files that were causing class loading errors. | `ClassNotFoundException: gov.ca.dcss.travels.Person` |

## NPM Commands (`npm`)

| Command | Who (User/System) | What (Action) | Where (Context) | When (Trigger) | Why (Purpose) | Symptom Addressed |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `npm run build` | User/CI | Compiles TypeScript/React code to JavaScript. | Project Root | After changing frontend code. | To generate the static assets (`.js` files) required for the React forms. | Missing React form functionality or outdated UI assets. |

## Git Commands (`git`)

| Command | Who (User/System) | What (Action) | Where (Context) | When (Trigger) | Why (Purpose) | Symptom Addressed |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `git checkout -b <branch-name>` | User | Creates and switches to a new branch. | Project Root | Starting new work. | To isolate changes (e.g., Mac-specific fixes) from the main codebase. | Need to maintain separate configurations for different environments. |
