import { CommonProperty } from './common.property';
import { UserEntity } from './user.entity';
export class UploadEntity extends CommonProperty{
    uploadId?: string;
    originalname? : string;
    filename? : string;
    path? : string;
    size? : number;
    owner?: UserEntity;
    constructor(data?: Partial<UploadEntity>) {
        super()
        Object.assign(this, data);
    }
}
