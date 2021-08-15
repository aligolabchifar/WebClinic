import {BaseFilterDto} from './base-filter-dto';
import {BaseCertificateTypeListModelDto} from '../Base/Certificate/base-certificate-type-list-model-dto';

export class CertificateFilterDto extends BaseFilterDto {
  certificateCode: number;
  paraclinicChildId: number;
  certificateName: string;

  baseCertificateTypeListModel: Array<BaseCertificateTypeListModelDto>;


}
