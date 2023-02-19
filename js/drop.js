/**
 * @param {DragEvent} event
 */
function dropHandler(event) {
    console.log('Droppped file!');

    event.preventDefault();

    if (event.dataTransfer.items)
        [...event.dataTransfer.items].forEach((/** @type {DataTransferItem} */ item, index) => {
            if (item.kind === 'file') {
                /** @type {File} */
                const file = item.getAsFile();
                addFile(file);
            }
        })
}
/**
 * @param {DragEvent} event
 */
function dragOverHandler(event) { event.preventDefault(); }

window.addEventListener('load', function () {
    const zones = document.getElementsByClassName('drop-zone');
    for (const zone of zones) {
        zone.addEventListener('drop', function (event) { dropHandler(event) });
        zone.addEventListener('dragover', function (event) { dragOverHandler(event) });
    }
});
