import {Sort} from '@angular/material/sort';

export class BaseFilterDto {
  public pageNumber = '1';
  public take = 100;
  public sortDto: Sort[];
  public isLookUp: boolean;
}
