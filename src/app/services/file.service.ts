import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { FtpReqDto } from "../dto/ftp/ftp.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class FileService{

    constructor(
        private baseService: BaseService
    ) { }

    uploadFileFtp(data: FtpReqDto){
        return this.baseService.post<InsertResDto>('files/ftp', data)
    }
}