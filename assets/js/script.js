// Filter functionality for destinations page
function initializeDestinationFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    const noResultsMessage = document.getElementById('no-results');

    if (filterButtons.length === 0) return;

    // Check if there's a filter in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    
    // Set initial active filter from URL or default to 'all'
    let activeFilter = urlFilter || 'all';
    
    // Apply initial filter
    applyFilter(activeFilter);
    
    // Set active button based on initial filter
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === activeFilter) {
            btn.classList.add('active');
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update URL without page reload
            updateUrlFilter(filter);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply filter
            applyFilter(filter);
        });
    });

    function applyFilter(filter) {
        let visibleCount = 0;
        
        destinationCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (noResultsMessage) {
            if (visibleCount === 0) {
                noResultsMessage.classList.remove('hidden');
            } else {
                noResultsMessage.classList.add('hidden');
            }
        }
    }

    function updateUrlFilter(filter) {
        const newUrl = new URL(window.location);
        if (filter === 'all') {
            newUrl.searchParams.delete('filter');
        } else {
            newUrl.searchParams.set('filter', filter);
        }
        window.history.pushState({}, '', newUrl);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const currentUrlParams = new URLSearchParams(window.location.search);
        const currentFilter = currentUrlParams.get('filter') || 'all';
        
        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === currentFilter) {
                btn.classList.add('active');
            }
        });
        
        // Apply filter
        applyFilter(currentFilter);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDestinationFilters();
});