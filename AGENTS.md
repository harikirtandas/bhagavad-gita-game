# AGENTS.md

This file contains guidelines for agentic coding agents working in this Bhagavad-gītā educational game repository.

## Project Overview

This is a client-side web application - a Bhagavad-gītā educational quiz game built with vanilla JavaScript, HTML, and CSS. The app presents the 18 chapters of the Bhagavad-gītā as an interactive learning experience organized into three yogic paths (Karma, Bhakti, and Jñāna yoga).

## Development Commands

**No build system configured** - this is a static web application.

### Running the Application

```bash
# Serve the application locally
Python3 -m http.server 8000
# OR
npx serve .
# OR
live-server
```

### Testing

No testing framework is currently configured. When adding tests, set up a framework like Vitest or Jest.

### Linting/Formatting

No linting or formatting tools are configured. Consider adding ESLint and Prettier for consistency.

## Code Style Guidelines

### JavaScript Conventions

#### Naming

- **Files:** kebab-case (e.g., `challenges-data.js`, `game-state.js`)
- **Functions:** camelCase (e.g., `renderChapter`, `updateProgress`, `handleAnswer`)
- **Variables:** camelCase, descriptive names (e.g., `currentChapter`, `selectedAnswer`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `STORAGE_KEY`, `TOTAL_QUESTIONS`, `AUDIO_FADE_DURATION`)

#### Import/Export Patterns

```javascript
// Named imports preferred
import { getProgress, saveAnswer } from "./storage.js";
import { getGlobalScore } from "./storage.js";

// Named exports
export { renderChapter, updateProgress };
export function handleAnswer() {
  /* ... */
}
```

- Use relative paths with `./` prefix
- Always include `.js` extensions in imports
- Prefer named imports/exports over default

#### Code Structure

- Use ES6+ features (arrow functions, destructuring, template literals)
- Modular architecture with clear separation of concerns
- Each file should have a single responsibility
- Use optional chaining (`?.`) for safe DOM element access

#### Error Handling

```javascript
try {
  const response = await fetch("./data/chapters.json");
  if (!response.ok) throw new Error("Failed to load data");
  const data = await response.json();
} catch (error) {
  console.error("Error loading chapters:", error);
  // Fallback behavior or user notification
}
```

- Use try/catch for async operations
- Log errors with context
- Provide graceful fallbacks
- Use user-friendly error messages when appropriate

### DOM Manipulation Guidelines

#### Element Selection

```javascript
// Preferred: querySelector with optional chaining
const element = document.querySelector("#chapter-title")?.textContent;

// For multiple elements
const buttons = document.querySelectorAll(".answer-button");
```

#### Event Handling

```javascript
// Use arrow functions for event handlers
element.addEventListener("click", (event) => {
  event.preventDefault();
  handleAnswer(event.target.dataset.answer);
});
```

#### HTML Generation

```javascript
// Use template literals for dynamic HTML
const html = `
  <div class="chapter-card">
    <h3>${chapter.title}</h3>
    <p>${chapter.description}</p>
  </div>
`;
element.innerHTML = html;
```

### CSS and Styling

#### Tailwind CSS Usage

- Use utility classes for styling
- Follow mobile-first responsive design
- Use semantic color classes (e.g., `text-blue-600`, `bg-green-500`)
- Maintain consistency with existing design patterns

#### Custom CSS

- Keep custom CSS minimal
- Use CSS variables for theme colors
- Follow BEM methodology for class names when needed

### Data Management

#### localStorage Patterns

```javascript
const STORAGE_KEY = "bhagavad-gita-progress";

// Save data
localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));

// Load data with fallback
const savedData = localStorage.getItem(STORAGE_KEY);
const progress = savedData ? JSON.parse(savedData) : defaultProgress;
```

#### JSON Data Structure

- Store chapter content and questions in `/data/` directory
- Use consistent naming for data properties
- Include metadata like chapter numbers, titles, descriptions

### File Organization

```
/
├── index.html              # Main landing page
├── views/                  # HTML templates
├── js/                    # JavaScript modules
│   ├── storage.js         # localStorage management
│   ├── game.js           # Main game logic
│   ├── audio.js          # Audio system
│   └── [feature].js      # Feature-specific modules
├── data/                 # JSON data files
├── assets/              # Media files
│   ├── audio/           # Background music
│   └── images/          # UI graphics
└── README.md           # Project documentation
```

## Development Guidelines

### Adding New Features

1. Create separate module files for new functionality
2. Follow existing naming conventions and patterns
3. Update localStorage schema if needed (maintain backward compatibility)
4. Add corresponding HTML templates in `views/` directory
5. Test responsive design on mobile devices

### Modifying Existing Code

1. Read existing files to understand current patterns
2. Maintain consistency with established conventions
3. Update related modules if changing interfaces
4. Test localStorage interactions thoroughly

### Audio System

- Background music organized by yogic path
- Use fade in/out effects for smooth transitions
- Handle user preferences for audio playback
- Provide mute/unmute controls

### Performance Considerations

- Lazy load JSON data when needed
- Optimize DOM updates (batch changes when possible)
- Use event delegation for dynamic content
- Minimize localStorage reads/writes

## Language and Content

### Comments and Documentation

- Use Spanish comments to match existing codebase
- Include clear section headers with emoji indicators
- Document complex logic and data structures
- Update README.md for significant feature changes

### Content Guidelines

- Maintain respectful tone for religious/spiritual content
- Ensure accuracy of Sanskrit terms and translations
- Follow established chapter organization and numbering
- Preserve educational intent of the application

## Testing Strategy (When Added)

### Unit Tests

- Test utility functions and data transformations
- Mock localStorage and fetch operations
- Test error handling and edge cases

### Integration Tests

- Test user workflows and navigation
- Verify localStorage persistence
- Test audio system functionality

### End-to-End Tests

- Test complete user journeys
- Verify responsive design across devices
- Test accessibility features

## Accessibility Guidelines

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation support
- Use ARIA labels where appropriate
- Maintain sufficient color contrast

## Security Considerations

- Validate user inputs
- Sanitize dynamic HTML content
- Use HTTPS for production deployment
- Avoid storing sensitive data in localStorage
