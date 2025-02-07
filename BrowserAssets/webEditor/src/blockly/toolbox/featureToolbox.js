import robotGogoXml from './RobotGogo.xml';
import aiBlocksXml from './AiBlocks.xml';
import robotMaxXml from './RobotMax.xml';
import buildableXml from './BuildableRobot.xml';
import qqcarXml from './RobotQQCar.xml';
import robotPlanetXml from './RobotPlanet.xml';
import  robotDroneXml from './RobotDrone.xml';

export default [
  {
    feature: 'IntegratedRobot',
    insertMark: 'insertmark1',
    toolbox: ``
  },
  {
    feature: 'AIBlocks',
    insertMark: 'insertmark2',
    toolbox: aiBlocksXml
  },
  {
    feature: 'RobotGogoSeries',
    insertMark: 'insertmark3',
    toolbox: robotGogoXml
  },
  {
    feature: 'RobotMaxSeries',
    insertMark: 'insertmark3',
    toolbox: robotMaxXml
  },
  {
    feature: 'BuildableRobot',
    insertMark: 'insertmark4',
    toolbox: buildableXml
  },
  {
    feature: 'RobotQQCarSeries',
    insertMark: 'insertmark3',
    toolbox: qqcarXml
  },
  {
    feature: 'RobotPlanetSeries',
    insertMark: 'insertmark3',
    toolbox: robotPlanetXml,
    independent: true,
  },
  {
    feature: 'RobotDroneSeries',
    insertMark: 'insertmark3',
    toolbox: robotDroneXml
  },
];
