import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html'
})
export class DefaultModalComponent implements OnInit {
  @Input() ParentId: string;
  @Input() headerText: string;
  @Output() onCloseEmmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  closeModal() {
    this.onCloseEmmit.emit(this.ParentId);
  }
}
