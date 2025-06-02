import { Text, View } from 'react-native';
import { EditInfo } from './index.component';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const HomeScreen = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />
      <EditInfo path={path} />
      {children}
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
