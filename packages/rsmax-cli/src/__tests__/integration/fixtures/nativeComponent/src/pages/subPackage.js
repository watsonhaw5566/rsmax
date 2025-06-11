import React from 'react';
import { requirePluginComponent, requirePlugin } from '@rsmax/macro';
import { View } from 'rsmax';

const Plugin = requirePlugin('plugin://myPlugin');

Plugin.api();

const PluginComponent = requirePluginComponent('plugin://myPlugin/xx');
const PluginComponent2 = requirePluginComponent('plugin://myPlugin/dddd');

export default () => (
  <View>
    <PluginComponent />
    <PluginComponent2 />
  </View>
);
