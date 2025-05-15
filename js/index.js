
const submenuItems = document.querySelectorAll('.submenu-left li');
const previewBox = document.getElementById('preview-box');

submenuItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const images = item.getAttribute('data-images').split(',');
    const names = item.getAttribute('data-names').split(',');
    const name = item.getAttribute('data-name');

    // Làm sạch nội dung cũ
    previewBox.innerHTML = '';

    // Tạo tiêu đề cho tên danh mục
    const categoryName = document.createElement('p');
    categoryName.textContent = name;
    previewBox.appendChild(categoryName);

    // Hiển thị 3 sản phẩm với tên dưới ảnh
    images.forEach((imgSrc, index) => {
      const imgContainer = document.createElement('div');
      const img = document.createElement('img');
      const productName = document.createElement('p');
      
      img.src = imgSrc;
      img.alt = `Preview image ${index + 1}`;
      productName.textContent = names[index];

      imgContainer.appendChild(img);
      imgContainer.appendChild(productName);
      previewBox.appendChild(imgContainer);
    });

    // Hiển thị preview box
    previewBox.classList.remove('hidden');
  });

  item.addEventListener('mouseleave', () => {
  });
});





//banner
  const slider = document.querySelector('.slider');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = dots.length;
  let currentIndex = 0;
  let interval;

  // Chuyển slide
  function showSlide(index) {
    currentIndex = index;
    const translateX = -index * 100;
    slider.style.transform = `translateX(${translateX}%)`;

    // Cập nhật dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  // Slide tự động
  function startAutoSlide() {
    interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % totalSlides;
      showSlide(nextIndex);
    }, 10000); // 10 giây
  }

  // Tắt slide tự động khi người dùng nhấn dot
  function stopAutoSlide() {
    clearInterval(interval);
  }

  // Xử lý khi nhấn dot
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(index);
      startAutoSlide();
    });
  });

  // Khởi tạo
  window.addEventListener('load', () => {
    showSlide(0);
    startAutoSlide();
  });

//menu
  document.getElementById("menu-toggle").addEventListener("click", function (e) {
  e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
  const nav = document.querySelector(".main-nav");
  const toggle = document.getElementById("menu-toggle");
  nav.classList.add("show");
  toggle.style.display = "none";
});

// Khi nhấn ra ngoài menu thì ẩn menu và hiện lại nút 3 gạch
document.addEventListener("click", function (e) {
  const nav = document.querySelector(".main-nav");
  const toggle = document.getElementById("menu-toggle");

  if (nav.classList.contains("show") && !nav.contains(e.target)) {
    nav.classList.remove("show");
    toggle.style.display = "block";
  }
});




let currentSlide = 0;

function slideRight() {
  const track = document.getElementById("productTrack");
  const items = document.querySelectorAll(".product-item");
  const itemWidth = items[0].offsetWidth + 15;
  const totalItems = items.length;
  const containerWidth = document.querySelector(".product-slider").offsetWidth;
  const maxVisible = Math.floor(containerWidth / itemWidth);
  const maxSlide = totalItems - maxVisible;

  if (currentSlide < maxSlide) {
    currentSlide++;
    updateSlide(itemWidth);
  }
}

function slideLeft() {
  const itemWidth = document.querySelector(".product-item").offsetWidth + 15;
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide(itemWidth);
  }
}

function updateSlide(itemWidth) {
  const track = document.getElementById("productTrack");
  const moveX = currentSlide * itemWidth;
  track.style.transform = `translateX(-${moveX}px)`;
}

// Cập nhật lại vị trí khi resize để giữ đúng
window.addEventListener("resize", () => {
  const itemWidth = document.querySelector(".product-item").offsetWidth + 15;
  updateSlide(itemWidth);
});




//sản phẩm 2
    const track1 = document.getElementById("productTrack1");
  let scrollAmount1 = 0;
  const scrollStep = 236; // 220px sản phẩm + 16px gap
  const visibleItems = Math.floor(document.querySelector('.product-slider').offsetWidth / scrollStep);
  const maxScroll = track1.children.length - visibleItems;

  function slideLeft1() {
    scrollAmount1 -= scrollStep;
    if (scrollAmount1 < 0) scrollAmount1 = 0;
    track1.style.transform = `translateX(-${scrollAmount1}px)`;
  }

  function slideRight1() {
    scrollAmount1 += scrollStep;
    const maxScrollAmount = scrollStep * maxScroll;
    if (scrollAmount1 > maxScrollAmount) scrollAmount1 = maxScrollAmount;
    track1.style.transform = `translateX(-${scrollAmount1}px)`;
  }

  // (Tuỳ chọn) Tự điều chỉnh lại khi resize màn hình
  window.addEventListener("resize", () => {
    scrollAmount1 = 0;
    track1.style.transform = `translateX(0)`;
  });
//nội thất
    let currentIndex2 = 0;

  function slideLeft2() {
    const track = document.getElementById("sliderTrack");
    const items = document.querySelectorAll(".slider-item");
    const totalItems = items.length;

    if (currentIndex > 0) {
      currentIndex--;
    }

    const itemWidth = items[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  function slideRight2() {
    const track = document.getElementById("sliderTrack");
    const items = document.querySelectorAll(".slider-item");
    const totalItems = items.length;

    // Hiển thị 2 sản phẩm mỗi lần ở desktop
    const itemsPerView = window.innerWidth <= 768 ? 1 : 2;

    if (currentIndex < totalItems - itemsPerView) {
      currentIndex++;
    }

    const itemWidth = items[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  // Reset slider nếu thay đổi kích thước màn hình
  window.addEventListener("resize", () => {
    const items = document.querySelectorAll(".slider-item");
    const itemWidth = items[0].offsetWidth;
    document.getElementById("sliderTrack").style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  });





// Biến lưu trạng thái slide
let currentSlide3 = 0;

function getSlideData1() {
  const track = document.getElementById("productTrack3");
  const container = document.querySelector(".product-slider");
  const items = document.querySelectorAll("#productTrack1 .product-item");

  if (!track || !items.length || !container) return null;

  const itemStyle = window.getComputedStyle(items[0]);
  const itemMargin = parseFloat(itemStyle.marginRight) || 0;
  const itemWidth = items[0].offsetWidth + itemMargin;

  const totalItems = items.length;
  const containerWidth = container.offsetWidth;
  const visibleItems = Math.floor(containerWidth / itemWidth);
  const maxSlide = Math.max(0, totalItems - visibleItems);

  return { track, itemWidth, maxSlide };
}

function updateSlide3() {
  const data = getSlideData1();
  if (!data) return;

  const { track, itemWidth, maxSlide } = data;

  // Giữ currentSlide3 trong khoảng từ 0 đến maxSlide
  currentSlide3 = Math.max(0, Math.min(currentSlide3, maxSlide));

  track.style.transform = `translateX(-${currentSlide3 * itemWidth}px)`;
}

function slideRight3() {
  const data = getSlideData1();
  if (!data) return;

  const { maxSlide } = data;
  if (currentSlide3 < maxSlide) {
    currentSlide3++;
    updateSlide3();
  }
}

function slideLeft3() {
  if (currentSlide3 > 0) {
    currentSlide3--;
    updateSlide3();
  }
}

window.addEventListener("resize", updateSlide3);
