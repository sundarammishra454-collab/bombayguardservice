// Login Authentication System

function showTab(tabType) {
    try {
        const userForm = document.getElementById('userForm');
        const tabBtns = document.querySelectorAll('.tab-btn');
        
        if (!userForm || !tabBtns.length) {
            throw new Error('Required form elements not found');
        }
        
        // Reset tab buttons
        tabBtns.forEach(btn => btn.classList.remove('active'));
        
        if (tabType === 'user') {
            userForm.classList.remove('hidden');
            tabBtns[0].classList.add('active');
        }
    } catch (error) {
        console.error('Error switching tabs:', error.message);
    }
}

function handleUserLogin(event) {
    event.preventDefault();
    
    try {
        const nameInput = document.getElementById('userName');
        const contactInput = document.getElementById('userContact');
        
        if (!nameInput || !contactInput) {
            throw new Error('Form inputs not found');
        }
        
        const name = nameInput.value.trim();
        const contact = contactInput.value.trim();
        
        if (!name || !contact) {
            alert('Please fill in all fields');
            return;
        }
        
        if (name.length < 2) {
            alert('Name must be at least 2 characters long');
            return;
        }
        
        // Store user session
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userType', 'user');
        sessionStorage.setItem('userName', name);
        sessionStorage.setItem('userContact', contact);
        
        window.location.href = 'index.html';
    } catch (error) {
        console.error('User login error:', error.message);
        alert('Login failed. Please try again.');
    }
}

// Check if already logged in
try {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const userType = sessionStorage.getItem('userType');
        if (userType === 'user') {
            window.location.href = 'index.html';
        }
    }
} catch (error) {
    console.error('Session check error:', error.message);
    // Clear potentially corrupted session data
    sessionStorage.clear();
}