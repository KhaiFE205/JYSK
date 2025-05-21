
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

function getSlideData() {
  const track = document.getElementById("productTrack");
  if (!track) return null;
  const container = track.closest('.product-slider');
  const items = track.querySelectorAll(".product-item");
  if (!items.length || !container) return null;

  const itemStyle = window.getComputedStyle(items[0]);
  const itemMargin = parseFloat(itemStyle.marginRight) || 0;
  const itemWidth = items[0].offsetWidth + itemMargin;

  const totalItems = items.length;
  const containerWidth = container.offsetWidth;
  const maxVisible = Math.floor(containerWidth / itemWidth);
  const maxSlide = Math.max(0, totalItems - maxVisible);

  return { track, itemWidth, maxSlide };
}

function slideRight() {
  const data = getSlideData();
  if (!data) return;
  const { itemWidth, maxSlide } = data;
  if (currentSlide < maxSlide) {
    currentSlide++;
    updateSlide(itemWidth);
  }
}

function slideLeft() {
  const data = getSlideData();
  if (!data) return;
  const { itemWidth } = data;
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide(itemWidth);
  }
}

function updateSlide(itemWidth) {
  const track = document.getElementById("productTrack");
  const data = getSlideData();
  if (!data) return;
  const { maxSlide } = data;
  // Đảm bảo currentSlide không vượt quá maxSlide
  currentSlide = Math.max(0, Math.min(currentSlide, maxSlide));
  const moveX = currentSlide * itemWidth;
  track.style.transform = `translateX(-${moveX}px)`;
}

// Cập nhật lại vị trí khi resize để giữ đúng
window.addEventListener("resize", () => {
  const data = getSlideData();
  if (!data) return;
  updateSlide(data.itemWidth);
});




//sản phẩm 2
const track1 = document.getElementById("productTrack1");
let scrollAmount1 = 0;
const scrollStep = 236; // 220px sản phẩm + 16px gap

function getMaxScroll1() {
  const visibleItems = Math.floor(document.querySelector('.product-slider').offsetWidth / scrollStep);
  const maxScroll = track1.children.length - visibleItems;
  return Math.max(0, maxScroll);
}

function slideLeft1() {
  scrollAmount1 -= scrollStep;
  if (scrollAmount1 < 0) scrollAmount1 = 0;
  track1.style.transform = `translateX(-${scrollAmount1}px)`;
}

function slideRight1() {
  const maxScrollAmount = scrollStep * getMaxScroll1();
  // Nếu đã ở cuối, không tăng nữa
  if (scrollAmount1 < maxScrollAmount) {
    scrollAmount1 += scrollStep;
    if (scrollAmount1 > maxScrollAmount) scrollAmount1 = maxScrollAmount;
    track1.style.transform = `translateX(-${scrollAmount1}px)`;
  }
}

// Tự điều chỉnh lại khi resize màn hình
window.addEventListener("resize", () => {
  scrollAmount1 = 0;
  track1.style.transform = `translateX(0)`;
});
//nội thất
let currentIndex2 = 0;

function slideLeft2() {
  const track = document.getElementById("sliderTrack");
  const items = document.querySelectorAll(".slider-item");
  if (currentIndex2 > 0) {
    currentIndex2--;
  }
  const itemWidth = items[0].offsetWidth;
  track.style.transform = `translateX(-${currentIndex2 * itemWidth}px)`;
}

function slideRight2() {
  const track = document.getElementById("sliderTrack");
  const items = document.querySelectorAll(".slider-item");
  const totalItems = items.length;
  const itemsPerView = window.innerWidth <= 768 ? 1 : 2;
  const maxIndex = totalItems - itemsPerView;

  if (currentIndex2 < maxIndex) {
    currentIndex2++;
  }
  const itemWidth = items[0].offsetWidth;
  track.style.transform = `translateX(-${currentIndex2 * itemWidth}px)`;
}

// Reset slider nếu thay đổi kích thước màn hình
window.addEventListener("resize", () => {
  const items = document.querySelectorAll(".slider-item");
  const itemWidth = items[0].offsetWidth;
  const totalItems = items.length;
  const itemsPerView = window.innerWidth <= 768 ? 1 : 2;
  const maxIndex = totalItems - itemsPerView;
  if (currentIndex2 > maxIndex) currentIndex2 = maxIndex;
  document.getElementById("sliderTrack").style.transform = `translateX(-${currentIndex2 * itemWidth}px)`;
});





// Biến lưu trạng thái slide
let currentSlide3 = 0;

function getSlideData1() {
  const track = document.getElementById("productTrack3"); // Đúng ID của slider 3
  const container = document.querySelector(".product-slider");
  const items = document.querySelectorAll("#productTrack3 .product-item"); // Đúng selector

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
