document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('scheduleContainer');
    const categorySearchInput = document.getElementById('categorySearch');
    const searchButton = document.getElementById('searchButton');
    const clearSearchButton = document.getElementById('clearSearchButton');

    // talksData is assumed to be globally available from talks.js (injected by build script)

    function renderTalks(talksToRender) {
        scheduleContainer.innerHTML = ''; // Clear existing talks
        talksToRender.forEach(talk => {
            const talkCard = document.createElement('div');
            talkCard.classList.add('talk-card');
            if (talk.id === 'lunch') {
                talkCard.classList.add('lunch-break');
            }

            let speakersHtml = '';
            if (talk.speakers && talk.speakers.length > 0) {
                speakersHtml = `<p class="speakers"><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>`;
            }

            let categoryHtml = '';
            if (talk.category && talk.category.length > 0) {
                categoryHtml = `<p class="category"><strong>Categories:</strong> ${talk.category.join(', ')}</p>`;
            }

            talkCard.innerHTML = `
                <span class="time">${talk.time}</span>
                <h3>${talk.title}</h3>
                ${speakersHtml}
                ${categoryHtml}
                <p class="description">${talk.description}</p>
            `;
            scheduleContainer.appendChild(talkCard);
        });
    }

    function filterTalks() {
        const searchTerm = categorySearchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            renderTalks(talksData); // Show all if search term is empty
            return;
        }

        const filtered = talksData.filter(talk => {
            if (talk.category && talk.category.length > 0) {
                return talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
            }
            return false;
        });
        renderTalks(filtered);
    }

    // Initial render of all talks
    renderTalks(talksData);

    // Event Listeners for search
    searchButton.addEventListener('click', filterTalks);
    categorySearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterTalks();
        }
    });
    clearSearchButton.addEventListener('click', () => {
        categorySearchInput.value = '';
        renderTalks(talksData);
    });
});
