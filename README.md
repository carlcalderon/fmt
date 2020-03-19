# fmt

String formatting using commonly used standards

[![BuildStatus](https://travis-ci.org/carlcalderon/fmt.svg?branch=master)](https://travis-ci.org/carlcalderon/fmt)

## Features

- Commonly used formatting rules
- Wide support
- Left and right padding
- UMD and ES module versions available

## Installation

```bash
npm install @paydirt/fmt
```

## `fmt.sprintf`

```javascript
const a = 12.3
const b = 24.6
fmt.sprintf('%.2f/%.2f is %d%%', a, b, a/b*100)
// Output:
// 12.30/24.60 is 50%
```

### Flags

Each flag is defined using a `%` character followed by the flag and modifiers.

```
%[sign][padding][modifiers]<flag>
```

|Flag|Modifiers      |Description  |Notes                                                           |
|----|:--------------|:------------|:---------------------------------------------------------------|
| v  |               | Object      | Default output if type is recognized, JSON format otherwise    |
| T  |               | Type        | `typeof` representation, unless `array`                        |
| t  |               | Boolean     | Accepts any type such as `0` for false                         |
| d  | `+`           | Integer     | Any type of number. `+` modifier adds sign                     |
| b  |               | Binary      | If passed a string, each character is separated by a single ` `|
| c  |               | Character   | as `charCode`                                                  |
| x  |               | Hexadecimal | Uppercase shorthand defined as uppercase `X`                   |
| f  | `+`, `.<int>` | Float       | See `d` flag. `<int>` defines number of decimals               |
| s  | `^`, `_`      | String      | Uppercase shorthand defined as uppercase `S`                   |
| q  | `^`, `_`      | String      | Quoted escaped string                                          |
| %  |               | Literal `%` |                                                                |


### Usage

`fmt.sprintf(<format>, ...values)`

```javascript
import fmt from '@paydirt/fmt'

// basic usage
fmt.sprintf('%s:%.2f %s', 'Milk', 0.5, 'liter')  // output: "Milk: 0.50 liter"

// floats
fmt.sprintf('Value: %.2f', 1.234)  // output: "Value: 1.23"

// integers
fmt.sprintf('Value: %d', 1.234)  // output: "Value: 1"

// chars
fmt.sprintf('Letter: %c', 65)  // output: "Letter: A"

// binary
fmt.sprintf('123 in binary is %b', 123)  // output: "123 in binary is 01111011"

// types
fmt.sprintf('Type: %T', 123)  // output: "Type: number"

// booleans
fmt.sprintf('This is %t', true)  // output: "This is true"

// hexadecimal
fmt.sprintf('162 in hex is %X', 162)  // output: "162 in hex is A2"

// strings
fmt.sprintf('%s %S', 'hello', 'world')  // output: "hello WORLD"
```

#### Padding

`fmt.sprintf` supports both left and right whitespace padding. The padding is
defined as the "total" amount of characters the value will consume. For example,
a padding of `8` will dedicate 8 characters to the value where all remaining
characters will be filled with spaces.

_Tip: Padding is especially useful when creating tables._

```javascript
// pad to the left
fmt.sprintf('Value:%8.1f', 2.12) // output: Value:     2.1

// pad to the right
fmt.sprintf('%-8.1f is the value', 2.12) // output: 2.1     is the value
```

```javascript
fmt.sprintf('%-6s | %5d', 'Eggs', 2)
fmt.sprintf('%-6s | %5.1f liter', 'Milk', 1.5)
fmt.sprintf('%-6s | %5.1f dl', 'Flour', 2.5)

// output:
// Eggs   |     2
// Milk   |   1.5 liter
// Flour  |   2.5 dl
```

## `fmt.printf`

`fmt.printf` is a shorthand for `fmt.sprintf` which also output to `console.log`
or `process.stdout`.

## `fmt.table`

The `fmt` package may also format larger amounts of data as tables.

`fmt.table(<labels>, <data>[, configuration])`

```javascript
const labels = {
  'name': { label: 'Movie Name' },
  'release': { label: 'Release' },
  'director': { label: 'Director' }
}

const rows = [
  { name: 'Toy Story', release: 1995, director: 'John Lasseter' },
  { name: 'Monsters, Inc', release: 2001, director: 'Pete Docter' },
  { name: 'Finding Nemo', release: 2003, director: 'Andrew Stanton' }
]

fmt.table(labsls, rows)

// Output:
// ┏━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓
// ┃ Movie Name    ┃ Release ┃ Director       ┃
// ┡━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━┩
// │ Toy Story     │ 1995    │ John Lasseter  │
// │ Monsters, Inc │ 2001    │ Pete Docter    │
// │ Finding Nemo  │ 2003    │ Andrew Stanton │
// └───────────────┴─────────┴────────────────┘
```

### Configuration

#### Labels

Labels are the column headers. You may map a key-value pair to a readable label.
In the above example; the key `name` is mapped to the column labeled
`Movie Name` and so on.

Each label has the following options:

```javascript
const myLabels = {
  'releasedAt': {
    label: 'Released At',
    format: (dateValue) => new Date(dateValue).toString() // Optional
  }
}
```

#### Configuration

You may alter the appearance of the table with these options.

```javascript
const myConfiguration = {
  padding: 1, // Whitespace on either side of every column
  palette: fmt.TABLE_PALETTE_ROUNDED, // Palette used for styling
  silent: false // If silent is true, fmt.table will not output to console
}
```

##### Palettes

The `fmt` package provides a set of palettes (or themes) by default.

```
# fmt.TABLE_PALETTE_DEFAULT
┏━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓
┃ Movie Name    ┃ Release ┃ Director       ┃
┡━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━┩
│ Toy Story     │ 1995    │ John Lasseter  │
│ Monsters, Inc │ 2001    │ Pete Docter    │
│ Finding Nemo  │ 2003    │ Andrew Stanton │
└───────────────┴─────────┴────────────────┘

# fmt.TABLE_PALETTE_HEAVY
┏━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓
┃ Movie Name    ┃ Release ┃ Director       ┃
┣━━━━━━━━━━━━━━━╋━━━━━━━━━╋━━━━━━━━━━━━━━━━┫
┃ Toy Story     ┃ 1995    ┃ John Lasseter  ┃
┃ Monsters, Inc ┃ 2001    ┃ Pete Docter    ┃
┃ Finding Nemo  ┃ 2003    ┃ Andrew Stanton ┃
┗━━━━━━━━━━━━━━━┻━━━━━━━━━┻━━━━━━━━━━━━━━━━┛

# fmt.TABLE_PALETTE_THIN
┌───────────────┬─────────┬────────────────┐
│ Movie Name    │ Release │ Director       │
├───────────────┼─────────┼────────────────┤
│ Toy Story     │ 1995    │ John Lasseter  │
│ Monsters, Inc │ 2001    │ Pete Docter    │
│ Finding Nemo  │ 2003    │ Andrew Stanton │
└───────────────┴─────────┴────────────────┘

# fmt.TABLE_PALETTE_ROUNDED
╭───────────────┬─────────┬────────────────╮
│ Movie Name    │ Release │ Director       │
├───────────────┼─────────┼────────────────┤
│ Toy Story     │ 1995    │ John Lasseter  │
│ Monsters, Inc │ 2001    │ Pete Docter    │
│ Finding Nemo  │ 2003    │ Andrew Stanton │
╰───────────────┴─────────┴────────────────╯

# fmt.TABLE_PALETTE_SEMI_ROUNDED
┏━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓
┃ Movie Name    ┃ Release ┃ Director       ┃
┡━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━┩
│ Toy Story     │ 1995    │ John Lasseter  │
│ Monsters, Inc │ 2001    │ Pete Docter    │
│ Finding Nemo  │ 2003    │ Andrew Stanton │
╰───────────────┴─────────┴────────────────╯

# fmt.TABLE_PALETTE_ASCII
+---------------+---------+----------------+
| Movie Name    | Release | Director       |
+---------------+---------+----------------+
| Toy Story     | 1995    | John Lasseter  |
| Monsters, Inc | 2001    | Pete Docter    |
| Finding Nemo  | 2003    | Andrew Stanton |
+---------------+---------+----------------+
```
