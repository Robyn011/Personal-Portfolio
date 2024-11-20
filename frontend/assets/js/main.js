const navMenu = document.getElementById('nav-menu')
const navOpen = document.getElementById('nav-open')
const navClose = document.getElementById('nav-close')
const navItem = document.querySelectorAll('.nav__item')

/* Open navigation menu */
navOpen.addEventListener('click', () => {
    navMenu.classList.add('nav__menu--open')
})

/* Close navigation menu */
navClose.addEventListener('click', ()=> {
     navMenu.classList.remove('nav__menu--open')
})

navItem.forEach(item => {
    item.addEventListener('click', () => {
         navMenu.classList.remove('nav__menu--open')
    })
})

// Header scroll
const header = document.getElementById('l-header')

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('l-header--scroll')
    } else {
        header.classList.remove('l-header--scroll')
    }
})

// Swiper
const testimonialSwiper = new Swiper(".testimonial__wrapper", {
    loop: true,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
})

// Form submission for email
document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent default form submission

    const name = document.querySelector('.form__input[name="name"]').value;
    const email = document.querySelector('.form__input[name="email"]').value;
    const message = document.querySelector('.form__textarea').value;

    // Send data to the backend for email handling
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email: ' + data.error);
        }
    })
    .catch(error => {
        alert('An error occurred: ' + error);
    });
});
