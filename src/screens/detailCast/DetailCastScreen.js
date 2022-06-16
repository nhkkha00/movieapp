import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, BackHandler } from 'react-native';
import COLORS from '../../res/color/colors';
import { URL_IMG } from '../../connection/MethodApi';
import { ScrollView } from 'react-native-gesture-handler';
import { convertDateToString } from '../../utilities/convertDate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDeviceOrientation } from '@react-native-community/hooks';

const DetailCastScreen = ({ route, navigation }) => {

  const { landscape } = useDeviceOrientation();

  const { itemMovie, cast, actor, screen, current_page } = route.params;

  const image_source = `${URL_IMG}/w200${actor.profile_path}`;

  useEffect(() => {

    const backAction = () => {
      if (screen === 'Detail') {
        navigation.replace('Detail',{itemMovie});
      } else {
        if (screen === 'CastScreen') {
          navigation.push('Cast', { itemMovie, cast, current_page })
        }
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  function genderActor() {
    switch (actor.gender) {
      case 1:
        return genderActor = 'Female';
      case 2:
        return genderActor = 'Male';
      default:
        return genderActor = 'Unknow';
    }
  }

  const directionsProfile =
   landscape ? { flexDirection:'row'}: { flexDirection:'column' }





  return (
    <View style={styles.container}>
      <ScrollView style={{ margin: 10 }}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
        <View style={directionsProfile}>
          {
            actor.profile_path === null ?
              <View style={[styles.images, { justifyContent: 'center', alignItems: 'center' }]}>
                <FontAwesome name='user' size={200} />
              </View>
              :
              <Image style={styles.images} resizeMode='cover' source={{ uri: image_source }} />
          }
          <View style={{ alignSelf: 'center' }}>
            <Text numberOfLines={2} style={[styles.textGray, { marginTop: 10 }]}>
              {`Name:\t${actor.name}`}
            </Text>
            <Text style={[styles.textGray, { marginTop: 10 }]}>
              {`Gender:\t${genderActor()}`}
            </Text>
            <Text style={[styles.textGray, { marginTop: 10 }]}>
              {`Day of birth:\t${convertDateToString(actor.birthday)}`}
            </Text>
            {actor.deathday !== null &&
              <Text style={[styles.textGray, { marginTop: 10 }]}>
                {`Deathday:\t${convertDateToString(actor.deathday)}`}
              </Text>
            }
            <Text style={[styles.textGray, { marginTop: 10 }]}>
              {`Role:\t${actor.known_for_department}`}
            </Text>
          </View>
        </View>

        <View style={styles.dash}></View>
        <Text style={styles.section}>Biography</Text>
        <Text style={styles.textGray}>{actor.biography}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBg,
  },
  images: {
    width: 200,
    height: 200,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'center',
  },
  dash: {
    height: 1,
    backgroundColor: COLORS.gray3,
    marginTop: 20,
    marginBottom: 20
  },
  section: {
    color: COLORS.white,
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'lato_regular'
  },
  textGray: {
    color: COLORS.gray,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    fontFamily: 'lato_regular',
    lineHeight: 25
  },
});

export default DetailCastScreen;