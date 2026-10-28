// GitHub Pages serves the repo root, so the root index.html + assets/ are the BUILT site and
// index.dev.html is the source template. `npm run build:pages` rebuilds them properly:
// images stay separate hashed files (lazy loaded), the JS is only the app (about 230 kB).
// (Never run a plain `vite build` and copy the result: with the built root index.html as the entry
// it would re-bundle the old output, images inlined as base64 - that was an 8.5 MB script.)
import { build } from 'vite';
import { cpSync, rmSync, renameSync, existsSync } from 'node:fs';

const out = '.pages-out';
rmSync(out, { recursive: true, force: true });
await build({ build: { outDir: out, emptyOutDir: true, rollupOptions: { input: 'index.dev.html' } } });
renameSync(`${out}/index.dev.html`, `${out}/index.html`);
for (const p of ['assets', 'index.html', 'dist']) rmSync(p, { recursive: true, force: true });
cpSync(`${out}/assets`, 'assets', { recursive: true });
cpSync(`${out}/index.html`, 'index.html');
cpSync(out, 'dist', { recursive: true });
rmSync(out, { recursive: true, force: true });
console.log('pages build ok');