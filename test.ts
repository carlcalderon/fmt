const fmt = require('./lib/umd')

interface result {
  total:number;
  passed:number;
}

let total:number = 0
let passed:number = 0

function expect (method:Function, description:string, result:string, ...a:Array<any>):boolean {
  const r:string = method.apply(this, a)
  if (r !== result) {
    console.log('\x1B[30;41m FAIL \x1B[0m\t\x1B[31m' + description + '\x1B[0m')
    console.log('\t\t' + a.join(', '))
    console.log(`\t\tExpected: ${result} Received: ${r}`)
    return false
  }
  console.log('\x1B[30;42m PASS \x1B[0m\t' + description)
  return true
}

function batch (list:Array<Array<any>>):result {
  return {
    total: list.length,
    passed: list.reduce((acc:number, test:Array<any>):number => (
      (expect.apply(this, test) ? 1 : 0) + acc
    ), 0)
  }
}

function segment (label:string, list:Array<Array<any>>):void {
  console.log(label.toUpperCase())
  const r:result = batch(list)
  console.log(`\n\tPassed: ${r.passed} Failed: ${r.total - r.passed}`)
  total += r.total
  passed += r.passed
  if (r.total !== r.passed) {
    console.log('\t\x1B[31mFAILED\x1B[0m\n')
  } else {
    console.log('\t\x1B[32mPASSED\x1B[0m\n')
  }
}

function report ():void {
  if (0 === total - passed) {
    console.error('\x1B[32mPASSED\x1B[0m')
    console.error(`${passed} / ${total} tests passed`)
  } else {
    console.error('\x1B[31mFAILED\x1B[0m')
    console.error(`${passed} / ${total} tests passed`)
  }
}

segment('sprintf - objects', [
  [ fmt.sprintf, 'single',  '{"foo":"bar","baz":true}', '%v',  { foo: 'bar', baz: true } ],
  [ fmt.sprintf, 'values',  '["bar",true]',             '%-v', { foo: 'bar', baz: true } ],
  [ fmt.sprintf, 'string',  'hello world',              '%v',  'hello world'             ],
  [ fmt.sprintf, 'boolean', 'false',                    '%v',  false                     ],
  [ fmt.sprintf, 'number',  '1.23',                     '%v',  1.23                      ]
])

segment('sprintf - types', [
  [ fmt.sprintf, 'string',        'string',   '%T',    'hello' ],
  [ fmt.sprintf, 'number',        'number',   '%T',    1       ],
  [ fmt.sprintf, 'object',        'object',   '%T',    {}      ],
  [ fmt.sprintf, 'array',         'array',    '%T',    []      ],
  [ fmt.sprintf, 'boolean',       'boolean',  '%T',    false   ],
  [ fmt.sprintf, 'padding left',  '   array', '%8T',   []      ],
  [ fmt.sprintf, 'padding right', 'array   ', '%-8T',  []      ]
])

segment('sprintf - booleans', [
  [ fmt.sprintf, 'single (true)',  'true',   '%t',   true  ],
  [ fmt.sprintf, 'single (false)', 'false',  '%t',   false ],
  [ fmt.sprintf, 'single (1)',     'true',   '%t',   1     ],
  [ fmt.sprintf, 'single (0)',     'false',  '%t',   0     ],
  [ fmt.sprintf, 'padding left',   '  true', '%6t',  true  ],
  [ fmt.sprintf, 'padding right',  'true  ', '%-6t', true  ]
])

segment('sprintf - integers', [
  [ fmt.sprintf, 'single',         '123',    '%d',   123    ],
  [ fmt.sprintf, 'decimal',        '123',    '%d',   123.45 ],
  [ fmt.sprintf, 'sign negative',  '-123',   '%+d',  -123   ],
  [ fmt.sprintf, 'sign positive',  '+123',   '%+d',  123    ],
  [ fmt.sprintf, 'padding left',   '   123', '%6d',  123    ],
  [ fmt.sprintf, 'padding right',  '123   ', '%-6d', 123    ]
])

segment('sprintf - binary', [
  [ fmt.sprintf, 'single',         '01111011',                            '%b',   123    ],
  [ fmt.sprintf, 'negative',       '11111111111111111111111110000101',    '%b',   -123   ],
  [ fmt.sprintf, 'string',         '01101000 01100101 01101100 01101100', '%b',   'hell' ],
  [ fmt.sprintf, 'padding left',   ' 01111011',                           '%9b',  123    ],
  [ fmt.sprintf, 'padding right',  '01111011 ',                           '%-9b', 123    ]
])

segment('sprintf - characters', [
  [ fmt.sprintf, 'single',         'A',   '%c',     65         ],
  [ fmt.sprintf, 'multiple',       'ABC', '%c%c%c', 65, 66, 67 ],
  [ fmt.sprintf, 'padding left',   ' A',  '%2c',    65         ],
  [ fmt.sprintf, 'padding right',  'A ',  '%-2c',   65         ]
])

segment('sprintf - hexadecimal', [
  [ fmt.sprintf, 'single',             'a2',       '%x',       162           ],
  [ fmt.sprintf, 'multiple',           'a2 a3 a4', '%x %x %x', 162, 163, 164 ],
  [ fmt.sprintf, 'single uppercase',   'A2',       '%X',       162           ],
  [ fmt.sprintf, 'multiple uppercase', 'A2 A3 A4', '%X %X %X', 162, 163, 164 ],
  [ fmt.sprintf, 'padding left',       ' a2',      '%3x',      162           ],
  [ fmt.sprintf, 'padding right',      'a2 ',      '%-3x',     162           ],
  [ fmt.sprintf, 'string',             '00680065006c006c006f00200077006f0072006c00640021', '%x', 'hello world!' ],
  [ fmt.sprintf, 'string uppercase',   '00680065006C006C006F00200077006F0072006C00640021', '%X', 'hello world!' ],
  [ fmt.sprintf, 'katana',             '52000020006f00720020304b305f306a',                 '%x', '刀 or かたな'  ],
  [ fmt.sprintf, 'object',             '007b002200610022003a0031002c002200620022003a0074007200750065007d', '%x', { a: 1, b: true }      ],
  [ fmt.sprintf, 'array',              '005B002200610022002C0031002C002200620022002C0074007200750065005D', '%X', [ 'a', 1, 'b', true ]  ],
  [ fmt.sprintf, 'boolean',            '0074007200750065', '%x', true  ],
  [ fmt.sprintf, 'number',             '7B',               '%X', 123   ]
])

segment('sprintf - strings', [
  [ fmt.sprintf, 'single',               'abc',           '%s',         'abc'        ],
  [ fmt.sprintf, 'quotes',               '"abc"',         '%q',         'abc'        ],
  [ fmt.sprintf, 'quotes inline',        '"a"b"c"',       '%q',         'a"b"c'      ],
  [ fmt.sprintf, 'padding left',         '   abc',        '%6s',        'abc'        ],
  [ fmt.sprintf, 'padding right',        'abc   ',        '%-6s',       'abc'        ],
  [ fmt.sprintf, 'insert',               'aBcdEfgHi',     'aBc%sgHi',   'dEf'        ],
  [ fmt.sprintf, 'lowercase',            'abcdefghi',     'abc%_sghi',  'DEF'        ],
  [ fmt.sprintf, 'lowercase quotes',     'abc"def"ghi',   'abc%_qghi',  'DEF'        ],
  [ fmt.sprintf, 'whitespace',           'abc def ghi',   'abc %s ghi', 'def'        ],
  [ fmt.sprintf, 'uppercase (%S)',       'abcDEFghi',     'abc%Sghi',   'def'        ],
  [ fmt.sprintf, 'uppercase (%Q)',       'abc"DEF"ghi',   'abc%Qghi',   'def'        ],
  [ fmt.sprintf, 'uppercase (%Q) quote', 'abc"D"E"F"ghi', 'abc%Qghi',   'd"e"f'      ],
  [ fmt.sprintf, 'uppercase (%^s)',      'abcDEFghi',     'abc%^sghi',  'def'        ],
  [ fmt.sprintf, 'uppercase (%^q)',      'abc"DEF"ghi',   'abc%^qghi',  'def'        ],
  [ fmt.sprintf, 'multiple',             'hello!',        '%s%s',       'hel', 'lo!' ]
])

segment('sprintf - floats', [
  [ fmt.sprintf, 'single',        '1.2',    '%f',     1.2    ],
  [ fmt.sprintf, 'decimals',      '1.23',   '%.2f',   1.2345 ],
  [ fmt.sprintf, 'sign negative', '-1.23',  '%+.2f',  -1.234 ],
  [ fmt.sprintf, 'sign positive', '+1.23',  '%+.2f',  1.2345 ],
  [ fmt.sprintf, 'padding left',  '  1.23', '%6.2f',  1.2345 ],
  [ fmt.sprintf, 'padding right', '1.23  ', '%-6.2f', 1.2345 ]
])

segment('sprintf - literal', [
  [ fmt.sprintf, '100%', '100%', '%d%%', 100 ],
  [ fmt.sprintf, '60% + 40%', '60% + 40%', '%d%% + %d%%', 60, 40 ],
])

segment('sprintf - mixed', [
  [ fmt.sprintf, '%s %d %t',   'foo 1 true',       '%s %d %t',   'foo', 1.2, true   ],
  [ fmt.sprintf, '%S %.2f %T', 'FOO 1.24 boolean', '%S %.2f %T', 'foo', 1.235, true ]
])


// Tables
const labels:object = {
  'name': { label: 'Movie Name' },
  'release': { label: 'Release' },
  'director': { label: 'Director' }
}
const rows:Array<object> = [
  { name: 'Toy Story', release: 1995, director: 'John Lasseter' },
  { name: 'Monsters, Inc', release: 2001, director: 'Pete Docter' },
  { name: 'Finding Nemo', release: 2003, director: 'Andrew Stanton' }
]

const expectedDefault:string = [
  '┏━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓',
  '┃ Movie Name    ┃ Release ┃ Director       ┃',
  '┡━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━┩',
  '│ Toy Story     │ 1995    │ John Lasseter  │',
  '│ Monsters, Inc │ 2001    │ Pete Docter    │',
  '│ Finding Nemo  │ 2003    │ Andrew Stanton │',
  '└───────────────┴─────────┴────────────────┘'
].join('\n')

const expectedHeavy:string = [
  '┏━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓',
  '┃ Movie Name    ┃ Release ┃ Director       ┃',
  '┣━━━━━━━━━━━━━━━╋━━━━━━━━━╋━━━━━━━━━━━━━━━━┫',
  '┃ Toy Story     ┃ 1995    ┃ John Lasseter  ┃',
  '┃ Monsters, Inc ┃ 2001    ┃ Pete Docter    ┃',
  '┃ Finding Nemo  ┃ 2003    ┃ Andrew Stanton ┃',
  '┗━━━━━━━━━━━━━━━┻━━━━━━━━━┻━━━━━━━━━━━━━━━━┛'
].join('\n')

const expectedThin:string = [
  '┌───────────────┬─────────┬────────────────┐',
  '│ Movie Name    │ Release │ Director       │',
  '├───────────────┼─────────┼────────────────┤',
  '│ Toy Story     │ 1995    │ John Lasseter  │',
  '│ Monsters, Inc │ 2001    │ Pete Docter    │',
  '│ Finding Nemo  │ 2003    │ Andrew Stanton │',
  '└───────────────┴─────────┴────────────────┘'
].join('\n')

const expectedRounded:string = [
  '╭───────────────┬─────────┬────────────────╮',
  '│ Movie Name    │ Release │ Director       │',
  '├───────────────┼─────────┼────────────────┤',
  '│ Toy Story     │ 1995    │ John Lasseter  │',
  '│ Monsters, Inc │ 2001    │ Pete Docter    │',
  '│ Finding Nemo  │ 2003    │ Andrew Stanton │',
  '╰───────────────┴─────────┴────────────────╯'
].join('\n')

const expectedSemiRounded:string = [
  '┏━━━━━━━━━━━━━━━┳━━━━━━━━━┳━━━━━━━━━━━━━━━━┓',
  '┃ Movie Name    ┃ Release ┃ Director       ┃',
  '┡━━━━━━━━━━━━━━━╇━━━━━━━━━╇━━━━━━━━━━━━━━━━┩',
  '│ Toy Story     │ 1995    │ John Lasseter  │',
  '│ Monsters, Inc │ 2001    │ Pete Docter    │',
  '│ Finding Nemo  │ 2003    │ Andrew Stanton │',
  '╰───────────────┴─────────┴────────────────╯'
].join('\n')

const expectedAscii:string = [
  '+---------------+---------+----------------+',
  '| Movie Name    | Release | Director       |',
  '+---------------+---------+----------------+',
  '| Toy Story     | 1995    | John Lasseter  |',
  '| Monsters, Inc | 2001    | Pete Docter    |',
  '| Finding Nemo  | 2003    | Andrew Stanton |',
  '+---------------+---------+----------------+'
].join('\n')

const expectedPadding:string = [
  '┏━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━┓',
  '┃   Movie Name      ┃   Release   ┃   Director         ┃',
  '┡━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━┩',
  '│   Toy Story       │   1995      │   John Lasseter    │',
  '│   Monsters, Inc   │   2001      │   Pete Docter      │',
  '│   Finding Nemo    │   2003      │   Andrew Stanton   │',
  '└───────────────────┴─────────────┴────────────────────┘'
].join('\n')

const expectedNoPadding:string = [
  '┏━━━━━━━━━━━━━┳━━━━━━━┳━━━━━━━━━━━━━━┓',
  '┃Movie Name   ┃Release┃Director      ┃',
  '┡━━━━━━━━━━━━━╇━━━━━━━╇━━━━━━━━━━━━━━┩',
  '│Toy Story    │1995   │John Lasseter │',
  '│Monsters, Inc│2001   │Pete Docter   │',
  '│Finding Nemo │2003   │Andrew Stanton│',
  '└─────────────┴───────┴──────────────┘'
].join('\n')

segment('table - palettes', [
  [ fmt.table, 'default',      expectedDefault,     labels, rows, { silent: true                                          }],
  [ fmt.table, 'heavy',        expectedHeavy,       labels, rows, { silent: true, palette: fmt.TABLE_PALETTE_HEAVY        }],
  [ fmt.table, 'thin',         expectedThin,        labels, rows, { silent: true, palette: fmt.TABLE_PALETTE_THIN         }],
  [ fmt.table, 'rounded',      expectedRounded,     labels, rows, { silent: true, palette: fmt.TABLE_PALETTE_ROUNDED      }],
  [ fmt.table, 'semi rounded', expectedSemiRounded, labels, rows, { silent: true, palette: fmt.TABLE_PALETTE_SEMI_ROUNDED }],
  [ fmt.table, 'ascii',        expectedAscii,       labels, rows, { silent: true, palette: fmt.TABLE_PALETTE_ASCII        }],
  [ fmt.table, 'padding (3)',  expectedPadding,     labels, rows, { silent: true, padding: 3                              }],
  [ fmt.table, 'padding (0)',  expectedNoPadding,   labels, rows, { silent: true, padding: 0                              }]
])

const formattingLabels:object = {
  'name': { label: 'Name', format: v => v.toUpperCase() },
  'value': { label: 'Value', format: Math.round }
}

const formattingLabelsArray:Array<object> = [
  { key: 'name', label: 'Name', format: v => v.toUpperCase() },
  { key: 'value', label: 'Value', format: Math.round }
]
const formattingRows:Array<object> = [
  { name: 'First', value: 123.4 },
  { name: 'Second', value: 455.6 }
]

const expectedFormatting = [
  '┏━━━━━━━━┳━━━━━━━┓',
  '┃ Name   ┃ Value ┃',
  '┡━━━━━━━━╇━━━━━━━┩',
  '│ FIRST  │ 123   │',
  '│ SECOND │ 456   │',
  '└────────┴───────┘'
].join('\n')

segment('table - formatting', [
  [ fmt.table, 'generic', expectedFormatting, formattingLabels, formattingRows, { silent: true }],
  [ fmt.table, 'label array', expectedFormatting, formattingLabelsArray, formattingRows, { silent: true }],
])

const orderLabelsObjectStrings = {
  "a": { label: 'A' },
  "b": { label: 'B' },
  "c": { label: 'C' }
}

const orderRowsStrings = [
  { a: 'A1', b: 'B1', c: 'C1' },
  { a: 'A2', b: 'B2', c: 'C2' },
  { a: 'A3', b: 'B3', c: 'C3' }
]

const orderLabelsObjectNumbers = {
  2: { label: '2' },
  1: { label: '1' },
  3: { label: '3' }
}

const orderRowsNumbers = [
  { 1: '11', 2: '21', 3: '31' },
  { 1: '12', 2: '22', 3: '32' },
  { 1: '13', 2: '23', 3: '33' }
]

const orderLabelsObjectStringsAndNumbers = {
  "b": { label: 'B' },
  2: { label: '2' },
  "a": { label: 'A' },
  1: { label: '1' },
  3: { label: '3' },
  "c": { label: 'C' }
}

const orderLabelsArray = [
  { key: 'b', label: 'B'},
  { key: 2, label: '2' },
  { key: 'a', label: 'A'},
  { key: 1, label: '1' },
  { key: 3, label: '3' },
  { key: 'c', label: 'C'},
]

const orderRowsStringsAndNumbers = [...orderRowsStrings, ...orderRowsNumbers]
const expectedOrderObjectStrings = [
  '┏━━━━┳━━━━┳━━━━┓',
  '┃ A  ┃ B  ┃ C  ┃',
  '┡━━━━╇━━━━╇━━━━┩',
  '│ A1 │ B1 │ C1 │',
  '│ A2 │ B2 │ C2 │',
  '│ A3 │ B3 │ C3 │',
  '└────┴────┴────┘'
].join('\n')

const expectedOrderObjectNumbers = [
  '┏━━━━┳━━━━┳━━━━┓',
  '┃ 1  ┃ 2  ┃ 3  ┃',
  '┡━━━━╇━━━━╇━━━━┩',
  '│ 11 │ 21 │ 31 │',
  '│ 12 │ 22 │ 32 │',
  '│ 13 │ 23 │ 33 │',
  '└────┴────┴────┘'
].join('\n')

const expectedOrderObjectStringsAndNumbers = [
  '┏━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┓',
  '┃ 1         ┃ 2         ┃ 3         ┃ B         ┃ A         ┃ C         ┃',
  '┡━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━┩',
  '│ undefined │ undefined │ undefined │ B1        │ A1        │ C1        │',
  '│ undefined │ undefined │ undefined │ B2        │ A2        │ C2        │',
  '│ undefined │ undefined │ undefined │ B3        │ A3        │ C3        │',
  '│ 11        │ 21        │ 31        │ undefined │ undefined │ undefined │',
  '│ 12        │ 22        │ 32        │ undefined │ undefined │ undefined │',
  '│ 13        │ 23        │ 33        │ undefined │ undefined │ undefined │',
  '└───────────┴───────────┴───────────┴───────────┴───────────┴───────────┘'
].join('\n')

const expectedOrderArray = [
  '┏━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┓',
  '┃ B         ┃ 2         ┃ A         ┃ 1         ┃ 3         ┃ C         ┃',
  '┡━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━┩',
  '│ B1        │ undefined │ A1        │ undefined │ undefined │ C1        │',
  '│ B2        │ undefined │ A2        │ undefined │ undefined │ C2        │',
  '│ B3        │ undefined │ A3        │ undefined │ undefined │ C3        │',
  '│ undefined │ 21        │ undefined │ 11        │ 31        │ undefined │',
  '│ undefined │ 22        │ undefined │ 12        │ 32        │ undefined │',
  '│ undefined │ 23        │ undefined │ 13        │ 33        │ undefined │',
  '└───────────┴───────────┴───────────┴───────────┴───────────┴───────────┘'
].join('\n')

segment('table - key order', [
  [ fmt.table, 'object strings',             expectedOrderObjectStrings,           orderLabelsObjectStrings,           orderRowsStrings,           { silent: true }],
  [ fmt.table, 'object numbers',             expectedOrderObjectNumbers,           orderLabelsObjectNumbers,           orderRowsNumbers,           { silent: true }],
  [ fmt.table, 'object strings and numbers', expectedOrderObjectStringsAndNumbers, orderLabelsObjectStringsAndNumbers, orderRowsStringsAndNumbers, { silent: true }],
  [ fmt.table, 'array',                      expectedOrderArray,                   orderLabelsArray,                   orderRowsStringsAndNumbers, { silent: true }],
])

const orderLabelsLimited = [
  { key: 'a', label: 'A'},
  { key: 2, label: '2' },
  { key: 1, label: '1' },
  { key: 'b', label: 'B'},
]

const expectedOrderLimited = [
  '┏━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┳━━━━━━━━━━━┓',
  '┃ A         ┃ 2         ┃ 1         ┃ B         ┃',
  '┡━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━╇━━━━━━━━━━━┩',
  '│ A1        │ undefined │ undefined │ B1        │',
  '│ A2        │ undefined │ undefined │ B2        │',
  '│ A3        │ undefined │ undefined │ B3        │',
  '│ undefined │ 21        │ 11        │ undefined │',
  '│ undefined │ 22        │ 12        │ undefined │',
  '│ undefined │ 23        │ 13        │ undefined │',
  '└───────────┴───────────┴───────────┴───────────┘'
].join('\n')

segment('table - limited keys', [
  [ fmt.table, 'limited', expectedOrderLimited, orderLabelsLimited, orderRowsStringsAndNumbers, { silent: true }]
])


report()

process.exit(Math.min(total - passed, 1))
