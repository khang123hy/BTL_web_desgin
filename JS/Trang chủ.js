window.addEventListener("load", function () {
    const slider = document.querySelector(".slider");
    const sliderMaint = document.querySelector(".slider-main");
    const sliderItems = document.querySelectorAll(".slider-item");
    const nextBtn = document.querySelector(".slider-next");
    const prevBtn = document.querySelector(".slider-prev");
    const dotitems = document.querySelectorAll(".slider-dot-item");
  
    const sliderItemwidth = sliderItems[0].offsetWidth;
    const slidersLength = sliderItems.length;
    let postionx = 0;
    let index = 0;
  
    // Tự động chuyển slide mỗi 10 giây
    setInterval(function () {
      handleChangeSlide(1);
    }, 10000);
  
    nextBtn.addEventListener("click", function () {
      handleChangeSlide(1);
    });
    prevBtn.addEventListener("click", function () {
      handleChangeSlide(-1);
    });
    [...dotitems].forEach((item) =>
      item.addEventListener("click", function (e) {
        [...dotitems].forEach((el) => el.classList.remove("active"));
        e.target.classList.add("active");
        const sliderIndex = parseInt(e.target.dataset.index);
        index = sliderIndex;
        postionx = -1 * index * sliderItemwidth;
        sliderMaint.style = `transform: translateX(${postionx}px) `;
      })
    );
  
    function handleChangeSlide(direction) {
      if (direction == 1) {
        if (index >= slidersLength - 1) {
          // Nếu đến slide cuối, chuyển về slide đầu
          index = 0;
        } else {
          index++;
        }
        postionx = -1 * index * sliderItemwidth;
      } else if (direction == -1) {
        if (index <= 0) {
          // Nếu ở slide đầu, chuyển đến slide cuối
          index = slidersLength - 1;
        } else {
          index--;
        }
        postionx = -1 * index * sliderItemwidth;
      }
  
      sliderMaint.style = `transform: translateX(${postionx}px) `;
      [...dotitems].forEach((el) => el.classList.remove("active"));
      dotitems[index].classList.add("active");
    }
  });
  