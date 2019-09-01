const sprintf = require('./lib').sprintf

function expect (description, result, ...a) {
  const r = sprintf.apply(this, a)
  if (r !== result) {
    console.log('\033[30;41m FAIL \033[0m\t\033[31m' + description + '\033[0m')
    console.log('\t\t' + a.join(', '))
    console.log(`\t\tExpected: ${result} Received: ${r}`)
    return false
  }
  console.log('\033[30;42m PASS \033[0m\t' + description)
  return true
}

function batch (list) {
  return {
    total: list.length,
    passed: list.reduce((acc, test) => (
      (expect.apply(this, test) ? 1 : 0) + acc
    ), 0)
  }
}

function segment (label, list) {
  console.log(label.toUpperCase())
  const r = batch(list)
  console.log(`\n\tPassed: ${r.passed} Failed: ${r.total - r.passed}`)
  if (r.total !== r.passed) {
    console.log('\t\033[31mFAILED\033[0m\n')
  } else {
    console.log('\t\033[32mPASSED\033[0m\n')
  }
}

segment('objects', [
  [ 'single', '{"foo":"bar","baz":true}', '%v',  { foo: 'bar', baz: true } ],
  [ 'values', '["bar",true]',             '%-v', { foo: 'bar', baz: true } ]
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

segment('integers', [
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
  [ 'padding left',   '   123', '%6d',  123    ],
  [ 'padding right',  '123   ', '%-6d', 123    ]
])

segment('binary', [
  [ 'single',         '1111011',                                      '%b',   123     ],
  [ 'negative',       '11111111111111111111111110000101',             '%b',   -123    ],
  [ 'string',         '01101000 01100101 01101100 01101100 01101111', '%b',   'hello' ],
  [ 'padding left',   ' 1111011',                                     '%8b',  123     ],
  [ 'padding right',  '1111011 ',                                     '%-8b', 123     ]
])

segment('characters', [
  [ 'single',         'A',   '%c',     65         ],
  [ 'multiple',       'ABC', '%c%c%c', 65, 66, 67 ],
  [ 'padding left',   ' A',  '%2c',    65         ],
  [ 'padding right',  'A ',  '%-2c',   65         ]
])

segment('hexadecimal', [
  [ 'single',         'A2',       '%x',       162           ],
  [ 'multiple',       'A2 A3 A4', '%x %x %x', 162, 163, 164 ],
  [ 'padding left',   ' A2',      '%3x',      162           ],
  [ 'padding right',  'A2 ',      '%-3x',     162           ]
])

segment('strings', [
  [ 'single',          'abc',         '%s',         'abc'        ],
  [ 'padding left',    '   abc',      '%6s',        'abc'        ],
  [ 'padding right',   'abc   ',      '%-6s',       'abc'        ],
  [ 'insert',          'aBcdEfgHi',   'aBc%sgHi',   'dEf'        ],
  [ 'lowercase',       'abcdefghi',   'abc%_sghi',  'DEF'        ],
  [ 'whitespace',      'abc def ghi', 'abc %s ghi', 'def'        ],
  [ 'uppercase (%S)',  'abcDEFghi',   'abc%Sghi',   'def'        ],
  [ 'uppercase (%^s)', 'abcDEFghi',   'abc%^sghi',  'def'        ],
  [ 'multiple',        'hello!',      '%s%s',       'hel', 'lo!' ]
])

segment('floats', [
  [ 'single',        '1.2',    '%f',     1.2    ],
  [ 'decimals',      '1.23',   '%.2f',   1.2345 ],
  [ 'padding left',  '  1.23', '%6.2f',  1.2345 ],
  [ 'padding right', '1.23  ', '%-6.2f', 1.2345 ]
])

segment('literal', [
  [ '100%', '100%', '%d%%', 100 ],
  [ '60% + 40%', '60% + 40%', '%d%% + %d%%', 60, 40 ],
])

segment('mixed', [
  [ '%s %d %t',        'foo 1 true',    '%s %d %t', 'foo', 1.2, true ],
  [ '%S %.2f %T',        'FOO 1.24 boolean',    '%S %.2f %T', 'foo', 1.235, true ]
])
