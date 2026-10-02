#!/usr/bin/env node
// Compiles the design-sync stylesheet entry with the repo's own Tailwind v4
// toolchain. This is cfg.buildCmd: the repo ships no dist and no compiled CSS,
// so the bundle's stylesheet has to be produced here before every converter run
// (the converter copies cfg.cssEntry verbatim — it does not run postcss).
//
// Re-run this whenever a preview or a ui/ component adds a utility class, or
// the emitted CSS won't contain it.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

const HERE = dirname(fileURLToPath(import.meta.url));
const ENTRY = join(HERE, 'tailwind-entry.css');
const OUT = join(HERE, '.cache', 'compiled.css');

mkdirSync(dirname(OUT), { recursive: true });

const result = await postcss([tailwind()]).process(readFileSync(ENTRY, 'utf8'), {
  from: ENTRY,
  to: OUT,
});

for (const warning of result.warnings()) console.error(`! ${warning.toString()}`);

writeFileSync(OUT, result.css);
console.error(`» compiled ${resolve(ENTRY)} → ${resolve(OUT)} (${result.css.length} bytes)`);
