# Language Reactor (Open Source)

## Project Overview

Language Reactor is an ambitious open-source project aimed at revolutionizing language learning through immersive reading. The core idea is to enable users to learn new languages by reading books in those languages, while seamlessly tracking their vocabulary acquisition. This project is built with React, TypeScript, and Rsbuild, and is designed to be extensible and user-friendly for both human users and AI agents contributing to its development.

## Ambitious Goals

The ultimate vision for Language Reactor includes:

1.  **Comprehensive Reading Experience:**
    *   Support for various e-book formats (.txt, .epub, .pdf, etc.).
    *   Customizable reading settings (font size, themes, line spacing).
    *   Seamless integration of dictionary lookups for any clicked word.
    *   Contextual translation of sentences or paragraphs.

2.  **Intelligent Vocabulary Management:**
    *   Per-language vocabulary tracking, allowing users to manage words for multiple languages independently.
    *   Ability to mark words as "known," "learning," or "ignored."
    *   Spaced repetition system (SRS) integration for efficient vocabulary review.
    *   Automatic identification of new words based on user's known vocabulary.

3.  **Rich Learning Analytics:**
    *   Progress tracking for reading speed, new words learned, and comprehension.
    *   Visualizations of vocabulary growth and reading habits.

4.  **Community & Collaboration (Future):**
    *   Sharing of annotated books and custom vocabulary lists.
    *   Collaborative learning features.

## Current Status (for AI Agents)

The project is currently in its early development phase, with the following core functionalities implemented:

*   **Frontend-Only Architecture:** The application is currently a single-page application (SPA) with all data stored in the browser's local storage.
*   **Book Upload:** Supports `.txt` and `.epub` file uploads.
*   **Basic Reading View:** Displays book content with customizable font size and themes (light/dark).
*   **Word Interaction:** Clicking a word fetches its definition from `https://api.dictionaryapi.dev/` (currently hardcoded to English, but designed for language-specific lookups).
*   **Vocabulary Tracking:** Words can be marked as "known" or "learning" and are tracked per language.
*   **Vocabulary List:** Displays tracked vocabulary with filtering and removal options.
*   **Word Definition Modal:** Provides detailed dictionary definitions in a modal overlay.

## Development Roadmap (for AI Agents)

This section outlines the immediate next steps and future development areas. Agents should prioritize tasks based on the "Phase" and "Priority" indicators.

### Phase 2: UI/UX & Advanced Features (Current Focus)

*   **Refine Dictionary API Integration (High Priority):**
    *   **Action:** Update `ReadingView.tsx` to use the `selectedLanguage` for API calls to `https://api.dictionaryapi.dev/`.
    *   **Action:** Ensure the `Word` interface in `types.ts` accurately reflects the full dictionary API response structure for better type safety.
    *   **Action:** Enhance `WordDefinitionModal.tsx` to parse and display all relevant information from the dictionary API response (e.g., phonetics, multiple meanings, examples).
    *   **Constraint:** The `https://api.dictionaryapi.dev/` API supports specific language codes. Agents should verify supported languages and update `LanguageSelector.tsx` accordingly. If the API does not support a selected language, a fallback mechanism (e.g., default to English, or display a "not available" message) should be implemented.

*   **Improved Styling & Responsiveness (Medium Priority):**
    *   **Action:** Enhance `App.css` and other component-specific CSS to create a more modern and visually appealing design.
    *   **Action:** Implement responsive design principles to ensure optimal viewing across various devices.

*   **Reading Customization Enhancements (Low Priority):**
    *   **Action:** Add more reading customization options (e.g., line height, letter spacing, custom color themes).

### Phase 3: Backend & User Accounts (Future)

*   **User Authentication & Data Persistence (High Priority):**
    *   **Action:** Implement a backend (e.g., Node.js with Express, Python with FastAPI) to handle user authentication.
    *   **Action:** Migrate vocabulary and book data from local storage to a persistent database (e.g., PostgreSQL, MongoDB).
    *   **Action:** Develop APIs for user registration, login, and data synchronization.

*   **Advanced Book Processing (Medium Priority):**
    *   **Action:** Implement server-side processing for more complex file formats (e.g., .pdf) to extract text and metadata efficiently.

## Setup for Development

To get started with development, follow these steps:

```bash
# Install dependencies
pnpm install

# Start the development server
# The app will be available at http://localhost:3000
pnpm dev

# Build the app for production
pnpm build

# Preview the production build locally
pnpm preview
```

## Contributing

Contributions are highly welcome! If you're an AI agent or a human developer, please refer to the development roadmap and pick a task. Ensure your changes adhere to existing code conventions and are thoroughly tested.

Let's build the future of language learning together!