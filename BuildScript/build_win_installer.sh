#!/bin/sh
#设置输入的根目录
PROJECT_DIR=$1
#输出平台
PLATFORM=$2
#版本
VERSION=$3
#APPID
APPID=$4
#是否需要卸载程序
UNINST=$5
#nsis路径
NSIS_PATH="E:\NSIS\makensis.exe"
#NSIS_PATH="C:\Program Files (x86)\NSIS\makensis.exe"

#安装包生成脚本
NSIS_INSTALL_SCRIPT_PATH="${PROJECT_DIR}\BuildScript\install.nsi"

if [ $PLATFORM = "windows64" ]
then
  if [ $UNINST = 1 ]
  then
    NSIS_INSTALL_SCRIPT_PATH="${PROJECT_DIR}\BuildScript\\${APPID}\install-windows-64-uninst.nsi"
  else
    NSIS_INSTALL_SCRIPT_PATH="${PROJECT_DIR}\BuildScript\\${APPID}\install-windows-64.nsi"
  fi
fi

if [ $PLATFORM = "windows32" ]
then
  if [ $UNINST = 1 ]
  then
    NSIS_INSTALL_SCRIPT_PATH="${PROJECT_DIR}\BuildScript\\${APPID}\install-windows-32-uninst.nsi"
  else
    NSIS_INSTALL_SCRIPT_PATH="${PROJECT_DIR}\BuildScript\\${APPID}\install-windows-32.nsi"
  fi
fi

"${NSIS_PATH}" //INPUTCHARSET UTF8 //DVERSION=${VERSION} //DAPPID=${APPID} //DUNINST=${UNINST} "${NSIS_INSTALL_SCRIPT_PATH}"
