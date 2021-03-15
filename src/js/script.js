'use strict';

// const filterItems = [
//   {
//     type: 'basic',
//     title: 'Базовые комплекты',
//   },
//   {
//     type: 'onePersonSet',
//     title: 'Сервировочный набор',
//   },
//   {
//     type: 'goblet',
//     title: 'Бокалы',
//   },
//   {
//     type: 'plate',
//     title: 'Тарелки',
//   },
//   {
//     type: 'servingPlate',
//     title: 'Тарелки сервировочные',
//   },
//   {
//     type: 'flatware',
//     title: 'Приборы',
//   },
//   {
//     type: 'tissue',
//     title: 'Салфетки',
//   },
//   {
//     type: 'candles',
//     title: 'Толстые свечи',
//   }
// ];


function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {

  // библиотека popup
    const popupLibrary = {
      popUp: null,
      trigger: null,
      popupClose: null,
      isActive: false,

      // инициализация popup
      init(trig) {
        this.popUp = document.querySelector('.popup');
        this.popUpWindow = document.querySelector('.popup-body');
        const that = this;

        this.popUp.addEventListener('click', function(e) { that.close(e); });
        this.popUpWindow.addEventListener('click', function(e) { e.stopPropagation(); } );

        this.popUpClose = document.querySelector('.popup-close');
        this.popUpClose.addEventListener('click', function(e) {
          that.close(e);
        });

        if (trig) {
          this.trigger = trig;
          this.trigger.addEventListener('click', function(e) {
            that.open(e, popupHTML);
          });
        }

        window.addEventListener("keyup", function(e) {
          if (e.key === 'Escape') {
            that.close();
          }
        }, true);
      },

      // открытие popup
      open(someHTML) {
        if (someHTML) {
          this.popUp
            .querySelector('.popup-inner')
            .innerHTML = someHTML;
        }

        this.popUp.style.display = 'block';
        this.isActive = true;
      },

      // закрытие popup
      close() {
        this.popUp.style.display = 'none';
        this.isActive = false;
      },

      // сброс popup
      reset() {
        this.popUp = null;
        this.trigger.removeEventListener('click', this.open);
        this.trigger = null;
      }

    };

  popupLibrary.init();

  // popup c Сообщением об успешном заказе
  const offerForm = document.querySelector('.offer-form');
  if (offerForm) {
    offerForm.addEventListener('submit', e => {
      e.preventDefault();
    });

    let successOrderInnerHTML=`
      <div class="success-order">
      <div class="success-order__message">
        <div class="success-order__title">Спасибо за заказ !</div>
        <div class="success-order__text">Наш менеджер свяжется с&nbsp;вами для&nbsp;уточнения деталей</div>
      </div>
      <img src="img/success-order-popup.png" alt="Спасибо за заказ!" class="success-order__img">
    </div>
    `;

    const successPopup = () => {
      popupLibrary.open(successOrderInnerHTML);
    }

    const placeOrderButton = document.querySelector('.offer-form__submit-btn');

    if (placeOrderButton) {
      placeOrderButton.addEventListener('click', successPopup);
    }
  }

  // ГЛАВНОЕ МЕНЮ
  const myMainNav = document.querySelector('.main-nav');
  const myMainNavCloseBtn = document.querySelector('.main-nav__close-btn');
  const myMainNavBtn = document.querySelector('.page-header__nav-toggle');

  if (myMainNav && myMainNavCloseBtn && myMainNavBtn) {
    myMainNav.addEventListener('click', e => {
      e.stopPropagation();
    });

    myMainNavBtn.addEventListener('click', e => {
      e.stopPropagation();
      myMainNav.classList.toggle('main-nav--active', true);
    });

    myMainNavCloseBtn.addEventListener('click', e => {
      e.stopPropagation();
      myMainNav.classList.toggle('main-nav--active', false);
    });
  }

  // Табы в Каталоге
  const myCatalogTabs = document.querySelectorAll('.catalog-tabs__tab');
  const myCatalogTabsButtons = document.querySelectorAll('.catalog-tabs__button');
  const myCatalogTabActiveClass = 'catalog-tabs__tab--active';
  const myCatalogTabButtonActiveClass = 'catalog-tabs__button--active';

  if (myCatalogTabs && myCatalogTabsButtons) {
    const showCatalogTab = (index) => {
      myCatalogTabs.forEach(el => {
        el.classList.remove(myCatalogTabActiveClass);
        if (el.getAttribute('data-tab') === index) {
          el.classList.add(myCatalogTabActiveClass);
        }
      });
    };

    myCatalogTabsButtons.forEach( el => {
      el.addEventListener('click', ev => {
        let myActiveButton = ev.target;
        if (myActiveButton.classList.contains(myCatalogTabButtonActiveClass)) {
          return
        };
        myCatalogTabsButtons.forEach(el => {
          el.classList.remove(myCatalogTabButtonActiveClass);
        });
        myActiveButton.classList.add(myCatalogTabButtonActiveClass);
        let myTabIndex = myActiveButton.getAttribute('data-tab');
        showCatalogTab(myTabIndex);
      });
    });
  }

  // селект (фильтр) в Каталоге
  const positionsFilter = new Choices('#positions-filter', {
    searchEnabled: false,
    itemSelectText: '',
    silent: true,
  });

  const filterOptions = document.querySelectorAll('.choices__item--choice');

}
);
