class UrlUtil {
    checkURL(url) {
        // 判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
        // 下面的代码中应用了转义字符"\"输出一个字符"/"
        // eslint-disable-next-line no-useless-escape
        const normalExpression = /^(blob:)?http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        const normalObjExp = new RegExp(normalExpression);
        if (normalObjExp.test(url)) {
            return true;
        }

        // eslint-disable-next-line no-useless-escape
        const blobExpression = /^blob:file:\/\/\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        const blobObjExp = new RegExp(blobExpression);
        if (blobObjExp.test(url)) {
            return true;
        }

        if (url.startsWith("data:image")) {
            return true;
        }

        return false;
    }
}

export default new UrlUtil();
