#!/bin/bash

# Set the path to your signing identity
IDENTITY="Developer ID Application: Tencent Technology (Shenzhen) Company Limited (88L2Q4487U)"

# Set the path to your application bundle
APP_PATH="./VirtualCompetition.app"

chmod -R a+xr "$APP_PATH"

echo "------- 签名app内部可执行文件 ---------"

# Sign all libraries in the application bundle
find "$APP_PATH" -name "*.dylib" -exec codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" {} \;

# Sign all frameworks in the application bundle
find "$APP_PATH" -name "*.framework" -exec codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" {} \;

# Sign all plugins and bundles in the application bundle
find "$APP_PATH" -name "*.plugin" -exec codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" {} \;
find "$APP_PATH" -name "*.bundle" -exec codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" {} \;
find "$APP_PATH" -name "*.so" -exec codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" {} \;
find "$APP_PATH" -name "*.o" -exec codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" {} \;

# 遍历应用程序包中的所有文件
for filename in "$APP_PATH"/Contents/MacOS/*; do
    # 如果文件是 Unix 可执行文件
    if [ -x "$filename" ]; then
        # 对文件进行签名
        codesign --force -o runtime --timestamp --sign "$IDENTITY" "$filename"
    fi
done

for filename in "$APP_PATH"/Contents/Libraries/python-3.10.8/bin/*; do
    # 如果文件是 Unix 可执行文件
    if [ -x "$filename" ]; then
        # 对文件进行签名
        codesign --force -o runtime --timestamp --sign "$IDENTITY" "$filename"
    fi
done

codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" "$APP_PATH"/Contents/Libraries/python-3.10.8/lib/libpython3.10.a
codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" "$APP_PATH"/Contents/Libraries/python-3.10.8/lib/python3.10/config-3.10-darwin/libpython3.10.a
codesign --verbose --force -o runtime --timestamp --sign "$IDENTITY" "$APP_PATH"/Contents/MacOS/VirtualCompetition

echo "------- 签名zfbrowser ---------"
BROWSER_PATH="./VirtualCompetition.app/Contents/Frameworks/Chromium Embedded Framework.framework"

codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"/Libraries/libEGL.dylib
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"/Libraries/libswiftshader_libEGL.dylib
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"/Libraries/libGLESv2.dylib
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"/Libraries/libswiftshader_libGLESv2.dylib
codesign --verbose --force -o runtime --deep --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$BROWSER_PATH"

codesign --verbose --force -o runtime --timestamp --entitlements ./browserhelper.entitlements --sign "$IDENTITY" "$APP_PATH"/Contents/Frameworks/ZFGameBrowser.app/Contents/MacOS/ZFGameBrowser 
codesign --verbose --force -o runtime --timestamp --entitlements ./browserhelper.entitlements --sign "$IDENTITY" "$APP_PATH"/Contents/Frameworks/ZFGameBrowser.app 
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$APP_PATH"/Contents/Resources/browser_assets
codesign --verbose --force -o runtime --timestamp --entitlements ./browser.entitlements --sign "$IDENTITY" "$APP_PATH"/Contents/PlugIns/libZFProxyWeb.dylib

echo "------- 签名app文件 ---------"

# Sign the application bundle itself
codesign --verbose --force -o runtime --deep --timestamp --entitlements ./VirtualCompetition.entitlements --sign "$IDENTITY" "$APP_PATH"
# codesign --verbose --force -o runtime --deep --timestamp --sign "$IDENTITY" "$APP_PATH"

echo "------- 验证app签名 ---------"

codesign -vvv --deep --strict VirtualCompetition.app

echo "------- 打包dmg文件 ---------"

appdmg appdmg.json VirtualCompetition.dmg

echo "------- dmg签名 ---------"

codesign --verbose --force -o runtime --deep --timestamp --entitlements ./VirtualCompetition.entitlements --sign "$IDENTITY" VirtualCompetition.dmg

echo "------- dmg文件公证 ---------"

# xcrun notarytool submit --apple-id xxx --password xxx --team-id xxxx --wait VirtualCompetition.dmg
xcrun notarytool submit --apple-id magnumyang@tencent.com --password nodx-oxcn-fpzn-lshv --team-id 88L2Q4487U --wait VirtualCompetition.dmg

# 查询公证log
# xcrun notarytool log xxxx --apple-id xxx --password nxxx --team-id 88L2Q4487U log.json

echo "------- 打离线公证信息 ---------"

xcrun stapler staple VirtualCompetition.dmg

echo "------- 离线公证信息校验 ---------"
xcrun stapler validate VirtualCompetition.dmg