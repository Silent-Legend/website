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
            type: "Client work / Branding and identity",
            description: "A logo redesign that retains the Dallas skyline while introducing a more energetic, graffiti-influenced visual language. Successive variations refined the silhouettes, palette, lettering, and relationship between the skyline and the name.",
            stages: [
                { label: "Original", src: "../images/Portfolio/Branding_and_Identity/DFW_Logo/dfw-games-original.webp", alt: "Original DFW Games logo" },
                { label: "Purple study", src: "../images/Portfolio/Branding_and_Identity/DFW_Logo/dfw-games-redesign-purple.webp", alt: "Purple DFW Games logo redesign study" },
                { label: "Green study", src: "../images/Portfolio/Branding_and_Identity/DFW_Logo/dfw-games-redesign-green.webp", alt: "Green DFW Games logo redesign study" },
                { label: "White study", src: "../images/Portfolio/Branding_and_Identity/DFW_Logo/dfw-games-redesign-white.webp", alt: "White DFW Games logo redesign study" },
                { label: "Final", src: "../images/Portfolio/Branding_and_Identity/DFW_Logo/dfw-games-final-silhouette-red.webp", alt: "Final DFW Games logo combining the Dallas skyline with graffiti-inspired lettering" }
            ],
            contain: true
        },
        restoration: {
            title: "Family Portrait Restoration",
            type: "Private client / Restoration and colorization",
            description: "Restoration and colorization of a heavily damaged family portrait. Missing areas, cracks, stains, and tonal damage were repaired while preserving the subject's likeness and the character of the original photograph.",
            stages: [
                { label: "Original", src: "../images/Portfolio/Retouching_and_Restoration/Family_Portrait_Restoration/family-portrait-restoration-before.webp", alt: "Original heavily damaged family portrait" },
                { label: "Restored B&W", src: "../images/Portfolio/Retouching_and_Restoration/Family_Portrait_Restoration/family-portrait-restoration-restored-bw.webp", alt: "Restored black-and-white family portrait" },
                { label: "Colorized", src: "../images/Portfolio/Retouching_and_Restoration/Family_Portrait_Restoration/family-portrait-restoration-colorized.webp", alt: "Restored and colorized family portrait" }
            ]
        },
        "digital-iris": {
            title: "Digital Iris",
            type: "Motion graphics",
            description: "An abstract digital-eye animation built around fluid motion, layered geometry, and chromatic transitions.",
            image: "../images/Portfolio/Motion_Graphics/Digital_Iris.jpg",
            alt: "Abstract digital iris motion-graphics artwork"
        },
        "kate-winslet": {
            title: "Kate Winslet",
            type: "Academic project / Typographic portrait",
            description: "A typographic portrait shaped from passages attributed to Kate Winslet. Layered text follows the portrait's tonal structure so the words construct the likeness rather than simply sitting over it.",
            stages: [
                { label: "Color study", src: "../images/Portfolio/Graphic_Design/Kate_Winslet/KW Color.png", alt: "Color study for the Kate Winslet typographic portrait" },
                { label: "B&W study", src: "../images/Portfolio/Graphic_Design/Kate_Winslet/KW BW.png", alt: "Black-and-white study for the Kate Winslet typographic portrait" },
                { label: "Final", src: "../images/Portfolio/Graphic_Design/Kate_Winslet/KW Final.png", alt: "Final Kate Winslet typographic portrait" }
            ]
        },
        headshot: {
            title: "Professional Headshot",
            type: "Private client / Photography and retouching",
            description: "A professional portrait photographed against green screen, then extracted, naturally retouched, and finished against a neutral studio background. Additional wardrobe treatments were created later as independent presentation studies.",
            stages: [
                { label: "Green screen", src: "../images/Portfolio/Retouching_and_Restoration/Headshot/headshot-before-greenscreen.webp", alt: "Professional portrait photographed against green screen" },
                { label: "Delivered", src: "../images/Portfolio/Retouching_and_Restoration/Headshot/headshot-delivered.webp", alt: "Finished professional headshot delivered to the client" },
                { label: "White-shirt study", src: "../images/Portfolio/Retouching_and_Restoration/Headshot/headshot-wardrobe-white.webp", alt: "Independent white-shirt wardrobe treatment" },
                { label: "Blazer study", src: "../images/Portfolio/Retouching_and_Restoration/Headshot/headshot-wardrobe-blazer.webp", alt: "Independent blazer wardrobe treatment" }
            ]
        },
        "military-composite": {
            title: "Military Composite",
            type: "Photo compositing",
            description: "A military-themed photographic composite focused on bringing separate portrait and environmental elements into one cinematic frame through masking, lighting alignment, and color treatment.",
            image: "../images/Portfolio/Retouching_and_Restoration/Soldier.jpg",
            alt: "Military-themed photographic composite"
        },
        "studio-retouch": {
            title: "Studio Retouch",
            type: "Portrait retouching",
            description: "A before-and-after portrait study focused on skin correction, color balance, and detail refinement while maintaining a natural result.",
            stages: [
                { label: "Before", src: "../images/Portfolio/Retouching_and_Restoration/Retouch/retouch-studio-before.jpg", alt: "Studio portrait before retouching" },
                { label: "After", src: "../images/Portfolio/Retouching_and_Restoration/retouch-studio-after.webp", alt: "Studio portrait after retouching" }
            ]
        },
        "dual-tone": {
            title: "Dual-Tone Composition",
            type: "AI art / Composition study",
            description: "A split-image generative study using opposing color treatments to explore visual balance, contrast, and rhythm.",
            image: "../images/Portfolio/AI_Art_and_Prompt_Design/Split.webp",
            alt: "Dual-tone generative composition"
        },
        "drone-embassy": {
            title: "Drone Embassy View",
            type: "Aerial photography",
            description: "An aerial architectural view composed from a drone perspective, with attention to geometry, scale, and the relationship between the building and its surroundings.",
            image: "../images/Portfolio/Photography/Drone_Embassy.jpeg",
            alt: "Aerial architectural photograph captured by drone"
        },
        "snowy-cabin": {
            title: "Snowy Cabin Landscape",
            type: "Landscape photography",
            description: "A winter landscape photograph centered on a snow-covered cabin and the quiet relationship between the structure, terrain, and surrounding atmosphere.",
            image: "../images/Portfolio/Photography/Snowy_Cabin.jpeg",
            alt: "Snow-covered cabin in a winter landscape"
        },
        "pride-of-lions": {
            title: "A Pride of Lions",
            type: "Graphic design",
            description: "A lion-centered graphic composition exploring hierarchy, scale, and layered imagery.",
            image: "../images/Portfolio/Graphic_Design/A_Pride_Of_Lions.png",
            alt: "A Pride of Lions graphic composition"
        },
        baroque: {
            title: "Baroque Postcard",
            type: "Academic project / Print and exhibition collateral",
            description: "A two-sided invitational postcard themed around a Bernini exhibition at The Metropolitan Museum of Art. The design combines Baroque ornament, aged texture, edited sculpture imagery, and functional postal information.",
            stages: [
                { label: "Front", src: "../images/Portfolio/Graphic_Design/Baroque/baroque-postcard-front.webp", alt: "Front of the Bernini exhibition postcard" },
                { label: "Back", src: "../images/Portfolio/Graphic_Design/Baroque/baroque-postcard-back.webp", alt: "Back of the Bernini exhibition postcard" }
            ]
        },
        "aston-martin": {
            title: "Aston Martin",
            type: "Self-directed / Speculative concept",
            description: "A speculative luxury-advertising concept that places the Aston Martin One-77 in an academic environment. It was not commissioned by or affiliated with Aston Martin.",
            image: "../images/Portfolio/Graphic_Design/GQ_Aston_Martin.png",
            alt: "Speculative Aston Martin advertising concept"
        },
        nadia: {
            title: "Nadia Comăneci",
            type: "Academic project / Cover design",
            description: "A biography-cover concept that uses fractured Olympic rings, gold ribbon forms, and restrained typography to represent achievement, pressure, and legacy through symbolism rather than portraiture.",
            image: "../images/Portfolio/Graphic_Design/Nadia Comaneci shattered 3.png",
            alt: "Nadia Comăneci biography cover concept"
        },
        "art-exhibit": {
            title: "Art Exhibit",
            type: "Graphic design",
            description: "An exhibition-focused graphic composition exploring image placement, typography, and hierarchy.",
            image: "../images/Portfolio/Graphic_Design/Art_Exhibit.png",
            alt: "Art exhibition graphic design composition"
        },
        samurai: {
            title: "Samurai Artwork",
            type: "AI art / Prompt design",
            description: "A generative image of a lone samurai framed by a ring of fire. The composition also serves as the visual foundation for the site's Lou Danziger intermission.",
            image: "../images/Portfolio/AI_Art_and_Prompt_Design/samurai_original.webp",
            alt: "Samurai standing before a ring of fire"
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
    const portfolioGrid = document.querySelector("[data-portfolio-grid]");
    const portfolioCards = portfolioGrid.querySelectorAll("[data-project][data-category]");
    const resultCount = document.querySelector("[data-result-count]");
    const showAllButton = document.querySelector("[data-show-all]");

    const applyWorkFilter = (selectedFilter) => {
        workFilters.forEach((button) => {
            const isActive = button.dataset.filter === selectedFilter;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        const isFeaturedView = selectedFilter === "featured";
        portfolioGrid.classList.toggle("is-featured-view", isFeaturedView);
        portfolioGrid.classList.toggle("is-collection-view", !isFeaturedView);

        let visibleCount = 0;
        portfolioCards.forEach((card) => {
            const isVisible = isFeaturedView
                ? card.dataset.featured === "true"
                : selectedFilter === "all" || card.dataset.category === selectedFilter;
            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        resultCount.textContent = isFeaturedView
            ? `${visibleCount} selected projects`
            : `${visibleCount} project${visibleCount === 1 ? "" : "s"}`;
        showAllButton.hidden = !isFeaturedView;
    };

    workFilters.forEach((filterButton) => {
        filterButton.addEventListener("click", () => {
            applyWorkFilter(filterButton.dataset.filter);
        });
    });

    showAllButton.addEventListener("click", () => applyWorkFilter("all"));
    applyWorkFilter("featured");

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
            } else if (project.stages) {
                const viewport = document.createElement("div");
                viewport.className = "dialog-media-viewport";

                const image = document.createElement("img");
                if (project.contain) image.classList.add("is-contained");
                viewport.append(image);

                const stageControls = document.createElement("div");
                stageControls.className = "media-stage-controls";
                stageControls.setAttribute("role", "group");
                stageControls.setAttribute("aria-label", `${project.title} views`);

                const showStage = (stage, activeButton) => {
                    image.src = stage.src;
                    image.alt = stage.alt;
                    stageControls.querySelectorAll("button").forEach((button) => {
                        const isActive = button === activeButton;
                        button.classList.toggle("is-active", isActive);
                        button.setAttribute("aria-pressed", String(isActive));
                    });
                };

                project.stages.forEach((stage, index) => {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.textContent = stage.label;
                    button.setAttribute("aria-pressed", String(index === 0));
                    if (index === 0) button.classList.add("is-active");
                    button.addEventListener("click", () => showStage(stage, button));
                    stageControls.append(button);
                });

                showStage(project.stages[0], stageControls.firstElementChild);
                media.append(viewport, stageControls);
            } else {
                const image = document.createElement("img");
                image.src = project.image;
                image.alt = project.alt;
                if (project.contain) image.classList.add("is-contained");
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

    document.querySelectorAll("[data-view-all-work]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            if (projectDialog.open) closeProjectDialog();
            applyWorkFilter("all");
            document.getElementById("all-work").scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });

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
