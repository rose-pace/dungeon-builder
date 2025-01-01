# Code Guidelines for Static Sites

## Commit Message Standards
- Use short and concise statements that start with an active verb
- Describe each change in a single statement ending in a semicolon (;)
- When necessary use actual names of edited files, functions, or modules

## Module Imports
- Make use of the paths in tsconfig.json
- Sort imports for readability
- React imports should be grouped first
- 3rd party imports should be grouped second
- Local components shoulc be grouped third
- Local libraries and utitlities should be grouped last

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
- If declaring more than 3 variables in a row sort alphabetically