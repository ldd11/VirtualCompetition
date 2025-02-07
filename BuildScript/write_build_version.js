const versionConfig = require('../Assets/StreamingAssets/version.json');
const channelsConfig = require('../Assets/StreamingAssets/channels.json');
const fs = require('fs');

if (!versionConfig) {
  return;
}

if (process.argv[2]) {
  const version = process.argv[2];
  versionConfig.version = version;
}

if (process.argv[3]) {
  const gameid = process.argv[3];
  versionConfig.gameid = gameid;
  if (channelsConfig && channelsConfig[gameid]) {
    versionConfig.name = channelsConfig[gameid].productName;
    versionConfig.title = channelsConfig[gameid].title;
  }
}

fs.writeFileSync('./Assets/StreamingAssets/version.json', JSON.stringify(versionConfig, null, 2));