// WhatsApp Integration for Booking Notifications

class WhatsAppNotifier {
    constructor() {
        this.config = {
            adminWhatsApp: '919819670208'
        };
    }

    // Format admin notification message
    formatAdminMessage(bookingData) {
        return `🔔 *NEW BOOKING REQUEST*

👤 *Customer Details:*
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

🛡️ *Service Details:*
Service Type: ${bookingData.service}
Location: ${bookingData.location || 'Not specified'}

📝 *Requirements:*
${bookingData.requirements || 'No additional requirements'}

⏰ *Submitted:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
    }

    // Format user confirmation message
    formatUserMessage(bookingData) {
        return `🛡️ *Bombay Guard Security*

Hello ${bookingData.name}! 

Thank you for your interest in our ${bookingData.service} services.

✅ *Your request has been received*

📋 *Details Submitted:*
• Service: ${bookingData.service}
• Location: ${bookingData.location || 'Not specified'}
• Phone: ${bookingData.phone}

⏰ Our team will contact you within 24 hours.

For urgent requirements, call: +91 98196 70208`;
    }

    // Send WhatsApp message using WhatsApp Web
    openWhatsAppWeb(phoneNumber, message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Try to open in new tab, fallback to same window if blocked
        try {
            const newWindow = window.open(whatsappUrl, '_blank');
            if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                // Popup blocked, use direct navigation
                window.location.href = whatsappUrl;
            }
        } catch (e) {
            // Fallback to direct navigation
            window.location.href = whatsappUrl;
        }
    }

    // Send notifications to both admin and user
    sendBookingNotifications(bookingData) {
        try {
            // Clean phone number
            const cleanUserPhone = bookingData.phone.replace(/[\s\-\(\)]/g, '');
            const userPhone = cleanUserPhone.startsWith('91') ? cleanUserPhone : `91${cleanUserPhone}`;
            
            // Ask user which notification to send first
            const choice = confirm('WhatsApp notifications ready!\n\nClick OK to notify admin first, or Cancel to send your confirmation first.');
            
            if (choice) {
                // Send to admin first
                const adminMessage = this.formatAdminMessage(bookingData);
                this.openWhatsAppWeb(this.config.adminWhatsApp, adminMessage);
                
                // Store user message for later
                const userMessage = this.formatUserMessage(bookingData);
                sessionStorage.setItem('pendingUserWhatsApp', JSON.stringify({
                    phone: userPhone,
                    message: userMessage
                }));
                
                // Show instruction for user message
                setTimeout(() => {
                    if (confirm('Admin notified! Click OK to send your confirmation message.')) {
                        this.openWhatsAppWeb(userPhone, userMessage);
                        sessionStorage.removeItem('pendingUserWhatsApp');
                    }
                }, 3000);
            } else {
                // Send to user first
                const userMessage = this.formatUserMessage(bookingData);
                this.openWhatsAppWeb(userPhone, userMessage);
                
                // Store admin message for later
                const adminMessage = this.formatAdminMessage(bookingData);
                sessionStorage.setItem('pendingAdminWhatsApp', JSON.stringify({
                    phone: this.config.adminWhatsApp,
                    message: adminMessage
                }));
                
                // Show instruction for admin message
                setTimeout(() => {
                    if (confirm('Your confirmation sent! Click OK to notify admin.')) {
                        this.openWhatsAppWeb(this.config.adminWhatsApp, adminMessage);
                        sessionStorage.removeItem('pendingAdminWhatsApp');
                    }
                }, 3000);
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error sending notifications:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize WhatsApp notifier
const whatsappNotifier = new WhatsAppNotifier();

// Check for pending WhatsApp messages on page load
window.addEventListener('load', () => {
    const pendingAdmin = sessionStorage.getItem('pendingAdminWhatsApp');
    const pendingUser = sessionStorage.getItem('pendingUserWhatsApp');
    
    if (pendingAdmin) {
        const data = JSON.parse(pendingAdmin);
        if (confirm('You have a pending admin notification. Send it now?')) {
            whatsappNotifier.openWhatsAppWeb(data.phone, data.message);
            sessionStorage.removeItem('pendingAdminWhatsApp');
        }
    }
    
    if (pendingUser) {
        const data = JSON.parse(pendingUser);
        if (confirm('You have a pending user confirmation. Send it now?')) {
            whatsappNotifier.openWhatsAppWeb(data.phone, data.message);
            sessionStorage.removeItem('pendingUserWhatsApp');
        }
    }
});