var OverlayScreen;

OverlayScreen = Vue.component('v-overlay-screen', {
  template: "<div class='c-overlay-scr' v-bind:class='classObj'> <div class='c-overlay-scr__header'> <div v-show='!logo && title' class='c-overlay-scr__title'>{{ title }}</div> <div v-show='logo' class='c-overlay-scr__logo'> <a class='c-overlay-scr__logo-image' href='/' title='Belanja Online Aman, Nyaman dan Terpercaya di Bukalapak'>Bukalapak.com</a> </div> <div class='c-overlay-scr__action'> <button class='btn-close btn-icon' @click.prevent='close'> <span class='c-icon c-icon--close'></span> </button> </div> </div> <div class='c-overlay-scr__content'> <div class='c-overlay-scr__content__inner' :class='[backgroundColor, innerContentClassObj]'> <slot name='content'></slot> </div> </div> <div class='c-overlay-scr__footer' v-if='footer'> <div class='c-overlay-scr__footer__inner'> <slot name='footer'></slot> </div> </div> </div>",
  props: {
    header: {
      type: Boolean,
      "default": false
    },
    title: {
      type: String,
      "default": ''
    },
    direction: {
      type: String,
      "default": 'top'
    },
    show: {
      type: Boolean,
      "default": false
    },
    logo: {
      type: Boolean,
      "default": false
    },
    footer: {
      type: Boolean,
      "default": false
    },
    background: {
      type: String,
      "default": 'white'
    },
    closeButtonPosition: {
      type: String,
      "default": 'left'
    }
  },
  methods: {
    close: function() {
      this.showOverlay = false;
      return this.$emit('close');
    }
  },
  data: function() {
    return {
      scrollPos: 0,
      showOverlay: false
    };
  },
  computed: {
    classObj: function() {
      var obj;
      return (
        obj = {},
        obj["c-overlay-scr--" + this.direction] = true,
        obj['is-active'] = this.show || this.showOverlay,
        obj['c-overlay-scr--header'] = this.header,
        obj
      );
    },
    innerContentClassObj: function() {
      return {
        "c-overlay-scr__content__inner--w-footer": this.footer
      };
    },
    backgroundColor: function() {
      var obj;
      return (
        obj = {},
        obj["u-bg--" + this.background] = true,
        obj
      );
    }
  },
  mounted: function() {
    return this.showOverlay = this.show;
  },
  watch: {
    show: function(nv, ov) {
      if (nv) {
        this.scrollPos = $(window).scrollTop();
        $('body').css('overflow', 'hidden');
        return $('.wrapper').css({
          position: 'fixed',
          top: -this.scrollPos,
          left: 0,
          width: '100%'
        });
      } else {
        $('body').css('overflow', 'auto');
        $('.wrapper').css('position', 'initial');
        return $(window).scrollTop(this.scrollPos);
      }
    }
  }
});
