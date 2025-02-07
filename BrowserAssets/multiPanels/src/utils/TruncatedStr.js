import { StrTruncatedLength } from "@/config/constant";

export function getStrDisplayLength(str) {
    let strDisplayLength = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255) {
            strDisplayLength += 2;
        }
        else {
            strDisplayLength += 1;
        }
    }
    return strDisplayLength;
}

export function getTruncatedStr(str) {
    const strDisplayLength = getStrDisplayLength(str);
    if (str.length <= StrTruncatedLength) {
        return str;
    }
    else {
        let truncatedStr = "";
        for (let i = 1; i <= str.length; i++) {
            let truncatedStrDisplayLength = getStrDisplayLength(str.substr(0, i));
            if (truncatedStrDisplayLength > StrTruncatedLength) {
                truncatedStr = str.substr(0, i - 1);
                break;
            }
        }
        truncatedStr += "...";
        return truncatedStr;
    }
}