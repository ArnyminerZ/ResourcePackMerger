/** @type {JSZip} */
const zip = new JSZip();

async function processFiles() {
    for (const file of selectedFiles)
        await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                zip.loadAsync(event.target.result).then(async (zip) => {
                    /** @type {File[]} */
                    const files = zip.files;
                    let list = [];
                    for (const name in files) {
                        const file = files[name];
                        const text = await file.async("base64");
                        list.push([name, text]);
                    }
                    console.log('Files:', list);
                    resolve();
                });
            }
            reader.readAsArrayBuffer(file);
        });
}

/**
 * Checks if the given file is a valid resource pack file.
 * @param {File} file
 * @return {Promise<boolean>}
 */
function validateFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            zip.loadAsync(event.target.result).then((zip) => {
                /** @type {File[]} */
                const files = zip.files;
                const names = Object.keys(files);
                const hasMeta = names.find(file => file === 'pack.mcmeta');
                const hasAssets = names.find(file => file.startsWith('assets'));
                resolve(hasMeta && hasAssets);
            }).catch(reject);
        }
        reader.readAsArrayBuffer(file);
    });
}
