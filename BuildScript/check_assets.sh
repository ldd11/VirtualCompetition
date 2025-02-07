#!/bin/sh
#设置Unity3d exe文件路径
UNITY3D_EXE_PATH=$1
#设置输入的根目录
PROJECT_DIR=$2

echo "UNITY3D_EXE_PATH: $UNITY3D_EXE_PATH"
echo "project path: $PROJECT_DIR"

"${UNITY3D_EXE_PATH}" -batchmode -quit -projectPath "${PROJECT_DIR}" -executeMethod Checker.CheckAssets
