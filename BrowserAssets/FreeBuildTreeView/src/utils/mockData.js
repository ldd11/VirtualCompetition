import { TreeDataStore } from '@/store/index';

export default function MockData() {
  TreeDataStore.setTreeNodes([
    {
      value: '1',
      label: '组1',
      type: 'group',
      unitType: '',
      children: [
        {
          value: '111', label: '小型lcd1小型lcd1小型lcd1小型lcd1', type: 'single', unitType: 'BASE', panelType: 'Base'
        },
        {
          value: '112', label: '基础模块1', type: 'single', unitType: 'BASE', panelType: 'Base'
        }
      ]
    },
    {
      value: '2',
      label: '组2',
      type: 'group',
      children: [
        {
          value: '21', label: '基础模块12', type: 'single', unitType: 'SQUAREPYRAMID', panelType: 'Base'
        },
        {
          value: '22', label: '基础模块13', type: 'single', unitType: 'HUMIDITY_SENSOR', panelType: 'Sensor'
        },
        {
          value: '23', label: '基础模块14', type: 'single', unitType: 'DISPLAYSCREENMIDDLE', panelType: 'Actuator'
        },
        {
          value: '24', label: '基础模块1224', type: 'single', unitType: 'WHEEL', panelType: 'Power'
        }
      ]
    },
    {
      value: '3',
      label: '组3',
      type: 'group',
      children: [
        {
          value: '31',
          label: '基础模块1231',
          type: 'group',
          children: [
            {
              value: '311', label: '基础模块', type: 'single', unitType: 'BASE', panelType: 'Base'
            },
            {
              value: '312',
              label: '编码电机',
              type: 'group',
              unitType: 'DISPLAYSCREENMIDDLE',
              panelType: 'Actuator',
              children: [
                {
                  value: '32',
                  label: '编码电机32',
                  type: 'group',
                  unitType: 'DISPLAYSCREENMIDDLE',
                  panelType: 'Actuator',
                  children: [
                    {
                      value: '33',
                      label: '编码电机33',
                      type: 'group',
                      unitType: 'BASE',
                      panelType: 'Base',
                      children: [
                        {
                          value: '34',
                          label: '编码电机34',
                          type: 'single',
                          unitType: 'HUMIDITY_SENSOR',
                          panelType: 'Sensor',
                          children: [
                            {
                              value: '5',
                              label: 'baseBlock',
                              type: 'group',
                              unitType: 'BASE',
                              panelType: 'Base',
                              children: [
                                {
                                  value: '7', label: 'baseBlock', type: 'single', unitType: 'BASE', panelType: 'Base',
                                },
                                {
                                  value: '8',
                                  label: 'baseBlock',
                                  type: 'group',
                                  children: [
                                    {
                                      value: '12',
                                      label: 'baseBlock',
                                      type: 'group',
                                      unitType: '',
                                      panelType: '',
                                      children: [
                                        {
                                          value: '777',
                                          label: 'baseBlock',
                                          type: 'group',
                                          children: [
                                            { value: '789', label: 'baseBlock', type: 'single' },
                                            { value: '790', label: 'baseBlock', type: 'single' },
                                          ]
                                        },
                                      ]
                                    },
                                  ]
                                },
                              ]
                            },
                            { value: '6', label: 'baseBlock', type: 'single' },
                          ]
                        }
                      ]
                    },

                  ]
                },

              ]
            },
          ]
        }
      ]
    },
    {
      value: '4', label: 'baseBlock', type: 'single', unitType: 'WHEEL', panelType: 'Power', children: []
    },
    { value: '9', label: 'baseBlock', type: 'single' },
    { value: '10', label: 'baseBlock', type: 'single' },
    { value: '11', label: 'baseBlock', type: 'single' },
    { value: '791', label: 'baseBlock', type: 'single' },
    { value: '792', label: 'baseBlock', type: 'single' },
    { value: '793', label: 'baseBlock', type: 'single' },
    { value: '794', label: 'baseBlock', type: 'single' },
    { value: '795', label: 'baseBlock', type: 'single' },
    { value: '796', label: 'baseBlock', type: 'single' },
    { value: '877', label: 'baseBlock', type: 'single' },
    { value: '889', label: 'baseBlock', type: 'single' },
    { value: '890', label: 'baseBlock', type: 'single' },
    { value: '891', label: 'baseBlock', type: 'single' },
    { value: '892', label: 'baseBlock', type: 'single' },
    { value: '893', label: 'baseBlock', type: 'single' },
    { value: '894', label: 'baseBlock', type: 'single' },
    { value: '895', label: 'baseBlock', type: 'single' },
    { value: '896', label: 'baseBlock', type: 'single' },
  ]);
}
