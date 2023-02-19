/** @type {File[]} */
let selectedFiles = [];

/** @type {HTMLDivElement} */
let filesListDiv;

/** @type {HTMLButtonElement} */
let confirmButton;

function addListenersForRemoving() {
    const items = document.getElementsByClassName('list-item');
    for (const item of items)
        item.onclick = function () {
            const index = parseInt(item.getAttribute('data-index'));
            selectedFiles = removeItemAt(selectedFiles, index);
            drawSelectedItems();
        };
}

function drawSelectedItems() {
    confirmButton.disabled = selectedFiles.length <= 0;

    filesListDiv.innerHTML = selectedFiles.map((file, index) => `<h5 class="list-item" data-index="${index}">${file.name}</h5>`).join('');

    addListenersForRemoving();
}

async function addFile(file) {
    const valid = await validateFile(file);
    if (!valid)
        return alert('File must be a resource pack.');

    selectedFiles.push(file);

    drawSelectedItems();
}

window.addEventListener('load', function () {
    filesListDiv = document.getElementById('selectedFiles');

    /** @type {HTMLInputElement} */
    const filePicker = document.getElementById('filePicker');
    filePicker.addEventListener('change', async function () {
        for (let file of filePicker.files) await addFile(file);
        filePicker.value = null;
    });

    confirmButton = document.getElementById('confirmButton');
    confirmButton.addEventListener('click', processFiles);

    drawSelectedItems();

    console.log('Initialized selector.');
});
