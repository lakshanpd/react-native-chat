import { View, Text, TouchableOpacity, Image, Linking, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import styles from "../styles/styles";
import { getInitials } from "../hooks/useGetInitials";
// import Markdown from "react-native-markdown-renderer";
import Markdown from 'react-native-markdown-display';
// import chatbotIcon from "../assets/images/chatbot_icon.jpeg";
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
  // console.log("messag:  ", message);

  return (
    <View style={alignmentStyle}>
      {!isSender && showAvatar && (
        <Avatar icon={null} name={name} textColor={textColor} backgroundColor={backgroundColor} />
      )}

      <TouchableOpacity style={[messageContainerStyle]} activeOpacity={0.9}>
        <ScrollView style={{ flexShrink: 1 }}>

        {isSender && !loading ? (
  <Text style={[styles.messageText, { color: textColor }]}>{message}</Text>
) : !isSender && loading ? (

<View style={{ flexGrow: 1, minHeight: 30, justifyContent: "center", alignItems: "center"}}>
  <Loader size={5} dotMargin={3}/>
</View>
) : (
  
<Markdown style={{ text: { color: "black", fontSize: 13,},
strong: { color: "black", fontWeight: "600"},
link: { color: "blue" },
heading1: { fontSize: 18, fontWeight: "bold", color: textColor },
heading2: { fontSize: 16, fontWeight: "bold", color: textColor },
heading3: { fontSize: 15, fontWeight: "bold", color: textColor, fontFamily: ""},
heading4: { fontSize: 13, color: textColor, fontWeight: "600" },
heading5: { fontSize: 13, color: textColor },
heading6: { fontSize: 13, color: textColor },
image: { width: "100%", height: 200, borderRadius: 10, marginVertical: 5 },
}}
onLinkPress={(url) => Linking.openURL(url)}
>{message}</Markdown>
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
