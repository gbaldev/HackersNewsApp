import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchArticles, normalizeHit } from "@contexts/Articles/provider";
import { Linking } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import { Notification, Notifications } from "react-native-notifications";
import { request, PERMISSIONS } from "react-native-permissions";
import StackRoutes from "@navigation/routes";
import { Article } from "models/Article";
import { DateTime } from "luxon";
import { isIOS } from "@utils/consts";

export const initBackgroundFetching = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
    },
    async taskId => {
      console.log('Received background-fetch event: ', taskId);

      if (isIOS) {
        Notifications.postLocalNotification({
          body: "This is an example from background fetch!!",
          title: "Congratulations!",
          silent: false,
          userInfo: { },
          data: { uri: 'https://www.google.com', title: 'Google'},
        });
      } else {
        Notifications.postLocalNotification({
          body: "This is an example from background fetch!!",
          title: "Congratulations!",
          data: { uri: 'https://www.google.com', title: 'Google'},
        });
      }


      let interests: string | { ios: boolean, android: boolean } | null = await AsyncStorage.getItem('pushPreferences');
      interests = (typeof interests === 'string' ? JSON.parse(interests) : { ios: true, android: true }) as { ios: boolean, android: boolean }

      const prevArticles = await AsyncStorage.getItem('articles');
      let articles: Article[] = prevArticles ? JSON.parse(prevArticles) : [];
      const newArticles = [...articles];

      // Fetch by query, only android and ios related.
      let fetchedArticles = await fetchArticles(interests);

      const lastArticleCreatedAt = await AsyncStorage.getItem('lastCreatedArticle');
      let normalizedArticles = fetchedArticles.hits.filter(h => !!h.story_url || !!h.url).map(hit => normalizeHit(hit));
      if (lastArticleCreatedAt) {
        const lastArticleCreatedAtDate = DateTime.fromJSDate(new Date(lastArticleCreatedAt));
        
        // keep articles after the last article created (new ones).
        normalizedArticles = normalizedArticles.filter(article => {
          const newArticleDate = DateTime.fromJSDate(new Date(article.created_at));
          const isNew = lastArticleCreatedAtDate < newArticleDate;
          return isNew;
        })
      }
      
      for (const article of normalizedArticles) {
        const isAlreadyFetched = articles.some(_article => article.objectID === _article.objectID);
        if (isAlreadyFetched) {
          continue;
        } else {
          // new article, send push notification
          newArticles.unshift(article);
          if (isIOS) {
            Notifications.postLocalNotification({
              body: 'There is a new article, check it out!',
              title: article.story_title,
              silent: false,
              userInfo: { },
              data: { uri: article.story_url, title: article.story_url},
            });
          } else {
            Notifications.postLocalNotification({
              body: 'There is a new article, check it out!',
              title: article.story_title,
              data: { uri: article.story_url, title: article.story_title},
            });
          }
        }   
      };

      newArticles.sort((a, b) => {
        const dateA = Date.parse(a.created_at);
        const dateB = Date.parse(b.created_at);
        return dateB - dateA;
      })

      await AsyncStorage.setItem('articles', JSON.stringify(newArticles));
      await AsyncStorage.setItem('lastCreatedArticle', newArticles[0].created_at);

      BackgroundFetch.finish(taskId);
    },
    error => {
      console.error('RNBackgroundFetch failed to start.');
    },
  );
};

export const finishRegistration = (navigation: any) => {
  Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
    completion({alert: true, sound: true, badge: true});
  });

  Notifications.events().registerNotificationReceivedBackground((notification: Notification, completion) => {
    completion({alert: true, sound: true, badge: true});
  });

  Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
    navigation.navigate(StackRoutes.WEBVIEW, { uri: notification.payload.data.uri, title: notification.payload.data.title })
    completion();
  });

  if (isIOS) {
    Notifications.postLocalNotification({
      body: "This is an example, checkout google!",
      title: "Congratulations!",
      silent: false,
      userInfo: { },
      data: { uri: 'https://www.google.com', title: 'Google'},
    });
  } else {
    Notifications.postLocalNotification({
      body: "This is an example, checkout google!",
      title: "Congratulations!",
      data: { uri: 'https://www.google.com', title: 'Google'},
    });
  }
  
  initBackgroundFetching();
}

export const initialNotificationsConfig = async () => {
  try {
    const firstLaunch = await AsyncStorage.getItem('firstLaunch');

    if (isIOS) {
      if (!firstLaunch || firstLaunch === 'declined') {
        Notifications.ios.registerRemoteNotifications();
        await AsyncStorage.setItem('firstLaunch', 'done');
      } else {
        await Linking.openSettings();
      }
      return;
    } else {
      if (!firstLaunch || firstLaunch === 'declined') {
        await AsyncStorage.setItem('firstLaunch', 'done');
        await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        Notifications.android.registerRemoteNotifications();
      } else {
        Linking.openSettings();
      }
    }
  } catch (e) {}
}