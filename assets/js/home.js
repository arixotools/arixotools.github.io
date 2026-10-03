document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("toolSearch");
    const clearSearch = document.getElementById("clearSearch");
    const emptyClear = document.getElementById("emptyClear");

    const resultCount = document.getElementById("resultCount");
    const emptyState = document.getElementById("emptyState");

    const filterButtons =
        document.querySelectorAll(".filter-chip");

    const toolCards =
        document.querySelectorAll(".tool-card");

    const categorySections =
        document.querySelectorAll("[data-category-section]");

    const revealElements =
        document.querySelectorAll(".reveal");

    const liveClock =
        document.getElementById("liveClock");


    /* ================================
       SEARCH + FILTER
    ================================= */

    let activeCategory = "all";


    function filterTools() {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        let visibleCount = 0;


        toolCards.forEach(card => {

            const name =
                card.dataset.name?.toLowerCase() || "";

            const description =
                card.dataset.description?.toLowerCase() || "";

            const category =
                card.dataset.category || "";


            const matchesSearch =
                !query ||
                name.includes(query) ||
                description.includes(query) ||
                category.includes(query);


            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;


            const visible =
                matchesSearch &&
                matchesCategory;


            card.style.display =
                visible ? "" : "none";


            if (visible) {
                visibleCount++;
            }

        });


        categorySections.forEach(section => {

            const category =
                section.dataset.categorySection;

            const cards =
                section.querySelectorAll(".tool-card");

            let sectionVisible = false;

            cards.forEach(card => {

                if (card.style.display !== "none") {
                    sectionVisible = true;
                }

            });

            section.style.display =
                sectionVisible ? "" : "none";
        });


        resultCount.textContent =
            visibleCount;


        emptyState.classList.toggle(
            "visible",
            visibleCount === 0
        );


        clearSearch.classList.toggle(
            "visible",
            searchInput.value.length > 0
        );

    }


    searchInput.addEventListener(
        "input",
        filterTools
    );


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            activeCategory =
                button.dataset.filter;

            filterTools();

        });

    });


    function resetSearch() {

        searchInput.value = "";

        activeCategory = "all";

        filterButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.filter === "all"
            );
        });

        filterTools();

        searchInput.focus();
    }


    clearSearch.addEventListener(
        "click",
        resetSearch
    );


    emptyClear.addEventListener(
        "click",
        resetSearch
    );


    /* ================================
       "/" SEARCH SHORTCUT
    ================================= */

    document.addEventListener("keydown", event => {

        const active =
            document.activeElement;

        const isTyping =
            active &&
            (
                active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA"
            );


        if (
            event.key === "/" &&
            !isTyping
        ) {

            event.preventDefault();

            searchInput.focus();
        }


        if (
            event.key === "Escape" &&
            document.activeElement === searchInput
        ) {

            if (searchInput.value) {
                resetSearch();
            } else {
                searchInput.blur();
            }

        }

    });


    /* ================================
       SCROLL REVEAL
    ================================= */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    /* ================================
       CARD MOUSE SPOTLIGHT
    ================================= */

    toolCards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    ((event.clientX - rect.left) /
                        rect.width) * 100;

                const y =
                    ((event.clientY - rect.top) /
                        rect.height) * 100;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}%`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}%`
                );

            }
        );

    });


    /* ================================
       LIVE CLOCK
    ================================= */

    function updateClock() {

        if (!liveClock) {
            return;
        }

        const now =
            new Date();

        const hours =
            String(now.getHours())
                .padStart(2, "0");

        const minutes =
            String(now.getMinutes())
                .padStart(2, "0");

        const seconds =
            String(now.getSeconds())
                .padStart(2, "0");


        liveClock.textContent =
            `${hours}:${minutes}:${seconds}`;
    }


    updateClock();

    setInterval(
        updateClock,
        1000
    );


    /* ================================
       INITIAL STATE
    ================================= */

    filterTools();

});