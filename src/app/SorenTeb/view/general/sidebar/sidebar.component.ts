import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingService} from '../../../controller/general/loading.service';
import {NotificationService} from '../../../controller/general/notification.service';
import {Configuration} from '../../../controller/config/configuration';
import {RoleActivityModelDto} from '../../../model/Base/User/role-activity-model-dto';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit , AfterViewInit{

  @ViewChild('menuHolder') menuHolder: ElementRef;
  // attachmentDto = new AttachmentDto() ;
  // attachments: AttachmentDto[] ;
  // activities: RoleActivityModelDto[];
  // activities: any ;
  userInfo = JSON.parse(localStorage.getItem('sorenTeb-user-storage'));
  activities = JSON.parse(localStorage.getItem('sorenTeb-roleActivity-storage'));

  isFirstIteration = true;
  fileUrl: any;

  lastEl;

  formData = new FormData();
//  @Input() attachmentTypeCategoryID: AttachmentTypeCategory ;
  file: File = null ;
  baseService: string;

  constructor(private router: Router, private renderer: Renderer2,
              private notificationService: NotificationService
              // ,
              // private uploadService: UploadService
  )


  {

    // this.activities = JSON.parse(localStorage.getItem('sorenTeb-roleActivity-storage'));
    this.baseService = Configuration.baseServiceUrl;

  }
  clearPageMessages() {
    // this.loadingService.hideLoading();
    this.notificationService.clearMessage();
  }

  ngOnInit(): void {

console.log('رفتم داخل منو');

if (this.userInfo.picturePath === '') {
      this.fileUrl = '';
    } else {
      this.fileUrl = Configuration.fileUploaderUrl + this.userInfo.picturePath;
    }

    // this.attachmentTypeCategoryID = AttachmentTypeCategory.User;

  }

  ngAfterViewInit(){
console.log('برو توی منو');
const firstLevelMenus = this.activities.filter(i => i.parentId === 0 && i.isMenu && i.isActive);
this.lastEl = this.menuHolder.nativeElement;
this.buildMenu(firstLevelMenus);

  }

  buildMenu(activities: RoleActivityModelDto[]) {
    activities.forEach(action => {
      const childes = this.activities.filter(a => a.parentId === action.id && a.isMenu && a.isActive);
      const hasChild = childes.length > 0;
      const li = this.renderer.createElement('li');
      const link = this.renderer.createElement('a');
      this.renderer.setStyle(link, 'color', 'white');
      this.renderer.setStyle(link, 'cursor', 'pointer');
      this.renderer.setAttribute(link, 'routerLink', '#');
      if (hasChild) {
        this.renderer.addClass(li, 'xn-openable');
      } else {
        this.renderer.listen(link, 'click', event1 => {
          this.clearPageMessages();
          $('.x-navigation').removeClass('x-navigation-open');
          this.router.navigate([action.path]);
        });
      }
      if (this.isFirstIteration) {
        this.renderer.addClass(li, 'active');
        this.isFirstIteration = false;
      }
      if (action.parentId === 0) {
        const iconSpan = this.renderer.createElement('span');
        const textSpan = this.renderer.createElement('span');
        this.renderer.addClass(textSpan, 'xn-text');
        this.renderer.addClass(iconSpan, 'fa');
        this.renderer.addClass(iconSpan, 'fa-' + action.iconClass);
        textSpan.innerHTML = action.title;
        this.renderer.appendChild(link, iconSpan);
        this.renderer.appendChild(link, textSpan);
        this.lastEl = this.menuHolder.nativeElement;
      } else {
        link.innerHTML = action.title;
      }
      this.renderer.appendChild(li, link);
      this.renderer.appendChild(this.lastEl, li);
      if (hasChild) {
        const ul = this.renderer.createElement('ul');
        this.renderer.appendChild(li, ul);
        this.lastEl = ul;
        this.buildMenu(childes);
      }
    });

  }




  error_image(event) {
    event.target.src = './assets/member-panel/images/users/no-image.jpg';
  }


  open_modal() {
    $('#userInfo').modal('show');
  }
  onSelectFile(files: FileList) {

    this.formData = new FormData();
    const file  = files[0] as File;
    // this.formData.append('attachmentDto', JSON.stringify(this.attachmentDto));
    // this.formData.append('dtoName', this.attachmentTypeCategoryID.toString());

    this.formData.append('file', file);
    this.formData.append('userId', this.userInfo.id.toString());
    // this.attachmentDto.fileType = file.type ;
    // this.uploadService.uploadUserImage(this.formData).subscribe((resultObject) => {
    //   if ( resultObject !== null && resultObject.result !== null) {
    //     this.userInfo.picturePath = resultObject.result.path;
    //     this.fileUrl = Configuration.baseServiceUrl + this.userInfo.picturePath;
    //
    //   }
    // });
  }


}
