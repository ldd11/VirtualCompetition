const { EventEmitter } = require('events');

const EventUtil = new EventEmitter();
EventUtil.setMaxListeners(0); // 不限制 Listener 总数

window.EventUtil = EventUtil;
export default EventUtil;
