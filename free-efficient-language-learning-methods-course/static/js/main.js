document.addEventListener('DOMContentLoaded', () => {

    const CHECKMARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clip-rule="evenodd" /></svg>`;

    function updateAllCompletionIcons() {
        const icons = document.querySelectorAll('.completion-icon');
        icons.forEach(icon => {
            const lessonId = icon.getAttribute('data-lesson-id');
            const storageKey = `lesson-${lessonId}-complete`;
            if (localStorage.getItem(storageKey) === 'true') {
                icon.innerHTML = CHECKMARK_SVG;
            } else {
                icon.innerHTML = '';
            }
        });
    }

    // --- COMPLETION BUTTON LOGIC ---
    const completeBtn = document.getElementById('completeBtn');

    if (completeBtn) {
        const lessonId = completeBtn.getAttribute('data-lesson-id');
        const storageKey = `lesson-${lessonId}-complete`;

        if (localStorage.getItem(storageKey) === 'true') {
            setButtonToCompleted(completeBtn);
        }

        completeBtn.addEventListener('click', () => {
            const isCompleted = localStorage.getItem(storageKey) === 'true';
            if (isCompleted) {
                localStorage.removeItem(storageKey);
                setButtonToIncomplete(completeBtn);
            } else {
                localStorage.setItem(storageKey, 'true');
                setButtonToCompleted(completeBtn);
            }
            // Update the sidebar icons after changing the state
            updateAllCompletionIcons();
        });
    }

    function setButtonToCompleted(button) {
        button.textContent = button.getAttribute('data-complete-text');
        button.classList.remove('bg-green-600', 'hover:bg-green-700');
        button.classList.add('bg-gray-500', 'hover:bg-gray-600');
    }

    function setButtonToIncomplete(button) {
        button.textContent = button.getAttribute('data-incomplete-text');
        button.classList.remove('bg-gray-500', 'hover:bg-gray-600');
        button.classList.add('bg-green-600', 'hover:bg-green-700');
    }

    // --- QUIZ LOGIC (for checkpoint pages) ---
    const quizQuestions = document.querySelectorAll('.quiz-question');
    if (quizQuestions.length > 0) {
        // ... (quiz logic remains the same)
    }

    // --- INITIALIZE UI ---
    // Update all icons in the sidebar on initial page load
    updateAllCompletionIcons();
});
