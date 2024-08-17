document.addEventListener('DOMContentLoaded', () => {
    createSlidesFromJSON();
});

function createSlidesFromJSON() {
    fetch('data/images.json')
        .then(response => response.json())
        .then(images => {
            const slidesContainer = document.getElementById('slides-container');
            
            // Clone first and last image for seamless loop
            const firstImage = images[0];
            const lastImage = images[images.length - 1];
            
            // Add last image clone to the beginning
            const lastClone = document.createElement('div');
            lastClone.classList.add('slide');
            const lastCloneImg = document.createElement('img');
            lastCloneImg.src = lastImage.image;
            lastCloneImg.alt = lastImage.name;
            lastClone.appendChild(lastCloneImg);
            slidesContainer.appendChild(lastClone);
            
            // Add original images
            images.forEach(image => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                const img = document.createElement('img');
                img.src = image.image;
                img.alt = image.name;
                slide.appendChild(img);
                slidesContainer.appendChild(slide);
            });
            
            // Add first image clone to the end
            const firstClone = document.createElement('div');
            firstClone.classList.add('slide');
            const firstCloneImg = document.createElement('img');
            firstCloneImg.src = firstImage.image;
            firstCloneImg.alt = firstImage.name;
            firstClone.appendChild(firstCloneImg);
            slidesContainer.appendChild(firstClone);

            startSlider(images.length); // Start the slider after loading images
        })
        .catch(error => console.error('Error fetching images:', error));
}

function startSlider(imageCount) {
    let currentIndex = 1;
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');
    
    // Move to the first original slide
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    function showSlide(index) {
        slidesContainer.style.transition = 'transform 1s ease-in-out';
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    function showNextSlide() {
        currentIndex++;
        showSlide(currentIndex);
        
        if (currentIndex === slides.length - 1) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                currentIndex = 1;
                slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            }, 1000);
        }
    }

    function showPrevSlide() {
        currentIndex--;
        showSlide(currentIndex);
        
        if (currentIndex === 0) {
            setTimeout(() => {
                slidesContainer.style.transition = 'none';
                currentIndex = slides.length - 2;
                slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
            }, 1000);
        }
    }

    document.querySelector('.nav.next').addEventListener('click', showNextSlide);
    document.querySelector('.nav.prev').addEventListener('click', showPrevSlide);

    setInterval(showNextSlide, 5000);
}
