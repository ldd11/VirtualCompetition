import axios from 'axios';

class ImageDownloader {
  proxyPort = -1;

  getImageLinks(content) {
    const imgPattern = new RegExp('<img src="(.+?)"(.+?)>', 'g');
    const imgMatchs = content.match(imgPattern);
    if (!imgMatchs || !imgMatchs.length) {
      return [];
    }

    return imgMatchs.map((originStr) => {
      const href_pattern = /src="(.+?)"/g;
      const href_matches = href_pattern.exec(originStr);
      let url = '';
      if (href_matches) {
        url = href_matches[1];
      }
      return url;
    });
  }

  replaceImageLinks(content, links) {
    const imgPattern = new RegExp('<img src="(.+?)"(.+?)>', 'g');
    const imgMatchs = content.match(imgPattern) || [];

    const replaces = [];
    const replace_pattern = new RegExp('<img (.+?)>', 'g');
    const len = imgMatchs.length;
    for (let i = 0; i < len; ++i) {
      const str = imgMatchs[i];
      replaces.push({
        origin: str,
        replace: str.replace(replace_pattern, `<img src="data:image/png;base64,${links[i] || ""}">`)
      });
    }

    let result = content;

    replaces.forEach((data) => {
      result = result.replace(data.origin, data.replace);
    });

    return result;
  }

  arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }


  fetchImage(url) {
    if (url === '')
    {
      return Promise.resolve(url);
    }
    let reqUrl = url;
    if (this.proxyPort !== -1)
    {
      console.warn('proxy port is:', this.proxyPort);
      reqUrl = `https://127.0.0.1:${this.proxyPort}`;
      return axios.get(reqUrl, {
        headers: {
          "X-Real-Scheme": 'https',
          "X-Real-Host": url.replace('https://', ''),
          'X-Action-Type': 'file-download'
        },
        responseType: 'arraybuffer'
      }).then((res) => {
        return this.arrayBufferToBase64(res.data);
      }).catch(e => {
        console.error(e);
        return '';
      });
    }
    return Promise.resolve(url);
  }

  async loadImageFromRichText(content) {
    const urls = this.getImageLinks(content);
    if (this.proxyPort === -1) {
      console.log('not proxy');
      return content;
    }
    const downloadedUrls = await Promise.all(urls.map(url => {
      return this.fetchImage(url);
    }));
    return this.replaceImageLinks(content, downloadedUrls);
  }
}

export default new ImageDownloader();
