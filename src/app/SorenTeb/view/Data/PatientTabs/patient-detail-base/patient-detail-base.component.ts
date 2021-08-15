import {Component, Input, OnInit} from '@angular/core';
import {BaseMemberPanelPageComponent} from '../../../../controller/config/base-member-panel-page/base-member-panel-page.component';
import {ReceptionModelByIdModelDto} from '../../../../model/Data/Reception/reception-model-by-id-model-dto';
import {ReceptionListReceptionServiceModelDto} from '../../../../model/Data/Reception/reception-list-reception-service-model-dto';

@Component({
  template: ''
})
export class PatientDetailBaseComponent extends BaseMemberPanelPageComponent {

  @Input() receptionById: ReceptionListReceptionServiceModelDto;

  public convertPersianToEnglish(str): string
  {
    const  persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const  arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    if (typeof str === 'string')
    {
      for (let i = 0; i < 10; i++)
      {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  }
}
