import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, BackHandler } from 'react-native';
import COLORS from '../../res/color/colors';
import { URL_IMG } from '../../connection/MethodApi';
import { ScrollView } from 'react-native-gesture-handler';
import { convertDateToString } from '../../utilities/convertDate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DetailCastScreen = ({ route, navigation }) => {

  const { itemMovie, cast, actor, screen } = route.params;

  const image_source = `${URL_IMG}/w200${actor.profile_path}`;

  useEffect(() => {

    const backAction = () => {
      if (screen === 'Detail') {
        navigation.push('Detail', { itemMovie });
      } else {
        if (screen === 'CastScreen') {
          screen
          navigation.navigate('Cast', { itemMovie, cast })
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


  return (
    <View style={styles.container}>
      <ScrollView style={{ margin: 10 }}
        showsVerticalScrollIndicator={false}
        overScrollMode='never'
      >
        <View style={{ flexDirection: 'row' }}>
          {
            actor.profile_path === null ?
              <View style={[styles.images, { justifyContent: 'center', alignItems: 'center' }]}>
                <FontAwesome name='user' size={200} />
              </View>
              :
              <Image style={styles.images} resizeMode='cover' source={{ uri: image_source }} />
          }
          <View style={{ alignSelf: 'center' }}>
            <Text style={[styles.textGray, { marginTop: 10 }]}>
              {`Name:\n\t${actor.name}`}
            </Text>
            <Text style={[styles.textGray, { marginTop: 10 }]}>
              {`Gender:\n\t${genderActor()}`}
            </Text>
            <Text style={[styles.textGray, { marginTop: 10 }]}>
              {`Day of birth:\n\t${convertDateToString(actor.birthday)}`}
            </Text>
            {actor.deathday !== null &&
              <Text style={[styles.textGray, { marginTop: 10 }]}>
                {`Deathday:\n\t${actor.deathday}`}
              </Text>
            }
            <Text style={[styles.textGray, { marginTop: 10 }]}>
              {`Role:\n\t${actor.known_for_department}`}
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
    alignSelf: 'center'
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