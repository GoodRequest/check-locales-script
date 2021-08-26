# Check locales script runnable in husky pre-commit hook

## Prerequisites
- https://www.npmjs.com/package/husky
- https://www.npmjs.com/package/i18next-scanner

## Setup
- make sure i18next-scanner.config is set up properly
- make sure scan command will run before this script

## Implementation (example pre-commit file)
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

i18next-scanner 'src/**/*.ts' && npx GoodRequest/check-locales-script && npx lint-staged

```
