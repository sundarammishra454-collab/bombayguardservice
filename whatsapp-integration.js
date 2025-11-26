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
        window.open(whatsappUrl, '_blank');
    }

    // Send notifications to both admin and user
    sendBookingNotifications(bookingData) {
        try {
            // Clean phone number
            const cleanUserPhone = bookingData.phone.replace(/[\s\-\(\)]/g, '');
            const userPhone = cleanUserPhone.startsWith('91') ? cleanUserPhone : `91${cleanUserPhone}`;
            
            // Send to admin
            const adminMessage = this.formatAdminMessage(bookingData);
            this.openWhatsAppWeb(this.config.adminWhatsApp, adminMessage);
            
            // Send confirmation to user after a short delay
            setTimeout(() => {
                const userMessage = this.formatUserMessage(bookingData);
                this.openWhatsAppWeb(userPhone, userMessage);
            }, 2000);
            
            return { success: true };
        } catch (error) {
            console.error('Error sending notifications:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize WhatsApp notifier
const whatsappNotifier = new WhatsAppNotifier();