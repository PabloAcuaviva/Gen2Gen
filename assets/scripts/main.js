//* ======================== Slide Control ===================== */
//* Would be nicer to make a single control structure, probably with a framework
// but the quickest way to make it working with current code base is to duplicate for each case
// */

// STYLE TRANSFER SLIDE CONTROL LOGIC
var contents_style_transfer = document.getElementsByClassName(
  "style-transfer-slide-content"
);

document
  .getElementById("style-transfer-slide-menu")
  .addEventListener("click", function (e) {
    const idx = [...this.children]
      .filter((el) => el.className.indexOf("dot") > -1)
      .indexOf(e.target);

    if (idx >= 0) {
      var prev = document.querySelector(".dot.active.style-transfer");
      if (prev) prev.classList.remove("active");
      e.target.classList.add("active");

      for (var i = 0; i < contents_style_transfer.length; i++) {
        if (i == idx) {
          contents_style_transfer[i].style.display = "block";
        } else {
          contents_style_transfer[i].style.display = "none";
        }
      }
    }
  });

// CONCEPT ARC CONTROL LOGIC
const js_categories_concept_arc = [
            "clean_up",
            "extend_to_boundary",
            "center",
            "order",
            "top_bottom2_d",
            "extract_objects",
            "top_bottom3_d",
            "above_below",
            "horizontal_vertical",
            "count",
            "copy",
            "inside_outside",
            "filled_not_filled",
            "complete_shape",
            "move_to_boundary",
            "same_different",
];
const js_contents_concept_arc_level_0 = document.getElementsByClassName(
  "concept-arc-categories-slide-content"
);

document
  .getElementById("concept-arc-categories-slide-menu")
  .addEventListener("click", function (e) {
    // Find the closest dot element - this handles clicks on both the dot and the image inside
    const clickedDot = e.target.closest(".icon-dot.concept-arc-categories");
    if (!clickedDot) return;

    const dots = [...this.querySelectorAll(".icon-dot.concept-arc-categories")];
    const idx = dots.indexOf(clickedDot);

    if (idx >= 0) {
      // Remove active class from all dots and their images
      dots.forEach((dot) => {
        dot.classList.remove("active");
        const img = dot.querySelector(".dot-icon");
        if (img) {
          img.classList.remove("active");
          const concept = js_categories_concept_arc[dots.indexOf(dot)];
          img.src = `assets/images/arc-like/concept-arc/inactive/${concept}.png`;
        }
      });

      // Add active class to clicked dot and its image
      clickedDot.classList.add("active");
      const img = clickedDot.querySelector(".dot-icon");
      if (img) {
        img.classList.add("active");
        const concept = js_categories_concept_arc[idx];
        img.src = `assets/images/arc-like/concept-arc/active/${concept}.png`;
      }

      // Show/hide content
      for (let i = 0; i < js_contents_concept_arc_level_0.length; i++) {
        js_contents_concept_arc_level_0[i].style.display =
          i === idx ? "block" : "none";
      }
    }
  });

//* ==================== Carrousel logic ======================= */
// document.querySelectorAll(".custom-carousel").forEach((carousel) => {
//   const inner = carousel.querySelector(".custom-carousel-inner");
//   const items = carousel.querySelectorAll(".custom-carousel-item");
//   let index = 0;

//   const update = () => {
//     inner.style.transform = `translateX(-${index * 100}%)`;
//   };

//   carousel.querySelector(".prev").addEventListener("click", () => {
//     index = (index - 1 + items.length) % items.length;
//     update();
//   });

//   carousel.querySelector(".next").addEventListener("click", () => {
//     index = (index + 1) % items.length;
//     update();
//   });
// });

// We need additional logic to handle smooth transitions between
// First and last index. This is implemented here.
document.querySelectorAll(".custom-carousel").forEach((carousel) => {
  const inner = carousel.querySelector(".custom-carousel-inner");
  const items = carousel.querySelectorAll(".custom-carousel-item");
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);

  inner.insertBefore(lastClone, items[0]);
  inner.appendChild(firstClone);

  const allItems = carousel.querySelectorAll(".custom-carousel-item");
  let index = 1;
  let transitioning = false;

  inner.style.transform = `translateX(-${index * 100}%)`;

  const update = () => {
    transitioning = true;
    inner.style.transition = "transform 0.6s ease";
    inner.style.transform = `translateX(-${index * 100}%)`;
  };

  inner.addEventListener("transitionend", () => {
    if (index === 0) {
      inner.style.transition = "none";
      index = allItems.length - 2;
      inner.style.transform = `translateX(-${index * 100}%)`;
    }
    if (index === allItems.length - 1) {
      inner.style.transition = "none";
      index = 1;
      inner.style.transform = `translateX(-${index * 100}%)`;
    }
    transitioning = false;
  });

  carousel.querySelector(".prev").addEventListener("click", () => {
    if (transitioning) return;
    index--;
    update();
  });

  carousel.querySelector(".next").addEventListener("click", () => {
    if (transitioning) return;
    index++;
    update();
  });
});



// ==================== Clickable Images (Custom) ============= */
// // Get modal elements
// const modal = document.getElementById('imageModal');
// const modalImg = document.getElementById('modalImg');
// const closeBtn = document.getElementById('closeModal');
// const modalCaption = document.getElementById('modalCaption');

// // Get all clickable images
// const clickableImages = document.querySelectorAll('.clickable-img');

// // Add click event to each image
// clickableImages.forEach(img => {
//     img.onclick = function() {
//         modal.style.display = "block";
//         modalImg.src = this.src;
        
//         // Get the caption text from the sibling div
//         const captionElement = this.nextElementSibling;
//         if (captionElement && captionElement.classList.contains('clickable-img-caption')) {
//             modalCaption.textContent = captionElement.textContent;
//         } else {
//             modalCaption.textContent = this.alt;
//         }
//     }
// });

// // Close modal when X is clicked
// closeBtn.onclick = function() {
//     modal.style.display = "none";
// }

// // Close modal when clicking outside the image
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// // Close modal when pressing ESC key
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'Escape' && modal.style.display === 'block') {
//         modal.style.display = "none";
//     }
// });

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if modal elements exist to prevent errors
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.getElementById('closeModal');
    const modalCaption = document.getElementById('modalCaption');
    
    if (!modal || !modalImg || !closeBtn || !modalCaption) {
        console.error('Modal elements not found. Make sure the modal HTML is included.');
        return;
    }
    
    // Use event delegation for handling clicks
    document.addEventListener('click', function(event) {
        // Check if the clicked element or its parent has the clickable-img class
        const clickedImg = event.target.closest('.clickable-img');
        
        if (clickedImg) {
            console.log('Image clicked:', clickedImg.src);
            modal.style.display = "block";
            modalImg.src = clickedImg.src;
            
            // Preserve original dimensions
            const originalWidth = clickedImg.naturalWidth;
            const originalHeight = clickedImg.naturalHeight;
            
            // Apply original dimensions (x2) if available
            if (originalWidth && originalHeight) {
                console.log('Setting original dimensions:', originalWidth, 'x', originalHeight);
                modalImg.style.width = 2*originalWidth + 'px';
                modalImg.style.height = 2*originalHeight + 'px';
            } else {
                // Reset dimensions if we can't determine original size
                modalImg.style.width = 'auto';
                modalImg.style.height = 'auto';
            }
            
            // Get the caption from either the next sibling or the alt text
            let captionText = clickedImg.alt || '';
            const captionElement = clickedImg.parentNode.querySelector('.clickable-img-caption');
            
            if (captionElement) {
                captionText = captionElement.textContent;
            }
            
            modalCaption.textContent = captionText;
        }
    });
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
    
    // Close modal when clicking outside the image
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
    
    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = "none";
        }
    });
});

//* ======================== Video Control ===================== */
function ToggleVideo(x) {
  var videos = document.getElementsByClassName(x + "-video");
  for (var i = 0; i < videos.length; i++) {
    if (videos[i].paused) {
      videos[i].play();
    } else {
      videos[i].pause();
    }
  }
}

function SlowVideo(x) {
  var videos = document.getElementsByClassName(x + "-video");
  for (var i = 0; i < videos.length; i++) {
    videos[i].playbackRate = videos[i].playbackRate * 0.9;
    videos[i].play();
  }

  var msg = document.getElementById(x + "-msg");
  msg.innerHTML = "Speed: " + "×" + videos[0].playbackRate.toFixed(2);

  msg.classList.add("fade-in-out");
  msg.style.animation = "none";
  msg.offsetHeight; /* trigger reflow */
  msg.style.animation = null;
}

function FastVideo(x) {
  var videos = document.getElementsByClassName(x + "-video");
  for (var i = 0; i < videos.length; i++) {
    videos[i].playbackRate = videos[i].playbackRate / 0.9;
    videos[i].play();
  }

  var msg = document.getElementById(x + "-msg");
  msg.innerHTML = "Speed: " + "×" + videos[0].playbackRate.toFixed(2);

  msg.classList.add("fade-in-out");
  msg.style.animation = "none";
  msg.offsetHeight; /* trigger reflow */
  msg.style.animation = null;
}

function RestartVideo(x) {
  var videos = document.getElementsByClassName(x + "-video");
  for (var i = 0; i < videos.length; i++) {
    videos[i].pause();
    videos[i].playbackRate = 1.0;
    videos[i].currentTime = 0;
    videos[i].play();
  }

  var msg = document.getElementById(x + "-msg");
  msg.innerHTML = "Speed: " + "×" + videos[0].playbackRate.toFixed(2);

  msg.classList.add("fade-in-out");
  msg.style.animation = "none";
  msg.offsetHeight; /* trigger reflow */
  msg.style.animation = null;
}

//* ======================== Slide Show Control ===================== */
const slider = document.querySelector(".container .slider");
const [btnLeft, btnRight] = ["prev_btn", "next_btn"].map((id) =>
  document.getElementById(id)
);
let interval;

// Set positions
const setPositions = () =>
  [...slider.children].forEach(
    (item, i) => (item.style.left = `${(i - 1) * 440}px`)
  );

// Initial setup
setPositions();

// Set transition speed
const setTransitionSpeed = (speed) => {
  [...slider.children].forEach(
    (item) => (item.style.transitionDuration = speed)
  );
};

// Slide functions
const next = (isAuto = false) => {
  setTransitionSpeed(isAuto ? "1.5s" : "0.2s");
  slider.appendChild(slider.firstElementChild);
  setPositions();
};

const prev = () => {
  setTransitionSpeed("0.2s");
  slider.prepend(slider.lastElementChild);
  setPositions();
};

// Auto slide
const startAuto = () =>
  (interval = interval || setInterval(() => next(true), 2000));
const stopAuto = () => {
  clearInterval(interval);
  interval = null;
};

// Event listeners
btnRight.addEventListener("click", () => next(false));
btnLeft.addEventListener("click", prev);

// Mouse hover controls
[slider, btnLeft, btnRight].forEach((el) => {
  el.addEventListener("mouseover", stopAuto);
  el.addEventListener("mouseout", startAuto);
});

// Start auto slide
startAuto();
