# Seamless-Third-Party-API-Injection-Vanilla-JS-
Seamless Third-Party API Injection
# Seamless Third-Party Booking Injection (Frontend/UX)

This repository demonstrates a highly optimized, friction-less frontend integration of a third-party booking widget (Cal.com) into a custom PHP/Vanilla JS web application. 

It was built as the client-facing layer for a premium instrument repair shop in Helsinki (*Helsingin Soitinhuolto*), where user experience and conversion rates are critical.

## 📸 Technical Storyboard
*[Inserta aquí la imagen del PANEL 1 del mockup que creamos, donde se ve la web y el modal abierto con la flecha indicando los datos llenos]*

## The Business Problem
When integrating third-party scheduling tools (like Calendly or Cal.com) into a custom checkout flow, users are typically forced to input their Name and Email **twice**: first on the custom website form, and again inside the third-party widget. This causes severe UX friction and increases the checkout drop-off rate.

## The Solution
Instead of a static iframe, I implemented a **dynamic Vanilla JavaScript injector** that acts as a bridge between the custom HTML form and the third-party widget. 

### Key Technical Highlights:
* **Zero-Friction UX:** Captures form data seamlessly and injects it into the iframe URL parameters, pre-filling the booking widget automatically.
* **Performance Optimization (Lazy Loading):** The iframe initializes with `src="about:blank"`. The heavy third-party scripts are only loaded *after* the user passes HTML5 form validation and clicks proceed, saving initial page load bandwidth.
* **Security & Sanitization:** Strict use of `encodeURIComponent()` to sanitize user inputs before passing them into the URL query string, preventing broken links and basic XSS vulnerabilities.
* **State Management:** Manipulates DOM classes (Tailwind) to lock background scrolling (`overflow: hidden`) and manage modal visibility smoothly.

## Code Architecture (The Injector)

Here is the core logic demonstrating the dynamic payload construction and iframe manipulation:

```html
<div id="calendar-modal" class="hidden fixed inset-0 z-[100]">
    <iframe id="cal-iframe" src="about:blank" class="w-full h-full border-0"></iframe>
</div>

<script>
    function validateAndOpenModal() {
        const form = document.getElementById('booking-form');
        
        if (form.reportValidity()) {
            // 1. Securely capture user inputs
            const userName = encodeURIComponent(document.getElementById('input-name').value);
            const userEmail = encodeURIComponent(document.getElementById('input-email').value);
            
            const calIframe = document.getElementById('cal-iframe');
            const baseUrl = "[https://cal.com/your-account/event-name](https://cal.com/your-account/event-name)";
            
            // 2. Dynamically build URL with injected payload
            const params = "?embed=true&theme=light" + 
                           "&name=" + userName + 
                           "&email=" + userEmail;
            
            // 3. Just-in-time execution
            calIframe.src = baseUrl + params;

            // 4. Reveal UI
            document.getElementById('calendar-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
</script>
