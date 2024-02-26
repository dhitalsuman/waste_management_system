import { View } from "react-native";
import useAUthStore from "../hooks/useAuh";
import { Avatar, Button, Card, Text, Appbar } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [message, setMessage] = useState();
  const { logout, fullName, locationId, id } = useAUthStore();
  console.log(id);
  let formattedDate = ""; // Initialize formattedDate variable

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `https://swocchaproject.vercel.app/api/info/${id}`
        );
        const data = res.data;
        console.log(data);
        const { notifications } = data;
        const lastIndex = notifications.length - 1;
        setMessage(notifications[lastIndex]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, []);
  console.log({ message });

  const timestamp =
    message && message.notification ? message.notification.createdAt : null;

  // Check if timestamp is valid before further processing
  if (timestamp) {
    const date = new Date(timestamp);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[date.getMonth()];
    formattedDate = `${monthName} ${date.getDate()}, ${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    // Use formattedDate in your component
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title={`Hello ${fullName}`} />
        <Appbar.Action
          icon={"logout"}
          onPress={() => {
            logout(), alert("Logged out Successfully");
          }}
        />
      </Appbar.Header>
      {message ? (
        <Card>
          <Card.Content>
            <Text variant="titleLarge">The Waste Collector is Here. </Text>
            <Text variant="bodyMedium">{message.notification.message}</Text>
            <Text>{timestamp && formattedDate}</Text>
          </Card.Content>
          <Card.Cover
            source={{
              uri: "https://i.pinimg.com/736x/fc/ce/a2/fccea220d59ef2e06e964fad9333ae5c.jpg",
            }}
          />
          <Card.Actions>
            {/* <Button>Cancel</Button>
          <Button>Ok</Button> */}
          </Card.Actions>
        </Card>
      ) : (
        <Text>No Notification Right Now, Stay Updated...</Text>
      )}
    </View>
  );
};

export default User;
