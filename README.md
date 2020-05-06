# GitHub Action to setup ANTLR 4.8

This action (currently in early alpha) simply pulls complete ANTLR 4.8 jar and puts it in path.
It also defines `Antlr4ToolPath` environment variable as required by some tools (i.e. [Antlr4BuildTasks](https://github.com/kaby76/Antlr4BuildTasks)).

## Usage:

Example:
```yaml
steps:
- uses: actions/checkout@v2
- uses: NiccoMlt/setup-antlr4@v0.0.1
```
