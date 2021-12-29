
const {ccclass, property} = cc._decorator;
import { Language_pay } from "./../language/payLanguage";
let cities = {
    '北京': ['北京'],
    '天津': ['天津'],
    '河北': [
        '石家庄','唐山','秦皇岛','邢台','保定','张家口','承德','沧州','廊坊','衡水','邯郸'
    ],
    '山西': [
        '太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁'
    ],
    '内蒙古': [
        '呼和浩特','包头','乌海','赤峰','通辽','鄂尔多斯','呼伦贝尔','巴彦淖尔','乌兰察布','兴安','锡林郭勒','阿拉善'
    ],
    '辽宁': [
        '沈阳','大连','鞍山','抚顺','本溪','丹东','锦州','营口','阜新','辽阳','盘锦','铁岭','朝阳','葫芦岛'
    ],
    '吉林': [
        '长春','吉林','四平','辽源','通化','白山','松原','白城','延边'
    ],
    '黑龙江': [
        '哈尔滨','齐齐哈尔','鸡西','鹤岗','双鸭山','大庆','伊春','佳木斯','七台河','牡丹江','黑河','绥化','大兴安岭'
    ],
    '上海': [
        '上海'
    ],
    '江苏': [
        '南京','无锡','徐州','常州','苏州','南通','连云港','淮安','盐城','扬州','镇江','泰州','宿迁'
    ],
    '浙江': [
        '杭州','宁波','温州','嘉兴','湖州','绍兴','金华','衢州','舟山','台州','丽水',
    ],
    '安徽': [
        '合肥','芜湖','蚌埠','淮南','马鞍山','淮北','铜陵','安庆','黄山','滁州','阜阳','宿州','巢湖','六安','亳州','池州','宣城',
    ],
    '福建': [
        '福州','厦门','莆田','三明','泉州','漳州','南平','龙岩','宁德',
    ],
    '江西': [
        '南昌','景德镇','萍乡','九江','新余','鹰潭','赣州','吉安','宜春','抚州','上饶',
    ],
    '山东': [
        '济南','青岛','淄博','枣庄','东营','烟台','潍坊','济宁','泰安','威海','日照','莱芜','临沂','德州','聊城','滨州','菏泽'
    ],
    '河南': [
        '郑州','开封','洛阳','平顶山','安阳','鹤壁','新乡','焦作','濮阳','许昌','漯河','三门峡','南阳','商丘','信阳','周口','驻马店','济源'
    ],
    '湖北': [
        '武汉','黄石','十堰','宜昌','襄樊','鄂州','荆门','孝感','荆州','黄冈','咸宁','随州','恩施','仙桃','潜江','天门','神农架'
    ],
    '湖南': [
        '长沙','株洲','湘潭','衡阳','邵阳','岳阳','常德','张家界','益阳','郴州','永州','怀化','娄底','湘西',
    ],
    '广东': [
        '广州','韶关','深圳','珠海','汕头','佛山','江门','湛江','茂名','肇庆','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮'
    ],
    '广西': [
        '南宁','柳州','桂林', '梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','来宾','崇左',
    ],
    '海南': [
        '海口','三亚','三沙','五指山','琼海','儋州','文昌','万宁','东方','定安','屯昌','澄迈','临高','白沙','昌江','乐东','陵水','保亭','琼中',
    ],
    '重庆': [
        '重庆'
    ],
    '四川': [
        '成都', '自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充','眉山','宜宾','广安','达川','雅安','巴中','资阳','阿坝','甘孜','凉山',
    ],
    '贵州': [
        '贵阳','六盘水','遵义','安顺','铜仁','黔西南','毕节','黔东南','黔南'
    ],
    '云南': [
        '昆明','曲靖','玉溪','保山','昭通','丽江','普洱','临沧','楚雄','红河','文山','西双版纳','大理','德宏','怒江','迪庆',
    ],
    '西藏': [
        '拉萨','昌都','山南','日喀则','那曲','阿里','林芝',
    ],
    '陕西': [
        '西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','安康','商洛',
    ],
    '甘肃': [
        '兰州','嘉峪关','金昌','白银','天水','武威','张掖','平凉','酒泉','庆阳','定西','陇南','临夏','甘南',
    ],
    '青海': [
        '西宁','海东','海北','黄南','海南','果洛','玉树','梅西',
    ],
    '宁夏': [
        '银川','石嘴山','吴忠','固原','中卫',
    ],
    '新疆': [
        '乌鲁木齐', '克拉玛依', '吐鲁番','哈密','昌吉','博尔塔拉','巴音郭楞', '阿克苏','克孜勒苏', '喀什','和田','伊犁','塔城','阿勒泰','石河子','阿拉尔','图木舒克','五家渠',
    ],
    '香港': ['香港'],
    '澳门': ['澳门'],
    '台湾': ['台湾']
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    publicAlert: cc.Prefab = null;

    @property(cc.Prefab)
    PublicInputAlert: cc.Prefab = null;

    @property(cc.Prefab)
    BankSelectItem: cc.Prefab = null;

    @property(cc.Node)
    titleIcon :cc.Node = null

    @property(cc.EditBox)
    nameInput: cc.EditBox = null;

    @property(cc.EditBox)
    accountInput: cc.EditBox = null;

    @property(cc.EditBox)
    bankNameInput: cc.EditBox = null;

    @property(cc.Label)
    selectProvinceLabel: cc.Label = null;

    @property(cc.Node)
    selectProvinceContent: cc.Node = null;

    @property(cc.Label)
    selectCityLabel: cc.Label = null;

    @property(cc.Node)
    selectCityContent: cc.Node = null;

    @property(cc.Label)
    selectBankLabel: cc.Label = null;

    @property(cc.Node)
    selectBankContent: cc.Node = null;

    @property(cc.Node)
    accountMask :cc.Node = null;

    @property(cc.Node)
    bankMask: cc.Node = null;

    @property(cc.Label)
    AqmLabel: cc.Label = null; // 安全码

    @property()

    action = 'add';
    itemId = null;
    app = null;
    parentComponent = null;
    public init(data) {
        let src = Language_pay.Lg.getLgSrc()
        let iconPath = data.text =='设置银行卡' ?`${src}/font/title_szyhk` :`${src}/font/title_xgyhk`;
        this.app.loadIcon(iconPath,this.titleIcon,283,51);
        this.action = data.action;
        this.itemId = data.itemId;
        this.parentComponent = data.parentComponent
    }

    changeContent(data){
        this.accountInput.string = data.card_num;
        this.nameInput.string = data.card_name;
        this.selectBankLabel.string = data.bank_name;
        this.bankNameInput.string = data.branch_name;
        this.selectProvinceLabel.string = data.bank_province;
        this.selectCityLabel.string = data.bank_city;
        if(this.selectProvinceLabel.string ==''){
            this.selectProvinceLabel.string = Language_pay.Lg.ChangeByText('请选择开户省')
        }
        if(this.selectCityLabel.string ==''){
            this.selectCityLabel.string = Language_pay.Lg.ChangeByText('请选择开户市')
        }
        if(this.selectBankLabel.string ==''){
            this.selectBankLabel.string = Language_pay.Lg.ChangeByText('请选择开户行')
        }
        if( this.accountInput.string != ''){
            this.accountMask.active = true// 禁止修改卡号
            this.bankMask.active = true// 禁止修改卡号
        }else{
            this.accountMask.active = false
            this.bankMask.active = false
        }
    }

    onLoad() {
        this.app = cc.find('Canvas/Main').getComponent('payMain');
        this.addProvinceItem()
        this.addBankItem()
        this.setLanguageResource()
    }
    onClick() {
        //按键音效
        this.app.loadMusic(1)
        //去掉输入中的空格
        var str = this.accountInput.string.replace(/\s+/g,"");
        this.accountInput.string = str;
        if(this.accountInput.string == '' || this.nameInput.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('姓名和卡号不能为空'))
        }
        else if(this.selectProvinceLabel.string == Language_pay.Lg.ChangeByText('请选择开户省')|| this.selectProvinceLabel.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('开户省不能为空'))
        }
        else if(this.selectCityLabel.string == Language_pay.Lg.ChangeByText('请选择开户市') || this.selectCityLabel.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('开户市不能为空'))
        }
        else if(this.selectBankLabel.string == Language_pay.Lg.ChangeByText("请选择开户行")||this.selectBankLabel.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('开户行不能为空'))
        }
        else if(this.accountInput.string.length>19||this.accountInput.string.length<15){
            this.app.showAlert(Language_pay.Lg.ChangeByText('无效卡号'))
        }else if(this.accountInput.string.slice(0,1)=='0'){
            this.app.showAlert(Language_pay.Lg.ChangeByText('无效卡号'))
        }
        else if(this.bankNameInput.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('开户支行不能为空'))
        }
        else if(!this.isChinese(this.nameInput.string )){
            this.app.showAlert(Language_pay.Lg.ChangeByText('姓名不能含有特殊字符'))
        }
        else if(!this.isChinese(this.bankNameInput.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('开户支行不能含有特殊字符'))
        }
        else{
            if(this.app.UrlData.package_id != 16){
                this.fetchBindAccountPay();
                this.node.removeFromParent();
            }else{
                if(this.AqmLabel.string == "点击输入"){
                    this.app.showAlert("请输入安全码")
                    return
                }else if(this.AqmLabel.string.length < 4){
                    this.app.showAlert("请输入4位安全码")
                    return
                }
                this.fetchBindAccountPay();
                this.node.getChildByName("bindBankAccount").active = false
                this.node.getChildByName("Bank").active = true
                this.accountInput.string = "";
                this.selectBankLabel.string = "请选择开户行";
                this.bankNameInput.string = "";
                this.nameInput.string = "";
                this.selectProvinceLabel.string = "请选择开户省";
                this.selectCityLabel.string = "请选择开户市";
                this.app.setInputColor("",this.AqmLabel)
                this.AqmLabel.string = "点击输入";
                //如果是充值打开隐藏按钮旁边的文字
                if(this.app.UrlData.package_id == 16 && this.node.name == "Zfb"){
                    this.node.getChildByName("zi").active  = true
                }
            }
        }
    }
    isChinese(s){
        var ret = true;
        for(var i = 0;i<s.length;i++){//遍历每一个文本字符bai
            ret = ret && (s.charCodeAt(i) >= 10000 ||s.charCodeAt(i)  == 183 );//判断文本字符的unicode值 ,183 为 · 
        }
        return ret
    }
    fetchBindAccountPay() {
        var url = `${this.app.UrlData.host}/api/payment_account/saveAccount`;
        let obj = {};
        let dataStr = ''
        obj = {
            card_num:this.accountInput.string,
            card_name:this.nameInput.string,
            bank_name:this.selectBankLabel.string,
            branch_name:this.bankNameInput.string,
            bank_province:this.selectProvinceLabel.string,
            bank_city:this.selectCityLabel.string,
        };
        let info = JSON.stringify(obj);
        if(this.app.UrlData.package_id != 16){
            dataStr = `user_id=${this.app.UrlData.user_id}&id=${this.itemId}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&type=3&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&id=${this.itemId}&user_name=${decodeURI(this.app.UrlData.user_name)}&action=${this.action}&type=3&info=${info}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&password=${this.AqmLabel.string}`
        }
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.parentComponent.fetchIndex();
                self.app.showAlert(Language_pay.Lg.ChangeByText('操作成功!'))
            }else{
                self.app.showAlert(response.msg == "密码错误！"?"安全码错误！":response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    addProvinceItem(){
        var results = ['北京', '天津', '上海', '重庆', '河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东',
        '河南','湖北','湖南','广东','海南','四川','贵州','云南','陕西','甘肃','青海','内蒙古','广西','西藏','宁夏','新疆','香港','澳门','台湾']
        for (var i = 0; i < results.length; i++) {
            var node = cc.instantiate(this.BankSelectItem);
            this.selectProvinceContent.addChild(node);
            node.getComponent('payBankSelectItem').init({
                text: results[i],
                Content:this.selectProvinceContent,
                Label:this.selectProvinceLabel

            })
        }
    }
    addBankItem(){
        this.fetchgetbankName()
    }
    public fetchgetbankName(){
        var url = `${this.app.UrlData.host}/api/payment_account/getbankName?package_id=${this.app.UrlData.package_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                let results = []
                for(var k in response.data){
                    results.push(response.data[k])
                }
                for (var i = 0; i < results.length; i++) {
                    var node = cc.instantiate(self.BankSelectItem);
                    self.selectBankContent.addChild(node);
                    node.getComponent('payBankSelectItem').init({
                        text: results[i],
                        Content:self.selectBankContent,
                        Label:self.selectBankLabel
                    })
                }
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    selectProvinceClick() {
        if (!this.selectProvinceContent.active) {
            this.selectProvinceContent.active = true;
             //关闭其他下拉框
             this.selectCityContent.active = false;
             this.selectBankContent.active = false;
        } else {
            this.selectProvinceContent.active = false;
        }
        this.selectCityLabel.string = Language_pay.Lg.ChangeByText('请选择开户市')
        
    }
    selectCityClick() {
        if(this.selectProvinceLabel.string == Language_pay.Lg.ChangeByText('请选择开户省')) {
            this.app.showAlert(Language_pay.Lg.ChangeByText('请先选择开户省'))
            return
        }
        var results = cities[this.selectProvinceLabel.string]
        if (!this.selectCityContent.active) {
            this.selectCityContent.removeAllChildren();
            this.selectCityContent.active = true;
            for (var i = 0; i < results.length; i++) {
                var node = cc.instantiate(this.BankSelectItem);
                this.selectCityContent.addChild(node);
                node.getComponent('payBankSelectItem').init({
                    text: results[i],
                    Content:this.selectCityContent,
                    Label:this.selectCityLabel
                })
            }
            //关闭其他下拉框
            this.selectProvinceContent.active = false;
            this.selectBankContent.active = false;
        } else {
            this.selectCityContent.removeAllChildren();
            this.selectCityContent.active = false;
        }
    }
    selectBankClick() {
        if (!this.selectBankContent.active) {
            this.selectBankContent.active = true;
            //关闭其他下拉框
            this.selectProvinceContent.active = false;
            this.selectCityContent.active = false;
        } else {
            this.selectBankContent.active = false;
        }
    }
    setAqm() {
        this.app.showKeyBoard(this.AqmLabel,4);
    }
    deleteName() {
         //按键音效
         this.app.loadMusic(1)

         this.nameInput.string = '';
    }

    deleteAccount() {
         //按键音效
         this.app.loadMusic(1)
         this.accountInput.string = '';
    }

    deleteBankName() {
         //按键音效
         this.app.loadMusic(1)
         this.bankNameInput.string = '';
    }
    shangyibu(){
        if(this.app.UrlData.package_id == 16){
            this.node.getChildByName("bindBankAccount").active = false
            this.node.getChildByName("Bank").active = true
        }
    }
    removeSelf() {
         //按键音效
         this.app.loadMusic(1)

        this.node.destroy();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let bankcard_form= cc.find('Canvas/BankAccountAlert/Layout/content/bankcard_form')
        let btn1= cc.find('Canvas/BankAccountAlert/Layout/btn1')

        if(this.app.UrlData.package_id == 8 || this.app.UrlData.package_id == 12){
            this.app.loadIconLg(`${src}/font/bankcard_form_0`, bankcard_form.children[0])
            this.app.loadIconLg(`${src}/font/bankcard_form_1`, bankcard_form.children[1])
            this.app.loadIconLg(`${src}/font/bankcard_form_2`, bankcard_form.children[2])
            this.app.loadIconLg(`${src}/font/bankcard_form_3`, bankcard_form.children[3])
            this.app.loadIconLg(`${src}/font/bankcard_form_4`, bankcard_form.children[4])
            this.app.loadIconLg(`${src}/font/bankcard_form_5`, bankcard_form.children[5])
            this.app.loadIconLg(`${src}/font/queding`, btn1.children[0])
            bankcard_form.getChildByName('label').getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('*温馨提示：绑定银行卡后无法自行修改! 请仔细填写您的银行卡信息!')
        }else if(this.app.UrlData.package_id == 10){
            this.app.loadIconLg(`${src}/font/bankcard_form_0`, bankcard_form.children[0])
            this.app.loadIconLg(`${src}/font/bankcard_form_1`, bankcard_form.children[1])
            this.app.loadIconLg(`${src}/font/bankcard_form_2`, bankcard_form.children[2])
            this.app.loadIconLg(`${src}/font/bankcard_form_3`, bankcard_form.children[3])
            this.app.loadIconLg(`${src}/font/bankcard_form_4`, bankcard_form.children[4])
            this.app.loadIconLg(`${src}/font/bankcard_form_5`, bankcard_form.children[5])
            this.app.loadIconLg(`${src}/font/queding`, btn1.children[0])
            this.app.loadIconLg(`${src}/font/bind_bank_ts`, bankcard_form[12])
            
        }else if(this.app.UrlData.package_id == 9){
            this.app.loadIconLg(`${src}/font/bankcard_form_0`, bankcard_form.children[0])
            this.app.loadIconLg(`${src}/font/bankcard_form_1`, bankcard_form.children[1])
            this.app.loadIconLg(`${src}/font/bankcard_form_2`, bankcard_form.children[2])
            this.app.loadIconLg(`${src}/font/bankcard_form_3`, bankcard_form.children[3])
            this.app.loadIconLg(`${src}/font/bankcard_form_4`, bankcard_form.children[4])
            this.app.loadIconLg(`${src}/font/bankcard_form_5`, bankcard_form.children[5])
            this.app.loadIconLg(`${src}/font/queding`, btn1.children[0])
            bankcard_form.getChildByName('label').getComponent(cc.Label).string = Language_pay.Lg.ChangeByText('*温馨提示：绑定银行卡后无法自行修改! 请仔细填写您的银行卡信息!')
        }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 16 || this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 20){

        }else{
            this.app.loadIconLg(`${src}/form/bankcard_form`,bankcard_form)
            this.app.loadIconLg(`${src}/btn/surecg`,btn1)
        }
        if(this.app.UrlData.package_id != 16){
            this.nameInput.placeholder = Language_pay.Lg.ChangeByText('请输入姓名')
            this.accountInput.placeholder = Language_pay.Lg.ChangeByText('请输入银行卡号')
            this.bankNameInput.placeholder = Language_pay.Lg.ChangeByText('请输入开户支行')
        }
    }
}
