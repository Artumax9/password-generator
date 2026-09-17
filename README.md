# Password Generator

A random password generator built with vanilla JavaScript — dark/light themes, one-click clipboard copy, and keyboard and screen reader support.

**[Live demo](https://artumax9.github.io/password-generator/)**

## Features

- **Two passwords generated at once**, 8 to 20 characters long, each guaranteed to contain at least one uppercase letter and one special character.
- **Fisher-Yates shuffle** to randomize character positions after building the password, instead of appending characters in a predictable pattern.
- **Click-to-copy**, with a temporary "Password copied!" confirmation and full **keyboard support** — the password fields are focusable and copy on `Enter`, not only on mouse click.
- **Dark/light theme toggle**.
- **Accessible by design**: `aria-label`s on the password fields, a live region announcing the copy result to screen readers, visible input-level validation errors, and a visible focus outline on interactive elements.
- **Responsive layout** down to mobile widths.

## Technical decisions

- **Pure functions for the actual generation logic** (`src/generator.js`): `generatePasswords` and `shuffleArray` take input and return output with no side effects — they don't touch the DOM. This is what makes them possible to unit test directly, and it's also why they live in their own module instead of `index.js`: importing a file that reads `document` at the top level would crash under a test runner, which has no DOM by default.
- **Validation surfaced to the user, not just the console.** The generator throws on an invalid length; the UI catches that and shows the message instead of logging it silently, and it handles the empty-input case explicitly, since `parseInt("")` produces `NaN`, which used to slip past a naive `length < 8` check (`NaN` compared with anything is always `false`).
- **A dedicated `aria-live` region for the copy confirmation**, separate from the password field itself. Screen readers don't reliably announce changes to an `<input>`'s `value` through `aria-live`, so the confirmation message lives in its own visually-hidden element instead.

## Running locally

```bash
npm install
npm run dev
```

## Running the tests

```bash
npm test
```

The test suite (`src/generator.test.js`) covers password length, the character-set guarantees, and a regression test for the `NaN` validation bug described above.

## Credits

The initial HTML/CSS layout started from a Scrimba exercise. The generation logic, accessibility work, tests, and the CI/CD deployment pipeline were built independently on top of it.
