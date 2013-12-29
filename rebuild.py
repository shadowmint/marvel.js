import ruffx.ts
import ruffx.npm


if __name__ == '__main__':
  ruffx.npm.install(__file__)
  ruffx.ts.typescript(__file__, ['tests', 'cherub.ts.js'], ['ts']).execute()
