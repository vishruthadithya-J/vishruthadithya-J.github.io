document.addEventListener('DOMContentLoaded', () => {
    
    // --- Data Storage for Modal (Using Resume Content) ---
    const projectsData = [
        {
            id: 1,
            title: 'Oncology Brand Reporting',
            company: 'Leading Pharma Company',
            category: 'pharma',
            highlights: [
                'Collaborated with global marketing and commercial stakeholders to build interactive Power BI dashboards for oncology performance tracking.',
                'Gathered requirements across countries to design KPIs on market share, brand adoption, and testing rates.',
                'Modeled and transformed data using Power Query and DAX, ensuring consistent and accurate reporting.',
                'Implemented Row-Level Security (RLS) for country-specific access, ensuring compliance and trust.',
                'Delivered insights that improved brand strategy alignment and supported cross-country decision-making.',
                'Enhanced reporting efficiency by 15%, reducing manual intervention and accelerating insights.'
            ]
        },
        {
            id: 2,
            title: 'Retail Transformation Project',
            company: 'Leading Pharma Company',
            category: 'pharma',
            highlights: [
                'Partnered with retail operations and finance stakeholders to enable visibility into organizational KPIs.',
                'Developed end-to-end reporting solutions in Power BI, integrating SQL and Excel data sources.',
                'Automated SSIS packages to centralize data from multiple sources for unified reporting.',
                'Designed dashboards for retail sales, customer engagement, and product performance.',
                'Supported business decisions that led to a 10% reduction in reporting delays and improved accessibility.'
            ]
        },
        {
            id: 3,
            title: 'Supply Chain & Logistics Analytics',
            company: 'Global Logistics Company',
            category: 'logistics',
            highlights: [
                'Engaged with supply chain, procurement, and logistics managers to define metrics for delivery, cost, and warehouse utilization.',
                'Built Power BI dashboards integrating SQL Server, Excel, and third-party logistics data.',
                'Developed DAX measures to track shipment delays, carrier performance, and route efficiency.',
                'Automated workflows with Power Automate to provide near real-time shipment status updates.',
                'Delivered actionable insights that reduced average delivery delays by 12% and improved cost efficiency by 8%.'
            ]
        },
        {
            id: 4,
            title: 'Healthcare Claims Analysis',
            company: 'Health Insurance Provider',
            category: 'healthcare',
            highlights: [
                'Worked closely with claims, fraud detection, and compliance stakeholders to improve claims visibility.',
                'Designed Power BI dashboards to track fraud indicators, claim anomalies, and processing efficiency.',
                'Wrote optimized SQL queries and automated validation checks for large claims datasets.',
                'Delivered insights that reduced claims processing time by 20%, improving both accuracy and efficiency.',
                'Supported leadership with dashboards that enhanced fraud detection and resource allocation.'
            ]
        },
        {
            id: 5,
            title: 'Marketing Campaign Analytics',
            company: 'Insurance Brand',
            category: 'healthcare',
            highlights: [
                'Collaborated with marketing and regional sales teams to track campaign ROI and performance trends.',
                'Designed Power BI dashboards with SQL-based RLS for secure, region-specific reporting.',
                'Integrated multi-channel data to analyze lead conversion rates and customer engagement.',
                'Delivered insights that improved campaign efficiency by 15% and boosted ROI visibility.',
                'Helped optimize targeting strategies, increasing customer engagement across regions.'
            ]
        }
    ];

    // --- 1. Project Filter Logic ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectList = document.getElementById('project-list');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filterValue = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            Array.from(projectList.children).forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 500);
                }
            });
        });
    });

    // --- 2. Project Modal Injection ---
    const modalTitle = document.getElementById('projectModalTitle');
    const modalCompany = document.getElementById('projectModalCompany');
    const modalHighlights = document.getElementById('projectModalHighlights');
    const projectModal = document.getElementById('projectModal');

    projectModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const projectId = parseInt(button.getAttribute('data-project-id'));
        const project = projectsData.find(p => p.id === projectId);

        if (project) {
            modalTitle.textContent = project.title;
            modalCompany.textContent = project.company;
            
            modalHighlights.innerHTML = '';
            project.highlights.forEach(highlight => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle text-accent me-2"></i> ${highlight}`;
                modalHighlights.appendChild(li);
            });
        }
    });
    
    // --- 3. Scroll-based Animations (Intersection Observer) ---
    const skillContainers = document.querySelectorAll('.skill-bar-container');
    const achievementCounters = document.querySelectorAll('.achievement-card');
    const popInElements = document.querySelectorAll('.animate-pop');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('animate-pop')) {
                    entry.target.classList.add('in-view');
                }
                
                if (entry.target.classList.contains('skill-bar-container')) {
                    animateSkillBar(entry.target);
                    // Crucial: stop observing after animation starts
                    observer.unobserve(entry.target);
                }

                if (entry.target.classList.contains('achievement-card')) {
                    if (!entry.target.classList.contains('counter-animated')) {
                         animateCounter(entry.target);
                         // Crucial: stop observing after animation starts
                         observer.unobserve(entry.target);
                    }
                }
            }
        });
    }, {
        // Threshold remains 0.2 to trigger early enough for the animation to complete
        threshold: 0.2 
    });

    popInElements.forEach(el => observer.observe(el));
    skillContainers.forEach(el => observer.observe(el));
    achievementCounters.forEach(el => observer.observe(el));


    // Function to create and animate a skill bar (FIXED)
    function animateSkillBar(container) {
        // Check if the skill name is available in the data-skill attribute
        const skillName = container.getAttribute('data-skill');
        if (!skillName) return; // Skip if no skill name is set

        if (container.querySelector('.skill-bar')) return;

        const level = parseInt(container.getAttribute('data-level'));
        
        let skillBar = document.createElement('div');
        skillBar.classList.add('skill-bar');
        
        let skillLevel = document.createElement('div');
        skillLevel.classList.add('skill-level');
        skillBar.appendChild(skillLevel);
        container.appendChild(skillBar);

        // Animate the bar width after a slight delay
        setTimeout(() => {
             skillLevel.style.width = `${level}%`;
        }, 100);
    }
    
    // Function to animate the numerical counters (FIXED)
    function animateCounter(card) {
        const targetValue = parseInt(card.getAttribute('data-counter-target'));
        const textValue = card.getAttribute('data-text');
        const titleElement = card.querySelector('.card-title'); 

        if (!titleElement) return;

        if (textValue) {
             titleElement.textContent = textValue;
             return;
        }

        // Reset text to 0% to ensure the animation runs from the start
        titleElement.textContent = '0%'; 
        card.classList.add('counter-animated'); 

        const duration = 1500;
        const startTimestamp = performance.now();

        const step = (timestamp) => {
            const progress = timestamp - startTimestamp;
            const percentage = Math.min(progress / duration, 1);
            const currentValue = Math.floor(percentage * targetValue);

            titleElement.textContent = `${currentValue}%`;

            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure it ends on the exact target value
                titleElement.textContent = `${targetValue}%`; 
            }
        };

        window.requestAnimationFrame(step);
    }

    // --- 4. Smooth Scrolling & Nav Highlighting ---
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            const navbarCollapse = document.getElementById('navbarResponsive');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
            }
        });
    });

    // Simple Scrollspy for nav highlighting
    const sections = document.querySelectorAll('.page-section, #hero');
    const navLinks = document.querySelectorAll('#nav-list .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; 
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});