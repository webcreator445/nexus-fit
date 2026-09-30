/* =====================================================
   NEXUS FIT - MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   GALLERY FILTER
===================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = [...document.querySelectorAll(".gallery-item")];

let visibleItems = [];
let currentIndex = 0;

function refreshVisibleItems() {

    visibleItems = galleryItems.filter(
        item => !item.classList.contains("hidden")
    );

}


/* FILTER BUTTONS */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

        refreshVisibleItems();

    });

});


/* =====================================================
   LIGHTBOX
===================================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");


function openLightbox(index) {

    refreshVisibleItems();

    if (visibleItems.length === 0) return;

    currentIndex = index;

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("show");

    document.body.classList.add("no-scroll");

}


function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


function showNextImage() {

    if (visibleItems.length === 0) return;

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

}


function showPreviousImage() {

    if (visibleItems.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

}


/* OPEN IMAGE */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        refreshVisibleItems();

        const index = visibleItems.indexOf(item);

        openLightbox(index);

    });

});


/* CONTROLS */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        showNextImage
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        showPreviousImage
    );

}


/* CLICK BACKGROUND TO CLOSE */

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", event => {

    if (!lightbox || !lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

});


refreshVisibleItems();
/* =====================================================
   SCHEDULE DAY FILTER
===================================================== */

const dayButtons = document.querySelectorAll(".day-btn");
const scheduleDays = document.querySelectorAll(".schedule-day");

dayButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedDay = button.dataset.day;

        dayButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        scheduleDays.forEach(day => {

            if (day.dataset.scheduleDay === selectedDay) {

                day.classList.add("active");

            } else {

                day.classList.remove("active");

            }

        });

    });

});
/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        contactSuccess.classList.add("show");

        contactForm.reset();

    });

}


/* =====================================================
   FAQ ACCORDION
===================================================== */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const item = question.closest(".faq-item");

        const wasOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach(faq => {
            faq.classList.remove("open");
        });

        if (!wasOpen) {
            item.classList.add("open");
        }

    });

});
/* =====================================================
   TRIAL FORM
===================================================== */

const trialForm = document.getElementById("trialForm");
const trialSuccess = document.getElementById("trialSuccess");

const trialPlan = document.getElementById("trialPlan");
const trialTrainer = document.getElementById("trialTrainer");
const trialClass = document.getElementById("trialClass");
const trialDay = document.getElementById("trialDay");
const trialTime = document.getElementById("trialTime");

const summaryPlan = document.getElementById("summaryPlan");
const summaryText = document.getElementById("summaryText");

const successMessage = document.getElementById("successMessage");
const whatsappTrial = document.getElementById("whatsappTrial");
const trialReset = document.getElementById("trialReset");


/* URL PREFILL */

const trialParams = new URLSearchParams(window.location.search);

const urlPlan = trialParams.get("plan");
const urlTrainer = trialParams.get("trainer");
const urlClass = trialParams.get("class");
const urlDay = trialParams.get("day");
const urlTime = trialParams.get("time");


/* SET SELECT VALUE */

function setSelectValue(select, value) {

    if (!select || !value) return;

    const optionExists = [...select.options].some(
        option => option.value === value
    );

    if (optionExists) {
        select.value = value;
    }
}


/* PREFILL FROM URL */

setSelectValue(trialPlan, urlPlan);
setSelectValue(trialTrainer, urlTrainer);
setSelectValue(trialClass, urlClass);
setSelectValue(trialDay, urlDay);
setSelectValue(trialTime, urlTime);


/* PLAN SUMMARY */

function updateTrialSummary() {

    if (!trialPlan || !summaryPlan || !summaryText) return;

    const selectedOption =
        trialPlan.options[trialPlan.selectedIndex];

    if (!trialPlan.value) {

        summaryPlan.textContent = "FREE TRIAL";

        summaryText.textContent =
            "Choose a membership on the right to continue.";

        return;
    }

    summaryPlan.textContent =
        selectedOption.textContent.split("—")[0].trim();

    summaryText.textContent =
        selectedOption.textContent;

}


if (trialPlan) {

    trialPlan.addEventListener(
        "change",
        updateTrialSummary
    );

}


/* RUN SUMMARY ON PAGE LOAD */

updateTrialSummary();


/* FORM SUBMIT */

if (trialForm) {

    trialForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById("trialName").value.trim();

        const selectedPlan =
            trialPlan.options[trialPlan.selectedIndex].textContent;

        const selectedTrainer =
            trialTrainer.options[trialTrainer.selectedIndex].textContent;

        const selectedClass =
            trialClass.options[trialClass.selectedIndex].textContent;

        const selectedDay =
            trialDay.options[trialDay.selectedIndex].textContent;

        const selectedTime =
            trialTime.options[trialTime.selectedIndex].textContent;

        const selectedDate =
            document.getElementById("trialDate").value;


        /* SUCCESS MESSAGE */

        successMessage.textContent =
            `Thanks ${name}. Your ${selectedPlan.split("—")[0].trim()} request for ${selectedClass} with ${selectedTrainer.split("—")[0].trim()} on ${selectedDay}, ${selectedDate} at ${selectedTime} has been received. This demo form does not create a real booking.`;

        
        /* WHATSAPP MESSAGE */

        const whatsappMessage =
            `Hi NEXUS FIT, I submitted a free trial request.%0A%0A` +
            `Name: ${encodeURIComponent(name)}%0A` +
            `Membership: ${encodeURIComponent(selectedPlan)}%0A` +
            `Trainer: ${encodeURIComponent(selectedTrainer)}%0A` +
            `Session: ${encodeURIComponent(selectedClass)}%0A` +
            `Day: ${encodeURIComponent(selectedDay)}%0A` +
            `Date: ${encodeURIComponent(selectedDate)}%0A` +
            `Time: ${encodeURIComponent(selectedTime)}`;

        
        if (whatsappTrial) {

            whatsappTrial.href =
                `https://wa.me/919876543210?text=${whatsappMessage}`;

        }


        /* SHOW SUCCESS */

        trialForm.style.display = "none";

        trialSuccess.classList.add("show");

        window.scrollTo({
            top: trialSuccess.offsetTop - 120,
            behavior: "smooth"
        });

    });

}


/* RESET */

if (trialReset) {

    trialReset.addEventListener("click", () => {

        trialForm.reset();

        trialSuccess.classList.remove("show");

        trialForm.style.display = "block";

        updateTrialSummary();

        window.scrollTo({
            top: trialForm.offsetTop - 120,
            behavior: "smooth"
        });

    });

}
/* =====================================================
   DASHBOARD
===================================================== */

const cancelSession = document.getElementById("cancelSession");
const cancelMessage = document.getElementById("cancelMessage");

if (cancelSession) {

    cancelSession.addEventListener("click", () => {

        cancelSession.textContent = "SESSION CANCELLED";
        cancelSession.disabled = true;

        cancelMessage.classList.add("show");

    });

}


const editGoals = document.getElementById("editGoals");
const goalEditMessage = document.getElementById("goalEditMessage");

if (editGoals) {

    editGoals.addEventListener("click", () => {

        goalEditMessage.classList.toggle("show");

    });

}
/* =====================================================
   ADMIN DASHBOARD
===================================================== */

const adminActionButtons =
    document.querySelectorAll(".admin-action");

const adminActionMessage =
    document.getElementById("adminActionMessage");

adminActionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        const messages = {
            member: "ADD MEMBER selected — connect a database/backend to create real member records.",
            class: "CREATE CLASS selected — connect a backend to save new classes.",
            trainer: "ADD COACH selected — connect a backend to create coach profiles.",
            announcement: "ANNOUNCEMENT selected — connect a notification system to publish messages."
        };

        adminActionMessage.textContent =
            messages[action] || "Admin action selected.";

        adminActionMessage.classList.add("show");

    });

});


const viewMembers =
    document.getElementById("viewMembers");

const memberMessage =
    document.getElementById("memberMessage");

if (viewMembers) {

    viewMembers.addEventListener("click", () => {

        memberMessage.classList.toggle("show");

    });

}
/* =====================================================
   MOBILE MENU
===================================================== */

const navbar = document.querySelector(".navbar");
const nav = document.querySelector(".navbar nav");

if (navbar && nav) {

    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-button";
    menuButton.innerHTML = "☰";
    menuButton.setAttribute("aria-label", "Open menu");

    navbar.appendChild(menuButton);

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

        if (nav.classList.contains("mobile-open")) {
            menuButton.innerHTML = "✕";
        } else {
            menuButton.innerHTML = "☰";
        }

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("mobile-open");

            menuButton.innerHTML = "☰";

        });

    });

}
/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".navbar nav a").forEach(link => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});
/* =====================================================
   SCROLL REVEAL ANIMATIONS
===================================================== */

const revealElements = document.querySelectorAll(
    "section, .service-card, .value-card, .membership-card, .class-card, .trainer-card, .facility-card, .gallery-item"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    element.classList.add("reveal-hidden");
    revealObserver.observe(element);
});
/* =====================================================
   FLOATING WHATSAPP BUTTON
===================================================== */

const whatsappButton = document.createElement("a");

whatsappButton.href =
    "https://wa.me/919876543210?text=Hi%20NEXUS%20FIT%2C%20I%20want%20to%20know%20more%20about%20membership.";

whatsappButton.target = "_blank";
whatsappButton.rel = "noopener noreferrer";
whatsappButton.className = "floating-whatsapp";
whatsappButton.setAttribute("aria-label", "Chat with NEXUS FIT on WhatsApp");

whatsappButton.innerHTML = `
    <span>💬</span>
    <strong>WhatsApp</strong>
`;

document.body.appendChild(whatsappButton);
/* =====================================================
   LOGIN PAGE DEMO
===================================================== */

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const forgotPassword = document.getElementById("forgotPassword");

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        loginMessage.textContent =
            "Demo login successful. Redirecting to the member dashboard...";

        loginMessage.classList.add("show");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1200);

    });

}

if (forgotPassword) {

    forgotPassword.addEventListener("click", () => {

        loginMessage.textContent =
            "Password recovery is a demo feature. Connect a backend/email service to make password recovery real.";

        loginMessage.classList.add("show");

    });

}