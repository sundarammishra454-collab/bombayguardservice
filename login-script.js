// Login Authentication System

function showTab(tabType) {
    const userForm = document.getElementById('userForm');
    const adminForm = document.getElementById('adminForm');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Reset tab buttons
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    if (tabType === 'user') {
        userForm.classList.remove('hidden');
        adminForm.classList.add('hidden');
        tabBtns[0].classList.add('active');
    } else {
        userForm.classList.add('hidden');
        adminForm.classList.remove('hidden');
        tabBtns[1].classList.add('active');
    }
}

function handleUserLogin(event) {
    event.preventDefault();
    
    const name = document.getElementById('userName').value;
    const contact = document.getElementById('userContact').value;
    
    if (name && contact) {
        // Store user session
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userType', 'user');
        sessionStorage.setItem('userName', name);
        sessionStorage.setItem('userContact', contact);
        
        window.location.href = 'index.html';
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }

    console.log('Attempting admin login for username:', username);

    // Secure check against backend endpoint
    fetch('https://bombayguardservice.vercel.app/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Login response:', data);
        if (data.success) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userType', 'admin');
            alert('Login successful! Redirecting to admin panel...');
            window.location.href = 'admin.html';
        } else {
            alert(data.message || 'Invalid admin credentials');
        }
    })
    .catch(error => {
        console.error('Admin login error:', error);
        if (error.message.includes('Failed to fetch')) {
            alert('Cannot connect to server. Please check your internet connection.');
        } else {
            alert('An error occurred during login: ' + error.message);
        }
    });
}

// Check if already logged in
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    const userType = sessionStorage.getItem('userType');
    if (userType === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'index.html';
    }
}