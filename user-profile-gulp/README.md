# User Profile Component

A modern, accessible, and responsive user profile component built with HTML5, SCSS, and JavaScript. This project focuses on creating a modular and maintainable user profile interface with a focus on accessibility and best practices.

## Features

- **Modular Architecture**
  - HTML partials for component separation
  - SCSS partials for maintainable styles
  - Component-based JavaScript

- **Accessibility**
  - Semantic HTML5 markup
  - ARIA attributes for enhanced accessibility
  - Keyboard navigation support
  - High contrast color schemes
  - Screen reader friendly

- **Responsive Design**
  - Mobile-first approach
  - Fluid layouts
  - Responsive typography
  - Breakpoint-specific optimizations

- **Modern Development Workflow**
  - Gulp-based build system
  - SCSS compilation with source maps
  - CSS autoprefixing
  - Live reload with BrowserSync
  - CSS minification

## Technologies Used

- HTML5
- SCSS
- JavaScript (ES6+)
- Gulp
- BrowserSync
- Autoprefixer
- CleanCSS

## Project Structure

```
user-profile-gulp/
├── src/
│   ├── html/
│   │   ├── partials/
│   │   │   ├── _header.html
│   │   │   ├── _basicForm.html
│   │   │   ├── _passwordForm.html
│   │   │   ├── _tripsForm.html
│   │   │   └── _deactivateForm.html
│   │   └── index.html
│   ├── scss/
│   │   ├── components/
│   │   │   ├── _buttons.scss
│   │   │   ├── _forms.scss
│   │   │   ├── _tabs.scss
│   │   │   └── _alerts.scss
│   │   ├── layout/
│   │   │   ├── _header.scss
│   │   │   ├── _container.scss
│   │   │   └── _grid.scss
│   │   ├── utilities/
│   │   │   ├── _spacing.scss
│   │   │   ├── _accessibility.scss
│   │   │   └── _responsive.scss
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   └── main.scss
│   └── js/
│       ├── components/
│       │   ├── tabs.js
│       │   └── forms.js
│       └── main.js
├── dist/
├── gulpfile.mjs
└── package.json
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-profile-gulp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   This will:
   - Compile SCSS to CSS
   - Process HTML partials
   - Start a local development server
   - Enable live reload
   - Watch for file changes

4. **Build for production**
   ```bash
   npm run build
   ```
   This will:
   - Minify CSS
   - Process and minify HTML
   - Create production-ready files in the `dist` directory

## Development Workflow

1. Create a new branch for each feature:
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make your changes in the appropriate files

3. Test your changes:
   - Check accessibility using browser dev tools
   - Test responsive design across different devices
   - Verify form validation
   - Test keyboard navigation

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: description of changes"
   ```

5. Push to GitHub:
   ```bash
   git push origin feature/feature-name
   ```

## Accessibility Features

- Semantic HTML5 elements
- ARIA roles and attributes
- Keyboard navigation support
- Focus management
- High contrast color schemes
- Screen reader friendly markup
- Form validation with clear error messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details 