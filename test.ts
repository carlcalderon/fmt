const sprintf = require('./lib/umd').sprintf

interface result {
  total:number;
  passed:number;
}

let total:number = 0
let passed:number = 0

function expect (description:string, result:string, ...a:Array<any>):boolean {
  const r:string = sprintf.apply(this, a)
  if (r !== result) {
    console.log('\033[30;41m FAIL \033[0m\t\033[31m' + description + '\033[0m')
    console.log('\t\t' + a.join(', '))
    console.log(`\t\tExpected: ${result} Received: ${r}`)
    return false
  }
  console.log('\033[30;42m PASS \033[0m\t' + description)
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
    console.log('\t\033[31mFAILED\033[0m\n')
  } else {
    console.log('\t\033[32mPASSED\033[0m\n')
  }
}

function report ():void {
  if (0 === total - passed) {
    console.error('\033[32mPASSED\033[0m')
    console.error(`${passed} / ${total} tests passed`)
  } else {
    console.error('\033[31mFAILED\033[0m')
    console.error(`${passed} / ${total} tests passed`)
  }
}

segment('objects', [
  [ 'single',  '{"foo":"bar","baz":true}', '%v',  { foo: 'bar', baz: true } ],
  [ 'values',  '["bar",true]',             '%-v', { foo: 'bar', baz: true } ],
  [ 'string',  'hello world',              '%v',  'hello world'             ],
  [ 'boolean', 'false',                    '%v',  false                     ],
  [ 'number',  '1.23',                     '%v',  1.23                      ]
])

segment('types', [
  [ 'string',        'string',   '%T',    'hello' ],
  [ 'number',        'number',   '%T',    1       ],
  [ 'object',        'object',   '%T',    {}      ],
  [ 'array',         'array',    '%T',    []      ],
  [ 'boolean',       'boolean',  '%T',    false   ],
  [ 'padding left',  '   array', '%8T',   []      ],
  [ 'padding right', 'array   ', '%-8T',  []      ]
])

segment('booleans', [
  [ 'single (true)',  'true',   '%t',   true  ],
  [ 'single (false)', 'false',  '%t',   false ],
  [ 'single (1)',     'true',   '%t',   1     ],
  [ 'single (0)',     'false',  '%t',   0     ],
  [ 'padding left',   '  true', '%6t',  true  ],
  [ 'padding right',  'true  ', '%-6t', true  ]
])

segment('integers', [
  [ 'single',         '123',    '%d',   123    ],
  [ 'decimal',        '123',    '%d',   123.45 ],
  [ 'sign negative',  '-123',   '%+d',  -123   ],
  [ 'sign positive',  '+123',   '%+d',  123    ],
  [ 'padding left',   '   123', '%6d',  123    ],
  [ 'padding right',  '123   ', '%-6d', 123    ]
])

segment('binary', [
  [ 'single',         '01111011',                            '%b',   123    ],
  [ 'negative',       '11111111111111111111111110000101',    '%b',   -123   ],
  [ 'string',         '01101000 01100101 01101100 01101100', '%b',   'hell' ],
  [ 'padding left',   ' 01111011',                           '%9b',  123    ],
  [ 'padding right',  '01111011 ',                           '%-9b', 123    ]
])

segment('characters', [
  [ 'single',         'A',   '%c',     65         ],
  [ 'multiple',       'ABC', '%c%c%c', 65, 66, 67 ],
  [ 'padding left',   ' A',  '%2c',    65         ],
  [ 'padding right',  'A ',  '%-2c',   65         ]
])

segment('hexadecimal', [
  [ 'single',             'a2',       '%x',       162           ],
  [ 'multiple',           'a2 a3 a4', '%x %x %x', 162, 163, 164 ],
  [ 'single uppercase',   'A2',       '%X',       162           ],
  [ 'multiple uppercase', 'A2 A3 A4', '%X %X %X', 162, 163, 164 ],
  [ 'padding left',       ' a2',      '%3x',      162           ],
  [ 'padding right',      'a2 ',      '%-3x',     162           ],
  [ 'string',             '00680065006c006c006f00200077006f0072006c00640021', '%x', 'hello world!' ],
  [ 'string uppercase',   '00680065006C006C006F00200077006F0072006C00640021', '%X', 'hello world!' ],
  [ 'katana',             '52000020006f00720020304b305f306a',                 '%x', '刀 or かたな'  ],
  [ 'object',             '007b002200610022003a0031002c002200620022003a0074007200750065007d', '%x', { a: 1, b: true }      ],
  [ 'array',              '005B002200610022002C0031002C002200620022002C0074007200750065005D', '%X', [ 'a', 1, 'b', true ]  ],
  [ 'boolean',            '0074007200750065', '%x', true  ],
  [ 'number',             '7B',               '%X', 123   ]
])

segment('strings', [
  [ 'single',           'abc',         '%s',         'abc'        ],
  [ 'quotes',           '"abc"',       '%q',         'abc'        ],
  [ 'padding left',     '   abc',      '%6s',        'abc'        ],
  [ 'padding right',    'abc   ',      '%-6s',       'abc'        ],
  [ 'insert',           'aBcdEfgHi',   'aBc%sgHi',   'dEf'        ],
  [ 'lowercase',        'abcdefghi',   'abc%_sghi',  'DEF'        ],
  [ 'lowercase quotes', 'abc"def"ghi', 'abc%_qghi',  'DEF'        ],
  [ 'whitespace',       'abc def ghi', 'abc %s ghi', 'def'        ],
  [ 'uppercase (%S)',   'abcDEFghi',   'abc%Sghi',   'def'        ],
  [ 'uppercase (%Q)',   'abc"DEF"ghi', 'abc%Qghi',   'def'        ],
  [ 'uppercase (%^s)',  'abcDEFghi',   'abc%^sghi',  'def'        ],
  [ 'uppercase (%^q)',  'abc"DEF"ghi', 'abc%^qghi',  'def'        ],
  [ 'multiple',         'hello!',      '%s%s',       'hel', 'lo!' ]
])

segment('floats', [
  [ 'single',        '1.2',    '%f',     1.2    ],
  [ 'decimals',      '1.23',   '%.2f',   1.2345 ],
  [ 'sign negative', '-1.23',  '%+.2f',  -1.234 ],
  [ 'sign positive', '+1.23',  '%+.2f',  1.2345 ],
  [ 'padding left',  '  1.23', '%6.2f',  1.2345 ],
  [ 'padding right', '1.23  ', '%-6.2f', 1.2345 ]
])

segment('literal', [
  [ '100%', '100%', '%d%%', 100 ],
  [ '60% + 40%', '60% + 40%', '%d%% + %d%%', 60, 40 ],
])

segment('mixed', [
  [ '%s %d %t',   'foo 1 true',       '%s %d %t',   'foo', 1.2, true   ],
  [ '%S %.2f %T', 'FOO 1.24 boolean', '%S %.2f %T', 'foo', 1.235, true ]
])

report()

process.exit(Math.min(total - passed, 1))
