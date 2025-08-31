async function logVisitor() {
    try {
        // Get IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Get device information
        const parser = new UAParser();
        const result = parser.getResult();
        const deviceInfo = {
            browser: result.browser.name + ' ' + result.browser.version,
            os: result.os.name + ' ' + result.os.version,
            device: result.device.model || 'Unknown',
            userAgent: navigator.userAgent
        };

        // Prepare data to send
        const logData = {
            ip: ip,
            timestamp: new Date().toISOString(),
            device: deviceInfo
        };

        // Send data to PHP backend
        await fetch('YOUR_PHP_BACKEND_URL/log.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logData)
        });
    } catch (error) {
        console.error('Error logging visitor data:', error);
    }
}

// Run logger when page loads
window.onload = logVisitor;