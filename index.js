let Core = Packages.ws.siri.Core;

let net = Packages.ws.siri.jscore.mapping.JSPackage.getRoot().net;
let MinecraftClient = net.minecraft.client.MinecraftClient;
let Text = net.minecraft.text.Text;

let LoggerFactory = org.slf4j.LoggerFactory;
let logger = LoggerFactory.getLogger(Core.MOD_ID);

function print(prefix, content) {
    let s = content.toString();

    s = s
        .split("\n")
        .map((s) => `${prefix}${s}`)
        .join("\n");

    if (MinecraftClient.getInstance().player != null) {
        MinecraftClient.getInstance()
            .inGameHud.getChatHud()
            .addMessage(Text.literal(s));
    }
}

function error(content) {
    content ??= "";
    logger.error(content);
    print("\u00A78[\u00A7c\u00A7lERROR\u00A78] \u00A77", content);
}

function warn(content) {
    content ??= "";
    logger.warn(content);
    print("\u00A78[\u00A7e\u00A7lWARN\u00A78] \u00A77", content);
}

function info(content) {
    content ??= "";
    logger.info(content);
    print("\u00A78[\u00A7a\u00A7lINFO\u00A78] \u00A77", content);
}

function debug(content) {
    content ??= "";
    logger.debug(content);
    print("\u00A78[\u00A7d\u00A7lDEBUG\u00A78] \u00A77", content);
}

function log(content) {
    content ??= "";
    logger.trace(content);
    print("\u00A78[\u00A77\u00A7lLOG\u00A78] \u00A77", content);
}

function trace(content) {
    content ??= "";
    logger.trace(content);
    print("\u00A78[\u00A78\u00A7lTRACE\u00A78] \u00A77", content);
}

function assert(condition, content) {
    if (condition) error(content);
}

function clear() {
    if (MinecraftClient.getInstance().player != null) {
        MinecraftClient.getInstance().inGameHud.getChatHud().clear(true);
    }
}

let counters = {};

function count(label) {
    if (counters[label] === undefined) counters[label] = 0;

    log(`${label}: ${++counters[label]}`);
}

function countReset(label) {
    counters[label] = 0;
}

let timers = {};

function time(label) {
    timers[label] = Date.now();
}

function timeLog(label) {
    if (timers[label] === undefined) {
        error(`time ${label} does not exist`);
        return;
    }

    log(`${label}: ${Date.now() - timers[label]}ms`);
}

function timeEnd(label) {
    timeLog(label);
    delete timers[label];
}

module.exports = {
    error,
    warn,
    log,
    debug,
    info,
    trace,

    assert,
    clear,
    count,
    countReset,

    time,
    timeLog,
    timeEnd,

    print: (s) => {
        if (MinecraftClient.getInstance().player != null) {
            MinecraftClient.getInstance()
                .inGameHud.getChatHud()
                .addMessage(Text.literal(`${s}`));
        }
    },
};
