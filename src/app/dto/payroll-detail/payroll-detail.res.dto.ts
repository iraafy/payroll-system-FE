export interface PayrollDetailResDto {
	id: string
	description: string
	fileContent: string
	filePath: string,
	maxUploadDate: string,
	psAcknowledge: boolean,
	clientAcknowledge: boolean,
	forClient: boolean
}