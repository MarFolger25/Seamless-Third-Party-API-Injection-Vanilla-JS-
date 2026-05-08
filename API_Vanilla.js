<script>
    // --- 2. Validation & Seamless Data Injection ---
    function validateAndOpenModal() {
        const form = document.getElementById('booking-form');
        
        // Custom validation logic triggered here...
        
        if (form.reportValidity()) {
            // A. Securely capture and encode user inputs from the custom PHP form
            const userName = encodeURIComponent(document.getElementById('input-name').value);
            const userEmail = encodeURIComponent(document.getElementById('input-email').value);
            
            const calIframe = document.getElementById('cal-iframe');
            
            // B. Base URL for the third-party booking provider (Cal.com)
            const baseUrl = "https://cal.com";
            
            // C. Build query parameters dynamically
            // Injecting user data here prevents the user from having to type their details twice
            const params = "?embed=true&hideEventTypeDetails=true&layout=month_view&theme=light" + 
                           "&name=" + userName + 
                           "&email=" + userEmail;
            
            // D. Inject the final URL into the iframe just in time
            calIframe.src = baseUrl + params;

            // E. Reveal the modal overlay smoothly
            document.getElementById('calendar-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
</script>
