/*gallery*/
document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.querySelector(".gallery-container");

    if (galleryContainer) {
        let totalCells = 30; // Увеличиваем количество фото

        function loadCats(count) {
            fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}&size=full`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(cat => {
                        const item = document.createElement("div");
                        item.classList.add("gallery-item");

                        const img = document.createElement("img");
                        img.src = cat.url;
                        img.alt = "Random Cat";
                        img.loading = "lazy"; // Ленивый лоадинг

                        item.appendChild(img);
                        galleryContainer.appendChild(item);
                    });
                })
                .catch(error => console.error("Ошибка загрузки котиков:", error));
        }

        // Первоначальная загрузка
        loadCats(totalCells);

        // Подгрузка новых фото при прокрутке
        window.addEventListener("scroll", () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                loadCats(10); // Загружаем ещё 10 фото
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.querySelector(".gallery-container");
    const loadMoreButton = document.querySelector("#load-more");

    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        });
    }
});



/*burger menu*/
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
        burger.classList.toggle("active");
    });

    // Закрываем меню при клике на ссылку
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            burger.classList.remove("active");
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
        instagram: `https://www.instagram.com/direct/new/`, // Открывает DM в Instagram
        telegram: `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`,
        whatsapp: `https://wa.me/?text=${pageTitle}%20${pageUrl}`
    };

    document.querySelectorAll(".share-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const platform = button.classList[1]; // Получаем класс соцсети
            if (shareLinks[platform]) {
                window.open(shareLinks[platform], "_blank", "width=600,height=600");
            }
        });
    });
});
