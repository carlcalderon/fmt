# fmt

String formating using commonly used standards

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

## Flags

Each flag is defined using a `%` character followed by the flag and modifiers.

```
%[padding][modifiers]<flag>
```

|flag|modifiers|description|Notes|
|----|:--------|:----------|:----|
|v||Object|Default output if type is recognized, JSON format otherwise|
|T||Type|`typeof` representation, unless `array`|
|t||Boolean|Accepts any type such as `0` for false|
|d||Integer|Any type of number|
|b||Binary|If passed a string, each character is separated by a single ` `|
|c||Character|as `charCode`|
|x||Hexadecimal|Uppercase shortand defined as uppercase `X`|
|f|`.<int>`|Float|Modifier defines number of decimals|
|s|`^`, `_`|String|Uppercase shortand defined as uppercase `S`|
|q|`^`, `_`|String|Quoted escaped string|
|%||Literal `%`||


## Usage

```javascript
import fmt from '@paydirt/fmt'

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

### Padding

`fmt` supports both left and right whitespace padding. The padding is defined as
the "total" amount of characters the value will consume. For example, a padding
of `8` will dedicate 8 characters to the value where all remaining characters
will be filled with spaces.

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
