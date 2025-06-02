import { View, Image, Platform } from 'react-native'

const LogoSrc = require('../../../../assets/icon.png')

const UILogo = () => {
  return (
    <View 
      className={styles.container}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // spécifique à Android
      }}
    >
      <Image className={styles.image} source={LogoSrc} />
    </View>
  )
}

const styles = {
  container: 'w-24 h-24 bg-white rounded-full justify-center items-center',
  image: 'w-16 h-16',
}

export default UILogo