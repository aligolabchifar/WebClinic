import { Injectable } from '@angular/core';
import {GlobalConfigs} from './global-configs';
import { Configuration } from 'src/app/SorenTeb/controller/config/configuration';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BaseService {

  private globalconfig: GlobalConfigs = null;
  private get globalConfig(): GlobalConfigs {
    if (this.globalconfig === null) {
      this.globalconfig = new GlobalConfigs();
    }
    return this.globalconfig;
  }

  get baseServiceUrl(): string {
    return Configuration.baseServiceUrl;
  }

  get fileUploaderUrl(): string {
    return Configuration.fileUploaderUrl;
  }

  constructor(public http: HttpClient) {
  }

  // get getMapTileAddress(): string{
  //   return Configuration.mapTileUrl;
  // }
  //
  // get getFrontBaseUrl(): string{
  //   return Configuration.frontBase;
  // }

}
