import { ClientResDto } from "../user/client.res.dto";

export interface AllAssignmentResDto {
    psName: string;
    clients: ClientResDto[];
}