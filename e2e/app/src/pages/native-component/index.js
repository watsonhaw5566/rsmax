import B from '@/components/b';
import D from '@/components/d/index.js';
import E from '@/components/e/index.js';
import Badge from 'mini-antui/es/badge';
import RaxView from 'rax-view';
import React from 'react';
import { View } from 'rsmax/one';
import ScopedComponent from '../../components/@foo/a';
import A from '../../components/a';
import C from '../../components/c/index';
import Complex from '../../components/complex';
import NotInJSXComponent from '../../components/notInJSX';
import SlotComponent from '../../components/slot';
import SrcComponent from '../../components/src';

export default () => {
  const b = React.createRef();
  const text = `not in jsx${NotInJSXComponent}`;
  return (
    <View>
      <A foo="bar" className="a-class" />
      <B ref={b} />
      <C />
      <D />
      <E />
      <Complex />
      <SlotComponent>
        <View id="inner" slot="inner">
          inner
        </View>
      </SlotComponent>
      <ScopedComponent />
      <SrcComponent />
      <RaxView />
      {text}
      <Badge>
        <View slot="inner">Remax</View>
      </Badge>
    </View>
  );
};
