import {
    checkbox,
    collapsibleList,
    explanation,
    footerButtons,
    multiPagePopup,
    popup,
    popupWithBottomButtons,
    sep,
    settingsCategory,
    switcher,
    socialLink,
    socialLinks,
    urgentNotice,
    keyboardShortcuts,
    webLoc,
    sponsoredList,
    betaTag
} from "./elements.js";
import {services as s, authorInfo, version, repo, donations, supportedAudio} from "../config.js";
import {getCommitInfo} from "../sub/currentCommit.js";
import loc from "../../localization/manager.js";
import emoji from "../emoji.js";
import changelogManager from "../changelog/changelogManager.js";

let com = getCommitInfo();

let enabledServices = Object.keys(s).filter(p => s[p].enabled).sort().map((p) => {
    return `<br>&bull; ${s[p].alias ? s[p].alias : p}`
}).join('').substring(4)

let donate = ``
let donateLinks = ``
let audioFormats = supportedAudio.map((p) => {
    return {"action": p}
})
audioFormats.unshift({"action": "best"})
for (let i in donations["links"]) {
    donateLinks += `<a id="don-${i}" class="switch autowidth" href="${donations["links"][i]}" target="_blank">REPLACEME ${i}</a>`
}
let extr = ''
for (let i in donations["crypto"]) {
    donate += `<div class="subtitle${extr}">${i} (REPLACEME)</div><div id="don-${i}" class="text-to-copy" onClick="copy('don-${i}')">${donations["crypto"][i]}</div>`
    extr = ' top-margin'
}

export default function (obj) {
    const t = (str, replace) => {
        return loc("ru", str, replace)
    };

    let ua = obj.useragent.toLowerCase();
    let isIOS = ua.match("iphone os");
    let isMobile = ua.match("android") || ua.match("iphone os");

    let platform = isMobile ? "m" : "d";
    if (isMobile && isIOS) platform = "i";

    audioFormats[0]["text"] = t('SettingsAudioFormatBest');

    try {
        return `
<!DOCTYPE html>
<html lang="${obj.lang}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="viewport-fit=cover, width=device-width, height=device-height, initial-scale=1, maximum-scale=${isIOS ? `1` : `5`}" />

        <title>${t("AppTitleCobalt")}</title>

        <meta property="og:url" content="${process.env.webURL || process.env.selfURL}" />
        <meta property="og:title" content="${t("AppTitleCobalt")}" />
        <meta property="og:description" content="${t('EmbedBriefDescription')}" />
        <meta property="og:image" content="${process.env.webURL || process.env.selfURL}icons/generic.png" />
        <meta name="title" content="${t("AppTitleCobalt")}" />
        <meta name="description" content="${t('AboutSummary')}" />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:card" content="summary" />
        
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="${t("AppTitleCobalt")}">

        <link rel="icon" type="image/x-icon" href="icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />

        <link rel="manifest" href="manifest.webmanifest" />
        <link rel="stylesheet" href="fonts/notosansmono.css" rel="preload" />
        <link rel="stylesheet" href="cobalt.css" />

        <link rel="me" href="${authorInfo.support.default.mastodon.url}">

        <noscript><div style="margin: 2rem;">${t('NoScriptMessage')}</div></noscript>
        <!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(95905279, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/95905279" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
<!-- Yandex.RTB -->
<script>window.yaContextCb=window.yaContextCb||[]</script>
<script src="https://yandex.ru/ads/system/context.js" async></script>
    </head>
    <body id="cobalt-body" ${platform === "d" ? 'class="desktop"' : ''} data-nosnippet ontouchstart>
    
        <div style="display: flex;
    width: 100vw;
    justify-content: center;
    position: absolute;
    max-height: 50vh;
    align-items: center;
    flex-direction: column;">
    <div id="yandex_rtb_R-A-4533493-3"></div>
    <script>
    window.yaContextCb.push(()=>{
        Ya.Context.AdvManager.render({
            "blockId": "R-A-4533493-3",
            "renderTo": "yandex_rtb_R-A-4533493-3"
        })
    })
    </script>
        <a>скачай все что угодно без лишних действий!<br/> в лучшем качестве из YouTube, ВК, Inst и других мест</a>
        </div>
        <script>
            window.yaContextCb.push(()=>{
                Ya.Context.AdvManager.render({
                    "blockId": "R-A-4533493-1",
                    "type": "fullscreen",
                    "platform": "desktop"
                })
            })
        </script>
        <script>
            window.yaContextCb.push(()=>{
                Ya.Context.AdvManager.render({
                    "blockId": "R-A-4533493-2",
                    "type": "fullscreen",
                    "platform": "touch"
                })
            })
            </script>
        <body id="notification-area"></div>
        ${multiPagePopup({
            name: "about", closeAria: t('AccessibilityGoBack'), tabs: [{
                name: "about", title: `${emoji("🐲")} ${t('AboutTab')}`, content: popup({
                    name: "about", header: {
                        aboveTitle: {
                            text: t('MadeWithLove'), url: authorInfo.link
                        }, closeAria: t('AccessibilityGoBack'), title: `${emoji("🔮", 30)} ${t('TitlePopupAbout')}`
                    }, body: [{
                        text: t('AboutSummary')
                    }, {
                        text: collapsibleList([{
                            name: "services",
                            title: `${emoji("🔗")} ${t("CollapseServices")}`,
                            body: `${enabledServices}` + `<div class="explanation embedded">${t("SupportNotAffiliated")}` + `${obj.lang === "ru" ? `<br>${t("SupportMetaNoticeRU")}` : ''}` + `</div>` + `${t("ServicesNote")}`
                        }, {
                            name: "keyboard",
                            title: `${emoji("⌨")} ${t("CollapseKeyboard")}`,
                            body: `${t("KeyboardShortcutsIntro")}
                            ${keyboardShortcuts([{
                                items: [{
                                    combo: "Shift+D", name: t("PasteFromClipboard")
                                }, {
                                    combo: "Shift+K", name: t("ModeToggleAuto")
                                }, {
                                    combo: "Shift+L", name: t("ModeToggleAudio")
                                }]
                            }, {
                                items: [{
                                    combo: "Ctrl+V", name: t("KeyboardShortcutQuickPaste")
                                }, {
                                    combo: "Esc", name: t("KeyboardShortcutClear")
                                }, {
                                    combo: "Esc", name: t("KeyboardShortcutClosePopup")
                                }]
                            }, {
                                items: [{
                                    combo: "Shift+B", name: t("AboutTab")
                                }, {
                                    combo: "Shift+N", name: t("ChangelogTab")
                                }, {
                                    combo: "Shift+M", name: t("TitlePopupSettings")
                                }]
                            }])}`
                        }, {
                            name: "privacy", title: `${emoji("🔒")} ${t("CollapsePrivacy")}`, body: t("PrivacyPolicy")
                        }, {
                            name: "legal", title: `${emoji("📑")} ${t("CollapseLegal")}`, body: t("FairUse")
                        }])
                    }]
                })
            }],
        })}
        ${multiPagePopup({
            name: "settings", closeAria: t('AccessibilityGoBack'), header: {
                aboveTitle: {
                    text: `v.${version}-${obj.hash}${platform} (${obj.branch})`, url: `${repo}/commit/${obj.hash}`
                }, title: `${emoji("⚙️", 30)} ${t('TitlePopupSettings')}`
            }, tabs: [{
                name: "video", title: `${emoji("🎬")} ${t('SettingsVideoTab')}`, content: settingsCategory({
                    name: "downloads", title: t('SettingsQualitySubtitle'), body: switcher({
                        name: "vQuality", explanation: t('SettingsQualityDescription'), items: [{
                            action: "max", text: "8k+"
                        }, {
                            action: "2160", text: "4k"
                        }, {
                            action: "1440", text: "1440p"
                        }, {
                            action: "1080", text: "1080p"
                        }, {
                            action: "720", text: "720p"
                        }, {
                            action: "480", text: "480p"
                        }, {
                            action: "360", text: "360p"
                        }]
                    })
                }) + settingsCategory({
                    name: "tiktok", title: "tiktok", body: checkbox([{
                        action: "disableTikTokWatermark", name: t("SettingsRemoveWatermark"), padding: "no-margin"
                    }])
                }) + settingsCategory({
                    name: "codec", title: t('SettingsCodecSubtitle'), body: switcher({
                        name: "vCodec", explanation: t('SettingsCodecDescription'), items: [{
                            action: "h264", text: "h264 (mp4)"
                        }, {
                            action: "av1", text: "av1 (mp4)"
                        }, {
                            action: "vp9", text: "vp9 (webm)"
                        }]
                    })
                }) + settingsCategory({
                    name: "vimeo", title: t('SettingsVimeoPrefer'), body: switcher({
                        name: "vimeoDash", explanation: t('SettingsVimeoPreferDescription'), items: [{
                            action: "false", text: "progressive"
                        }, {
                            action: "true", text: "dash"
                        }]
                    })
                })
            }, {
                name: "audio", title: `${emoji("🎶")} ${t('SettingsAudioTab')}`, content: settingsCategory({
                    name: "general", title: t('SettingsFormatSubtitle'), body: switcher({
                        name: "aFormat", explanation: t('SettingsAudioFormatDescription'), items: audioFormats
                    }) + sep(0) + checkbox([{
                        action: "muteAudio", name: t("SettingsVideoMute"), padding: "no-margin"
                    }]) + explanation(t('SettingsVideoMuteExplanation'))
                }) + settingsCategory({
                    name: "dub", title: t("SettingsAudioDub"), body: switcher({
                        name: "dubLang", explanation: t('SettingsAudioDubDescription'), items: [{
                            action: "original", text: t('SettingsDubDefault')
                        }, {
                            action: "auto", text: t('SettingsDubAuto')
                        }]
                    })
                }) + settingsCategory({
                    name: "tiktok", title: "tiktok", body: checkbox([{
                        action: "fullTikTokAudio", name: t("SettingsAudioFullTikTok"), padding: "no-margin"
                    }]) + explanation(t('SettingsAudioFullTikTokDescription'))
                })
            }, {
                name: "other", title: `${emoji("🪅")} ${t('SettingsOtherTab')}`, content: settingsCategory({
                    name: "appearance", title: t('SettingsAppearanceSubtitle'), body: switcher({
                        name: "theme", items: [{
                            action: "auto", text: t('SettingsThemeAuto')
                        }, {
                            action: "dark", text: t('SettingsThemeDark')
                        }, {
                            action: "light", text: t('SettingsThemeLight')
                        }]
                    })
                }) + settingsCategory({
                    name: "filename", title: t('FilenameTitle'), body: switcher({
                        name: "filenamePattern", items: [{
                            action: "classic", text: t('FilenamePatternClassic')
                        }, {
                            action: "basic", text: t('FilenamePatternBasic')
                        }, {
                            action: "pretty", text: t('FilenamePatternPretty')
                        }, {
                            action: "nerdy", text: t('FilenamePatternNerdy')
                        }]
                    }) + `<div id="filename-preview">
                        <div id="video-filename" class="filename-item line">
                            ${emoji('🎞️', 32, 1, 1)}
                            <div class="filename-container">
                                <div class="filename-label">${t('Preview')}</div>
                                <div id="video-filename-text"></div>
                            </div>
                        </div>
                        <div id="audio-filename" class="filename-item">
                            ${emoji('🎧', 32, 1, 1)}
                            <div class="filename-container">
                                <div class="filename-label">${t('Preview')}</div>
                                <div id="audio-filename-text"></div>
                            </div>
                        </div>
                    </div>` + explanation(t('FilenameDescription'))
                }) + settingsCategory({
                    name: "accessibility", title: t('Accessibility'), body: checkbox([{
                        action: "alwaysVisibleButton",
                        name: t("SettingsKeepDownloadButton"),
                        aria: t("AccessibilityKeepDownloadButton")
                    }, {
                        action: "reduceTransparency", name: t("SettingsReduceTransparency")
                    }, {
                        action: "disableAnimations", name: t("SettingsDisableAnimations"), padding: "no-margin"
                    }])
                }) + settingsCategory({
                    name: "miscellaneous", title: t('Miscellaneous'), body: checkbox([{
                        action: "downloadPopup",
                        name: t("SettingsEnableDownloadPopup"),
                        aria: t("AccessibilityEnableDownloadPopup")
                    }, {
                        action: "disableMetadata", name: t("SettingsDisableMetadata")
                    }, {
                        action: "disableChangelog", name: t("SettingsDisableNotifications"), padding: "no-margin"
                    }])
                })
            }]
        })}
        ${popupWithBottomButtons({
            name: "picker",
            closeAria: t('AccessibilityGoBack'),
            header: {
                title: `${emoji("🧮", 30)} <div id="picker-title"></div>`,
                explanation: `<div id="picker-subtitle"></div>`,
            },
            buttons: [`<a id="picker-download" class="switch" target="_blank" href="/">${t('ImagePickerDownloadAudio')}</a>`],
            content: '<div id="picker-holder"></div>'
        })}
        <div id="popup-download-container" class="popup-from-bottom">
            ${popup({
            name: "download", standalone: true, buttonOnly: true, classes: ["small"], header: {
                closeAria: t('AccessibilityGoBack'), emoji: emoji("🐱", 78, 1, 1), title: t('TitlePopupDownload')
            }, body: switcher({
                name: "download",
                explanation: `${!isIOS ? t('DownloadPopupDescription') : t('DownloadPopupDescriptionIOS')}`,
                items: `<a id="pd-download" class="switch full" target="_blank" href="/"><span>${t('Download')}</span></a>
                    <div id="pd-share" class="switch full">${t('ShareURL')}</div>
                    <div id="pd-copy" class="switch full">${t('CopyURL')}</div>`
            }), buttonText: t('PopupCloseDone')
        })}
        </div>
        <div id="popup-error-container" class="popup-from-bottom">
            ${popup({
            name: "error",
            standalone: true,
            buttonOnly: true,
            classes: ["small"],
            header: {
                title: t('TitlePopupError'), emoji: emoji("😿", 78, 1, 1),
            },
            body: `<div id="desc-error" class="desc-padding subtext desc-error"></div>`,
            buttonText: t('ErrorPopupCloseButton')
        })}
        </div>
        <div id="popup-migration-container" class="popup-from-bottom">
            ${popup({
            name: "migration",
            standalone: true,
            buttonOnly: true,
            classes: ["small"],
            header: {
                title: t('NewDomainWelcomeTitle'), emoji: emoji("😸", 78, 1, 1),
            },
            body: `<div id="desc-migration" class="desc-padding subtext desc-error">${t('NewDomainWelcome')}</div>`,
            buttonText: t('ErrorPopupCloseButton')
        })}
            <div id="popup-backdrop-message" onclick="popup('message', 0)"></div>
        </div>
        <div id="popup-backdrop" onclick="hideAllPopups()"></div>
        <div id="home" style="visibility:hidden">
            <div id="cobalt-main-box" class="center">
                <div id="logo">${t("AppTitleCobalt")}${betaTag()}</div>
                <div id="download-area">
                    <div id="top">
                        <input id="url-input-area" class="mono" type="text" autocorrect="off" maxlength="128" autocapitalize="off" placeholder="${t('LinkInput')}" aria-label="${t('AccessibilityInputArea')}" oninput="button()"></input>
                        <button id="url-clear" onclick="clearInput()" style="display:none;">x</button>
                        <input id="download-button" class="mono dontRead" onclick="download(document.getElementById('url-input-area').value)" type="submit" value="" disabled=true aria-label="${t('AccessibilityDownloadButton')}">
                    </div>
                    <div id="bottom">
                        <button id="paste" class="switch" onclick="pasteClipboard()" aria-label="${t('PasteFromClipboard')}">${emoji("📋", 22)} ${t('PasteFromClipboard')}</button>
                        ${switcher({
            name: "audioMode", noParent: true, items: [{
                action: "false", text: `${emoji("✨")} ${t("ModeToggleAuto")}`
            }, {
                action: "true", text: `${emoji("🎶")} ${t("ModeToggleAudio")}`
            }]
        })}
                    </div>
                </div>
            </div>
            <footer id="footer">
                ${footerButtons([{
            name: "about", type: "popup", text: `${emoji("🐲", 22)} ${t('AboutTab')}`, aria: t('AccessibilityOpenAbout')
        }, {
            name: "settings",
            type: "popup",
            text: `${emoji("⚙️", 22)} ${t('TitlePopupSettings')}`,
            aria: t('AccessibilityOpenSettings')
        }])}
            </footer>
        </div>
    </body>
    <script type="text/javascript">
        let defaultApiUrl = '${process.env.apiURL ? process.env.apiURL : ''}';
        const loc = ${webLoc(t, ['ErrorNoInternet', 'ErrorNoUrlReturned', 'ErrorUnknownStatus', 'ChangelogPressToHide', 'MediaPickerTitle', 'MediaPickerExplanationPhone', 'MediaPickerExplanationPC', 'ImagePickerTitle', 'ImagePickerExplanationPhone', 'ImagePickerExplanationPC', 'FeatureErrorGeneric', 'ClipboardErrorNoPermission', 'ClipboardErrorFirefox', 'DataTransferSuccess', 'DataTransferError', 'FilenamePreviewVideoTitle', 'FilenamePreviewAudioTitle', 'FilenamePreviewAudioAuthor'])}
    </script>
    <script type="text/javascript" src="cobalt.js"></script>
</html>
`
    } catch (err) {
        return `${t('ErrorPageRenderFail', obj.hash)}`;
    }
}
