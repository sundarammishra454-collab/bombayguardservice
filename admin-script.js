// Admin Dashboard Script

class AdminDashboard {
    constructor() {
        this.bookings = this.loadBookings();
        this.init();
    }

    init() {
        this.updateStats();
        this.renderBookings();
    }

    loadBookings() {
        const stored = localStorage.getItem('bookingSubmissions');
        return stored ? JSON.parse(stored) : [];
    }

    saveBookings() {
        localStorage.setItem('bookingSubmissions', JSON.stringify(this.bookings));
    }

    addBooking(bookingData) {
        const booking = {
            ...bookingData,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        this.bookings.unshift(booking);
        this.saveBookings();
        this.updateStats();
        this.renderBookings();
    }

    updateStats() {
        const today = new Date().toDateString();
        const todayBookings = this.bookings.filter(booking => 
            new Date(booking.timestamp).toDateString() === today
        ).length;

        document.getElementById('totalBookings').textContent = this.bookings.length;
        document.getElementById('todayBookings').textContent = todayBookings;
    }

    renderBookings() {
        const tbody = document.getElementById('bookingsTableBody');
        
        if (this.bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No bookings yet</td></tr>';
            return;
        }

        tbody.innerHTML = this.bookings.map(booking => `
            <tr>
                <td>${new Date(booking.timestamp).toLocaleString('en-IN')}</td>
                <td>${booking.name}</td>
                <td>${booking.phone}</td>
                <td>${booking.email}</td>
                <td>${booking.service}</td>
                <td>${booking.location || 'N/A'}</td>
                <td>${booking.requirements || 'N/A'}</td>
            </tr>
        `).join('');
    }

    exportToExcel() {
        if (this.bookings.length === 0) {
            alert('No data to export');
            return;
        }

        const ws_data = [
            ['Date/Time', 'Name', 'Phone', 'Email', 'Service', 'Location', 'Requirements']
        ];

        this.bookings.forEach(booking => {
            ws_data.push([
                new Date(booking.timestamp).toLocaleString('en-IN'),
                booking.name,
                booking.phone,
                booking.email,
                booking.service,
                booking.location || 'N/A',
                booking.requirements || 'N/A'
            ]);
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        
        // Auto-size columns
        const colWidths = ws_data[0].map((_, i) => ({
            wch: Math.max(...ws_data.map(row => String(row[i] || '').length))
        }));
        ws['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
        
        const filename = `Bombay_Guard_Bookings_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, filename);
    }

    clearData() {
        if (confirm('Are you sure you want to clear all booking data? This cannot be undone.')) {
            this.bookings = [];
            this.saveBookings();
            this.updateStats();
            this.renderBookings();
        }
    }
}

// Initialize admin dashboard
const adminDashboard = new AdminDashboard();

// Export functions for global access
function exportToExcel() {
    adminDashboard.exportToExcel();
}

function clearData() {
    adminDashboard.clearData();
}

// Make adminDashboard globally available
window.adminDashboard = adminDashboard;