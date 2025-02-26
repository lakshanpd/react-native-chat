import { View, Text, TouchableOpacity, Image, Linking, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import { getInitials } from "../hooks/useGetInitials";
import Markdown from "react-native-markdown-renderer";
import chatbotIcon from "../assets/images/chatbot_icon.png";
import Loader from 'react-native-three-dots-loader'

const Avatar = ({ icon, name, textColor, backgroundColor }) => (
  <View style={[styles.avatarContainer, { backgroundColor }]}>
    {icon ? (
      <Image
        source={typeof icon === "string" ? { uri: icon } : icon}
        style={styles.avatar}
        resizeMode="contain"
      />
    ) : (
      <Text style={[styles.avatarContainerText, { color: textColor }]}>
        {getInitials(name)}
      </Text>
    )}
  </View>
);

const MessageContainer = ({
  message,
  name,
  icon,
  backgroundColor,
  textColor,
  isSender,
  showAvatar,
  time,
  loading,
}) => {
  const [showDate, setShowDate] = useState(false);
  const messageContainerStyle = isSender
    ? styles.senderMessageContainer
    : styles.receiverMessageContainer;
  const alignmentStyle = isSender ? styles.alignEnd : styles.alignStart;

  return (
    <View style={alignmentStyle}>
      {!isSender && showAvatar && (
        <Avatar icon={chatbotIcon} name={name} textColor={textColor} backgroundColor={backgroundColor} />
      )}

      <TouchableOpacity style={[messageContainerStyle, { backgroundColor }]} activeOpacity={0.9}>
        <ScrollView style={{ flexShrink: 1 }}>

        {isSender && !loading ? (
  <Text style={[styles.messageText, { color: textColor }]}>{message}</Text>
) : !isSender && loading ? (

<View style={{ flexGrow: 1, minHeight: 30, justifyContent: "center", alignItems: "center"}}>
  <Loader size={6} dotMargin={4}/>
</View>
) : (
  <Markdown
    style={{
      text: { color: textColor, fontFamily: "PlusJakartaSans-Regular" },
      strong: { color: textColor, fontFamily: "PlusJakartaSans-Regular" }, 
      link: { color: "blue", fontFamily: "PlusJakartaSans-Regular" }, 
      bullet_list: { color: textColor, fontFamily: "PlusJakartaSans-Regular" }, 
      ordered_list: { color: textColor, fontFamily: "PlusJakartaSans-Regular" }, 
      heading1: { fontSize: 24, fontWeight: "bold", color: textColor, fontFamily: "PlusJakartaSans-Regular" },
      heading2: { fontSize: 22, fontWeight: "bold", color: textColor, fontFamily: "PlusJakartaSans-Regular" },
      heading3: { fontSize: 20, color: textColor, fontFamily: "PlusJakartaSans-Regular" },
      image: { width: "100%", height: 200, borderRadius: 10, marginVertical: 5 }
    }}
    onLinkPress={(url) => Linking.openURL(url)}
    rules={{
      image: (node) => (
        <Image
          key={node.key}
          source={{ uri: node.attributes.src }}
          style={{ width: "100%", height: 200, borderRadius: 10, marginVertical: 5 }}
          resizeMode="cover"
        />
      ),
    }}
  >
    {message}
  </Markdown>
)}

        </ScrollView>
      </TouchableOpacity>

      {isSender && showAvatar && (
        <Avatar name={name} textColor={textColor} backgroundColor={backgroundColor} />
      )}
    </View>
  );
};

export default MessageContainer;
