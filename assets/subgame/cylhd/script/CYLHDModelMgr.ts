
import PlayModel from  "./CYLHDModelPlay";
import LoginModel from  "./CYLHDModelLogin";
import ReqModel from  "./CYLHDModelReq";


module LHD {

  export class ModelMgr {

    public initModel(){
      this.registerReqModels();
      this.registerResModels();
    }

    private registerReqModels() {
      new ReqModel();
    }

    private registerResModels() {
      new PlayModel();
      new LoginModel();
    }

  }
}
export default LHD.ModelMgr;