import ruff as r
import ruffx.ts
import ruffx.npm


if __name__ == '__main__':
  ruffx.ts.typescript(__file__, ['tests', 'cherub.ts.js'], ['ts'])
  r.serve('0.0.0.0', 3001, r.path(__file__, 'tests'))
  r.run()
