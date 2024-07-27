document.addEventListener("DOMContentLoaded", function() {
    const stripe = Stripe('pk_test_51OjoE8BYN32CVb4NBd6GF5CTgTjD061wZoLjgMAs1IJsYYZN2xeFI6MMqIK1ET8t3d6gaXRTkQ03ru82sZsgDGcr009reQO7Hy');
    const themeToggleButton = document.getElementById('theme-toggle-icon');

   
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleButton.classList.add('fa-sun');
        themeToggleButton.classList.remove('fa-moon');
    } else {
        themeToggleButton.classList.add('fa-moon');
        themeToggleButton.classList.remove('fa-sun');
    }

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            themeToggleButton.classList.add('fa-sun');
            themeToggleButton.classList.remove('fa-moon');
        } else {
            themeToggleButton.classList.add('fa-moon');
            themeToggleButton.classList.remove('fa-sun');
        }

        function applyTheme() {
            const theme = localStorage.getItem('theme');
            if (theme) {
                document.body.classList.toggle('dark-theme', theme === 'dark');
            }
        }

        applyTheme()
    });

    const form = document.getElementById('donation-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nickname = document.getElementById('nickname');
        const amount = document.getElementById('amount');
        const message = document.getElementById('message');
        const nicknameError = document.getElementById('nickname-error');
        const amountError = document.getElementById('amount-error');

        let valid = true;

        if (nickname.value.trim() === '') {
            nicknameError.style.display = 'block';
            valid = false;
        } else {
            nicknameError.style.display = 'none';
        }

        if (amount.value.trim() === '' || amount.value <= 0) {
            amountError.style.display = 'block';
            valid = false;
        } else {
            amountError.style.display = 'none';
        }

        if (!valid) return;

        
        const sessionId = await createCheckoutSession(amount.value, message.value, nickname.value);
// Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: sessionId
        });

        if (result.error) {
          
            alert(result.error.message);
        }
    });

    async function createCheckoutSession(amount, message, nickname) {
      
        const amountInCents = amount * 100;

        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer sk_test_51OjoE8BYN32CVb4N0eE0RwihrquwPEk7J42mvhoceDO4Yusfr2pJELTprOdjH683UkP7gO1AY859u9tpGOrz27pu008xhAHotf'
            },
            body: new URLSearchParams({
                'payment_method_types[]': 'card',
                'line_items[0][price_data][currency]': 'usd',
                'line_items[0][price_data][product_data][name]': `Donation from ${nickname}`,
                'line_items[0][price_data][product_data][description]': message,
                'line_items[0][price_data][unit_amount]': amountInCents,
                'line_items[0][quantity]': 1,
                'mode': 'payment',
                'success_url': window.location.origin + './donations/success',
                'cancel_url': window.location.origin + './donations/cancel'
            })
        });

        const session = await response.json();
        return session.id;
    }
});






