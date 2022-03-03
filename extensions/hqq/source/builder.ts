
import { BuildPlugin } from '../@types';

export const load: BuildPlugin.load = function() {
    console.debug('hqq load');
};

export const unload: BuildPlugin.Unload = function() {
    console.debug('hqq unload');
};

export const configs: BuildPlugin.Configs = {
    '*': {
        hooks: './hooks',
        options: {
            remoteAddress: {
                label: 'i18n:hqq.options.remoteAddress',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter remote address...',
                    },
                },
                verifyRules: ['required', 'http'],
            },
            enterCocos: {
                label: 'i18n:hqq.options.enterCocos',
                description: 'i18n:hqq.options.enterCocos',
                default: '',
                render: {
                    /**
                     * @en Please refer to Developer -> UI Component for a list of all supported UI components
                     * @zh 请参考 开发者 -> UI 组件 查看所有支持的 UI 组件列表
                     */
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'i18n:hqq.options.enterCocos',
                    },
                },
                verifyRules: ['ruleTest'],
            },
        },
        verifyRuleMap: {
            ruleTest: {
                message: 'i18n:hqq.ruleTest_msg',
                func(val, option) {
                    if (val === 'cocos') {
                        return true;
                    }
                    return false;
                },
            },
        },
    },
};

export const assetHandlers: BuildPlugin.AssetHandlers = './asset-handlers';
