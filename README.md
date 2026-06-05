# LuaUnit Test Adapter for Visual Studio Code

This is a personal fork of [lej.vscode-lua-test-adapter](https://marketplace.visualstudio.com/items?itemName=lej.vscode-lua-test-adapter) with additional features for personal use.

A LuaUnit test adapter for [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer).

## Supported

* Detect LuaUnit tests
* Run LuaUnit tests
* Debugging (requires one of the extensions below, configurable with `debugExtension`)
  * [Lua Debug](https://marketplace.visualstudio.com/items?itemName=actboy168.lua-debug) by actboy168 (default)
  * [Local Lua Debugger](https://marketplace.visualstudio.com/items?itemName=tomblind.local-lua-debugger-vscode) by tomblind
    * The test file must pass varargs to LuaUnit so the debugger can forward test filter arguments: `LuaUnit.run(...)` or `LuaUnit.new():runSuite(...)`
  * [Second Local Lua Debugger](https://marketplace.visualstudio.com/items?itemName=ismoh-games.second-local-lua-debugger-vscode) by ismoh-games (fork of tomblind's)
    * Same requirement as Local Lua Debugger: the test file must use `LuaUnit.run(...)` or `LuaUnit.new():runSuite(...)`

## Not supported

* Automatic reloading of test definitions
* Autorun

## Getting Started

1. Install [LuaUnit Test-Adapter](https://marketplace.visualstudio.com/items?itemName=lth.luaunit-test-adapter)
2. Download [LuaUnit](https://raw.githubusercontent.com/bluebird75/luaunit/master/luaunit.lua) (`example/luaunit.lua`)
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

4. If the Lua executable is not on `PATH` as `lua`, set `luaExe` in settings. Use `${workspaceFolder}` to reference the workspace root, e.g. `"${workspaceFolder}/lua5.1.exe"`
5. [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer) is installed automatically as necessary. Newer version of VSCode has this feature built-in so no need to install the extension.
6. For debugging capability install one of the supported debug extensions (see [Supported](#supported)) and set `debugExtension` if not using the default
7. Run (or debug) the tests via the Test Explorer UI

## Configuration

| Property | Description |
| --- | --- |
| `luaExe` | Path to Lua executable. Defaults to `lua` |
| `testGlob` | Glob used to find test files. Defaults to `**/[tT]est*.{lua}` |
| `testRegex` | Regex matched against function/method names to identify tests. Defaults to `^[tT]est[a-zA-Z0-9_]*$` |
| `suiteRegex` | Regex matched against class names in `function ClassName:method()` syntax to identify test suites. Defaults to `^Test[a-zA-Z0-9_]*$` |
| `testEncoding` | Test file encoding. Defaults to `utf8` |
| `decorationRegex` | Regex used to find line number and failure message in test output. Defaults to `/\.lua:(?<line>[1-9][0-9]*):(?<message>.*)stack traceback:/` |
| `debugExtension` | Debug extension used to debug tests. One of `actboy168.lua-debug` (default), `tomblind.local-lua-debugger-vscode`, or `ismoh-games.second-local-lua-debugger-vscode` |
