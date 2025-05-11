import { useQuery } from 'remax';
import { View } from 'rsmax/one';

export default props => {
  const query = useQuery();

  return (
    <View>
      <View>query from props: {props.location.query.name}</View>
      <View>query from hook: {query.name}</View>
    </View>
  );
};
