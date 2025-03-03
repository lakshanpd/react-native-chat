import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  Platform,
} from "react-native";
import images from "./assets/images/index";
import styles from "./styles/styles";
import MessageContainer from "./components/MessageContainer";
import { format, set } from "date-fns";
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

function Chat({
  messages = [],
  setMessages,
  themeColor,
  themeTextColor,
  showSenderAvatar = true,
  showReceiverAvatar = true,
  placeholder = "Write Your Message...",
  inputBorderColor = "gray",
  placeholderColor = "gray",
  inputColor = "black",
  user = {
    _id: 1,
    name: "CodSod",
  },
  backgroundColor = "white",
  inputBackgroundColor = "white",
  backgroundImage,
  senderContainerColor = "#f0ebfb",
  senderMessageColor = "#000000",
  customFooter,
  style,
  showEmoji = false,
  onPressEmoji,
  showAttachment = false,
  onPressAttachment,
  timeContainerColor,
  timeContainerTextColor,
  onEndReached,
  loading 
}) {
  const [text, setText] = useState("");
  const flatListRef = useRef(null);
  const [currentDate, setCurrentDate] = useState("");
  const [isDateVisible, setIsDateVisible] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(false);

  const [recognized, setRecognized] = useState("");
  const [pitch, setPitch] = useState("");
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = (e) => {
      console.log("onSpeechStart: ", e);
      setStarted("√");
    };
  
    Voice.onSpeechRecognized = (e) => {
      console.log("onSpeechRecognized: ", e);
      setRecognized("√");
    };
  
    Voice.onSpeechEnd = (e) => {
      console.log("onSpeechEnd: ", e);
      setEnd("√");
    };
  
    Voice.onSpeechError = (e) => {
      console.log("onSpeechError: ", e);
      setError(JSON.stringify(e.error));
    };
  
    Voice.onSpeechResults = (e) => {
      console.log("onSpeechResults: ", e);
      setResults(e.value);
      setText(e.value[0]);
    };
  
    Voice.onSpeechPartialResults = (e) => {
      console.log("onSpeechPartialResults: ", e);
      setPartialResults(e.value);
    };
  
    Voice.onSpeechVolumeChanged = (e) => {
      console.log("onSpeechVolumeChanged: ", e);
      setPitch(e.value);
      
    };
  
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecognizing = async () => {
    try {
      
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };
  
  const stopRecognizing = async () => {
    try {
      setText(results[0]);
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };
  
  const cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };
  
  const destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetStates();
  };
  
  const resetStates = () => {
    setRecognized("");
    setPitch("");
    setError("");
    setStarted("");
    setResults([]);
    setPartialResults([]);
    setEnd("");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      scrollToStart
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      scrollToStart
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleMic = async () => {
    if (isMicOn) {
       await stopRecognizing();
       setIsMicOn(false);
       return;
    } else {
       await startRecognizing();
        setIsMicOn(true);
        return;
    }
 };
 

  const messageRenderItem = ({ item }) => {
    const isSender = item.user._id === user._id;
    const isLoading = item.text === "loading";
    return (
      <View style={{...styles.messageWrapper}}>
        <MessageContainer
          message={item.text}
          name={item.user.name}
          time={item.createdAt}
          icon={item.user.avatar}
          backgroundColor={isSender ? themeColor : senderContainerColor}
          textColor={isSender ? themeTextColor : senderMessageColor}
          showAvatar={isSender ? showSenderAvatar : showReceiverAvatar}
          isSender={isSender}
          loading={isLoading}
        />
      </View>
    );
  };

  const onSendMessage = () => {
    if (text.trim().length === 0) return;
    if (text.trim()) {
      setMessages(text.trim());
      setText("");
    }
  };

  const scrollToStart = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };
  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    setIsDateVisible(true);
  };

  const handleScrollEnd = () => {
    scrollTimeoutRef.current = setTimeout(() => {
      setIsDateVisible(false);
    }, 1000);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0].item;
      const formattedDate = format(
        new Date(firstVisibleItem.createdAt),
        "MMM d, yyyy"
      );
      setCurrentDate(formattedDate);
    }
  }).current;

  const BackgroundView = backgroundImage ? ImageBackground : View;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <BackgroundView
        style={[styles.container, style, { backgroundColor }]}
        source={
          typeof backgroundImage === "string"
            ? { uri: backgroundImage }
            : backgroundImage
        }
        resizeMode="cover"
      >
        <FlatList
          ref={flatListRef}
          data={[...messages]}
          renderItem={messageRenderItem}
          contentContainerStyle={styles.contentContainerStyle}
          // onContentSizeChange={scrollToStart}
          keyExtractor={(_, index) => index?.toString()}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEnd}
          onMomentumScrollEnd={handleScrollEnd}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          inverted
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
        />
        {customFooter ? (
          customFooter
        ) : (
          <View style={styles.footer}>
            <View
              style={[
                styles.footerContainer,
                {
                  borderColor: inputBorderColor,
                  backgroundColor: inputBackgroundColor,
                },
              ]}
            >
              <TextInput
                placeholder={placeholder}
                value={text}
                onChangeText={setText}
                style={[styles.inputStyle, { color: inputColor, borderRadius: 0  }]}
                blurOnSubmit={false}
                placeholderTextColor={placeholderColor}
                multiline
              />

              {Platform.OS == "ios" && 
                <TouchableOpacity
                  style={[styles.imageContainer]}
                  onPress={handleMic}
                  activeOpacity={0.8}
                >
                  <Image
                    source={images.mic}
                    style={[styles.sendImage, { tintColor: isMicOn ? "red" : "black" }]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>}


            </View>
            <TouchableOpacity
              style={[styles.sendContainer, { backgroundColor: themeColor, opacity: loading || isMicOn ? 0.5 : 1.0 }]}
              onPress={loading || isMicOn ? null : onSendMessage}
              activeOpacity={0.9}
            >
              <Image
                source={images.send}
                style={[styles.sendImage, { tintColor: themeTextColor }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      </BackgroundView>
    </KeyboardAvoidingView>
  );
}

export default Chat;
