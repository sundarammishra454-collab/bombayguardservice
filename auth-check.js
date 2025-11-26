// Authentication Check for Protected Pages

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userType = sessionStorage.getItem('userType');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Admin-only pages
    if (currentPage === 'admin.html' && userType !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
        return;
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Check authentication on page load
checkAuth();