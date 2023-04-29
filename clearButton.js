const clearButton = document.getElementById('clearButton');
clearButton.textContent = "Clear";

clearButton.addEventListener('click', () => {
    location.reload();
})