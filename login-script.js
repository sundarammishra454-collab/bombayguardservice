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
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === 'admin' && password === 'admin123') {
        // Store admin session
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userType', 'admin');
        
        window.location.href = 'admin.html';
    } else {
        alert('Invalid admin credentials');
    }
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