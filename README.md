# mgr

## VSCode Profiles

This manages VSCode profiles. It manages the following files:

- `settings.json`
- `keybindings.json`


### Specification

- Keybindings
  - When any `keybindings.json` is saved, it is copied to all other `keybindings.json` files
- Settings
  - When any `settings.json` is saved, it
    - Parsed into arbitrary sections
    - It reads all other `settings.json` files, and if it has similar sections, it overwrites those sections.
