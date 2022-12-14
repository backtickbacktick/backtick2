import { tar } from 'zip-a-folder';
import * as fs from 'fs';

(async () => {
    const packageContent = fs.readFileSync('package.json', 'utf-8');
    const manifestContent = fs.readFileSync('extension/manifest.json', 'utf-8');

    const { version } = JSON.parse(packageContent);

    fs.unlinkSync('backtick-chrome-extension.tgz');

    const [major, minor, patch] = version.split('.').map(Number);

    const newVersion = [major, minor, patch + 1].join('.');

    fs.writeFileSync(
        'extension/README.md',
        fs.readFileSync('README.md', 'utf-8')
    );

    fs.writeFileSync(
        'package.json',
        packageContent.replace(
            `"version": "${version}"`,
            `"version": "${newVersion}"`
        )
    );

    fs.writeFileSync(
        'extension/manifest.json',
        manifestContent.replace(
            `"version": "${version}"`,
            `"version": "${newVersion}"`
        )
    );

    await tar('extension', 'backtick-chrome-extension.tgz');
})();
