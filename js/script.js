document.addEventListener('DOMContentLoaded', function() {
    try {
        // Dark Mode Toggle Functionality
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        
        // Check for saved dark mode preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = 'Light Mode';
        }
        
        // Dark mode toggle event listener
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                try {
                    body.classList.toggle('dark-mode');
                    
                    // Update button text
                    if (body.classList.contains('dark-mode')) {
                        darkModeToggle.textContent = 'Light Mode';
                        localStorage.setItem('theme', 'dark');
                    } else {
                        darkModeToggle.textContent = 'Dark Mode';
                        localStorage.setItem('theme', 'light');
                    }
                } catch (error) {
                    console.error('Error toggling dark mode:', error);
                }
            });
        }
        
        // Language Selector Functionality
        const languageSelector = document.getElementById('languageSelector');
        
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && languageSelector) {
            languageSelector.value = savedLanguage;
        }
        
        // Language selector event listener
        if (languageSelector) {
            languageSelector.addEventListener('change', function() {
                try {
                    const selectedLanguage = this.value;
                    localStorage.setItem('language', selectedLanguage);
                    
                    // Update document language attribute
                    document.documentElement.lang = selectedLanguage;
                    
                    // In a real application, this would trigger content translation
                    console.log('Language changed to:', selectedLanguage);
                    
                    // Show a simple notification (optional)
                    showNotification(`Language changed to ${selectedLanguage === 'en' ? 'English' : 'العربية'}`);
                } catch (error) {
                    console.error('Error changing language:', error);
                }
            });
        }
        
        // Filter Tabs Functionality
        const filterTabs = document.querySelectorAll('.filter-tab');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                try {
                    // Remove active class from all tabs
                    filterTabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // In a real application, this would filter the software list
                    const filterType = this.textContent.toLowerCase();
                    console.log('Filter changed to:', filterType);
                    
                    // Simulate loading state (optional)
                    simulateLoading();
                } catch (error) {
                    console.error('Error changing filter:', error);
                }
            });
        });
        
        // Software Card Click Functionality
        const softwareCards = document.querySelectorAll('.software-card');
        
        softwareCards.forEach(card => {
            card.addEventListener('click', function() {
                try {
                    const softwareTitle = this.querySelector('.software-title').textContent;
                    console.log('Software clicked:', softwareTitle);
                    
                    // In a real application, this would navigate to software detail page
                    showNotification(`Clicked on ${softwareTitle}`);
                } catch (error) {
                    console.error('Error handling software card click:', error);
                }
            });
        });
        
        // Category Card Click Functionality
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                try {
                    const categoryTitle = this.querySelector('h3').textContent;
                    console.log('Category clicked:', categoryTitle);
                    
                    // In a real application, this would navigate to category page
                    showNotification(`Viewing ${categoryTitle} category`);
                } catch (error) {
                    console.error('Error handling category card click:', error);
                }
            });
        });
        
        // Show More Link Functionality
        const showMoreLink = document.querySelector('.show-more-link');
        
        if (showMoreLink) {
            showMoreLink.addEventListener('click', function(e) {
                e.preventDefault();
                try {
                    console.log('Show more clicked');
                    
                    // In a real application, this would load more software items
                    showNotification('Loading more software...');
                    
                    // Simulate loading more items
                    setTimeout(() => {
                        showNotification('More software loaded!');
                    }, 1000);
                } catch (error) {
                    console.error('Error loading more items:', error);
                }
            });
        }
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
    
    // Utility Functions
    
    // Simple notification function
    function showNotification(message) {
        try {
            // Create notification element
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: var(--accent-color);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                font-size: 14px;
                font-weight: 500;
                max-width: 300px;
                word-wrap: break-word;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
            
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }
    
    // Simulate loading state
    function simulateLoading() {
        try {
            const softwareGrid = document.querySelector('.software-grid');
            if (softwareGrid) {
                softwareGrid.style.opacity = '0.5';
                softwareGrid.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    softwareGrid.style.opacity = '1';
                    softwareGrid.style.pointerEvents = 'auto';
                }, 500);
            }
        } catch (error) {
            console.error('Error simulating loading:', error);
        }
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        try {
            // Toggle dark mode with Ctrl/Cmd + D
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                const darkModeToggle = document.getElementById('darkModeToggle');
                if (darkModeToggle) {
                    darkModeToggle.click();
                }
            }
        } catch (error) {
            console.error('Error handling keyboard shortcut:', error);
        }
    });
    
    // Handle image loading errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            try {
                // Replace broken image with a placeholder
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iI0Y4RjlGQSIvPgo8cGF0aCBkPSJNMjQgMzJDMjguNDE4MyAzMiAzMiAyOC40MTgzIDMyIDI0QzMyIDE5LjU4MTcgMjguNDE4MyAxNiAyNCAxNkMxOS41ODE3IDE2IDE2IDE5LjU4MTcgMTYgMjRDMTYgMjguNDE4MyAxOS41ODE3IDMyIDI0IDMyWiIgZmlsbD0iI0RFRTJFNiIvPgo8cGF0aCBkPSJNMjQgMjhDMjYuMjA5MSAyOCAyOCAyNi4yMDkxIDI4IDI0QzI4IDIxLjc5MDkgMjYuMjA5MSAyMCAyNCAyMEMyMS43OTA5IDIwIDIwIDIxLjc5MDkgMjAgMjRDMjAgMjYuMjA5MSAyMS43OTA5IDI4IDI0IDI4WiIgZmlsbD0iI0FCQjJCRiIvPgo8L3N2Zz4K';
                this.alt = 'Image not available';
            } catch (error) {
                console.error('Error handling image error:', error);
            }
        });
    });
});
