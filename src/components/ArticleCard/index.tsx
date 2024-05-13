import React, {ComponentType, useMemo, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {DateTime} from 'luxon';
import {Article} from '@models/Article';
import Icon from '@components/Icon';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import colors from '@consts/colors';
import StackRoutes, {RootStackNavigationProp} from '@navigation/routes';

type ArticleCardProps = {
  article: Article;
  onFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  disableScroll: () => void;
  enableScroll: () => void;
};

const ArticleCard: ComponentType<ArticleCardProps> = ({
  article,
  onFavorite,
  onDelete,
  disableScroll,
  enableScroll,
}) => {
  const navigation = useNavigation<RootStackNavigationProp<StackRoutes>>();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => !article.isDeleted,
      onPanResponderMove: (e, gesture) => {
        if (gesture.dx < 0) {
          Animated.event([null, {dx: pan.x}], {useNativeDriver: false})(
            e,
            gesture,
          );
          disableScroll();
        }
      },
      onPanResponderRelease: (e, gesture) => {
        const screenWidth = Dimensions.get('window').width;
        const swipeThreshold = -screenWidth * 0.5;

        if (gesture.dx < swipeThreshold) {
          Animated.timing(pan, {
            toValue: {x: -screenWidth, y: 0},
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onDelete(article.objectID);
            enableScroll();
          });
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 11,
            useNativeDriver: true,
          }).start(() => {
            enableScroll();
          });
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, onDelete]);

  const favoriteStyle = useMemo(() => {
    const isDeletedOrFavorite = article.isFavorite || article.isDeleted;
    let color = colors.appBackground;
    if (article.isDeleted) {
      color = colors.red;
    }
    return {
      borderLeftColor: isDeletedOrFavorite ? color : colors.gray,
      borderLeftWidth: isDeletedOrFavorite ? 3 : 1,
    };
  }, [article]);

  const createdAt = useMemo(() => {
    const currentDate = DateTime.local();
    const createdAt = DateTime.fromJSDate(new Date(article.created_at));
    const diffMinutes = Math.abs(
      currentDate.diff(createdAt, 'minutes').minutes,
    );

    if (diffMinutes < 60) {
      const minutes = Math.floor(diffMinutes);
      return `${article.author} - ${minutes}m`;
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = Math.floor(diffMinutes % 60);
      return `${article.author} - ${hours}h ${minutes}m`;
    } else if (diffMinutes < 2880) {
      return `${article.author} - Yesterday`;
    } else {
      return `${article.author} - ${createdAt.toFormat('EEE dd')}`;
    }
  }, [article]);

  const iconOpacity = pan.x.interpolate({
    inputRange: [-0.4 * Dimensions.get('window').width, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, {opacity: iconOpacity}]}>
        <View style={styles.iconInnerContainer}>
          <Icon name={'trash'} size={25} color="white" />
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{translateX: pan.x}],
          },
        ]}
        {...panResponder.panHandlers}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(StackRoutes.WEBVIEW, {
                uri: article.story_url,
                title: article.story_title,
              })
            }
            style={[styles.innerCard, favoriteStyle]}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{article.story_title}</Text>
                {!article.isDeleted && (
                  <TouchableOpacity
                    onPress={() => onFavorite(article.objectID)}>
                    <Icon
                      name={!article.isFavorite ? 'favorite' : 'favoriteActive'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.createdAtLabel}>{createdAt}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default ArticleCard;
