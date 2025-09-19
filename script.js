document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });
    function acceptCookies() {
        document.getElementById('cookie-consent').style.display = 'none';
        localStorage.setItem('cookiesAccepted', 'true');
    }
    window.acceptCookies = acceptCookies;
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-consent').style.display = 'block';
    }
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
        globalSearch.addEventListener('input', () => {
            const search = globalSearch.value.toLowerCase();
            document.querySelectorAll('section').forEach(section => {
                section.style.display = section.textContent.toLowerCase().includes(search) || !search ? 'block' : 'none';
            });
        });
        globalSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                globalSearch.blur();
            }
        });
    }
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.querySelector('.modal-close');
    if (modal && modalTitle && modalDescription && modalClose) {
        document.querySelectorAll('.learn-more').forEach(button => {
            button.addEventListener('click', () => {
                modalTitle.textContent = button.parentElement.dataset.modalTitle;
                modalDescription.textContent = button.parentElement.dataset.modalDescription;
                modal.style.display = 'flex';
                modal.querySelector('.modal-content').focus();
            });
        });
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        });
    }
    const loginModal = document.getElementById('login-modal');
    const loginBtn = document.getElementById('login-btn');
    const loginForm = document.getElementById('login-form');
    const loginClose = loginModal?.querySelector('.modal-close');
    if (loginBtn && loginModal && loginForm && loginClose) {
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
            loginForm.querySelector('input').focus();
        });
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login successful! Redirecting to dashboard...');
            loginModal.style.display = 'none';
        });
        loginClose.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
        loginModal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                loginModal.style.display = 'none';
            }
        });
    }
    const rateBtn = document.getElementById('rate-btn');
    if (rateBtn) {
        rateBtn.addEventListener('click', () => {
            const feedbackModal = document.createElement('div');
            feedbackModal.className = 'modal';
            feedbackModal.innerHTML = `
                <div class="modal-content" tabindex="-1">
                    <span class="modal-close" role="button" aria-label="Close feedback modal">&times;</span>
                    <h3>Rate Our Site</h3>
                    <form id="feedback-form">
                        <label for="rating">Rating (1-5):</label>
                        <input type="number" id="rating" min="1" max="5" required aria-label="Rate site from 1 to 5">
                        <button type="submit" class="btn" aria-label="Submit feedback">Submit</button>
                    </form>
                </div>
            `;
            document.body.appendChild(feedbackModal);
            feedbackModal.style.display = 'flex';
            feedbackModal.querySelector('.modal-content').focus();
            const feedbackForm = feedbackModal.querySelector('#feedback-form');
            feedbackForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your feedback!');
                feedbackModal.remove();
            });
            feedbackModal.querySelector('.modal-close').addEventListener('click', () => {
                feedbackModal.remove();
            });
        });
    }
    const skillQuiz = document.getElementById('skill-quiz');
    if (skillQuiz) {
        skillQuiz.addEventListener('submit', (e) => {
            e.preventDefault();
            const interest = document.getElementById('interest').value;
            const level = document.getElementById('level').value;
            const result = document.getElementById('quiz-result');
            if (interest && level) {
                result.innerHTML = `Recommended: ${interest.charAt(0).toUpperCase() + interest.slice(1)} course for ${level} level. <a href="training.html#signup" aria-label="Join ${interest} course" tabindex="0">Join Now</a>`;
            }
        });
    }
    const stories = document.querySelectorAll('.story');
    const dots = document.querySelectorAll('.dot');
    const sliderControl = document.querySelector('.slider-control');
    let currentStory = 0;
    let isPlaying = true;
    const showStory = (index) => {
        stories.forEach((story, i) => {
            story.classList.toggle('active', i === index);
            dots[i]?.classList.toggle('active', i === index);
        });
    };
    window.goToStory = (index) => {
        currentStory = index;
        showStory(currentStory);
    };
    const nextStory = () => {
        currentStory = (currentStory + 1) % stories.length;
        showStory(currentStory);
    };
    let sliderInterval = setInterval(nextStory, 5000);
    if (sliderControl) {
        sliderControl.addEventListener('click', () => {
            isPlaying = !isPlaying;
            sliderControl.textContent = isPlaying ? 'Pause' : 'Play';
            if (isPlaying) {
                sliderInterval = setInterval(nextStory, 5000);
            } else {
                clearInterval(sliderInterval);
            }
        });
    }
    const courseSearch = document.getElementById('course-search');
    const courseFilterCategory = document.getElementById('course-filter-category');
    const courseFilterLevel = document.getElementById('course-filter-level');
    const courses = document.querySelectorAll('.course');
    if (courseSearch && courseFilterCategory && courseFilterLevel) {
        const filterCourses = () => {
            const search = courseSearch.value.toLowerCase();
            const category = courseFilterCategory.value;
            const level = courseFilterLevel.value;
            courses.forEach(course => {
                const matchesSearch = course.textContent.toLowerCase().includes(search);
                const matchesCategory = !category || course.dataset.category === category;
                const matchesLevel = !level || course.dataset.level === level;
                course.style.display = matchesSearch && matchesCategory && matchesLevel ? 'block' : 'none';
            });
        };
        courseSearch.addEventListener('input', filterCourses);
        courseFilterCategory.addEventListener('change', filterCourses);
        courseFilterLevel.addEventListener('change', filterCourses);
    }
    const blogFilterCategory = document.getElementById('blog-filter-category');
    const posts = document.querySelectorAll('.post');
    if (blogFilterCategory) {
        blogFilterCategory.addEventListener('change', () => {
            const category = blogFilterCategory.value;
            posts.forEach(post => {
                post.style.display = !category || post.dataset.category === category ? 'block' : 'none';
            });
        });
    }
    const faqSearch = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqSearch) {
        faqSearch.addEventListener('input', () => {
            const search = faqSearch.value.toLowerCase();
            faqItems.forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(search) ? 'block' : 'none';
            });
        });
    }
    window.toggleFAQ = (element) => {
        const answer = element.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        element.setAttribute('aria-expanded', answer.style.display === 'block');
    };
    document.querySelectorAll('.newsletter').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.nextElementSibling.style.display = 'block';
            form.reset();
        });
    });
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.nextElementSibling.style.display = 'block';
            contactForm.reset();
        });
    }
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', () => {
            const text = button.dataset.text;
            if (navigator.share) {
                navigator.share({
                    title: 'TechArch',
                    text: text,
                    url: window.location.href
                });
            } else {
                alert('Share this: ' + text + ' ' + window.location.href);
            }
        });
    });
    document.querySelectorAll('.add-to-calendar').forEach(button => {
        button.addEventListener('click', () => {
            alert(`Add "${button.dataset.event}" to your calendar!`);
        });
    });
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1
            });
        }
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fill();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }
    const globalMapCanvas = document.getElementById('global-map');
    if (globalMapCanvas) {
        const mapCtx = globalMapCanvas.getContext('2d');
        const locations = [
            { name: 'Nairobi', x: 600, y: 250 },
            { name: 'Minnesota', x: 300, y: 100 },
            { name: 'London', x: 400, y: 80 },
            { name: 'Singapore', x: 650, y: 200 }
        ];
        function drawMap() {
            mapCtx.clearRect(0, 0, globalMapCanvas.width, globalMapCanvas.height);
            mapCtx.fillStyle = '#1e3a8a';
            mapCtx.beginPath();
            mapCtx.arc(400, 200, 150, 0, Math.PI * 2);
            mapCtx.fill();
            locations.forEach(loc => {
                mapCtx.beginPath();
                mapCtx.arc(loc.x, loc.y, 5, 0, Math.PI * 2);
                mapCtx.fillStyle = '#10b981';
                mapCtx.fill();
                mapCtx.fillText(loc.name, loc.x + 10, loc.y);
            });
            requestAnimationFrame(drawMap);
        }
        drawMap();
    }
    if (typeof Chart !== 'undefined') {
        const impactChart = document.getElementById('impact-chart');
        if (impactChart) {
            new Chart(impactChart, {
                type: 'bar',
                data: {
                    labels: ['Youth Trained', 'Jobs Created', 'Women Empowered', 'Course Completion'],
                    datasets: [{
                        label: 'Impact Metrics',
                        data: [500, 200, 50, 75],
                        backgroundColor: '#10b981'
                    }]
                },
                options: { scales: { y: { beginAtZero: true } } }
            });
        }
        const courseProgressChart = document.getElementById('course-progress-chart');
        if (courseProgressChart) {
            new Chart(courseProgressChart, {
                type: 'pie',
                data: {
                    labels: ['Completed', 'In Progress', 'Not Started'],
                    datasets: [{
                        data: [70, 20, 10],
                        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b']
                    }]
                }
            });
        }
    }
    const jobCount = document.getElementById('job-count');
    const jobProgress = document.getElementById('job-progress');
    if (jobCount && jobProgress) {
        let count = 0;
        const target = 200;
        const interval = setInterval(() => {
            if (count >= target) {
                clearInterval(interval);
                return;
            }
            count += 5;
            jobCount.textContent = count;
            jobProgress.style.width = `${(count / target) * 100}%`;
            jobProgress.setAttribute('aria-valuenow', (count / target) * 100);
        }, 50);
    }
    const signupCounter = document.getElementById('signup-counter');
    if (signupCounter) {
        let count = 0;
        const target = 500;
        const interval = setInterval(() => {
            if (count >= target) {
                clearInterval(interval);
                signupCounter.textContent = '500+';
                return;
            }
            count += 10;
            signupCounter.textContent = count;
        }, 50);
    }
    const chatbot = document.getElementById('chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    if (chatbot && chatbotMessages) {
        chatbot.addEventListener('click', () => {
            chatbotMessages.style.display = chatbotMessages.style.display === 'block' ? 'none' : 'block';
            if (chatbotMessages.style.display === 'block' && !chatbotMessages.querySelector('input')) {
                chatbotMessages.innerHTML = `
                    <p>Welcome to TechArch! Ask about our programs!</p>
                    <input type="text" placeholder="Type your question..." aria-label="Chatbot input">
                `;
                const input = chatbotMessages.querySelector('input');
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && input.value.trim()) {
                        const question = input.value.trim().toLowerCase();
                        let response = 'Thanks for your question! Email <a href="mailto:info@techarch.org">info@techarch.org</a> for details.';
                        if (question.includes('training') || question.includes('course')) {
                            response = 'Explore our free courses on coding, AI, data annotation, and agri-tech at <a href="training.html">Training</a>!';
                        } else if (question.includes('job') || question.includes('career')) {
                            response = 'Check out global job opportunities at <a href="jobs.html">Jobs</a>!';
                        } else if (question.includes('event') || question.includes('summit')) {
                            response = 'Join our Global Tech Summit (Oct 10, 2025) or AI Job Fair (Nov 15, 2025) listed on the <a href="index.html#events">Home</a> page!';
                        } else if (question.includes('login') || question.includes('dashboard')) {
                            response = 'Click the Login button in the navbar to access your dashboard!';
                        } else if (question.includes('cost') || question.includes('free')) {
                            response = 'Our courses are free for eligible youth! Apply at <a href="training.html#signup">Training</a>.';
                        } else if (question.includes('certificate') || question.includes('certification')) {
                            response = 'Earn industry-recognized certificates from CompTIA and Cisco. See <a href="training.html#certifications">Certifications</a>.';
                        }
                        chatbotMessages.innerHTML += `<p><strong>You:</strong> ${input.value}</p><p><strong>Bot:</strong> ${response}</p>`;
                        input.value = '';
                        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                    }
                });
                input.focus();
            }
        });
    }
});