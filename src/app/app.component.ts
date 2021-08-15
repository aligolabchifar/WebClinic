import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BaseUserModelDto} from './SorenTeb/model/Base/User/base-user-model-dto';
import {Router} from '@angular/router';
import {BasePageComponent} from './SorenTeb/controller/general/base-page/base-page.component';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BasePageComponent implements AfterViewInit, OnInit {
  title = 'SorenClinicWeb';
  checked = true;
  user: BaseUserModelDto = new BaseUserModelDto();

  constructor(private router: Router){
    super();
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    console.log('اینجا صفحه اصلی می باشد');
    if (localStorage.getItem('sorenTeb-user-storage')) {
      this.user = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    }
    else {
      this.user = null;
    }
    console.log('مقدار یوزر');
    console.log(this.user);
    setTimeout(() => {
    }, 1000);

    this.get_message();
    // window.location.reload();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initJqueryScripts();

    }, 1000);

  }

  get_message() {
    this.messageService.get_message().subscribe(data => {

      if (data.message == 'show_side') {
        if (localStorage.getItem('sorenTeb-user-storage')) {
          this.user = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
        }
      }
      if (data.message == 'hide_side') {
        this.user = null;
      }

    });
  }

  initJqueryScripts() {
    $(document).ready(() => {

      $('.responsive-menu i').click(() => {

        if ($('.page-sidebar').hasClass('show')) {
          $('.page-sidebar').removeClass('show');
          $('.page-sidebar').addClass('hide');
        } else {
          $('.page-sidebar').removeClass('hide');
          $('.page-sidebar').addClass('show');
        }
      });

      $(document).click((e) => {
        const target = $('.responsive-menu')[0];
        const sideBar = $('.page-sidebar')[0];
        const navbar = $('app-navbar')[0];
        // console.log(target);
        // console.log(e.currentTarget)
        // console.log(e.target);

        if ((target && !target.contains(e.target)) && (sideBar && !sideBar.contains(e.target)) && (navbar && !navbar.contains(e.target))) {
          $('.page-sidebar').removeClass('show');
          $('.page-sidebar').addClass('hide');
        }

      });


      $('html,body').click((e) => {
        const target = document.getElementsByClassName('page-sidebar')[0];
        const input = $('.akbari-input').get(0);
        if (!e.target.contains(target)) {
          $('.x-navigation').removeClass('x-navigation-open');
        }

      });





      const htmlClickAvail = true;

      $('html').on('click', () => {
        if (htmlClickAvail) {
          $('.x-navigation-horizontal li,.x-navigation-minimized li').removeClass('active');
        }
      });

      $('.x-navigation-horizontal .panel').on('click', e => {
        e.stopPropagation();
      });

      /* WIDGETS (DEMO)*/
      $('.widget-remove').on('click', function() {
        $(this).parents('.widget').fadeOut(400, function() {
          $(this).remove();
          $('body > .tooltip').remove();
        });
        return false;
      });
      /* END WIDGETS */


      /* DROPDOWN TOGGLE */
      $('.dropdown-toggle').on('click', () => {
        onresize(0);
      });
      /* DROPDOWN TOGGLE */

      /* MESSAGE BOX */
      $('body').on('click', '.mb-control', function() {
        const box = $($(this).data('box'));
        if (box.length > 0) {
          box.toggleClass('open');
        }
        return false;
      });
      $('body').on('click', '.mb-control-close', function() {
        $(this).parents('.message-box').removeClass('open');
        return false;
      });
      /* END MESSAGE BOX */


      x_navigation();
    });

    $(window).resize(() => {
      x_navigation_onresize();
      setTimeout(() => {
        page_content_onresize();
      }, 100);
    });

    function onload() {
      x_navigation_onresize();
      setTimeout(() => {
        page_content_onresize();
      }, 100);
    }

    function page_content_onresize() {
      $('.pages-content,.content-frame-body,.content-frame-right,.content-frame-left').css('width', '').css('height', '');

      let contentMinus = 0;
      contentMinus = ($('.pages-container-boxed').length > 0) ? 40 : contentMinus;
      contentMinus += ($('.pages-navigation-top-fixed').length > 0) ? 50 : 0;

      const content = $('.pages-content');
      const sidebar = $('.pages-sidebar');

      if (content.height() < $(document).height() - contentMinus) {
        content.height($(document).height() - contentMinus);
      }

      if (sidebar.height() > content.height()) {
        content.height(sidebar.height());
      }

      if ($(window).width() > 1024) {
        let docHeight = 0;
        if ($('.pages-sidebar').hasClass('scroll')) {
          if ($('body').hasClass('page-container-boxed')) {
            docHeight = $(document).height() - 40;
          } else {
            docHeight = $(window).height();
          }
          $('.pages-sidebar').height(docHeight);

        }

        if ($('.content-frame-body').height() < $(document).height() - 162) {
          $('.content-frame-body,.content-frame-right,.content-frame-left').height($(document).height() - 162);
        } else {
          $('.content-frame-right,.content-frame-left').height($('.content-frame-body').height());
        }

        //  $('.content-frame-left').showLoading();
        // $('.content-frame-right').showLoading();
      } else {
        $('.content-frame-body').height($('.content-frame').height() - 80);

        if ($('.pages-sidebar').hasClass('scroll')) {
          $('.pages-sidebar').css('height', '');
        }
      }

      if ($(window).width() < 1200) {
        if ($('body').hasClass('page-container-boxed')) {
          $('body').removeClass('page-container-boxed').data('boxed', '1');
        }
      } else {
        if ($('body').data('boxed') === '1') {
          $('body').addClass('page-container-boxed').data('boxed', '');
        }
      }
    }


    /* X-NAVIGATION CONTROL FUNCTIONS */
    function x_navigation_onresize() {

      const innerPort = window.innerWidth || $(document).width();

      if (innerPort < 1025) {
        $('.pages-sidebar .x-navigation').removeClass('x-navigation-minimized');
        $('.pages-container').removeClass('page-container-wide');
        $('.pages-sidebar .x-navigation li.active').removeClass('active');


        $('.x-navigation-horizontal').each(function() {
          if (!$(this).hasClass('x-navigation-panel')) {
            $('.x-navigation-horizontal').addClass('x-navigation-h-holder').removeClass('x-navigation-horizontal');
          }
        });


      } else {
        if ($('.pages-navigation-toggled').length > 0) {
          x_navigation_minimize('close');
        }

        $('.x-navigation-h-holder').addClass('x-navigation-horizontal').removeClass('x-navigation-h-holder');
      }

    }

    function x_navigation_minimize(action) {

      if (action === 'open') {
        $('.pages-container').removeClass('page-container-wide');
        $('.pages-sidebar .x-navigation').removeClass('x-navigation-minimized');
        $('.x-navigation-minimize').find('.fa').removeClass('fa-indent').addClass('fa-dedent');
      }

      if (action === 'close') {
        $('.pages-container').addClass('page-container-wide');
        $('.pages-sidebar .x-navigation').addClass('x-navigation-minimized');
        $('.x-navigation-minimize').find('.fa').removeClass('fa-dedent').addClass('fa-indent');
      }

      $('.x-navigation li.active').removeClass('active');

    }

    function x_navigation() {

      $('.x-navigation-control').click(function() {
        $(this).parents('.x-navigation').toggleClass('x-navigation-open');

        onresize(0);

        return false;
      });

      if ($('.pages-navigation-toggled').length > 0) {
        x_navigation_minimize('close');
      }

      $('.x-navigation-minimize').click(() => {

        if ($('.pages-sidebar .x-navigation').hasClass('x-navigation-minimized')) {
          $('.pages-container').removeClass('page-navigation-toggled');
          x_navigation_minimize('open');
        } else {
          $('.pages-container').addClass('page-navigation-toggled');
          x_navigation_minimize('close');
        }

        onresize(0);

        return false;
      });

      $('.x-navigation  li > a').click(function() {

        const li = $(this).parent('li');
        const ul = li.parent('ul');

        ul.find(' > li').not(li).removeClass('active');

      });

      $('body').on('click', '.x-navigation li', function(event) {
        event.stopPropagation();

        const li = $(this);

        if (li.children('ul').length > 0 || li.children('.panel').length > 0 || $(this).hasClass('xn-profile')) {
          if (li.hasClass('active')) {
            li.removeClass('active');
            li.find('li.active').removeClass('active');
          } else {
            li.addClass('active');
          }

          onresize(0);

          if ($(this).hasClass('xn-profile')) {
            return true;
          } else {
            return false;
          }
        }
      });

      /* XN-SEARCH */
      $('.xn-search').on('click', function() {
        $(this).find('input').focus();
      });
      /* END XN-SEARCH */

    }

    /* EOF X-NAVIGATION CONTROL FUNCTIONS */

    /* PAGE ON RESIZE WITH TIMEOUT */
    function onresize(timeout) {
      timeout = timeout ? timeout : 200;

      setTimeout(() => {
        page_content_onresize();
      }, timeout);
    }

    /* EOF PAGE ON RESIZE WITH TIMEOUT */


    /* NEW OBJECT(GET SIZE OF ARRAY) */
    // @ts-ignore
    Object.size = obj => {
      let Size = 0;
      let key = 0;
      // @ts-ignore
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          Size++;
        }
      }
      return Size;
    };
    /* EOF NEW OBJECT(GET SIZE OF ARRAY) */
  }

  logout(){
    console.log('خروج از سامانه');
    this.router.navigate(['/logout']);
  }

  onRouterOutletActivate($event: any) {

    // this.user = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    if (localStorage.getItem('sorenTeb-user-storage')) {
      this.user = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
    }
    else {
      this.user = null;
    }
    setTimeout(() => {
    }, 1000);

    this.get_message();
    // window.location.reload();
  }
}
