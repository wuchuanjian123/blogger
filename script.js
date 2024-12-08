let currentIndex = 0;
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
let autoPlayInterval;

function showSlide(index) {
  if (index < 0) {
    currentIndex = totalItems - 1;
  } else if (index >= totalItems) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  document.querySelector(
    ".carousel-inner"
  ).style.transform = `translateX(${offset}%)`;

  // 显示对应的侧边栏内容
  const link = items[currentIndex].getAttribute("data-link");
  document.querySelectorAll(".sidebar ul li ul").forEach((list) => {
    list.style.display = "none";
  });
  document.querySelector(`${link} ul`).style.display = "block";

  // 高亮侧边栏链接
  document.querySelectorAll(".sidebar ul li a").forEach((a) => {
    a.classList.remove("active");
  });
  document
    .querySelector(`a[href="${items[currentIndex].querySelector("a").href}"]`)
    .classList.add("active");
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// 自动滑动函数
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 3000);
}

// 停止自动滑动函数
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// 初始化显示第一张图片和对应的侧边栏内容
showSlide(currentIndex);

// 开始自动播放
startAutoPlay();

// 添加事件监听器
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);

// 点击图片跳转
items.forEach((item) => {
  item.addEventListener("click", () => {
    const link = item.querySelector("a").href;
    window.open(link, "_blank"); // 使用 window.open 打开新窗口
  });
});
