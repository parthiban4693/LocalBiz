/* =====================================================
   HOMEEASE - MAIN JAVASCRIPT
   ===================================================== */

   document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       THEME TOGGLE
       ================================================= */

    const themeToggle =
        document.getElementById("themeToggle");

    const html =
        document.documentElement;


    /* Load Saved Theme */

    const savedTheme =
        localStorage.getItem("theme") || "light";

    if (savedTheme === "dark") {

        html.setAttribute("data-theme", "dark");

        if (themeToggle) {

            const icon =
                themeToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("bi-moon");

                icon.classList.add("bi-sun");

            }

        }

    }


    /* Theme Toggle Click Handler */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const currentTheme =
                html.getAttribute("data-theme");

            const icon =
                this.querySelector("i");


            if (currentTheme === "dark") {

                html.removeAttribute("data-theme");

                localStorage.setItem("theme", "light");

                if (icon) {

                    icon.classList.remove("bi-sun");

                    icon.classList.add("bi-moon");

                }

            } else {

                html.setAttribute("data-theme", "dark");

                localStorage.setItem("theme", "dark");

                if (icon) {

                    icon.classList.remove("bi-moon");

                    icon.classList.add("bi-sun");

                }

            }

        });

    }


    /* =================================================
       NAVBAR ACTIVE LINK
       ================================================= */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href").split("/").pop();

        link.classList.remove("active");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =================================================
       NAVBAR SCROLL EFFECT
       ================================================= */

    const navbar = document.querySelector(".premium-navbar");

    if (navbar) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 30) {

                navbar.style.boxShadow =
                    "0 8px 30px rgba(15, 23, 42, 0.08)";

            } else {

                navbar.style.boxShadow = "none";

            }

        });

    }


    /* =================================================
       HERO SEARCH
       ================================================= */

    const searchButton =
        document.querySelector(".search-btn");

    const locationInput =
        document.querySelector(
            ".search-location input"
        );

    const serviceInput =
        document.querySelector(
            ".search-service input"
        );


    if (searchButton) {

        searchButton.addEventListener("click", function () {

            const location =
                locationInput?.value.trim();

            const service =
                serviceInput?.value.trim();

            if (!location && !service) {

                showMessage(
                    "Please enter a location or service.",
                    "warning"
                );

                return;
            }


            if (!service) {

                showMessage(
                    "Please enter the service you need.",
                    "warning"
                );

                serviceInput?.focus();

                return;
            }


            // Save search data
            localStorage.setItem(
                "homeEaseSearch",
                JSON.stringify({
                    location: location,
                    service: service
                })
            );


            showMessage(
                "Finding the best services for you...",
                "success"
            );


            setTimeout(function () {

                window.location.href =
                    "services.html";

            }, 1000);

        });

    }


    /* =================================================
       ENTER KEY SEARCH
       ================================================= */

    [locationInput, serviceInput].forEach(function (input) {

        if (!input) return;

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchButton?.click();

            }

        });

    });


    /* =================================================
       QUICK SERVICE LINKS
       ================================================= */

    const quickServiceLinks =
        document.querySelectorAll(".quick-services a");

    quickServiceLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const serviceName =
                this.textContent.trim();

            localStorage.setItem(
                "selectedService",
                serviceName
            );

        });

    });


    /* =================================================
       SERVICE CARD CLICK
       ================================================= */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const serviceName =
                this.querySelector("h4")?.textContent.trim();

            if (serviceName) {

                localStorage.setItem(
                    "selectedService",
                    serviceName
                );

            }

            window.location.href =
                "service-details.html";

        });

    });


    /* =================================================
       SCROLL REVEAL ANIMATION
       ================================================= */

    const animatedElements =
        document.querySelectorAll(
            ".service-card, .step-card, .floating-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show-element"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        animatedElements.forEach(function (element) {

            element.classList.add(
                "animate-element"
            );

            observer.observe(element);

        });

    }


    /* =================================================
       BOOK SERVICE BUTTON
       ================================================= */

    const bookingButtons =
        document.querySelectorAll(
            'a[href="book-service.html"]'
        );


    bookingButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedService =
                localStorage.getItem(
                    "selectedService"
                );

            if (!selectedService) {

                localStorage.removeItem(
                    "selectedService"
                );

            }

        });

    });


    /* =================================================
       REGISTER BUTTON
       ================================================= */

    const registerButtons =
        document.querySelectorAll(
            'a[href="register.html"]'
        );


    registerButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            sessionStorage.setItem(
                "registerVisited",
                "true"
            );

        });

    });


    /* =================================================
       LOGIN BUTTON
       ================================================= */

    const loginButtons =
        document.querySelectorAll(
            'a[href="login.html"]'
        );


    loginButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            sessionStorage.setItem(
                "loginVisited",
                "true"
            );

        });

    });


    /* =================================================
       LOAD SAVED SEARCH
       ================================================= */

    const savedSearch =
        localStorage.getItem(
            "localBizSearch"
        );


    if (savedSearch) {

        try {

            const searchData =
                JSON.parse(savedSearch);

            if (
                locationInput &&
                searchData.location
            ) {

                locationInput.value =
                    searchData.location;

            }

            if (
                serviceInput &&
                searchData.service
            ) {

                serviceInput.value =
                    searchData.service;

            }

        } catch (error) {

            console.log(
                "Search data could not be loaded."
            );

        }

    }


    /* =================================================
       MESSAGE / TOAST
       ================================================= */

    function showMessage(message, type = "success") {

        const existingMessage =
            document.querySelector(
                ".homeease-message"
            );

        if (existingMessage) {
            existingMessage.remove();
        }


        const messageBox =
            document.createElement("div");

        messageBox.className =
            "homeease-message";


        let icon = "bi-check-circle-fill";

        if (type === "warning") {
            icon = "bi-exclamation-circle-fill";
        }

        if (type === "error") {
            icon = "bi-x-circle-fill";
        }


        messageBox.innerHTML = `
            <i class="bi ${icon}"></i>
            <span>${message}</span>
        `;


        document.body.appendChild(
            messageBox
        );


        setTimeout(function () {

            messageBox.classList.add(
                "message-hide"
            );

        }, 2500);


        setTimeout(function () {

            messageBox.remove();

        }, 3000);

    }


    /* =================================================
       ADD MESSAGE ANIMATION CSS
       ================================================= */

    const dynamicStyle =
        document.createElement("style");

    dynamicStyle.innerHTML = `

        .animate-element {
            opacity: 0;
            transform: translateY(25px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .show-element {
            opacity: 1;
            transform: translateY(0);
        }

        .homeease-message {
            position: fixed;

            top: 100px;
            right: 25px;

            z-index: 9999;

            display: flex;
            align-items: center;
            gap: 10px;

            padding: 14px 20px;

            background: #ffffff;
            color: #14213d;

            border: 1px solid #e2e8f0;

            border-radius: 12px;

            box-shadow:
                0 15px 40px rgba(15, 23, 42, 0.12);

            font-size: 12px;
            font-weight: 600;

            animation:
                messageIn 0.35s ease;
        }

        .homeease-message i {
            color: #1769aa;
            font-size: 17px;
        }

        .message-hide {
            opacity: 0;
            transform: translateX(30px);
            transition: 0.3s ease;
        }

        @keyframes messageIn {

            from {
                opacity: 0;
                transform: translateX(30px);
            }

            to {
                opacity: 1;
                transform: translateX(0);
            }

        }

    `;

    document.head.appendChild(dynamicStyle);


    /* =================================================
       SCROLL PROGRESS BAR
       ================================================= */

    const scrollProgress =
        document.getElementById("scrollProgress");

    if (scrollProgress) {

        window.addEventListener("scroll", function () {

            const scrollTop =
                document.documentElement.scrollTop ||
                document.body.scrollTop;

            const scrollHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progress =
                (scrollTop / scrollHeight) * 100;

            scrollProgress.style.width = progress + "%";

        });

    }


    /* =================================================
       ANIMATED COUNTERS
       ================================================= */

    const statNumbers =
        document.querySelectorAll(".stat-number");

    const counterObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const target =
                            entry.target;

                        const count =
                            parseFloat(
                                target.getAttribute("data-count")
                            );

                        const isDecimal =
                            count % 1 !== 0;

                        const duration = 2000;
                        const steps = 60;

                        const increment =
                            count / steps;

                        let current = 0;
                        let step = 0;

                        const counter =
                            setInterval(function () {

                                step++;

                                current += increment;

                                if (step >= steps) {

                                    current = count;

                                    clearInterval(counter);

                                }

                                if (isDecimal) {

                                    target.textContent =
                                        current.toFixed(1);

                                } else {

                                    target.textContent =
                                        Math.floor(current).toLocaleString();

                                }

                            }, duration / steps);

                        observer.unobserve(target);

                    }

                });

            },
            { threshold: 0.5 }
        );

    statNumbers.forEach(function (number) {

        counterObserver.observe(number);

    });


    /* =================================================
       PARALLAX EFFECT ON HERO
       ================================================= */

    const heroSection =
        document.querySelector(".hero-section");

    if (heroSection) {

        window.addEventListener("scroll", function () {

            const scrolled =
                window.pageYOffset;

            const heroVisual =
                heroSection.querySelector(".hero-visual");

            if (heroVisual && scrolled < 800) {

                heroVisual.style.transform =
                    "translateY(" + (scrolled * 0.3) + "px)";

            }

        });

    }


    /* =================================================
       MOUSE MOVE EFFECT ON CARDS
       ================================================= */

    const tiltCards =
        document.querySelectorAll(".service-card");

    tiltCards.forEach(function (card) {

        card.addEventListener("mousemove", function (e) {

            const rect =
                this.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 20;

            const rotateY =
                (centerX - x) / 20;

            this.style.transform =
                "perspective(1000px) " +
                "rotateX(" + rotateX + "deg) " +
                "rotateY(" + rotateY + "deg) " +
                "translateY(-12px) scale(1.02)";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform =
                "perspective(1000px) " +
                "rotateX(0) " +
                "rotateY(0) " +
                "translateY(0) scale(1)";

        });

    });


    /* =================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const targetId =
                this.getAttribute("href");

            if (targetId === "#") return;

            const targetElement =
                document.querySelector(targetId);

            if (targetElement) {

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =================================================
       TYPING EFFECT FOR HERO TITLE
       ================================================= */

    // Disabled - typing effect breaks HTML structure with <span> and <br> tags
    // const heroTitle =
    //     document.querySelector(".hero-title");

    // if (heroTitle && !heroTitle.classList.contains("typed")) {

    //     heroTitle.classList.add("typed");

    //     const originalText =
    //         heroTitle.innerHTML;

    //     heroTitle.innerHTML = "";

    //     let index = 0;

    //     const typeInterval =
    //         setInterval(function () {

    //             if (index < originalText.length) {

    //                 heroTitle.innerHTML +=
    //                     originalText.charAt(index);

    //                 index++;

    //             } else {

    //                 clearInterval(typeInterval);

    //             }

    //         }, 30);

    // }


    /* =================================================
       SERVICES PAGE FILTERING
       ================================================= */

    const serviceSearch =
        document.getElementById("serviceSearch");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const serviceItems =
        document.querySelectorAll(".service-item");


    /* Search Functionality */

    if (serviceSearch) {

        serviceSearch.addEventListener("input", function () {

            const searchTerm =
                this.value.toLowerCase().trim();

            serviceItems.forEach(function (item) {

                const serviceName =
                    item.querySelector("h4")
                        ?.textContent
                        .toLowerCase() || "";

                const serviceDesc =
                    item.querySelector("p")
                        ?.textContent
                        .toLowerCase() || "";

                const matches =
                    serviceName.includes(searchTerm) ||
                    serviceDesc.includes(searchTerm);

                if (matches) {

                    item.classList.remove("hidden");
                    item.classList.add("visible");

                } else {

                    item.classList.add("hidden");
                    item.classList.remove("visible");

                }

            });

        });

    }


    /* Filter Buttons */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filter =
                this.getAttribute("data-filter");

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            this.classList.add("active");


            serviceItems.forEach(function (item) {

                const category =
                    item.getAttribute("data-category");

                if (filter === "all" || category === filter) {

                    item.classList.remove("hidden");
                    item.classList.add("visible");

                } else {

                    item.classList.add("hidden");
                    item.classList.remove("visible");

                }

            });

        });

    });


    /* =================================================
       BOOKING FORM FUNCTIONALITY
       ================================================= */

    const bookingForm =
        document.getElementById("bookingForm");

    const serviceSelect =
        document.getElementById("serviceSelect");

    const bookingDate =
        document.getElementById("bookingDate");

    const bookingTime =
        document.getElementById("bookingTime");

    const summaryService =
        document.getElementById("summaryService");

    const summaryDate =
        document.getElementById("summaryDate");

    const summaryTime =
        document.getElementById("summaryTime");

    const summaryPrice =
        document.getElementById("summaryPrice");


    /* Service Prices */

    const servicePrices = {
        "home-cleaning": 499,
        "office-cleaning": 799,
        "carpet-cleaning": 599,
        "ac-service": 399,
        "plumbing": 299,
        "electrician": 249,
        "carpentry": 349,
        "appliance-repair": 449,
        "painting": 999,
        "pest-control": 599,
        "hair-salon": 299,
        "spa-massage": 699
    };


    /* Set Minimum Date to Today */

    if (bookingDate) {

        const today = new Date();

        const tomorrow = new Date(today);

        tomorrow.setDate(tomorrow.getDate() + 1);

        const minDate =
            tomorrow.toISOString().split("T")[0];

        bookingDate.setAttribute("min", minDate);

    }


    /* Update Summary on Input Change */

    function updateSummary() {

        if (serviceSelect) {

            const selectedOption =
                serviceSelect.options[serviceSelect.selectedIndex];

            if (serviceSelect.value) {

                summaryService.textContent =
                    selectedOption.text.split(" - ")[0];

                const price =
                    servicePrices[serviceSelect.value] || 0;

                summaryPrice.textContent = "₹" + price;

            } else {

                summaryService.textContent = "Not selected";
                summaryPrice.textContent = "₹0";

            }

        }

        if (bookingDate && bookingDate.value) {

            const dateObj = new Date(bookingDate.value);

            const options = {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric"
            };

            summaryDate.textContent =
                dateObj.toLocaleDateString("en-IN", options);

        } else {

            summaryDate.textContent = "Not selected";

        }

        if (bookingTime) {

            const selectedOption =
                bookingTime.options[bookingTime.selectedIndex];

            summaryTime.textContent =
                bookingTime.value
                    ? selectedOption.text
                    : "Not selected";

        }

    }


    /* Add Event Listeners */

    if (serviceSelect) {

        serviceSelect.addEventListener("change", updateSummary);

    }

    if (bookingDate) {

        bookingDate.addEventListener("change", updateSummary);

    }

    if (bookingTime) {

        bookingTime.addEventListener("change", updateSummary);

    }


    /* Load Selected Service from LocalStorage */

    const selectedService =
        localStorage.getItem("selectedService");

    if (selectedService && serviceSelect) {

        const options =
            serviceSelect.options;

        for (let i = 0; i < options.length; i++) {

            if (
                options[i].text
                    .toLowerCase()
                    .includes(selectedService.toLowerCase())
            ) {

                serviceSelect.selectedIndex = i;

                updateSummary();

                break;

            }

        }

    }


    /* Form Submission */

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const formData = {
                service: serviceSelect?.value,
                date: bookingDate?.value,
                time: bookingTime?.value,
                address: document.getElementById("address")?.value,
                city: document.getElementById("city")?.value,
                pincode: document.getElementById("pincode")?.value,
                fullName: document.getElementById("fullName")?.value,
                phone: document.getElementById("phone")?.value,
                email: document.getElementById("email")?.value,
                instructions: document.getElementById("instructions")?.value
            };


            /* Save Booking to LocalStorage */

            const bookings =
                JSON.parse(
                    localStorage.getItem("localBizBookings") || "[]"
                );

            const newBooking = {
                id: Date.now(),
                ...formData,
                status: "pending",
                createdAt: new Date().toISOString()
            };

            bookings.push(newBooking);

            localStorage.setItem(
                "localBizBookings",
                JSON.stringify(bookings)
            );


            /* Show Success Message */

            showMessage(
                "Booking confirmed! Redirecting to your bookings...",
                "success"
            );


            /* Redirect to My Bookings */

            setTimeout(function () {

                window.location.href = "my-bookings.html";

            }, 2000);

        });

    }


    /* =================================================
       MY BOOKINGS PAGE FUNCTIONALITY
       ================================================= */

    const bookingsContainer =
        document.getElementById("bookingsContainer");

    const noBookings =
        document.getElementById("noBookings");

    const bookingsFilterButtons =
        document.querySelectorAll(".bookings-filter .filter-btn");


    /* Service Names Mapping */

    const serviceNames = {
        "home-cleaning": "Home Cleaning",
        "office-cleaning": "Office Cleaning",
        "carpet-cleaning": "Carpet Cleaning",
        "ac-service": "AC Service",
        "plumbing": "Plumbing",
        "electrician": "Electrician",
        "carpentry": "Carpentry",
        "appliance-repair": "Appliance Repair",
        "painting": "Painting",
        "pest-control": "Pest Control",
        "hair-salon": "Hair Salon",
        "spa-massage": "Spa & Massage"
    };


    /* Load and Display Bookings */

    function loadBookings(filter = "all") {

        const bookings =
            JSON.parse(
                localStorage.getItem("localBizBookings") || "[]"
            );

        if (bookings.length === 0) {

            if (bookingsContainer) {

                bookingsContainer.style.display = "none";

            }

            if (noBookings) {

                noBookings.style.display = "block";

            }

            return;

        }

        if (bookingsContainer) {

            bookingsContainer.style.display = "block";

        }

        if (noBookings) {

            noBookings.style.display = "none";

        }


        /* Filter Bookings */

        const filteredBookings =
            filter === "all"
                ? bookings
                : bookings.filter(function (booking) {

                    return booking.status === filter;

                });


        /* Sort by Date (newest first) */

        filteredBookings.sort(function (a, b) {

            return new Date(b.createdAt) - new Date(a.createdAt);

        });


        /* Render Bookings */

        if (bookingsContainer) {

            bookingsContainer.innerHTML = "";

            filteredBookings.forEach(function (booking) {

                const serviceName =
                    serviceNames[booking.service] || booking.service;

                const dateObj = new Date(booking.date);

                const formattedDate =
                    dateObj.toLocaleDateString("en-IN", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    });

                const serviceImages = {
                    "home-cleaning": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop",
                    "office-cleaning": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
                    "carpet-cleaning": "https://images.unsplash.com/photo-1527531405112-4d7b4c4e7d48?w=400&h=250&fit=crop",
                    "ac-service": "https://images.unsplash.com/photo-1633701357577-0c5a1d7dc8a9?w=400&h=250&fit=crop",
                    "plumbing": "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=250&fit=crop",
                    "electrician": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop",
                    "general-repair": "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=400&h=250&fit=crop",
                    "appliance-repair": "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=400&h=250&fit=crop",
                    "painting": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=250&fit=crop",
                    "pest-control": "https://images.unsplash.com/photo-1565514020176-8c4da6b9f9be?w=400&h=250&fit=crop",
                    "hair-salon": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=250&fit=crop",
                    "spa-massage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=250&fit=crop"
                };

                const serviceImage = serviceImages[booking.service] || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop";

                const bookingCard = document.createElement("div");

                bookingCard.className = "booking-card";

                bookingCard.innerHTML = `
                    <img src="${serviceImage}" alt="${serviceName}" class="booking-card-image">
                    <div class="booking-header">
                        <div class="booking-service-info">
                            <h4>${serviceName}</h4>
                            <p>Booking ID: #${booking.id}</p>
                        </div>
                        <span class="booking-status ${booking.status}">
                            ${booking.status}
                        </span>
                    </div>
                    <div class="booking-body">
                        <div class="booking-detail">
                            <i class="bi bi-calendar"></i>
                            <div>
                                <strong>${formattedDate}</strong>
                                <span>Date</span>
                            </div>
                        </div>
                        <div class="booking-detail">
                            <i class="bi bi-clock"></i>
                            <div>
                                <strong>${booking.time}</strong>
                                <span>Time</span>
                            </div>
                        </div>
                        <div class="booking-detail">
                            <i class="bi bi-geo-alt"></i>
                            <div>
                                <strong>${booking.city}</strong>
                                <span>City</span>
                            </div>
                        </div>
                        <div class="booking-detail">
                            <i class="bi bi-person"></i>
                            <div>
                                <strong>${booking.fullName}</strong>
                                <span>Contact</span>
                            </div>
                        </div>
                    </div>
                    <div class="booking-actions">
                        <button class="btn btn-premium-outline view-details" data-id="${booking.id}">
                            View Details
                        </button>
                        ${booking.status === "pending" ? `
                            <button class="btn btn-premium cancel-booking" data-id="${booking.id}">
                                Cancel Booking
                            </button>
                        ` : ""}
                    </div>
                `;

                bookingsContainer.appendChild(bookingCard);

            });


            /* Add Event Listeners for Buttons */

            document.querySelectorAll(".cancel-booking").forEach(function (button) {

                button.addEventListener("click", function () {

                    const bookingId =
                        parseInt(this.getAttribute("data-id"));

                    cancelBooking(bookingId);

                });

            });

            document.querySelectorAll(".view-details").forEach(function (button) {

                button.addEventListener("click", function () {

                    const bookingId =
                        this.getAttribute("data-id");

                    alert("Booking details feature coming soon!");

                });

            });

        }

    }


    /* Cancel Booking */

    let bookingToCancel = null;

    const cancelModal =
        document.getElementById("cancelModal");

    const cancelModalClose =
        document.getElementById("cancelModalClose");

    const cancelModalConfirm =
        document.getElementById("cancelModalConfirm");


    function cancelBooking(bookingId) {

        bookingToCancel = bookingId;

        if (cancelModal) {

            cancelModal.style.display = "flex";

        }

    }


    /* Modal Event Listeners */

    if (cancelModalClose) {

        cancelModalClose.addEventListener("click", function () {

            if (cancelModal) {

                cancelModal.style.display = "none";

            }

            bookingToCancel = null;

        });

    }

    if (cancelModalConfirm) {

        cancelModalConfirm.addEventListener("click", function () {

            if (bookingToCancel !== null) {

                const bookings =
                    JSON.parse(
                        localStorage.getItem("localBizBookings") || "[]"
                    );

                const bookingIndex =
                    bookings.findIndex(function (booking) {

                        return booking.id === bookingToCancel;

                    });

                if (bookingIndex !== -1) {

                    bookings[bookingIndex].status = "cancelled";

                    localStorage.setItem(
                        "localBizBookings",
                        JSON.stringify(bookings)
                    );

                    showMessage(
                        "Booking cancelled successfully",
                        "success"
                    );

                    loadBookings(currentFilter);

                }

            }

            if (cancelModal) {

                cancelModal.style.display = "none";

            }

            bookingToCancel = null;

        });

    }


    /* Close Modal on Overlay Click */

    if (cancelModal) {

        cancelModal.addEventListener("click", function (e) {

            if (e.target === cancelModal) {

                cancelModal.style.display = "none";

                bookingToCancel = null;

            }

        });

    }


    /* Filter Buttons */

    let currentFilter = "all";

    bookingsFilterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            bookingsFilterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            this.classList.add("active");

            currentFilter =
                this.getAttribute("data-filter");

            loadBookings(currentFilter);

        });

    });


    /* Load Bookings on Page Load */

    if (bookingsContainer || noBookings) {

        loadBookings();

    }


    /* =================================================
       LOGIN PAGE FUNCTIONALITY
       ================================================= */

    const loginForm =
        document.getElementById("loginForm");

    const togglePassword =
        document.getElementById("togglePassword");

    const loginPassword =
        document.getElementById("loginPassword");


    /* Toggle Password Visibility */

    if (togglePassword && loginPassword) {

        togglePassword.addEventListener("click", function () {

            const type =
                loginPassword.getAttribute("type") === "password"
                    ? "text"
                    : "password";

            loginPassword.setAttribute("type", type);

            const icon =
                this.querySelector("i");

            icon.classList.toggle("bi-eye");

            icon.classList.toggle("bi-eye-slash");

        });

    }


    /* Login Form Submission */

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email =
                document.getElementById("loginEmail").value;

            const password =
                loginPassword.value;


            /* Simple validation (in real app, this would be API call) */

            if (email && password) {

                /* Save login state to localStorage */

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "userEmail",
                    email
                );


                /* Show success message */

                showMessage(
                    "Login successful! Redirecting...",
                    "success"
                );


                /* Redirect to home page */

                setTimeout(function () {

                    window.location.href = "index.html";

                }, 1500);

            } else {

                showMessage(
                    "Please fill in all fields",
                    "warning"
                );

            }

        });

    }


    /* =================================================
       REGISTER PAGE FUNCTIONALITY
       ================================================= */

    const registerForm =
        document.getElementById("registerForm");

    const toggleRegisterPassword =
        document.getElementById("toggleRegisterPassword");

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const registerPassword =
        document.getElementById("registerPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");


    /* Toggle Password Visibility */

    function setupPasswordToggle(button, input) {

        if (button && input) {

            button.addEventListener("click", function () {

                const type =
                    input.getAttribute("type") === "password"
                        ? "text"
                        : "password";

                input.setAttribute("type", type);

                const icon =
                    this.querySelector("i");

                icon.classList.toggle("bi-eye");

                icon.classList.toggle("bi-eye-slash");

            });

        }

    }

    setupPasswordToggle(toggleRegisterPassword, registerPassword);
    setupPasswordToggle(toggleConfirmPassword, confirmPassword);


    /* Register Form Submission */

    if (registerForm) {

        registerForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                document.getElementById("registerName").value;

            const email =
                document.getElementById("registerEmail").value;

            const phone =
                document.getElementById("registerPhone").value;

            const password =
                registerPassword.value;

            const confirm =
                confirmPassword.value;

            const agreeTerms =
                document.getElementById("agreeTerms").checked;


            /* Validation */

            if (!name || !email || !phone || !password || !confirm) {

                showMessage(
                    "Please fill in all fields",
                    "warning"
                );

                return;

            }

            if (password !== confirm) {

                showMessage(
                    "Passwords do not match",
                    "warning"
                );

                return;

            }

            if (!agreeTerms) {

                showMessage(
                    "Please agree to the Terms & Conditions",
                    "warning"
                );

                return;

            }

            if (password.length < 6) {

                showMessage(
                    "Password must be at least 6 characters",
                    "warning"
                );

                return;

            }


            /* Save user data to localStorage */

            const userData = {
                name: name,
                email: email,
                phone: phone,
                password: password,
                createdAt: new Date().toISOString()
            };

            localStorage.setItem(
                "localBizUser",
                JSON.stringify(userData)
            );

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );


            /* Show success message */

            showMessage(
                "Account created successfully! Redirecting...",
                "success"
            );


            /* Redirect to home page */

            setTimeout(function () {

                window.location.href = "index.html";

            }, 1500);

        });

    }


    /* =================================================
       CONSOLE MESSAGE
       ================================================= */

    console.log(
        "LocalBiz Premium Website Loaded Successfully 🚀"
    );

    console.log(
        "Premium Features: Glassmorphism, Animations, Parallax, Counters"
    );

});