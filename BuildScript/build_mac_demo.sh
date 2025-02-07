#设置Unity3d项目目录
UNITY3D_PROJECT_PATH="/Users/sivanzeng/work/project/unity/VirtualCompetition"
#设置Unity3d exe文件路径
UNITY3D_EXE_PATH="/Applications/Unity/Hub/Editor/2021.3.26f1c1/Unity.app/Contents/MacOS/Unity"

OUTPUT_DIR="${UNITY3D_PROJECT_PATH}/build"

#Unity3d项目打包输出路径
UNITY3D_MACOS_OUTPUT_PATH="${OUTPUT_DIR}/VirtualCompetition.app"

"${UNITY3D_EXE_PATH}" -batchmode -buildOSXUniversalPlayer "${UNITY3D_MACOS_OUTPUT_PATH}" -projectPath "${UNITY3D_PROJECT_PATH}" -quit
