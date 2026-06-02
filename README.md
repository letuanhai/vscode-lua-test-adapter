# LuaUnit Test Adapter for Visual Studio Code

This is a personal fork of [lej.vscode-lua-test-adapter](https://marketplace.visualstudio.com/items?itemName=lej.vscode-lua-test-adapter) with additional features for personal use.

A LuaUnit test adapter for [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer).

## Supported

* Detect LuaUnit tests
* Run LuaUnit tests
* Debugging (requires one of the extensions below, configurable via `luaTestAdapter.debugExtension`)
  * [Lua Debug](https://marketplace.visualstudio.com/items?itemName=actboy168.lua-debug) by actboy168 (default)
  * [Local Lua Debugger](https://marketplace.visualstudio.com/items?itemName=tomblind.local-lua-debugger-vscode) by tomblind
    * The test file must pass varargs to LuaUnit so the debugger can forward test filter arguments: `LuaUnit.run(...)` or `LuaUnit.new():runSuite(...)`
  * [Second Local Lua Debugger](https://marketplace.visualstudio.com/items?itemName=ismoh-games.second-local-lua-debugger-vscode) by ismoh-games (fork of tomblind's)
    * Same requirement as Local Lua Debugger: the test file must use `LuaUnit.run(...)` or `LuaUnit.new():runSuite(...)`

## Not supported

* Automatic reloading of test definitions
* Autorun

## Getting Started

1. Create an empty folder `example`
2. Download LuaUnit (`example/luaunit.lua`)
  * https://raw.githubusercontent.com/bluebird75/luaunit/master/luaunit.lua
3. Create a test file (`example/test.lua`) with the below content

```lua
luaunit  = require('luaunit')

function testPass()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 3})
end

function testFail()
    luaunit.assertEquals({1, 2, 3}, {1, 2, 4})
end

-- Use LuaUnit.run(...) with varargs if you want to use Local Lua Debugger for debugging
os.exit(luaunit.LuaUnit.run())
```

4. If the Lua executable is not available via `lua` create `.vscode/settings.json`. The current workspace folder can be referred to as `${workspaceFolder}`, e.g. `"${workspaceFolder}/lua5.1.exe"`

```json
{
  "luaTestAdapter.luaExe": "C:/Program Files/Lua/lua-5.1.5_Win64_bin/lua5.1.exe",
}
```

5. Install Test Explorer UI
  * https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer

6. Install Lua Test Adapter
  * https://marketplace.visualstudio.com/items?itemName=lth.vscode-lua-test-adapter

7. For debugging capability install one of the supported debug extensions (see [Supported](#supported)) and set `luaTestAdapter.debugExtension` if not using the default

8. Run (or debug) the tests via the Test Explorer UI

## Configuration

| Property | Description |
| --- | --- |
| `luaTestAdapter.luaExe` | Path to Lua executable. The current workspace folder can be referred to using `${workspaceFolder}`. Defaults to `lua` |
| `luaTestAdapter.testGlob` | Glob used to find test files. Defaults to `**/[tT]est*.{lua}` |
| `luaTestAdapter.testRegex` | Regex matched against function/method names to identify tests. Defaults to `^[tT]est[a-zA-Z0-9_]*$` |
| `luaTestAdapter.suiteRegex` | Regex matched against class names in `function ClassName:method()` syntax to identify test suites. Defaults to `^Test[a-zA-Z0-9_]*$` |
| `luaTestAdapter.testEncoding` | Test file encoding. Defaults to `utf8` |
| `luaTestAdapter.decorationRegex` | Regex used to find line number and failure message in test output. Defaults to `/\.lua:(?<line>[1-9][0-9]*):(?<message>.*)stack traceback:/` |
| `luaTestAdapter.debugExtension` | Debug extension used to debug tests. One of `actboy168.lua-debug` (default), `tomblind.local-lua-debugger-vscode`, or `ismoh-games.second-local-lua-debugger-vscode` |
