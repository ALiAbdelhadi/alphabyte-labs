# Alphabyte Labs CLI

A CLI tool for adding Alphabyte Labs components and blocks to your project.

## Installation

```bash
# Install globally
npm install -g @alphabyte-labs/cli

# Or use with npx
npx @alphabyte-labs/cli
```

## Usage

### Initialize a project

```bash
alphabyte init
```

This will:
- Create a `components.json` configuration file
- Install required dependencies
- Set up your project for using Alphabyte Labs components

### Add components or blocks

```bash
# Add a specific component
alphabyte add button

# Add a specific block
alphabyte add hero-section

# Add multiple items
alphabyte add button card hero-section

# Add all available components and blocks
alphabyte add --all

# Add with custom path
alphabyte add button --path src/components
```

### List available components and blocks

```bash
# List all items
alphabyte list

# List only components
alphabyte list --type components

# List only blocks
alphabyte list --type blocks

# Search for specific items
alphabyte list --search button
```

### View component details

```bash
# View component details
alphabyte view button

# View block details
alphabyte view hero-section

# Specify type
alphabyte view button --type components
```

### Search components and blocks

```bash
# Search for items
alphabyte search button

# Search with type filter
alphabyte search form --type components
```

## Configuration

The CLI uses a `components.json` file to configure your project:

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## Available Commands

- `init` - Initialize your project
- `add` - Add components or blocks
- `list` - List available components and blocks
- `view` - View component or block details
- `search` - Search for components and blocks

## Options

- `-y, --yes` - Skip confirmation prompts
- `-o, --overwrite` - Overwrite existing files
- `-c, --cwd <cwd>` - Working directory
- `-a, --all` - Add all available items
- `-p, --path <path>` - Custom path for components
- `-s, --silent` - Mute output
- `-t, --type <type>` - Filter by type (components, blocks, all)
- `-s, --search <search>` - Search term

## License

MIT
