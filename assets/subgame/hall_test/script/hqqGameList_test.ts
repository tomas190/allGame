import { _decorator } from 'cc';
export const subGameList_test = {
}
export function showBigsublayer(data){
    hqq.viewCtr.showLayer("prefab/bigsublayer","hallPSubbLayer_test",data,1000,false,hqq["hall_test"]);
}
export function showSamlllayer(data){
    hqq.viewCtr.showLayer("prefab/smallsublayer","hallPSubsLayer_test",data,1000,false,hqq["hall_test"]);
}
export function showNoticelayer(data){
    hqq.viewCtr.showLayer("prefab/noticelayer","hallNoticeLayer_test",data,1000,false,hqq["hall_test"]);
}
export function showRegisterlayer(data){
    hqq.viewCtr.showLayer("prefab/registerlayer","hallRegisterLayer_test",data,1000,false,hqq["hall_test"]);
}
export function showPerson(data) {
    hqq.viewCtr.showLayer("prefab/personallayer","hallPersonLayer_test",null,1000,false,hqq["hall_test"]);
}