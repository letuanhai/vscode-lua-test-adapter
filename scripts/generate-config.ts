import * as fs from "fs";
import * as path from "path";
import { CONFIG_KEYS } from "../src/config";

const pkgPath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const configPrefix: string = pkg.name;

const oldProps: Record<string, unknown> = pkg.contributes.configuration.properties;
const newProps: Record<string, unknown> = {};
for (const fullKey of Object.keys(oldProps)) {
    const shortKey = fullKey.includes(".") ? fullKey.split(".").slice(1).join(".") : fullKey;
    newProps[`${configPrefix}.${shortKey}`] = oldProps[fullKey];
}

// Verify all CONFIG_KEYS are represented in package.json (catches drift early)
const missingKeys = Object.values(CONFIG_KEYS).filter(key => !(`${configPrefix}.${key}` in newProps));
if (missingKeys.length > 0) {
    throw new Error(`[generate-config] CONFIG_KEYS has entries missing from package.json contributes: ${missingKeys.join(", ")}`);
}

pkg.contributes.configuration.properties = newProps;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log(`[generate-config] Patched package.json with prefix "${configPrefix}"`);
