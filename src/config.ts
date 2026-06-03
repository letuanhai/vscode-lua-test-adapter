// The config prefix is loaded at runtime from the extension manifest (package.json `name`).
// Call initPrefix() in activate() before any settings are read.
// The prebuild step (scripts/generate-config.ts) also reads package.json `name` to keep
// the contributes.configuration keys in sync.

let _prefix: string | undefined;

export function initPrefix(prefix: string): void {
    _prefix = prefix;
}

export function getPrefix(): string {
    if (_prefix === undefined) {
        throw new Error("[LuaTestAdapter] Config prefix not initialized — call initPrefix() in activate()");
    }
    return _prefix;
}

export const CONFIG_KEYS = {
    luaExe: "luaExe",
    testGlob: "testGlob",
    testRegex: "testRegex",
    suiteRegex: "suiteRegex",
    testEncoding: "testEncoding",
    decorationRegex: "decorationRegex",
    debugExtension: "debugExtension",
    logpanel: "logpanel",
    logfile: "logfile",
} as const;
