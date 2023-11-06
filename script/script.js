const menuButton = document.getElementById("menu-button");
const menuList = document.getElementById("menu-list");
const menuItems = document.querySelectorAll(".menu-list li");

let isOpen = false;

menuButton.addEventListener("click", () => {
    if (!isOpen) {
        menuList.classList.add("active");
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = "translateX(0)";
            }, 100 * index);
        });

        document.addEventListener("click", closeMenuOnClick);

        document.addEventListener("scroll", closeMenuOnScroll);
    } else {
        menuItems.forEach((item, index) => {
            item.style.transform = "translateX(100%)";
        });
        setTimeout(() => {
            menuList.classList.remove("active");
        }, 300);
        document.removeEventListener("click", closeMenuOnClick);
        document.removeEventListener("scroll", closeMenuOnScroll);
    }

    isOpen = !isOpen;
});

function closeMenuOnClick(event) {
    if (!menuList.contains(event.target) && event.target !== menuButton) {
        closeMenu();
    }
}

function closeMenuOnScroll() {
    closeMenu();
}

function closeMenu() {
    menuItems.forEach((item, index) => {
        item.style.transform = "translateX(100%)";
    });
    setTimeout(() => {
        menuList.classList.remove("active");
    }, 300);
    isOpen = false;
    document.removeEventListener("click", closeMenuOnClick);
    document.removeEventListener("scroll", closeMenuOnScroll);
}
//homeeee

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
  };
//about
  document.getElementById("download-button").addEventListener("click", function() {
    var link = document.createElement("a");
    link.download = "./pdf/cv.pdf";
    link.href = "./pdf/cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

//proyectosssssssss


//contact
document.addEventListener("DOMContentLoaded", function () {
  var enviarButton = document.getElementById("enviarButton");

  enviarButton.addEventListener("click", function () {
      var form = document.getElementById("contactoForm");
      var formData = new FormData(form);

      fetch("https://formspree.io/f/mzblwrog", {
          method: "POST",
          body: formData,
          headers: {
              'Accept': 'application/json'
          }
      })
      .then(response => response.json())
      .then(data => {
          if (data.ok) {
              alert("Formulario enviado con éxito.");
              form.reset(); // Limpia el formulario
          } else {
              alert("Error al enviar el formulario. Inténtalo de nuevo.");
          }
      });
  });
});
