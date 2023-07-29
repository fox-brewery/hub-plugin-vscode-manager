# shellcheck shell=bash

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-Web"
code --profile contrib-Web --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-Web --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-Web --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-web
for extension in $(code --profile contrib-Web --list-extensions); do
        code --profile contrib-Web --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-web; do
        code --profile contrib-Web --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-All"
code --profile my-All --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-All --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-All --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-all
for extension in $(code --profile my-All --list-extensions); do
        code --profile my-All --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-all; do
        code --profile my-All --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-Rust"
code --profile contrib-Rust --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-Rust --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-Rust --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-rust
for extension in $(code --profile contrib-Rust --list-extensions); do
        code --profile contrib-Rust --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-rust; do
        code --profile contrib-Rust --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-LaTeX"
code --profile contrib-LaTeX --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-LaTeX --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-LaTeX --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-latex
for extension in $(code --profile contrib-LaTeX --list-extensions); do
        code --profile contrib-LaTeX --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-latex; do
        code --profile contrib-LaTeX --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-cpp"
code --profile contrib-cpp --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-cpp --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-cpp --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-cpp
for extension in $(code --profile contrib-cpp --list-extensions); do
        code --profile contrib-cpp --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-cpp; do
        code --profile contrib-cpp --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-Shell"
code --profile contrib-Shell --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-Shell --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-Shell --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-shell
for extension in $(code --profile contrib-Shell --list-extensions); do
        code --profile contrib-Shell --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-shell; do
        code --profile contrib-Shell --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-Ruby"
code --profile contrib-Ruby --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-Ruby --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-Ruby --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-ruby
for extension in $(code --profile contrib-Ruby --list-extensions); do
        code --profile contrib-Ruby --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-ruby; do
        code --profile contrib-Ruby --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-DevOps"
code --profile contrib-DevOps --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-DevOps --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-DevOps --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-devops
for extension in $(code --profile contrib-DevOps --list-extensions); do
        code --profile contrib-DevOps --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-devops; do
        code --profile contrib-DevOps --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-Python"
code --profile contrib-Python --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-Python --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-Python --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-python
for extension in $(code --profile contrib-Python --list-extensions); do
        code --profile contrib-Python --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-python; do
        code --profile contrib-Python --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-PHP"
code --profile contrib-PHP --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-PHP --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-PHP --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-php
for extension in $(code --profile contrib-PHP --list-extensions); do
        code --profile contrib-PHP --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-php; do
        code --profile contrib-PHP --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-Markdown"
code --profile contrib-Markdown --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-Markdown --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-Markdown --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-markdown
for extension in $(code --profile contrib-Markdown --list-extensions); do
        code --profile contrib-Markdown --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-markdown; do
        code --profile contrib-Markdown --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-Java"
code --profile contrib-Java --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-Java --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-Java --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-java
for extension in $(code --profile contrib-Java --list-extensions); do
        code --profile contrib-Java --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-java; do
        code --profile contrib-Java --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE contrib-Go"
code --profile contrib-Go --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile contrib-Go --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile contrib-Go --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-go
for extension in $(code --profile contrib-Go --list-extensions); do
        code --profile contrib-Go --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-go; do
        code --profile contrib-Go --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-cpp"
code --profile my-cpp --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-cpp --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-cpp --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-cpp
for extension in $(code --profile my-cpp --list-extensions); do
        code --profile my-cpp --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-cpp; do
        code --profile my-cpp --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-DevOps"
code --profile my-DevOps --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-DevOps --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-DevOps --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-devops
for extension in $(code --profile my-DevOps --list-extensions); do
        code --profile my-DevOps --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-devops; do
        code --profile my-DevOps --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-Go"
code --profile my-Go --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-Go --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-Go --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-go
for extension in $(code --profile my-Go --list-extensions); do
        code --profile my-Go --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-go; do
        code --profile my-Go --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-Java"
code --profile my-Java --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-Java --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-Java --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-java
for extension in $(code --profile my-Java --list-extensions); do
        code --profile my-Java --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-java; do
        code --profile my-Java --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-LaTeX"
code --profile my-LaTeX --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-LaTeX --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-LaTeX --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-latex
for extension in $(code --profile my-LaTeX --list-extensions); do
        code --profile my-LaTeX --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-latex; do
        code --profile my-LaTeX --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-Markdown"
code --profile my-Markdown --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-Markdown --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-Markdown --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-markdown
for extension in $(code --profile my-Markdown --list-extensions); do
        code --profile my-Markdown --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-markdown; do
        code --profile my-Markdown --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-PHP"
code --profile my-PHP --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-PHP --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-PHP --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-php
for extension in $(code --profile my-PHP --list-extensions); do
        code --profile my-PHP --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-php; do
        code --profile my-PHP --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-Python"
code --profile my-Python --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-Python --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-Python --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-python
for extension in $(code --profile my-Python --list-extensions); do
        code --profile my-Python --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-python; do
        code --profile my-Python --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-Ruby"
code --profile my-Ruby --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-Ruby --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-Ruby --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-ruby
for extension in $(code --profile my-Ruby --list-extensions); do
        code --profile my-Ruby --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-ruby; do
        code --profile my-Ruby --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-Rust"
code --profile my-Rust --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-Rust --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-Rust --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-rust
for extension in $(code --profile my-Rust --list-extensions); do
        code --profile my-Rust --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-rust; do
        code --profile my-Rust --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-Shell"
code --profile my-Shell --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-Shell --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-Shell --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-shell
for extension in $(code --profile my-Shell --list-extensions); do
        code --profile my-Shell --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-shell; do
        code --profile my-Shell --install-extension "$extension"
done
unset -v extension

printf '%s\n' "REINSTALLING EXTENSIONS FOR PROFILE my-Web"
code --profile my-Web --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile my-Web --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile my-Web --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-web
for extension in $(code --profile my-Web --list-extensions); do
        code --profile my-Web --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-web; do
        code --profile my-Web --install-extension "$extension"
done
unset -v extension
