(() => {
    "use strict";

    const body = document.body;
    const menuButton = document.querySelector(".menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const projectDialog = document.getElementById("project-dialog");
    const showreelDialog = document.getElementById("showreel-dialog");
    const showreelPlayer = document.getElementById("showreel-player");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const projectData = {
        cyber: {
            title: "Cyber Composite",
            type: "Hybrid AI + live-action compositing",
            description: "A visual-effects breakdown showing the finished cyberpunk composite, original green-screen performance, environment plate, and final close-up. The project demonstrates how live-action footage and AI-generated imagery can be integrated through keying, masking, grading, and compositing.",
            video: "../assets/video/cyber-composite-breakdown.mp4",
            poster: "../images/Portfolio/Visual_Effects/cyber-composite-poster.webp"
        },
        kingdom: {
            title: "The Kingdom in Her Keeping",
            type: "AI art / Creative direction",
            description: "A sovereign woman suspends a gothic kingdom above her hand—a study in composed power, atmosphere, and restrained crimson. The image was developed through prompt design, iteration, and visual refinement.",
            image: "../images/Portfolio/AI_Art_and_Prompt_Design/Royalty.webp",
            alt: "A sovereign woman holding a floating gothic kingdom"
        },
        dfw: {
            title: "DFW Games",
            type: "Paid professional work / Branding and identity",
            description: "A logo redesign that retains the Dallas skyline while introducing a more energetic, graffiti-influenced visual language. Successive variations refined the silhouettes, palette, lettering, and relationship between the skyline and the name.",
            image: "../images/Portfolio/Branding_and_Identity/DFW_Logo/dfw-games-final-silhouette-red.webp",
            alt: "DFW Games logo combining the Dallas skyline with graffiti-inspired lettering",
            contain: true
        },
        restoration: {
            title: "Family Portrait Restoration",
            type: "Private client / Restoration and colorization",
            description: "Restoration and colorization of a heavily damaged family portrait. Missing areas, cracks, stains, and tonal damage were repaired while preserving the subject's likeness and the character of the original photograph.",
            image: "../images/Portfolio/Retouching_and_Restoration/Family_Portrait_Restoration/family-portrait-restoration-colorized.webp",
            alt: "Restored and colorized family portrait"
        }
    };

    const setMenu = (open) => {
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        mobileMenu.setAttribute("aria-hidden", String(!open));
        body.classList.toggle("menu-open", open);
    };

    menuButton.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            setMenu(false);
            menuButton.focus();
        }
    });

    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -10%", threshold: 0.08 });
        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const workFilters = document.querySelectorAll("[data-filter]");
    const projectCards = document.querySelectorAll(".project-card[data-category]");

    workFilters.forEach((filterButton) => {
        filterButton.addEventListener("click", () => {
            const selectedFilter = filterButton.dataset.filter;

            workFilters.forEach((button) => {
                const isActive = button === filterButton;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", String(isActive));
            });

            projectCards.forEach((card) => {
                card.hidden = selectedFilter !== "all" && card.dataset.category !== selectedFilter;
            });
        });
    });

    const toggleDialogState = (open) => body.classList.toggle("dialog-open", open);

    const closeProjectDialog = () => {
        const video = projectDialog.querySelector("video");
        if (video) video.pause();
        projectDialog.close();
        toggleDialogState(false);
    };

    document.querySelectorAll("[data-project]").forEach((button) => {
        button.addEventListener("click", () => {
            const project = projectData[button.dataset.project];
            if (!project) return;

            document.getElementById("project-dialog-title").textContent = project.title;
            document.getElementById("project-dialog-type").textContent = project.type;
            document.getElementById("project-dialog-description").textContent = project.description;

            const media = document.getElementById("project-dialog-media");
            media.replaceChildren();

            if (project.video) {
                const video = document.createElement("video");
                video.src = project.video;
                video.poster = project.poster;
                video.controls = true;
                video.playsInline = true;
                video.preload = "metadata";
                video.setAttribute("aria-label", `${project.title} video`);
                media.append(video);
            } else {
                const image = document.createElement("img");
                image.src = project.image;
                image.alt = project.alt;
                if (project.contain) image.style.objectFit = "contain";
                media.append(image);
            }

            projectDialog.showModal();
            toggleDialogState(true);
        });
    });

    projectDialog.querySelector("[data-close-dialog]").addEventListener("click", closeProjectDialog);
    projectDialog.addEventListener("click", (event) => {
        if (event.target === projectDialog) closeProjectDialog();
    });
    projectDialog.addEventListener("close", () => toggleDialogState(false));

    const openShowreel = () => {
        const iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube-nocookie.com/embed/BCVKagAV_6U?rel=0&autoplay=1";
        iframe.title = "Silent Legend Showreel";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        showreelPlayer.replaceChildren(iframe);
        showreelDialog.showModal();
        toggleDialogState(true);
    };

    const closeShowreel = () => {
        showreelPlayer.replaceChildren();
        showreelDialog.close();
        toggleDialogState(false);
    };

    document.querySelectorAll("[data-open-showreel]").forEach((button) => button.addEventListener("click", openShowreel));
    showreelDialog.querySelector("[data-close-showreel]").addEventListener("click", closeShowreel);
    showreelDialog.addEventListener("click", (event) => {
        if (event.target === showreelDialog) closeShowreel();
    });
    showreelDialog.addEventListener("close", () => {
        showreelPlayer.replaceChildren();
        toggleDialogState(false);
    });

    const samuraiSection = document.querySelector(".samurai-interlude");
    const samuraiImage = document.querySelector(".samurai-image");

    if (samuraiSection && samuraiImage && !reducedMotion) {
        let samuraiFrame = 0;

        const updateSamuraiParallax = () => {
            const rect = samuraiSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (rect.bottom > 0 && rect.top < viewportHeight) {
                const sectionCenter = rect.top + (rect.height / 2);
                const viewportCenter = viewportHeight / 2;
                const range = (viewportHeight + rect.height) / 2;
                const progress = Math.max(-1, Math.min(1, (viewportCenter - sectionCenter) / range));
                // Let the artwork visibly lag behind the document as the section
                // crosses the viewport. The oversized image prevents exposed edges.
                const travel = rect.height * (window.innerWidth <= 700 ? 0.34 : 0.28);
                samuraiImage.style.setProperty("--samurai-parallax-y", `${progress * travel}px`);
            }

            samuraiFrame = 0;
        };

        const queueSamuraiParallax = () => {
            if (!samuraiFrame) samuraiFrame = window.requestAnimationFrame(updateSamuraiParallax);
        };

        updateSamuraiParallax();
        window.addEventListener("scroll", queueSamuraiParallax, { passive: true });
        window.addEventListener("resize", queueSamuraiParallax);
    }

    const identityVideo = document.getElementById("identity-video");
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = Boolean(connection && connection.saveData);

    if (identityVideo && !reducedMotion && !saveData && "IntersectionObserver" in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            identityVideo.querySelectorAll("source[data-src]").forEach((source) => {
                source.src = source.dataset.src;
                source.removeAttribute("data-src");
            });
            identityVideo.load();
            identityVideo.play().catch(() => {});
            observer.disconnect();
        }, { rootMargin: "300px" });
        videoObserver.observe(identityVideo);
    }

    const contactForm = document.getElementById("preview-contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        formStatus.classList.remove("error");

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            formStatus.textContent = "Please complete the required fields.";
            formStatus.classList.add("error");
            return;
        }

        const submitButton = contactForm.querySelector("button[type='submit']");
        submitButton.disabled = true;
        formStatus.textContent = "Sending…";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: new FormData(contactForm)
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error("Submission failed");
            contactForm.reset();
            formStatus.textContent = "Message sent. Thank you—I'll be in touch.";
        } catch (error) {
            formStatus.textContent = "The message could not be sent. Please try again from the current site.";
            formStatus.classList.add("error");
        } finally {
            submitButton.disabled = false;
        }
    });

    document.getElementById("year").textContent = new Date().getFullYear();
})();
