import { View, Text } from 'react-native'

interface UITextProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const UIText = ({ 
  title = "-- --", 
  subtitle = "-- --",
  className = ""
}: UITextProps) => {
  return (
    <View className={`${styles.container} ${className}`}>
      <Text className={styles.title}>
        {title}
      </Text>
      <Text className={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  )
}

const styles = {
    container: "mb-6 items-center",
    title: "text-lg font-bold text-center mb-2 text-black",
    subtitle: "text-sm text-center text-gray-600 leading-5"
}

export default UIText
