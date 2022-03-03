declare namespace jsb{
	namespace device{
		export function getDeviceModel(): string;
	}
	namespace fileUtils{
		export function getDataFromFile(filename:string):ArrayBuffer;
		export function renameFile(oldfullpath:string,newfullpath:string):boolean;
		export function writeDataToFile(data:any,fullPath:string):boolean;
	}
}
declare module 'pal/system-info'{
	interface SystemInfo{
		getDeviceModel (): string;
	}
}
