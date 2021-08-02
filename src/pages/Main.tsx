import React, { useState, useEffect } from "react";
import { FlatList, View, Image, Text, StyleSheet } from "react-native";

interface Member {
  login: string;
  avatar_url: String;
}

const Main: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/orgs/rocketseat/members").then((response) => {
      response.json().then((data) => {
        setMembers(data);
      });
    });
  }, []);

  return (
    <FlatList
      contentContainerStyle={{ padding: 24 }}
      data={members}
      keyExtractor={(member) => member.login}
      renderItem={({ item: member }) => (
        <View style={style.member}>
          <Image style={style.image} source={{ uri: member.avatar_url }} />
          <Text>{member.login}</Text>
        </View>
      )}
    />
  );
};

const style = StyleSheet.create({
  member: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
});

export default Main;
