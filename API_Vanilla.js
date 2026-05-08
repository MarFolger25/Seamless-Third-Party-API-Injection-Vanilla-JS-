<div id="calendar-modal" class="fixed inset-0 z-[100] hidden bg-obsidian/80 backdrop-blur-md flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-ivory rounded-md shadow-2xl flex flex-col overflow-hidden h-[90vh]">
        <div class="w-full flex-grow relative bg-white">
            <iframe id="cal-iframe" src="about:blank" class="absolute inset-0 w-full h-full border-0"></iframe>
        </div>
    </div>
</div>

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