let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

// display existing flashcards
function displayFlashcards() {
    const flashcardList = document.getElementById('todoList');
    flashcardList.innerHTML = ''; // clear current display

    flashcards.forEach((todo, index) => {
        const flashcardItem = document.createElement('div');
        flashcardItem.className = `todo-item${todo.completed ?'completed' : ''}`;
        
        const flashcardText = document.createElement('span');
        flashcardText.className = 'flashcard-text';
        flashcardText.textContent = flashcard.text;

        // Make text clickable for toggling completion 

        flashcardText.onclick = () => toggleComplete(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteFlashcard(index);

        flashcardItem.appendChild(flashcardText);
        flashcardItem.appendChild(deleteBtn);
        flashcardList.appendChild(flashcardItem);
    });
    updateStats();
}

// Add new flashcard
function addFlashcard() {
    const input = document.getElementById('flashcardInput');
    const text = input.value.trim();

    if (text !== '') {
        flashcards.push({
            text: text,
            completed: false,
            dateAdded: new Date().toISOString()
        });

        // Save to localStorage
        localStorage.setItem('flashcards', JSON.stringify(flashcards));

        // Clear input
        input.value = ''; 

        // Refresh display
        displayFlashcards();
    }
}

// Delete flashcard 
function deleteFlashcard(index) {
    flashcards.splice(index, 1);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    displayFlashcards();
}

// Update statistics
function updateStats() {
    document.getElementById('totalCount').textContent = flashcards.length;

    document.getElementById('completedCount').textContent = flashcards.filter(flashcard => flashcard.completed).length;
}

// Add keyboard support
document.getElementById('flashcardInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addFlashcard();
    }
});

// Initial display
displayFlashcards();

