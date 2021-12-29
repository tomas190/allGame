
let lan = {
   
    p1_sjid : '上级ID',
    p1_zsid : '直属下级玩家数',
    p1_dllzwjs : '代理链总玩家数',
    p1_zryjs : '昨日佣金总数',
    p1_wxti :'温馨提示： 点击直属下级玩家下面的数字可以查看下级信息',
    p1_yjfxpt:'一键分享到社区平台',
    p1_wdyjye:'我的佣金余额',
    p1_yh:'用户',
    p1_qsrzzje:'请输入转账金额',
    p1_qd:'确定',
    p1_qx:'取消',
    p1_cg:'转账成功',
    p1_sb:'转账失败',
    p1_tzz:'跳转中...',
    p1_yqsj:"邀请时间",
    p1_wjid:"玩家ID",
    p1_xjrs:'下级人数',
    p1_ljgxyj:"累积贡献佣金",
    p1_cz:'操作',

    p2_ts:'温馨提示: 视讯龙虎斗, 视讯百家乐,彩票,沙巴体育等游戏不参与分佣计算.',
    p2_tdls:'团队总流水',
    p2_jryj:'今日佣金',
    p2_lszyj:'历史总佣金',
    p2_yjye:'佣金余额',
    p2_rq:'日期',
    p2_tdzls:'团队总流水',
    p2_yjbl:'佣金比例',
    p2_yj:'佣金',
    p2_sjjzz:'数据加载中...',
    p2_lqyj:'暂无可领取佣金，快去推广赚佣金吧！',
    p2_lqcg:'领取成功',
    p2_lqsb:'领取失败',

    p3_ly:`
    <color=#D4B79D>例1：A的直属玩家B1,B2,B3当天流水分别为10000，50000，80000，B没有发展用户，那么A今天能赚多少佣金呢？
    （10000+50000+80000）* 0.05 * 50% * 35% = 1225
     
    例2：A的直属玩家B1,B2,B3,B4，当天流水分别为8000,10000,20000,50000，B发展用户C1,C2当天流水收益分别为50000,80000，C没有发展用户，那么A今天能赚多少佣金呢？
    （8000+10000+20000+50000）* 0.05 * 50% * 35% + （50000+80000）* 0.05 * 50% * 35% * 35% = 1168.125</c>
    `

    ,
    p3_jd:`<color=#FE7676>1.如何做代理？</c>
    <color=#D4B79D>答：所有玩家都可以成为我们的官方代理，您通过微信、QQ等方式分享您的二维码或者邀请链接；通过此方式注册的会员即为您的直属代理，其邀请的下级会员皆算做您的下线玩家，可无限裂变式发展。 </c> 
    
    <color=#FE7676>2.返佣比例怎么计算？     </c>   
    <color=#D4B79D>答：返佣比例设置为35%，流水是指某会员下注消费的实际金额（未结算不计算在内）流水不计输赢。例如某会员这把下注赢1000，下把输500，则流水为1500元。   </c>     
    
    <color=#FE7676>3.佣金怎么计算？       </c> 
    <color=#D4B79D>答：每一级佣金是您该级玩家总流水 * 0.05 * 50% * 对应级别的返佣比例。您的总佣金为所有级别下线贡献佣金之和，不限级别。       </c> 
    
    <color=#FE7676>4.佣金多久结算？   </c>     
    <color=#D4B79D>答：佣金实时更新，您可以及时查看您的佣金增长与领取。</c>
    
    <color=#FE7676>备注：视讯龙虎斗, 视讯百家乐, 彩票等游戏不参与分佣计算 </c> ` ,

    p4_rq:'年/月/日',
    p4_ym:"共...页" ,
    p4_xjmx:'下级明细',
    p4_qplyx:'棋牌类游戏',
    p4_cplyx:'彩票类游戏',
    p4_tylyx:'体育类游戏',
    p4_sxlyx:'视讯类游戏',
    p4_gz:'规则',
    p4_tjlx:'统计类型',
    p4_yxfl:'游戏分类',
    p4_zql:'：周期量(日量)大于等于',
    p4_fhbl:'元，分红比例',
    p4_dqlx:'当前游戏类型',
    p4_ls:'流水',
    p4_ks:'亏损',
    p4_gzcg:'规则设定成功',
    p4_zqlbyl:'：周期量(半月量)大于等于',
    p4_syyxlx:'所有游戏类型',
    p4_dqyxlx:'当前游戏类型',
    p4_tjfs:'统计方式:',
    p4_tjfw:'统计范围:',
    p4_blsd:'比例设定',
    p4_num:["零", "一", "二", "三", "四", "五", "六", "七", "八", "九",],
    p4_nums : ["", "万", "亿", "万亿", "亿亿"],
    p4_numss:["", "十", "百", "千"],
    p4_xgcg:'修改成功',
    p4_lx:['棋牌','彩票','体育','视讯'],
    p4_zjzrcg:'资金转入成功',
    p4_xjid:'下级ID:',
    p4_tjgz:'+添加规则',
    p4_tdgz:'团队总流水大于等于',
    p4_itemArray : ['当前游戏类型', '全部游戏类型'],
    p4_time:['日','一','二','三','四','五','六'],
    p4_cx:'查询时间范围不超过30天',

    p5_s:'上',
    p5_x:'下',
    p5_gy:'共  页',
    p5_dy:'到         页',
    p5_ffcg:'发放成功玩家：',
    p5_ffsb:"发放失败玩家：",





    Switchtext(text) {
        let txt;
        switch (text) {
            case "child amount already exists":
                txt = '设置周期量已经存在'
                break;
            case "child percent is too big":
                txt = '分红比例设置百分比太大'
                break;
            case "proxy amount already exists":
                txt = '上级周期量已存在'
                break;
            case "proxy percent is too big":
                txt = '超过上级分红比例设置'
                break;
            case "percent must be great than original":  //"amount must great than 0"
                txt = '分红比例必须大于原始值'
                break;
            case "amount must great than 0":  //"amount must be less than original"
                txt = '周期量必须大于零'
                break;
            case "amount must be less than original":
                txt = '周期量必须小于原始周期量'
                break;
            case "last date is too big":
                txt = '查询日期超过当前日期'
                break;
            case "proxy user balance is not enough":
                txt = ' 佣金账号余额不足'
                break;
            case "last date is too small":
                txt = ' 结束时间小于开始时间'
                break;
            case "game user balance is not enough":
                txt = ' 游戏账户金额不足'
                break;
            case "proxy amount is too small":
                txt = '周期量设置太小'
                break;
            case  "round id is empty":
                txt = '请选择需要发放的分红信息'
                break;
            default:
                txt = '设置失败'
                break;
        }
        return txt;
    }
};
module.exports = lan;
