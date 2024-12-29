# Code Guidelines for Static Sites

## Module Imports
- Make use of the paths in tsconfig.json
- Sort imports for readability
- React imports should be grouped first
- 3rd party imports should be grouped second
- Local components shoulc be grouped third
- Local libraries and utitlities should be grouped last

## HTML Standards
- Use HTML5 doctype and specify language attribute
- Include charset (UTF-8) and responsive viewport meta tags
- Place scripts at bottom of body with appropriate defer/async attributes
- Use semantic elements with proper ARIA attributes where needed
- Ensure proper heading hierarchy (h1-h6)
- Include meta description for SEO

## CSS Organization
Group styles in this order:
1. Reset/Normalize
2. CSS Custom Properties (variables)
3. Base styles
4. Layout/Grid 
5. Components
6. Utilities
7. Media queries
8. Print styles

## Typescript Guidelines

- Use 2 spaces for indents and tabs
- Follow eslint rules
- Adhere to TSDoc standards, similar to the below example
/**
 * Clear description of purpose and behavior
 * @param name - Description with valid/invalid values
 * @returns Description of return value/state
 * @throws {ErrorType} Description of error conditions
 * @example
 * // Include multiple examples showing edge cases
 * functionName(validInput);
 */
- For interfaces, document each property as in the below example
/**
 * Clear description of purpose and behavior
 */
interface ExampleInterface {
  /** Clear description of property */
  foo: string,
  /** Clear description of property */
  bar: string,
}

## Code Quality Rules
- Use consistent naming:
  - camelCase: JavaScript variables/functions
  - PascalCase: Classes/Components
  - kebab-case: CSS classes, file names
  - SCREAMING_SNAKE_CASE: Constants
- Implement error boundaries and logging
- Clean up event listeners and subscriptions
- Maximum line length: 80 characters
- Document breaking changes
- Sort imports by grouping external and internal dependencies and then alphabetically
- If declaring more than 3 variables in a row sort alphabetically